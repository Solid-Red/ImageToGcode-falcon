"""
Falcon Engine - Generador de G-code a partir de imágenes optimizado para CNC Láser Creality Falcon (GRBL 1.1)
Versión 3 - Aplicación de Escritorio Nativa en Linux
"""

import math
import numpy as np
from PIL import Image, ImageOps, ImageEnhance, ImageDraw
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

    @staticmethod
    def _simplify_poly(pts: List[Tuple[float, float]], eps: float) -> List[Tuple[float, float]]:
        """Simplificación de polilínea mediante algoritmo Ramer-Douglas-Peucker"""
        if len(pts) <= 2:
            return pts
        p_arr = np.array(pts, dtype=np.float64)
        start, end = p_arr[0], p_arr[-1]
        dx = end[0] - start[0]
        dy = end[1] - start[1]
        line_len = math.hypot(dx, dy)
        if line_len < 1e-6:
            dists = np.hypot(p_arr[:, 0] - start[0], p_arr[:, 1] - start[1])
        else:
            dists = np.abs(dy * p_arr[:, 0] - dx * p_arr[:, 1] + end[0] * start[1] - end[1] * start[0]) / line_len

        max_idx = int(np.argmax(dists))
        max_dist = dists[max_idx]
        if max_dist > eps:
            left = FalconImageGcodeGenerator._simplify_poly(pts[:max_idx + 1], eps)
            right = FalconImageGcodeGenerator._simplify_poly(pts[max_idx:], eps)
            return left[:-1] + right
        else:
            return [pts[0], pts[-1]]

    @staticmethod
    def _marching_squares_paths(binary_arr: np.ndarray) -> List[List[Tuple[float, float]]]:
        """Extrae contornos y curvas cerradas/abiertas con Marching Squares (sub-pixel)"""
        from collections import defaultdict
        padded = np.pad(binary_arr, 1, mode='constant', constant_values=False)
        tl = padded[:-1, :-1]
        tr = padded[:-1, 1:]
        br = padded[1:, 1:]
        bl = padded[1:, :-1]
        idx = (tl.astype(np.uint8) << 3) | (tr.astype(np.uint8) << 2) | (br.astype(np.uint8) << 1) | bl.astype(np.uint8)
        rows, cols = np.where((idx > 0) & (idx < 15))
        if len(rows) == 0:
            return []

        segments = []
        for r, c in zip(rows, cols):
            case = idx[r, c]
            cx, cy = float(c - 1), float(r - 1)
            top = (cx + 0.5, cy)
            right = (cx + 1.0, cy + 0.5)
            bottom = (cx + 0.5, cy + 1.0)
            left = (cx, cy + 0.5)

            if case in (1, 14):
                segments.append((left, bottom))
            elif case in (2, 13):
                segments.append((bottom, right))
            elif case in (3, 12):
                segments.append((left, right))
            elif case in (4, 11):
                segments.append((top, right))
            elif case == 5:
                segments.append((top, left))
                segments.append((bottom, right))
            elif case == 10:
                segments.append((top, right))
                segments.append((left, bottom))
            elif case in (6, 9):
                segments.append((top, bottom))
            elif case in (7, 8):
                segments.append((top, left))

        def pt_key(p):
            return (int(round(p[0] * 100)), int(round(p[1] * 100)))

        pt_map = defaultdict(list)
        for i, (p1, p2) in enumerate(segments):
            pt_map[pt_key(p1)].append((i, 0))
            pt_map[pt_key(p2)].append((i, 1))

        used = set()
        polylines = []

        for start_idx in range(len(segments)):
            if start_idx in used:
                continue
            used.add(start_idx)
            p1, p2 = segments[start_idx]
            poly = [p1, p2]

            curr_pt = p2
            while True:
                k = pt_key(curr_pt)
                candidates = [c for c in pt_map[k] if c[0] not in used]
                if not candidates:
                    break
                seg_idx, orientation = candidates[0]
                used.add(seg_idx)
                sp1, sp2 = segments[seg_idx]
                next_pt = sp2 if orientation == 0 else sp1
                poly.append(next_pt)
                curr_pt = next_pt

            if len(poly) >= 2:
                polylines.append(poly)

        return polylines

    @staticmethod
    def _fast_thinning_skeleton(binary_img: np.ndarray) -> np.ndarray:
        """Adelgazamiento Zhang-Suen para reducir trazos de imagen a esqueleto de 1-pixel"""
        img = binary_img.astype(np.uint8)
        while True:
            changed = False
            # Paso 1
            p2 = np.pad(img[:-1, :], ((1, 0), (0, 0)), mode='constant')
            p3 = np.pad(img[:-1, 1:], ((1, 0), (0, 1)), mode='constant')
            p4 = np.pad(img[:, 1:], ((0, 0), (0, 1)), mode='constant')
            p5 = np.pad(img[1:, 1:], ((0, 1), (0, 1)), mode='constant')
            p6 = np.pad(img[1:, :], ((0, 1), (0, 0)), mode='constant')
            p7 = np.pad(img[1:, :-1], ((0, 1), (1, 0)), mode='constant')
            p8 = np.pad(img[:, :-1], ((0, 0), (1, 0)), mode='constant')
            p9 = np.pad(img[:-1, :-1], ((1, 0), (1, 0)), mode='constant')

            b = p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9
            a = ((p2 == 0) & (p3 == 1)).astype(np.uint8) + \
                ((p3 == 0) & (p4 == 1)).astype(np.uint8) + \
                ((p4 == 0) & (p5 == 1)).astype(np.uint8) + \
                ((p5 == 0) & (p6 == 1)).astype(np.uint8) + \
                ((p6 == 0) & (p7 == 1)).astype(np.uint8) + \
                ((p7 == 0) & (p8 == 1)).astype(np.uint8) + \
                ((p8 == 0) & (p9 == 1)).astype(np.uint8) + \
                ((p9 == 0) & (p2 == 1)).astype(np.uint8)

            m1 = (img == 1) & (b >= 2) & (b <= 6) & (a == 1) & (p2 * p4 * p6 == 0) & (p4 * p6 * p8 == 0)
            if np.any(m1):
                img[m1] = 0
                changed = True

            # Paso 2
            p2 = np.pad(img[:-1, :], ((1, 0), (0, 0)), mode='constant')
            p3 = np.pad(img[:-1, 1:], ((1, 0), (0, 1)), mode='constant')
            p4 = np.pad(img[:, 1:], ((0, 0), (0, 1)), mode='constant')
            p5 = np.pad(img[1:, 1:], ((0, 1), (0, 1)), mode='constant')
            p6 = np.pad(img[1:, :], ((0, 1), (0, 0)), mode='constant')
            p7 = np.pad(img[1:, :-1], ((0, 1), (1, 0)), mode='constant')
            p8 = np.pad(img[:, :-1], ((0, 0), (1, 0)), mode='constant')
            p9 = np.pad(img[:-1, :-1], ((1, 0), (1, 0)), mode='constant')

            b = p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9
            a = ((p2 == 0) & (p3 == 1)).astype(np.uint8) + \
                ((p3 == 0) & (p4 == 1)).astype(np.uint8) + \
                ((p4 == 0) & (p5 == 1)).astype(np.uint8) + \
                ((p5 == 0) & (p6 == 1)).astype(np.uint8) + \
                ((p6 == 0) & (p7 == 1)).astype(np.uint8) + \
                ((p7 == 0) & (p8 == 1)).astype(np.uint8) + \
                ((p8 == 0) & (p9 == 1)).astype(np.uint8) + \
                ((p9 == 0) & (p2 == 1)).astype(np.uint8)

            m2 = (img == 1) & (b >= 2) & (b <= 6) & (a == 1) & (p2 * p4 * p8 == 0) & (p2 * p6 * p8 == 0)
            if np.any(m2):
                img[m2] = 0
                changed = True

            if not changed:
                break
        return img.astype(bool)

    @staticmethod
    def _skeleton_to_polylines(skel: np.ndarray) -> List[List[Tuple[float, float]]]:
        """Convierte pixeles de esqueleto 1-pixel a polilíneas conectadas continuas"""
        pts = set(zip(*np.where(skel)))
        if not pts:
            return []

        neighbors = {}
        for y, x in pts:
            nbrs = []
            for dy in (-1, 0, 1):
                for dx in (-1, 0, 1):
                    if dy == 0 and dx == 0:
                        continue
                    if (y + dy, x + dx) in pts:
                        nbrs.append((y + dy, x + dx))
            neighbors[(y, x)] = nbrs

        visited_edges = set()
        polylines = []

        start_nodes = [p for p, nbrs in neighbors.items() if len(nbrs) != 2]
        if not start_nodes and pts:
            start_nodes = [next(iter(pts))]

        for start in start_nodes:
            for nxt in neighbors[start]:
                edge = tuple(sorted([start, nxt]))
                if edge in visited_edges:
                    continue
                visited_edges.add(edge)
                poly = [(float(start[1]), float(start[0])), (float(nxt[1]), float(nxt[0]))]
                curr = nxt
                prev = start
                while True:
                    cand = [n for n in neighbors[curr] if n != prev]
                    if len(cand) == 1:
                        nxt_node = cand[0]
                        edge = tuple(sorted([curr, nxt_node]))
                        if edge in visited_edges:
                            break
                        visited_edges.add(edge)
                        poly.append((float(nxt_node[1]), float(nxt_node[0])))
                        prev = curr
                        curr = nxt_node
                    else:
                        break
                if len(poly) >= 2:
                    polylines.append(poly)

        for p in pts:
            for nxt in neighbors[p]:
                edge = tuple(sorted([p, nxt]))
                if edge not in visited_edges:
                    visited_edges.add(edge)
                    poly = [(float(p[1]), float(p[0])), (float(nxt[1]), float(nxt[0]))]
                    curr = nxt
                    prev = p
                    while True:
                        cand = [n for n in neighbors[curr] if n != prev]
                        if len(cand) == 1:
                            nxt_node = cand[0]
                            edge = tuple(sorted([curr, nxt_node]))
                            if edge in visited_edges:
                                break
                            visited_edges.add(edge)
                            poly.append((float(nxt_node[1]), float(nxt_node[0])))
                            prev = curr
                            curr = nxt_node
                        else:
                            break
                    if len(poly) >= 2:
                        polylines.append(poly)

        return polylines

    @staticmethod
    def _order_paths_tsp(paths: List[List[Tuple[float, float]]], start_pos: Tuple[float, float] = (0.0, 0.0)) -> List[List[Tuple[float, float]]]:
        """Ordena las curvas buscando el vecino más cercano para minimizar trayectos en vacío"""
        if not paths:
            return []
        remaining = [list(p) for p in paths]
        ordered = []
        cur_x, cur_y = start_pos

        while remaining:
            best_idx = -1
            best_dist = float('inf')
            best_reverse = False

            for i, path in enumerate(remaining):
                d_start = math.hypot(path[0][0] - cur_x, path[0][1] - cur_y)
                d_end = math.hypot(path[-1][0] - cur_x, path[-1][1] - cur_y)

                if d_start < best_dist:
                    best_dist = d_start
                    best_idx = i
                    best_reverse = False
                if d_end < best_dist:
                    best_dist = d_end
                    best_idx = i
                    best_reverse = True

            chosen = remaining.pop(best_idx)
            if best_reverse:
                chosen.reverse()
            ordered.append(chosen)
            cur_x, cur_y = chosen[-1]

        return ordered

    @staticmethod
    def _deduplicate_twin_paths(
        paths: List[List[Tuple[float, float]]],
        max_stroke_mm: float = 2.5
    ) -> List[List[Tuple[float, float]]]:
        """
        Deduplica trazos gemelos generados por Marching Squares sobre trazos/líneas con grosor de píxeles.
        Cuando una imagen tiene bordes o contornos de cierto grosor (1 a varios píxeles), Marching Squares
        detecta tanto el contorno exterior como el interior de la misma línea (separados por apenas milímetros),
        provocando que el láser haga dos pasadas sobre el mismo corte.
        Esta función detecta las curvas gemelas interiores anidadas dentro de la tolerancia de trazo y conserva
        únicamente el contorno limpio exterior.
        """
        if len(paths) <= 1:
            return paths

        path_info = []
        for i, p in enumerate(paths):
            arr = np.array(p)
            min_xy = arr.min(axis=0)
            max_xy = arr.max(axis=0)
            d_close = math.hypot(p[0][0] - p[-1][0], p[0][1] - p[-1][1])
            is_closed = d_close <= max(0.6, max_stroke_mm * 0.6)
            perim = sum(math.hypot(p[k][0] - p[k-1][0], p[k][1] - p[k-1][1]) for k in range(1, len(p)))
            path_info.append({
                'idx': i,
                'path': p,
                'min_xy': min_xy,
                'max_xy': max_xy,
                'is_closed': is_closed,
                'perim': perim
            })

        # Ordenar por perímetro descendente (los contornos exteriores abarcan más)
        path_info.sort(key=lambda x: x['perim'], reverse=True)

        keep: List[List[Tuple[float, float]]] = []
        dropped_indices = set()

        for i in range(len(path_info)):
            pi = path_info[i]
            if pi['idx'] in dropped_indices:
                continue
            keep.append(pi['path'])

            if not pi['is_closed']:
                continue

            for j in range(i + 1, len(path_info)):
                pj = path_info[j]
                if pj['idx'] in dropped_indices or not pj['is_closed']:
                    continue

                # Diferencia entre cajas delimitadoras
                d_min = np.abs(pi['min_xy'] - pj['min_xy'])
                d_max = np.abs(pi['max_xy'] - pj['max_xy'])
                if np.all(d_min <= max_stroke_mm) and np.all(d_max <= max_stroke_mm):
                    # Relación de perímetro: si la curva interior tiene un perímetro muy cercano (> 45%)
                    # es el borde interior del mismo trazo de línea, NO un hueco interno independiente
                    if pj['perim'] / max(pi['perim'], 1e-6) > 0.45:
                        dropped_indices.add(pj['idx'])

        return keep

    @classmethod
    def generate_vector_gcode(
        cls,
        image_burn_map: np.ndarray,
        width_mm: float,
        height_mm: float,
        speed_draw: float = 2500.0,
        speed_travel: float = 6000.0,
        laser_power: int = 1000,
        laser_mode: str = "M3",
        tool_type: str = "laser",
        z_up: float = 3.0,
        z_down: float = 0.0,
        z_speed: float = 1200.0,
        vector_type: str = "contour",
        curve_tolerance_mm: float = 0.35,
        threshold: int = 128,
        origin_x: float = 0.0,
        origin_y: float = 0.0,
        passes: int = 1,
        auto_home_end: bool = True,
        hardware_homing: bool = True
    ) -> Dict[str, Any]:
        """
        Genera G-code vectorial (trazado continuo de curvas) optimizado para pluma / plotter o siluetas.
        En lugar de escanear horizontalmente línea por línea, recorre suavemente las curvas de contorno o el trazo central.
        """
        rows, cols = image_burn_map.shape
        binary = image_burn_map >= max(1.0, 255.0 - threshold)

        if vector_type == "centerline":
            skel = cls._fast_thinning_skeleton(binary)
            raw_pixel_paths = cls._skeleton_to_polylines(skel)
        elif vector_type == "contour_outer":
            # Silueta exterior pura: rellenar huecos para obtener exactamente 1 contorno exterior por pieza
            pad = np.pad(binary, 1, mode='constant', constant_values=False)
            pad_img = Image.fromarray((pad * 255).astype(np.uint8)).copy()
            ImageDraw.floodfill(pad_img, (0, 0), 128)
            arr = np.array(pad_img)[1:-1, 1:-1]
            solid_binary = (arr != 128)
            raw_pixel_paths = cls._marching_squares_paths(solid_binary)
        else:
            raw_pixel_paths = cls._marching_squares_paths(binary)

        pixel_w_mm = width_mm / max(cols, 1)
        pixel_h_mm = height_mm / max(rows, 1)

        mm_paths: List[List[Tuple[float, float]]] = []
        for poly in raw_pixel_paths:
            mm_poly = []
            for px, py in poly:
                mx = origin_x + (px * pixel_w_mm)
                my = origin_y + height_mm - (py * pixel_h_mm)
                mm_poly.append((round(mx, 3), round(my, 3)))

            simplified = cls._simplify_poly(mm_poly, curve_tolerance_mm)
            if len(simplified) >= 2:
                length = sum(math.hypot(simplified[k][0] - simplified[k-1][0], simplified[k][1] - simplified[k-1][1]) for k in range(1, len(simplified)))
                if length >= 0.2:
                    mm_paths.append(simplified)

        # Deduplicar trazos gemelos producidos por el grosor de píxeles en Marching Squares
        # Esto asegura que si una pieza fue dibujada como contorno o trazo, no se corte dos veces
        if vector_type != "centerline":
            max_stroke = max(2.5, 4.0 * max(pixel_w_mm, pixel_h_mm))
            mm_paths = cls._deduplicate_twin_paths(mm_paths, max_stroke_mm=max_stroke)

        ordered_paths = cls._order_paths_tsp(mm_paths, (origin_x, origin_y))

        gcode_lines: List[str] = []
        gcode_lines.append("; --- Generado por Falcon G-Code Studio v3 (Linux Nativo) ---")
        gcode_lines.append("; MODO VECTORIAL: Seguimiento Continuo de Curvas")
        gcode_lines.append(f"; Tipo de trazo: {vector_type} | Herramienta: {tool_type}")
        gcode_lines.append(f"; Dimensiones: {width_mm:.2f} x {height_mm:.2f} mm | Curvas detectadas: {len(ordered_paths)}")
        gcode_lines.append(f"; Velocidad Dibujo: {speed_draw:.0f} mm/min | Desplazamiento: {speed_travel:.0f} mm/min")
        if tool_type == "z_axis":
            gcode_lines.append(f"; Control Eje Z: Z_Up={z_up:.2f} mm (Reposo) | Z_Down={z_down:.2f} mm (Contacto) | Vel Z={z_speed:.0f} mm/min")
        else:
            gcode_lines.append(f"; Control Laser/Servo: {laser_mode} S{laser_power}")
        gcode_lines.append(f"; Pasadas: {passes} | Tolerancia de curva: {curve_tolerance_mm:.2f} mm")
        gcode_lines.append("; ----------------------------------------------------")

        gcode_lines.append("G21 ; Unidades en milimetros")
        gcode_lines.append("G90 ; Coordenadas absolutas")
        gcode_lines.append("G92 X0 Y0 ; Fijar punto actual como X0 Y0")
        gcode_lines.append("M5  ; Asegurar laser/solenoide apagado")
        if tool_type == "z_axis":
            gcode_lines.append(f"G0 Z{z_up:.2f} F{z_speed:.0f} ; Pluma arriba en posicion segura")
        gcode_lines.append(f"G0 F{speed_travel:.0f}")

        total_cut_dist_mm = 0.0
        total_rapid_dist_mm = 0.0
        cur_x = 0.0
        cur_y = 0.0
        cur_z = z_up if tool_type == "z_axis" else 0.0

        for current_pass in range(passes):
            if passes > 1:
                gcode_lines.append(f"\n; --- Pasada de dibujo {current_pass + 1} de {passes} ---")

            for p_idx, path in enumerate(ordered_paths):
                if len(path) < 2:
                    continue

                start_pt = path[0]

                # 1. Subir herramienta antes de viajar
                if tool_type == "z_axis" and cur_z != z_up:
                    gcode_lines.append(f"G0 Z{z_up:.2f} F{z_speed:.0f}")
                    cur_z = z_up
                elif tool_type == "laser":
                    gcode_lines.append("M5 ; Herramienta arriba")

                dist_travel = math.hypot(start_pt[0] - cur_x, start_pt[1] - cur_y)
                gcode_lines.append(f"G0 X{start_pt[0]:.3f} Y{start_pt[1]:.3f} F{speed_travel:.0f}")
                total_rapid_dist_mm += dist_travel
                cur_x, cur_y = start_pt[0], start_pt[1]

                # 2. Bajar pluma / encender
                if tool_type == "z_axis":
                    gcode_lines.append(f"G1 Z{z_down:.2f} F{z_speed:.0f} ; Pluma abajo sobre el papel")
                    gcode_lines.append(f"G1 F{speed_draw:.0f}")
                    cur_z = z_down
                else:
                    gcode_lines.append(f"{laser_mode} S{laser_power}")
                    gcode_lines.append(f"G1 F{speed_draw:.0f}")

                # 3. Recorrer la curva de forma continua
                for pt in path[1:]:
                    d = math.hypot(pt[0] - cur_x, pt[1] - cur_y)
                    total_cut_dist_mm += d
                    gcode_lines.append(f"G1 X{pt[0]:.3f} Y{pt[1]:.3f}")
                    cur_x, cur_y = pt[0], pt[1]

                # 4. Levantar pluma al terminar el trazo
                if tool_type == "z_axis":
                    gcode_lines.append(f"G0 Z{z_up:.2f} F{z_speed:.0f} ; Pluma arriba")
                    cur_z = z_up
                else:
                    gcode_lines.append("M5")

        gcode_lines.append("\n; --- Fin de trabajo ---")
        if tool_type == "z_axis":
            gcode_lines.append(f"G0 Z{z_up:.2f} F{z_speed:.0f} ; Asegurar pluma levantada")
        gcode_lines.append("M5 ; Apagar laser")
        if auto_home_end:
            gcode_lines.append("G90 ; Coordenadas absolutas")
            gcode_lines.append("G0 X0 Y0 F3000 ; Retorno suave a Home inicial (0,0)")
            gcode_lines.append("G4 P0.5 ; Pausa de estabilizacion")
            if hardware_homing:
                gcode_lines.append("$H ; Ciclo de finales de carrera (Solo hardware compatible)")
        else:
            gcode_lines.append(f"G0 X{origin_x:.3f} Y{origin_y:.3f} F3000 ; Retorno a origen")
        gcode_lines.append("M2 ; Fin de programa")

        gcode_text = "\n".join(gcode_lines)
        time_rapid_sec = (total_rapid_dist_mm / speed_travel) * 60.0 if speed_travel > 0 else 0
        time_cut_sec = (total_cut_dist_mm / speed_draw) * 60.0 if speed_draw > 0 else 0
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
            "paths_count": len(ordered_paths),
            "bounds": {
                "min_x": origin_x,
                "max_x": origin_x + width_mm,
                "min_y": origin_y,
                "max_y": origin_y + height_mm
            }
        }
