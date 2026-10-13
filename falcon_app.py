#!/usr/bin/env python3
"""
Falcon G-Code Studio v3 - Aplicación de Escritorio Nativa para Linux
Ventana nativa GTK 3.0 con aceleración gráfica WebKitGTK
Sin necesidad de navegador web externo.
"""

import os
import sys
import json
import base64
import io
import socket
import threading
import urllib.parse
import http.server
from PIL import Image

# 1. Cargar librerías nativas del sistema Linux GNOME / GTK
import gi
gi.require_version("Gtk", "3.0")
try:
    gi.require_version("WebKit2", "4.1")
except ValueError:
    gi.require_version("WebKit2", "4.0")

from gi.repository import Gtk, WebKit2, GLib, Gdk, GdkPixbuf

APP_DIR = os.path.dirname(os.path.abspath(__file__))
if APP_DIR not in sys.path:
    sys.path.insert(0, APP_DIR)

from falcon_engine import FalconImageGcodeGenerator

UI_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "ui")
latest_generated_gcode = ""
latest_job_filename = "falcon_grabado.gcode"
main_window_ref = None

# ============================================================
# MICRO-SERVICIO HTTP INTERNO (EMBEDDED LOOPBACK)
# ============================================================
class StudioInternalHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=UI_DIR, **kwargs)

    def log_message(self, format, *args):
        # Silenciar logs para mantener el terminal completamente limpio
        pass

    def do_GET(self):
        global latest_generated_gcode, latest_job_filename
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path == "/api/current_gcode":
            self._send_json({
                "success": True,
                "filename": latest_job_filename,
                "gcode": latest_generated_gcode,
                "line_count": len(latest_generated_gcode.splitlines()) if latest_generated_gcode else 0
            })
        elif path == "/api/download_gcode":
            data = latest_generated_gcode.encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "text/plain; charset=utf-8")
            self.send_header("Content-Disposition", f'attachment; filename="{latest_job_filename}"')
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            self.wfile.write(data)
        else:
            super().do_GET()

    def do_POST(self):
        global latest_generated_gcode, latest_job_filename
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        content_length = int(self.headers.get("Content-Length", 0))
        post_data = self.rfile.read(content_length)

        try:
            body = json.loads(post_data.decode("utf-8")) if post_data else {}
        except Exception:
            body = {}

        if path == "/api/load_gcode":
            latest_generated_gcode = body.get("gcode", "")
            latest_job_filename = body.get("filename", "falcon_job.gcode")
            self._send_json({
                "success": True,
                "line_count": len(latest_generated_gcode.splitlines()),
                "filename": latest_job_filename
            })

        elif path == "/api/native_save_file":
            # Diálogo nativo de guardado GTK
            gcode_content = body.get("gcode", latest_generated_gcode)
            suggested_name = body.get("filename", latest_job_filename)

            dialog_title = body.get("dialog_title", "Save G-Code File")
            filter_gcode_label = body.get("filter_gcode_name", "G-Code Files (*.gcode, *.nc)")
            filter_all_label = body.get("filter_all_name", "All Files (*.*)")

            saved_path = [None]
            event = threading.Event()

            def ask_save_on_main():
                try:
                    dialog = Gtk.FileChooserDialog(
                        title=dialog_title,
                        parent=main_window_ref,
                        action=Gtk.FileChooserAction.SAVE
                    )
                    dialog.add_buttons(
                        Gtk.STOCK_CANCEL, Gtk.ResponseType.CANCEL,
                        Gtk.STOCK_SAVE, Gtk.ResponseType.OK
                    )
                    dialog.set_do_overwrite_confirmation(True)
                    dialog.set_current_name(suggested_name)

                    # Filtro .gcode / .nc
                    filter_gcode = Gtk.FileFilter()
                    filter_gcode.set_name(filter_gcode_label)
                    filter_gcode.add_pattern("*.gcode")
                    filter_gcode.add_pattern("*.nc")
                    dialog.add_filter(filter_gcode)

                    filter_all = Gtk.FileFilter()
                    filter_all.set_name(filter_all_label)
                    filter_all.add_pattern("*")
                    dialog.add_filter(filter_all)

                    res = dialog.run()
                    if res == Gtk.ResponseType.OK:
                        saved_path[0] = dialog.get_filename()
                    dialog.destroy()
                finally:
                    event.set()

            GLib.idle_add(ask_save_on_main)
            event.wait(timeout=60.0)

            if saved_path[0]:
                try:
                    with open(saved_path[0], "w", encoding="utf-8") as f:
                        f.write(gcode_content)
                    self._send_json({"success": True, "path": saved_path[0], "filename": os.path.basename(saved_path[0])})
                except Exception as e:
                    self._send_json({"success": False, "error": str(e)})
            else:
                self._send_json({"success": False, "cancelled": True})

        elif path == "/api/generate_gcode":
            try:
                items_data = body.get("items")
                if items_data and isinstance(items_data, list):
                    active_items = [it for it in items_data if it.get("print_enabled", True)]
                    if not active_items:
                        self._send_json({"success": False, "error": "No hay imágenes activadas para imprimir en el menú."})
                        return

                    combined_gcode_lines = []
                    combined_gcode_lines.append("; ==========================================================")
                    combined_gcode_lines.append("; CREALITY FALCON - TRABAJO MULTI-IMAGEN G-CODE (400x400 mm)")
                    combined_gcode_lines.append(f"; Total de imágenes procesadas: {len(active_items)}")
                    combined_gcode_lines.append("; Generado por Falcon G-Code Studio v3 (Linux Nativo)")
                    combined_gcode_lines.append("; ==========================================================")
                    combined_gcode_lines.append("G21 ; Unidades en milímetros")
                    combined_gcode_lines.append("G90 ; Coordenadas absolutas")
                    combined_gcode_lines.append("G92 X0 Y0 ; Fijar punto actual (Home fisico inicial del operario) como X0 Y0")
                    combined_gcode_lines.append("M5  ; Láser apagado inicial")
                    combined_gcode_lines.append("G0 F3000")

                    total_cut_dist = 0.0
                    total_rapid_dist = 0.0
                    total_est_seconds = 0.0
                    min_x_all, max_x_all = 400.0, 0.0
                    min_y_all, max_y_all = 400.0, 0.0

                    auto_home_end = bool(body.get("auto_home_end", True))
                    auto_home_between = bool(body.get("auto_home_between", True))
                    hardware_homing = bool(body.get("hardware_homing", True))

                    for idx, item in enumerate(active_items):
                        name = item.get("name", f"Imagen_{idx+1}")
                        img_data_uri = item.get("image_base64", "")
                        if "," in img_data_uri:
                            _, b64_str = img_data_uri.split(",", 1)
                        else:
                            b64_str = img_data_uri

                        image_bytes = base64.b64decode(b64_str)
                        pil_img = Image.open(io.BytesIO(image_bytes))

                        width_mm = float(item.get("width_mm", 80.0))
                        height_mm = float(item.get("height_mm", 80.0))
                        origin_x = float(item.get("origin_x", 20.0))
                        origin_y = float(item.get("origin_y", 20.0))
                        lines_per_mm = float(item.get("lines_per_mm", body.get("lines_per_mm", 6.0)))
                        speed_engrave = float(item.get("speed_engrave", body.get("speed_engrave", 3500.0)))
                        speed_travel = float(item.get("speed_travel", body.get("speed_travel", 6000.0)))
                        min_power = int(item.get("min_power", body.get("min_power", 0)))
                        max_power = int(item.get("max_power", body.get("max_power", 850)))
                        laser_mode = item.get("laser_mode", body.get("laser_mode", "M4"))
                        algorithm = item.get("algorithm", body.get("algorithm", "dither_atkinson"))
                        brightness = float(item.get("brightness", body.get("brightness", 1.0)))
                        contrast = float(item.get("contrast", body.get("contrast", 1.0)))
                        gamma = float(item.get("gamma", body.get("gamma", 1.0)))
                        invert = bool(item.get("invert", body.get("invert", False)))
                        threshold = int(item.get("threshold", body.get("threshold", 128)))
                        passes = int(item.get("passes", body.get("passes", 1)))

                        min_x_all = min(min_x_all, origin_x)
                        max_x_all = max(max_x_all, origin_x + width_mm)
                        min_y_all = min(min_y_all, origin_y)
                        max_y_all = max(max_y_all, origin_y + height_mm)

                        target_cols = max(1, int(round(width_mm * lines_per_mm)))
                        target_rows = max(1, int(round(height_mm * lines_per_mm)))
                        resized_img = pil_img.resize((target_cols, target_rows), Image.Resampling.LANCZOS)

                        burn_map, _ = FalconImageGcodeGenerator.process_image(
                            resized_img,
                            brightness=brightness,
                            contrast=contrast,
                            gamma=gamma,
                            invert=invert,
                            mode=algorithm,
                            threshold=threshold
                        )

                        res = FalconImageGcodeGenerator.generate_gcode(
                            burn_map,
                            width_mm=width_mm,
                            height_mm=height_mm,
                            speed_engrave=speed_engrave,
                            speed_travel=speed_travel,
                            min_power=min_power,
                            max_power=max_power,
                            laser_mode=laser_mode,
                            origin_x=origin_x,
                            origin_y=origin_y,
                            passes=passes,
                            auto_home_end=False
                        )

                        total_cut_dist += res["cut_dist_mm"]
                        total_rapid_dist += res["rapid_dist_mm"]
                        total_est_seconds += res["estimated_time_sec"]

                        raw_lines = res["gcode"].splitlines()
                        item_lines = []
                        for l in raw_lines:
                            if l.startswith("G21") or l.startswith("G90") or l.startswith("M5  ; Asegurar") or l.startswith("; --- Generado"):
                                continue
                            if l.startswith("; --- Fin de trabajo ---") or l.startswith("M2"):
                                break
                            item_lines.append(l)

                        combined_gcode_lines.append(f"\n; ----------------------------------------------------------")
                        combined_gcode_lines.append(f"; [ELEMENTO {idx+1}/{len(active_items)}]: {name}")
                        combined_gcode_lines.append(f"; Posición: X={origin_x:.2f} mm, Y={origin_y:.2f} mm | Medidas: {width_mm:.2f} × {height_mm:.2f} mm")
                        combined_gcode_lines.append(f"; Potencia: S{min_power} a S{max_power} ({laser_mode}) | Avance: {speed_engrave:.0f} mm/min")
                        combined_gcode_lines.append(f"; ----------------------------------------------------------")
                        combined_gcode_lines.extend(item_lines)
                        combined_gcode_lines.append("M5 ; Apagar láser tras finalizar este elemento")

                        if auto_home_between and idx < len(active_items) - 1:
                            combined_gcode_lines.append("\n; --- Retorno suave a Home inicial (0,0) tras finalizar este dibujo ---")
                            combined_gcode_lines.append("G90 ; Coordenadas absolutas")
                            combined_gcode_lines.append("G0 X0 Y0 F3000 ; Retorno suave a Home (0,0) sin forzar motores")
                            combined_gcode_lines.append("G4 P0.5 ; Pausa de estabilizacion (0.5s)")
                            if hardware_homing:
                                combined_gcode_lines.append("$H ; Ciclo fisico de finales de carrera (Solo hardware compatible)")

                    combined_gcode_lines.append("\n; ==========================================================")
                    combined_gcode_lines.append("; Fin de trabajo multi-imagen Creality Falcon")
                    combined_gcode_lines.append("; ==========================================================")
                    combined_gcode_lines.append("M5 ; Láser apagado")
                    if auto_home_end:
                        combined_gcode_lines.append("G90 ; Coordenadas absolutas")
                        combined_gcode_lines.append("G0 X0 Y0 F3000 ; Retorno seguro al Home inicial (0,0)")
                        combined_gcode_lines.append("G4 P0.5 ; Pausa final de estabilizacion")
                        if hardware_homing:
                            combined_gcode_lines.append("$H ; Ciclo fisico de finales de carrera (Solo hardware compatible)")
                    combined_gcode_lines.append("M2 ; Fin de programa")

                    full_gcode = "\n".join(combined_gcode_lines)
                    latest_generated_gcode = full_gcode
                    latest_job_filename = f"falcon_multi_{len(active_items)}_imagenes.gcode"

                    mins = int(total_est_seconds // 60)
                    secs = int(total_est_seconds % 60)
                    est_str = f"{mins}m {secs}s" if mins > 0 else f"{secs}s"

                    result = {
                        "success": True,
                        "gcode": full_gcode,
                        "line_count": len(combined_gcode_lines),
                        "filename": latest_job_filename,
                        "width_mm": max(0.0, max_x_all - min_x_all),
                        "height_mm": max(0.0, max_y_all - min_y_all),
                        "rapid_dist_mm": round(total_rapid_dist, 1),
                        "cut_dist_mm": round(total_cut_dist, 1),
                        "estimated_time_sec": round(total_est_seconds, 1),
                        "estimated_time_formatted": est_str,
                        "items_count": len(active_items),
                        "bounds": {
                            "min_x": round(min_x_all, 1),
                            "max_x": round(max_x_all, 1),
                            "min_y": round(min_y_all, 1),
                            "max_y": round(max_y_all, 1)
                        }
                    }
                    self._send_json(result)
                    return

                # Modo individual
                img_data_uri = body.get("image_base64", "")
                if "," in img_data_uri:
                    _, b64_str = img_data_uri.split(",", 1)
                else:
                    b64_str = img_data_uri

                image_bytes = base64.b64decode(b64_str)
                pil_img = Image.open(io.BytesIO(image_bytes))

                width_mm = float(body.get("width_mm", 100.0))
                height_mm = float(body.get("height_mm", 100.0))
                origin_x = float(body.get("origin_x", 0.0))
                origin_y = float(body.get("origin_y", 0.0))
                lines_per_mm = float(body.get("lines_per_mm", 5.0))
                speed_engrave = float(body.get("speed_engrave", 3000.0))
                speed_travel = float(body.get("speed_travel", 6000.0))
                min_power = int(body.get("min_power", 0))
                max_power = int(body.get("max_power", 1000))
                laser_mode = body.get("laser_mode", "M4")
                algorithm = body.get("algorithm", "dither_atkinson")
                brightness = float(body.get("brightness", 1.0))
                contrast = float(body.get("contrast", 1.0))
                gamma = float(body.get("gamma", 1.0))
                invert = bool(body.get("invert", False))
                threshold = int(body.get("threshold", 128))
                passes = int(body.get("passes", 1))

                target_cols = max(1, int(round(width_mm * lines_per_mm)))
                target_rows = max(1, int(round(height_mm * lines_per_mm)))
                resized_img = pil_img.resize((target_cols, target_rows), Image.Resampling.LANCZOS)

                burn_map, preview_img = FalconImageGcodeGenerator.process_image(
                    resized_img,
                    brightness=brightness,
                    contrast=contrast,
                    gamma=gamma,
                    invert=invert,
                    mode=algorithm,
                    threshold=threshold
                )

                auto_home_end = bool(body.get("auto_home_end", True))
                hardware_homing = bool(body.get("hardware_homing", True))

                result = FalconImageGcodeGenerator.generate_gcode(
                    burn_map,
                    width_mm=width_mm,
                    height_mm=height_mm,
                    speed_engrave=speed_engrave,
                    speed_travel=speed_travel,
                    min_power=min_power,
                    max_power=max_power,
                    laser_mode=laser_mode,
                    origin_x=origin_x,
                    origin_y=origin_y,
                    passes=passes,
                    auto_home_end=auto_home_end,
                    hardware_homing=hardware_homing
                )

                latest_generated_gcode = result["gcode"]
                latest_job_filename = f"falcon_{int(width_mm)}x{int(height_mm)}mm.gcode"

                buffered = io.BytesIO()
                preview_img.save(buffered, format="PNG")
                preview_b64 = "data:image/png;base64," + base64.b64encode(buffered.getvalue()).decode("utf-8")

                result["preview_base64"] = preview_b64
                result["filename"] = latest_job_filename
                result["success"] = True
                self._send_json(result)

            except Exception as ex:
                self._send_json({"success": False, "error": str(ex)})

        else:
            self._send_json({"error": "Ruta no encontrada"}, status=404)

    def _send_json(self, data: dict, status: int = 200):
        resp_bytes = json.dumps(data).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(resp_bytes)))
        self.end_headers()
        self.wfile.write(resp_bytes)

