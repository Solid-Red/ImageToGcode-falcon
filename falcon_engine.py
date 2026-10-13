"""
Falcon Engine - Generador de G-code a partir de imágenes optimizado para CNC Láser Creality Falcon (GRBL 1.1)
Versión 3 - Aplicación de Escritorio Nativa en Linux
"""

import math
import numpy as np
from PIL import Image, ImageOps, ImageEnhance
from typing import Dict, Any, Tuple, List

class FalconImageGcodeGenerator:
    def __init__(self):
        pass

    @staticmethod
    def process_image(
        pil_image: Image.Image,
        brightness: float = 1.0,
        contrast: float = 1.0,
        gamma: float = 1.0,
        invert: bool = False,
        mode: str = "dither_atkinson",
        threshold: int = 128
    ) -> Tuple[np.ndarray, Image.Image]:
        """
        Aplica ajustes y algoritmo de conversión (grises o tramado).
        Retorna matriz de intensidades [0..255] donde 0 = fondo blanco (sin quemar),
        255 = quemado máximo (negro).
        """
        img = pil_image.convert("L")

        if invert:
            img = ImageOps.invert(img)

        if brightness != 1.0:
            enhancer = ImageEnhance.Brightness(img)
            img = enhancer.enhance(brightness)

        if contrast != 1.0:
            enhancer = ImageEnhance.Contrast(img)
            img = enhancer.enhance(contrast)

        arr = np.array(img, dtype=np.float32)

        if gamma != 1.0 and gamma > 0:
            arr = 255.0 * np.power(arr / 255.0, 1.0 / gamma)

        arr = np.clip(arr, 0, 255)
        burn_map = 255.0 - arr

        if mode == "grayscale":
            processed_burn = burn_map
            preview_arr = (255 - np.clip(processed_burn, 0, 255)).astype(np.uint8)
            preview_img = Image.fromarray(preview_arr, mode="L")

        elif mode == "dither_fs":
            w, h = arr.shape[1], arr.shape[0]
            fs_arr = arr.copy()
            out_burn = np.zeros((h, w), dtype=np.float32)

            for y in range(h):
                for x in range(w):
                    old_val = fs_arr[y, x]
                    new_val = 255.0 if old_val >= threshold else 0.0
                    fs_arr[y, x] = new_val
                    error = old_val - new_val

                    if new_val == 0.0:
                        out_burn[y, x] = 255.0

                    if x + 1 < w:
                        fs_arr[y, x + 1] += error * (7.0 / 16.0)
                    if y + 1 < h:
                        if x - 1 >= 0:
                            fs_arr[y + 1, x - 1] += error * (3.0 / 16.0)
                        fs_arr[y + 1, x] += error * (5.0 / 16.0)
                        if x + 1 < w:
                            fs_arr[y + 1, x + 1] += error * (1.0 / 16.0)

            processed_burn = out_burn
            preview_arr = (255 - np.clip(processed_burn, 0, 255)).astype(np.uint8)
            preview_img = Image.fromarray(preview_arr, mode="L")

        elif mode == "dither_atkinson":
            w, h = arr.shape[1], arr.shape[0]
            atk_arr = arr.copy()
            out_burn = np.zeros((h, w), dtype=np.float32)

            for y in range(h):
                for x in range(w):
                    old_val = atk_arr[y, x]
                    new_val = 255.0 if old_val >= threshold else 0.0
                    atk_arr[y, x] = new_val
                    error = (old_val - new_val) / 8.0

                    if new_val == 0.0:
                        out_burn[y, x] = 255.0

                    if x + 1 < w:
                        atk_arr[y, x + 1] += error
                    if x + 2 < w:
                        atk_arr[y, x + 2] += error
                    if y + 1 < h:
                        if x - 1 >= 0:
                            atk_arr[y + 1, x - 1] += error
                        atk_arr[y + 1, x] += error
                        if x + 1 < w:
                            atk_arr[y + 1, x + 1] += error
                    if y + 2 < h:
                        atk_arr[y + 2, x] += error

            processed_burn = out_burn
            preview_arr = (255 - np.clip(processed_burn, 0, 255)).astype(np.uint8)
            preview_img = Image.fromarray(preview_arr, mode="L")

        elif mode == "threshold":
            processed_burn = np.where(arr < threshold, 255.0, 0.0)
            preview_arr = (255 - processed_burn).astype(np.uint8)
            preview_img = Image.fromarray(preview_arr, mode="L")

        else:
            processed_burn = burn_map
            preview_arr = (255 - np.clip(processed_burn, 0, 255)).astype(np.uint8)
            preview_img = Image.fromarray(preview_arr, mode="L")

        return processed_burn, preview_img

    @classmethod
    def generate_gcode(
        cls,
        image_burn_map: np.ndarray,
        width_mm: float,
        height_mm: float,
        speed_engrave: float = 3000.0,
        speed_travel: float = 6000.0,
        min_power: int = 0,
        max_power: int = 1000,
        laser_mode: str = "M4",
        scan_direction: str = "horizontal_bidirectional",
        overscan_mm: float = 2.0,
        origin_x: float = 0.0,
        origin_y: float = 0.0,
        passes: int = 1,
        auto_home_end: bool = True,
        hardware_homing: bool = True
    ) -> Dict[str, Any]:
        """
        Genera código G-code optimizado para Creality Falcon.
        """
        rows, cols = image_burn_map.shape
        pixel_w_mm = width_mm / max(cols, 1)
        pixel_h_mm = height_mm / max(rows, 1)

        gcode_lines: List[str] = []
        gcode_lines.append("; --- Generado por Falcon G-Code Studio v3 (Linux Nativo) ---")
        gcode_lines.append(f"; Dimensiones: {width_mm:.2f} x {height_mm:.2f} mm ({cols}x{rows} px)")
        gcode_lines.append(f"; Resolucion: {1.0/pixel_w_mm:.2f} lineas/mm X, {1.0/pixel_h_mm:.2f} lineas/mm Y")
        gcode_lines.append(f"; Velocidad Grabado: {speed_engrave} mm/min | Desplazamiento: {speed_travel} mm/min")
        gcode_lines.append(f"; Rango de Potencia: S{min_power} a S{max_power} ({laser_mode})")
        gcode_lines.append(f"; Pasadas: {passes}")
        gcode_lines.append("; ----------------------------------------------------")
        
        gcode_lines.append("G21 ; Unidades en milimetros")
        gcode_lines.append("G90 ; Coordenadas absolutas")
        gcode_lines.append("G92 X0 Y0 ; Fijar punto actual (Home fisico inicial del operario) como X0 Y0")
        gcode_lines.append("M5  ; Asegurar laser apagado")
        gcode_lines.append(f"G0 F{speed_travel:.0f}")

        power_range = max_power - min_power

        def y_coord(row_idx: int) -> float:
            return origin_y + height_mm - (row_idx * pixel_h_mm)

        total_cut_dist_mm = 0.0
        total_rapid_dist_mm = 0.0
        cur_x = 0.0  # El operario siempre inicia fisicamente desde el Home (0,0)
        cur_y = 0.0

        for current_pass in range(passes):
            if passes > 1:
                gcode_lines.append(f"\n; --- Pasada {current_pass + 1} de {passes} ---")

            gcode_lines.append(f"{laser_mode} S0")

            for r in range(rows):
                y_pos = y_coord(r)
                row_data = image_burn_map[r, :]

                if np.max(row_data) <= 0.0:
                    continue

                left_to_right = True
                if scan_direction == "horizontal_bidirectional":
                    left_to_right = (r % 2 == 0)

                non_zero = np.where(row_data > 0.0)[0]
                if len(non_zero) == 0:
                    continue

                min_c = non_zero[0]
                max_c = non_zero[-1]

                start_c = min_c if left_to_right else max_c
                end_c = max_c if left_to_right else min_c

                start_x = origin_x + (start_c * pixel_w_mm)
                end_x = origin_x + ((end_c + 1) * pixel_w_mm if left_to_right else end_c * pixel_w_mm)

                accel_x = max(0.0, min(400.0, start_x - overscan_mm)) if left_to_right else min(400.0, max(0.0, start_x + overscan_mm))

                gcode_lines.append(f"G0 X{accel_x:.3f} Y{y_pos:.3f}")
                dist = math.hypot(accel_x - cur_x, y_pos - cur_y)
                total_rapid_dist_mm += dist
                cur_x, cur_y = accel_x, y_pos

                gcode_lines.append(f"G1 X{start_x:.3f} Y{y_pos:.3f} S0 F{speed_engrave:.0f}")
                dist = abs(start_x - cur_x)
                total_cut_dist_mm += dist
                cur_x = start_x

                step = 1 if left_to_right else -1
                cur_run_power = None

                for c in range(start_c, end_c + step, step):
                    val = row_data[c]
                    if val <= 0:
                        calc_s = 0
                    else:
                        calc_s = int(min_power + (val / 255.0) * power_range)
                        calc_s = max(min_power, min(max_power, calc_s))

                    target_px_x = origin_x + ((c + 1) * pixel_w_mm if left_to_right else c * pixel_w_mm)

                    if cur_run_power is None:
                        cur_run_power = calc_s
                    elif cur_run_power != calc_s:
                        gcode_lines.append(f"G1 X{target_px_x:.3f} S{cur_run_power}")
                        dist = abs(target_px_x - cur_x)
                        total_cut_dist_mm += dist
                        cur_x = target_px_x
                        cur_run_power = calc_s

                if cur_run_power is not None and cur_x != end_x:
                    gcode_lines.append(f"G1 X{end_x:.3f} S{cur_run_power}")
                    dist = abs(end_x - cur_x)
                    total_cut_dist_mm += dist
                    cur_x = end_x

                decel_x = min(400.0, max(0.0, end_x + overscan_mm)) if left_to_right else max(0.0, min(400.0, end_x - overscan_mm))
                gcode_lines.append(f"G1 X{decel_x:.3f} S0")
                dist = abs(decel_x - cur_x)
                total_cut_dist_mm += dist
                cur_x = decel_x

        gcode_lines.append("\n; --- Fin de trabajo ---")
        gcode_lines.append("M5 ; Apagar laser")
        if auto_home_end:
            gcode_lines.append("G90 ; Coordenadas absolutas")
            gcode_lines.append("G0 X0 Y0 F3000 ; Retorno suave a Home inicial (0,0) sin forzar motores")
            gcode_lines.append("G4 P0.5 ; Pausa de estabilizacion para disipar inercia")
            if hardware_homing:
                gcode_lines.append("$H ; Ciclo de finales de carrera (Solo hardware compatible)")
        else:
            gcode_lines.append(f"G0 X{origin_x:.3f} Y{origin_y:.3f} F3000 ; Retorno a origen")
        gcode_lines.append("M2 ; Fin de programa")

        gcode_text = "\n".join(gcode_lines)

        time_rapid_sec = (total_rapid_dist_mm / speed_travel) * 60.0 if speed_travel > 0 else 0
        time_cut_sec = (total_cut_dist_mm / speed_engrave) * 60.0 if speed_engrave > 0 else 0
        total_time_sec = (time_rapid_sec + time_cut_sec) * 1.15

        min_total = int(total_time_sec // 60)
        sec_total = int(total_time_sec % 60)
        est_str = f"{min_total}m {sec_total}s" if min_total > 0 else f"{sec_total}s"

        return {
            "gcode": gcode_text,
            "line_count": len(gcode_lines),
            "width_mm": width_mm,
            "height_mm": height_mm,
            "rapid_dist_mm": round(total_rapid_dist_mm, 1),
            "cut_dist_mm": round(total_cut_dist_mm, 1),
            "estimated_time_sec": round(total_time_sec, 1),
            "estimated_time_formatted": est_str,
            "bounds": {
                "min_x": origin_x,
                "max_x": origin_x + width_mm,
                "min_y": origin_y,
                "max_y": origin_y + height_mm
            }
        }