def start_internal_server():
    """Inicia el servidor interno en un puerto efímero privado."""
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.bind(("127.0.0.1", 0))
    port = sock.getsockname()[1]
    sock.close()

    server = http.server.ThreadingHTTPServer(("127.0.0.1", port), StudioInternalHandler)
    server_thread = threading.Thread(target=server.serve_forever, daemon=True)
    server_thread.start()
    return port, server

# ============================================================
# VENTANA PRINCIPAL GTK 3.0 (APLICACIÓN NATIVA LINUX)
# ============================================================
class FalconNativeStudioApp:
    def __init__(self, port: int):
        global main_window_ref
        self.port = port

        # Forzar tema oscuro GTK para que WebKitGTK y menús nativos usen modo oscuro
        try:
            gtk_settings = Gtk.Settings.get_default()
            if gtk_settings:
                gtk_settings.set_property("gtk-application-prefer-dark-theme", True)
        except Exception:
            pass

        # Ventana GTK
        self.window = Gtk.Window(type=Gtk.WindowType.TOPLEVEL)
        main_window_ref = self.window
        self.window.set_title("Falcon G-Code Studio v3 - Creality Falcon (Linux Desktop)")
        self.window.set_default_size(1340, 890)
        self.window.set_position(Gtk.WindowPosition.CENTER)

        # Icono de la ventana
        icon_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "icon.png")
        if os.path.exists(icon_path):
            try:
                self.window.set_icon_from_file(icon_path)
            except Exception:
                pass

        # Configuración de WebKitGTK
        self.webview = WebKit2.WebView()
        try:
            bg_rgba = Gdk.RGBA()
            bg_rgba.parse("#090d14")
            self.webview.set_background_color(bg_rgba)
        except Exception:
            pass

        settings = self.webview.get_settings()
        settings.set_enable_javascript(True)
        settings.set_enable_webgl(True)
        settings.set_enable_smooth_scrolling(True)
        if hasattr(settings, "set_hardware_acceleration_policy"):
            settings.set_hardware_acceleration_policy(WebKit2.HardwareAccelerationPolicy.ALWAYS)

        # Cargar interfaz nativa desde el micro-servicio interno
        url = f"http://127.0.0.1:{self.port}/index.html"
        self.webview.load_uri(url)

        # Contenedor GTK
        vbox = Gtk.Box(orientation=Gtk.Orientation.VERTICAL, spacing=0)
        vbox.pack_start(self.webview, True, True, 0)
        self.window.add(vbox)

        # Eventos de cierre
        self.window.connect("destroy", self.on_destroy)
        self.window.connect("delete-event", self.on_delete)

    def on_delete(self, widget, event):
        return False

    def on_destroy(self, widget):
        Gtk.main_quit()

    def run(self):
        self.window.show_all()
        Gtk.main()

def main():
    print("===========================================================")
    print("⚡ FALCON G-CODE STUDIO v3 (APLICACIÓN NATIVA LINUX)")
    print("   Creality Falcon 5W • Mesa de Trabajo 400 × 400 mm")
    print("   Iniciando interfaz de escritorio GTK 3.0...")
    print("===========================================================")
    
    port, server = start_internal_server()
    app = FalconNativeStudioApp(port)
    app.run()

if __name__ == "__main__":
    main()
