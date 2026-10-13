# Falcon G-Code Studio v3 (Creality Falcon Laser)
### Native Linux Desktop Suite • Multi-Image Bed Composer & G-Code Generator

[![Language: English](https://img.shields.io/badge/Language-English-blue.svg)](#-english-version)
[![Idioma: Español](https://img.shields.io/badge/Idioma-Espa%C3%B1ol-yellow.svg)](#-versión-en-español)

> **Quick Language Jump / Salto Rápido de Idioma:**  
> 🇬🇧 **[English Documentation](#-english-version)** | 🇪🇸 **[Documentación en Español](#-versión-en-español)**

---

<a name="english-version"></a>
# 🇬🇧 English Version

**Falcon G-Code Studio v3** is a native Linux desktop application specifically engineered for **Creality Falcon** laser cutting and engraving CNC machines (5W, 10W, 22W, 40W models and standard GRBL 1.1 controllers) featuring a physical workspace of **400 × 400 mm**.

Version 3 replaces external web browser dependencies and heavy application wrappers with a **lightweight, high-performance GTK 3.0 desktop application powered by hardware-accelerated WebKitGTK**. It features simultaneous multi-image bed composition, G-Code import and path visualization, 450nm diode material presets, real-time virtual simulation, and **full bilingual UI support (English default with instant live toggle to Spanish)**.

---

## 📑 English Table of Contents

1. [Key Features & What's New in v3](#1-key-features--whats-new-in-v3)
2. [Bilingual Interface (English Default & Spanish Option)](#2-bilingual-interface-english-default--spanish-option)
3. [System Requirements & Installation](#3-system-requirements--installation)
4. [How to Launch the Application](#4-how-to-launch-the-application)
5. [User Guide & Workflows](#5-user-guide--workflows)
   - [Interactive 2D Work Bed (400 × 400 mm)](#interactive-2d-work-bed-400--400-mm)
   - [Multi-Image Composition & Layer Management](#multi-image-composition--layer-management)
   - [Imported G-Code Inspection & Path Telemetry](#imported-g-code-inspection--path-telemetry)
   - [Image Processing Algorithms & Resolution](#image-processing-algorithms--resolution)
   - [Material Library & Optical Power Profiles](#material-library--optical-power-profiles)
   - [Auto-Home Calibration & Limit Switches ($H)](#auto-home-calibration--limit-switches-h)
   - [Virtual Trace Simulation](#virtual-trace-simulation)
   - [Exporting with Native Linux Dialogs](#exporting-with-native-linux-dialogs)
6. [USB Serial Connection & Linux Permissions](#6-usb-serial-connection--linux-permissions)
7. [Project Architecture](#7-project-architecture)
8. [Troubleshooting & FAQs](#8-troubleshooting--faqs)

---

### 1. Key Features & What's New in v3

Compared to previous releases (v1 and v2), Version 3 brings critical architectural and workflow upgrades:

| Feature | Version 2 (Flutter) | Version 3 (Falcon Studio v3) |
| :--- | :--- | :--- |
| **Architecture** | Flutter Desktop / Web | **Native GTK 3.0 + Hardware-Accelerated WebKitGTK** |
| **UI Language** | Fixed in Spanish | **English by default with instant toggle to Spanish (EN / ES)** |
| **Images on Bed** | Single image at a time | **Multiple simultaneous images with independent layer controls** |
| **Bed Interaction** | View-only canvas | **Direct mouse drag & interactive corner resize handles** |
| **G-Code Workflow** | Basic visualizer | **Full parser: live telemetry, bed re-centering, align to (0,0)** |
| **Work Bed Safety** | No boundary warning | **Automatic Out-of-Bounds detection for 400×400 mm limits** |
| **File Saving** | Browser download prompt | **Native Linux GTK FileChooserDialog directly on filesystem** |
| **Material Presets** | Generic presets | **13 calibrated profiles for 450nm diode + Custom user profiles** |
| **Auto-Home ($H)** | Single manual button | **Configurable batch homing: job end, between images & $H cycle** |

---

### 2. Bilingual Interface (English Default & Spanish Option)

The interface is set to **English by default** and includes a streamlined, high-contrast language switcher directly in the top header:

* **`[ EN ]` (English)**: Default language for all labels, menus, tooltips, dialogs, and presets.
* **`[ ES ]` (Español)**: Instant switch to Spanish with zero page reload.

#### Localization Capabilities:
1. **Live On-the-Fly Switching**: All UI text—buttons, layer status badges, material cards, confirmation modals, and tooltips—updates instantly without restarting the application or discarding placed images.
2. **Persistent Language Preference**: Your chosen language is stored in `localStorage` (`falcon_laser_lang`) and persists across application restarts.
3. **Synchronized Native File Dialogs**: The Linux GTK file chooser dialog (`Gtk.FileChooserDialog`) dynamically adopts localized titles (`Save G-Code File` vs `Guardar Archivo G-Code`) and filter names according to your active selection.

---

### 3. System Requirements & Installation

Falcon G-Code Studio v3 runs natively on standard Linux distributions (X11 or Wayland).

#### Ubuntu / Debian / Linux Mint / Pop!_OS:
```bash
sudo apt update
sudo apt install -y python3 python3-pip python3-pil python3-numpy \
                    python3-gi gir1.2-gtk-3.0 gir1.2-webkit2-4.1
```
> *Note for Ubuntu 20.04 LTS*: If WebKit 4.1 is not available, install `gir1.2-webkit2-4.0`. The launcher automatically checks and supports both versions.

#### Arch Linux / Manjaro:
```bash
sudo pacman -S python python-pillow python-numpy gtk3 webkit2gtk
```

#### Fedora / RHEL:
```bash
sudo dnf install -y python3 python3-pillow python3-numpy gtk3 webkit2gtk4.1
```

---

### 4. How to Launch the Application

You can launch the application through any of the following methods:

#### Method 1: Terminal Launcher (Recommended)
From the `falcon_laser_v3` folder:
```bash
./falcon_studio
```

#### Method 2: Linux Application Menu (.desktop file)
Install the desktop entry into your user applications folder:
```bash
cp Falcon-Studio-v3.desktop ~/.local/share/applications/
update-desktop-database ~/.local/share/applications/
```
It will appear in your application launcher under **Graphics** and **Engineering** as **Falcon G-Code Studio v3**.

#### Method 3: Direct Python Execution
```bash
python3 falcon_app.py
```

---

### 5. User Guide & Workflows

#### Interactive 2D Work Bed (400 × 400 mm)
* **Millimeter Grid**: Displays the physical bed area (400 × 400 mm) with major axis markers every 50 mm and machine Origin `(0,0)` at the bottom-left corner.
* **Navigation Controls**:
  * **Zoom**: Use your mouse wheel or the `[ ➕ ]` / `[ ➖ ]` buttons.
  * **Pan**: Click and drag on any empty space of the bed canvas.
  * **Center Bed**: Instantly resets the view to fit the entire work bed.
* **Live Telemetry & Cursor Readout**: Shows realtime X/Y coordinates under the mouse cursor in millimeters.

#### Multi-Image Composition & Layer Management
* **Multiple Image Upload**: Drag and drop multiple image files (PNG, JPG, BMP, WEBP) simultaneously onto the canvas or click **Load / Add Images** (`➕ Add`).
* **Interactive Canvas Editing**:
  * **Move**: Click any image to select it and drag it anywhere on the bed.
  * **Resize**: Pull any of the 4 corner handles to adjust physical dimensions.
* **Quick Alignment Tools**:
  * `↙ Origin (0,0)`: Moves the active image directly to the operator zero point.
  * `⌖ Center`: Centers the active image at (200, 200) mm on the bed.
  * `↖ Top-Left` / `↘ Bottom-Right`: Snaps the image to bed corners.
* **Layer Controls**:
  * **Engrave Checkbox (`🖨️`)**: Toggle images on or off to include or exclude them from batch generation.
  * **Scale Shortcuts**: Quick scale buttons (`50%`, `75%`, `100%`, `150%`, `200%`, and `Max` to fit bed).
  * **Aspect Ratio Lock (`🔒 Aspect`)**: Keeps image proportions locked when editing width or height.

#### Imported G-Code Inspection & Path Telemetry
* Import existing `.gcode`, `.nc`, `.gc`, `.tap`, or `.txt` files directly onto the bed.
* The visualizer renders:
  * **Cyan dashed lines**: High-speed rapid positioning moves (`G0`).
  * **Orange solid lines**: Active laser cutting and burning passes (`G1`, `G2`, `G3`).
* **Bed Alignment Tools**:
  * `↙ Align to (0,0)`: Shifts all coordinates in the G-Code file to start at (0,0).
  * `⌖ Center Bed`: Shifts coordinates to place the design directly in the middle of the 400×400 mm bed.
* **Comprehensive Telemetry**: Calculates exact bounding box dimensions, total code lines, laser power range (`S`), cut distance in meters, and estimated runtime.

#### Image Processing Algorithms & Resolution
Powered by `FalconImageGcodeGenerator`:
1. **Atkinson Dithering**: Optimal for natural wood and organic materials; maintains sharp textures without excessive charring.
2. **Floyd-Steinberg**: Error diffusion dithering for smooth photographic gradients.
3. **Grayscale**: Modulates laser power `S` dynamically with `M4` mode according to pixel darkness.
4. **Pure Black & White (Threshold)**: Perfect for vector silhouettes, typography, and crisp edge cuts.
5. **Adjustments**: Sliders for Brightness, Contrast, Color Inversion (negative for dark/metallic materials), and line resolution (`4`, `6`, `8`, `10 lines/mm`).

#### Material Library & Optical Power Profiles
* **Machine Power Selection**: Choose between `5W` (standard diode), `10W` (dual diode), or `22W / 40W` (high power) to automatically scale feed rates.
* **13 Pre-calibrated Profiles for 5W**:
  * 🪵 *Wood*: Detailed photo engraving, fast logos, 2mm balsa clean cut, 3mm plywood multi-pass cut.
  * 🧵 *Fabric*: Cotton/silk cut, denim bleaching and fading.
  * 📄 *Paper & Cardboard*: 80g precision cut, 250g cardstock cut, 3-4mm corrugated cardboard cut.
  * 🧴 *Plastics*: Dark/black acrylic matte engraving.
  * ⚡ *Electronics & PCBs*: Bakelite / FR2 board marking, copper etch-resist paint ablation.
  * 🔘 *Metals*: Black anodized aluminum bright white marking.
* **Custom Profiles**: Save your fine-tuned settings using `💾 Save Profile` to reuse anytime.

#### Auto-Home Calibration & Limit Switches ($H)
* **Auto-Home on job completion**: Ensures the laser head returns safely to (0,0) at `F3000` with a 0.5s stabilization delay (`G4 P0.5`).
* **Auto-Home between multi-image drawings**: Safely returns to (0,0) before beginning the next drawing in a batch job.
* **Hardware Limit Switch Cycle ($H)**: Executes homing switches on machines equipped with physical endstops without ramming rail frames.

#### Virtual Trace Simulation
* Click `▶ Simulate Trace` to preview laser head travel across the bed before running the machine.
* A glowing virtual red pen animates the burn path, highlighting active power levels. Click `⏹ Stop Simulation` at any point to stop.

#### Exporting with Native Linux Dialogs
* `💾 Save .GCode`: Saves the generated file as `.gcode`.
* `.NC`: Saves standard CNC `.nc` files.
* `👁️ View Code`: Opens the built-in modal inspector with line count and one-click copy (`📋 Copy G-Code`).
* Uses Linux GNOME/GTK file chooser dialogs for direct folder selection with overwrite confirmation.

---

### 6. USB Serial Connection & Linux Permissions

To connect your Creality Falcon machine via USB serial cable, ensure your user has read/write permissions for `/dev/ttyACM0` or `/dev/ttyUSB0`:

```bash
sudo usermod -a -G dialout $USER
```
*(Log out and log back in for group changes to take effect).*

---

### 7. Project Architecture

```text
falcon_laser_v3/
├── Falcon-Studio-v3.desktop  # Desktop entry for Linux application menus
├── falcon_studio             # Executable bash launcher
├── falcon_app.py             # GTK 3.0 + WebKitGTK wrapper and loopback HTTP server
├── falcon_engine.py          # Math engine for image dithering and G-code generation
├── icon.png                  # Application window and desktop icon
├── README.md                 # Complete bilingual documentation
└── ui/
    ├── index.html            # Bilingual application markup with semantic i18n
    ├── style.css             # Dark theme stylesheet and responsive layout
    └── app.js                # Canvas engine, G-code parser, and i18n state machine
```

---

### 8. Troubleshooting & FAQs

1. **`ValueError: Namespace WebKit2 not available`**:
   Install WebKitGTK bindings: `sudo apt install gir1.2-webkit2-4.1` (or `gir1.2-webkit2-4.0`).
2. **Permission Denied on `./falcon_studio`**:
   Make files executable: `chmod +x falcon_studio falcon_app.py`.
3. **HiDPI / 4K Display Scaling**:
   Set GTK scaling before launching: `GDK_SCALE=1 GDK_DPI_SCALE=1.2 ./falcon_studio`.
4. **Native Save Dialog Fallback**:
   If the native GTK dialog is blocked by a window manager, the application automatically falls back to browser file downloading.

---

---

<a name="versión-en-español"></a>
# 🇪🇸 Versión en Español

**Falcon G-Code Studio v3** es una aplicación de escritorio nativa para Linux desarrollada específicamente para máquinas CNC de grabado y corte láser **Creality Falcon** (modelos de 5W, 10W, 22W, 40W y controladoras GRBL 1.1) con una mesa de trabajo de **400 × 400 mm**.

La versión 3 reemplaza los navegadores web externos y marcos pesados por una **aplicación nativa en GTK 3.0 con aceleración por hardware WebKitGTK**. Ofrece soporte simultáneo para múltiples imágenes en la mesa de trabajo, importación y análisis de archivos G-Code, biblioteca de materiales calibrada para diodo de 450nm, simulación virtual de trazado y soporte **bilingüe completo (Inglés por defecto con selector dinámico a Español)**.

---

## 📑 Tabla de Contenidos en Español

1. [Novedades y Características de la Versión 3](#1-novedades-y-características-de-la-versión-3)
2. [Interfaz Bilingüe (Inglés por Defecto y Opción a Español)](#2-interfaz-bilingüe-inglés-por-defecto-y-opción-a-español)
3. [Requisitos del Sistema e Instalación](#3-requisitos-del-sistema-e-instalación)
4. [Cómo Iniciar la Aplicación](#4-cómo-iniciar-la-aplicación)
5. [Guía de Uso y Flujos de Trabajo](#5-guía-de-uso-y-flujos-de-trabajo)
   - [Mesa de Trabajo Interactiva 2D (400 × 400 mm)](#mesa-de-trabajo-interactiva-2d-400--400-mm-1)
   - [Composición Multi-Imagen y Menú de Capas](#composición-multi-imagen-y-menú-de-capas-1)
   - [Modo G-Code Importado y Telemetría](#modo-g-code-importado-y-telemetría-1)
   - [Algoritmos de Conversión y Resolución](#algoritmos-de-conversión-y-resolución-1)
   - [Biblioteca de Materiales y Potencia](#biblioteca-de-materiales-y-potencia-1)
   - [Calibración Auto-Home y Finales de Carrera ($H)](#calibración-auto-home-y-finales-de-carrera-h-1)
   - [Simulación Virtual del Trazado](#simulación-virtual-del-trazado-1)
   - [Exportación con Diálogos Nativos de Linux](#exportación-con-diálogos-nativos-de-linux-1)
6. [Conexión USB y Permisos en Linux](#6-conexión-usb-y-permisos-en-linux)
7. [Estructura del Proyecto](#7-estructura-del-proyecto)
8. [Solución de Problemas (Troubleshooting)](#8-solución-de-problemas-troubleshooting)

---

### 1. Novedades y Características de la Versión 3

Comparado con las versiones V1 y V2, la versión 3 introduce mejoras sustanciales:

| Característica | Versión 2 (Flutter) | Versión 3 (Falcon Studio v3) |
| :--- | :--- | :--- |
| **Arquitectura** | Flutter Desktop / Web | **GTK 3.0 + WebKitGTK Acelerado (Nativo Linux)** |
| **Idioma de la UI** | Fijo en Español | **Inglés por defecto con selector dinámico a Español (EN / ES)** |
| **Imágenes en Mesa** | 1 imagen a la vez | **Múltiples imágenes simultáneas con menú de capas independiente** |
| **Manipulación en Cama** | Solo visualización | **Arrastre directo con ratón y tiradores de esquina para redimensionar** |
| **Archivos G-Code** | Visualizador básico | **Parser completo con telemetría, re-centrado y alineación a (0,0)** |
| **Seguridad de Mesa** | Sin aviso visual | **Detección automática de límites (Out of Bounds) para 400×400 mm** |
| **Guardado de Archivos** | Descarga en navegador | **Diálogo nativo GTK FileChooserDialog del sistema Linux** |
| **Perfiles de Materiales** | Presets básicos | **13 perfiles calibrados para diodo 450nm + Perfiles personalizados de usuario** |
| **Auto-Home ($H)** | Botón manual | **Opciones configurables por lote: fin de trabajo, entre imágenes y ciclo $H** |

---

### 2. Interfaz Bilingüe (Inglés por Defecto y Opción a Español)

La interfaz gráfica está configurada en **Inglés por defecto** e integra un selector de idioma de acceso rápido en la cabecera superior:

* **`[ EN ]` (English)**: Idioma predeterminado del sistema.
* **`[ ES ]` (Español)**: Conmutación inmediata en un solo clic.

#### Características del Sistema de Idioma:
1. **Cambio en Caliente (Sin Recargar)**: Todo el texto del UI (botones, menús, leyendas, opciones desplegables, tarjetas de especificaciones y diálogos de alerta) se traduce en tiempo real sin reiniciar el trabajo en curso ni perder las imágenes colocadas en la mesa.
2. **Persistencia Automática**: La preferencia elegida se almacena en `localStorage` (`falcon_laser_lang`), manteniendo el idioma seleccionado entre sesiones.
3. **Diálogos de Archivos Nativos Sincronizados**: El diálogo nativo de Linux (`Gtk.FileChooserDialog`) adopta el título y los filtros según el idioma activo (`Save G-Code File` o `Guardar Archivo G-Code`).

---

### 3. Requisitos del Sistema e Instalación

Falcon G-Code Studio v3 corre de forma ligera en distribuciones Linux estándar con entorno gráfico X11 o Wayland.

#### En Ubuntu / Debian / Linux Mint / Pop!_OS:
```bash
sudo apt update
sudo apt install -y python3 python3-pip python3-pil python3-numpy \
                    python3-gi gir1.2-gtk-3.0 gir1.2-webkit2-4.1
```
> *Nota*: Si tu sistema utiliza una versión previa de WebKitGTK (Ubuntu 20.04), instala `gir1.2-webkit2-4.0`. El lanzador `falcon_app.py` detecta y enlaza automáticamente ambas versiones.

#### En Arch Linux / Manjaro:
```bash
sudo pacman -S python python-pillow python-numpy gtk3 webkit2gtk
```

#### En Fedora / RHEL:
```bash
sudo dnf install -y python3 python3-pillow python3-numpy gtk3 webkit2gtk4.1
```

---

### 4. Cómo Iniciar la Aplicación

Dispones de 3 métodos sencillos para ejecutar la suite:

#### Método 1: Lanzador de Terminal (Recomendado)
Abre un terminal en la carpeta `falcon_laser_v3` y ejecuta:
```bash
./falcon_studio
```

#### Método 2: Acceso Directo de Escritorio
Puedes copiar el archivo `.desktop` a tu menú de aplicaciones de Linux:
```bash
cp Falcon-Studio-v3.desktop ~/.local/share/applications/
update-desktop-database ~/.local/share/applications/
```
Aparecerá en tu menú de aplicaciones bajo la categoría de **Gráficos** y **Herramientas de Ingeniería** con el nombre **Falcon G-Code Studio v3**.

#### Método 3: Ejecución Directa en Python
```bash
python3 falcon_app.py
```

---

### 5. Guía de Uso y Flujos de Trabajo

#### Mesa de Trabajo Interactiva 2D (400 × 400 mm)
* **Cuadrícula Milimétrica**: Muestra el área física real de la Creality Falcon (400 × 400 mm) con subdivisiones mayores cada 50 mm y origen físico `(0,0)` en la esquina inferior izquierda.
* **Control de Vista**:
  * **Zoom**: Usa la rueda del ratón o los botones `[ ➕ ]` / `[ ➖ ]`.
  * **Desplazamiento (Pan)**: Haz clic y arrastra sobre cualquier zona vacía de la mesa.
  * **Centrar Mesa (`Center Bed`)**: Restablece el encuadre óptimo instantáneamente.
* **Coordenadas en Vivo**: Muestra la posición del cursor milimétrico en tiempo real en la leyenda inferior.

#### Composición Multi-Imagen y Menú de Capas
* **Carga Múltiple**: Arrastra varias imágenes a la vez (PNG, JPG, BMP, WEBP) o utiliza el botón **Load / Add Images** (`➕ Add`).
* **Manipulación con el Ratón**:
  * **Mover**: Haz clic sobre cualquier imagen y arrástrala a la posición deseada.
  * **Redimensionar**: Arrastra los tiradores en las 4 esquinas de la imagen seleccionada.
* **Barra de Alineación Rápida**:
  * `↙ Origin (0,0)`: Coloca la imagen seleccionada en el punto cero del operario.
  * `⌖ Center`: Centra la imagen exactamente en las coordenadas (200, 200) de la mesa.
  * `↖ Top-Left` / `↘ Bottom-Right`: Posiciona en los extremos de la cama de trabajo.
* **Menú de Capas Lateral**:
  * **Casilla de Impresión (`🖨️`)**: Permite marcar qué imágenes deben grabarse en el trabajo actual y cuáles omitir temporalmente.
  * **Escala Rápida**: Botones de acceso rápido `50%`, `75%`, `100%`, `150%`, `200%` y `Max` (ajuste al tamaño máximo disponible).
  * **Bloqueo de Proporción (`🔒 Aspect`)**: Mantiene la relación de aspecto original de la imagen al editar anchura o altura.

#### Modo G-Code Importado y Telemetría
* Puedes arrastrar o importar archivos existentes con extensiones `.gcode`, `.nc`, `.gc`, `.tap` o `.txt`.
* El visor interpreta el archivo y dibuja en pantalla:
  * **Líneas discontinuas en cian**: Movimientos rápidos sin láser (`G0`).
  * **Líneas continuas en naranja**: Trayectorias activas de quemado/corte (`G1`, `G2`, `G3`).
* **Alineación de G-Code**: Botones dedicados para reubicar trabajos antiguos:
  * `↙ Align to (0,0)`: Desplaza todo el código G para que inicie en el origen físico.
  * `⌖ Center Bed`: Centra todo el archivo en la mesa de 400×400 mm.
* **Telemetría**: Cálculo en vivo de dimensiones efectivas, cantidad de líneas de comando, potencia mínima y máxima (`S`), distancia de corte en metros y tiempo estimado de ejecución.

#### Algoritmos de Conversión y Resolución
La versión 3 incluye el motor de procesamiento de imagen de alto rendimiento `FalconImageGcodeGenerator`:
1. **Atkinson Dithering**: Algoritmo óptimo para madera y materiales orgánicos. Conserva detalles finos de rostros y texturas sin saturar los negros.
2. **Floyd-Steinberg**: Difusión de error balanceada para degradados suaves y sombras fotográficas.
3. **Escala de Grises (Grayscale)**: Modula continuamente la potencia del láser `S` según la tonalidad del píxel mediante modo dinámico `M4`.
4. **Blanco y Negro Puro (Threshold)**: Ideal para cortes limpios de siluetas, tipografías y logotipos vectoriales convertidos a mapa de bits.
5. **Ajustes Ópticos**: Brillo, contraste, inversión a negativo (necesario para metales y superficies oscuras) y resolución seleccionable entre `4 l/mm`, `6 l/mm` (estándar), `8 l/mm` y `10 l/mm`.

#### Biblioteca de Materiales y Potencia
* **Selector de Potencia Óptica del Cabezal**: Permite elegir entre `5W` (diodo estándar), `10W` (diodo dual) o `22W / 40W` (alta potencia), escalando automáticamente las velocidades recomendadas de avance.
* **13 Perfiles Predeterminados Calibrados para 5W**:
  * 🪵 *Madera*: Grabado fotográfico detallado, grabado rápido de logos, corte limpio de balsa 2mm, corte contrachapado (plywood) 3mm.
  * 🧵 *Tela*: Corte fino de algodón/seda, grabado y decolorado de tela vaquera (denim/jeans).
  * 📄 *Papel y Cartón*: Corte de precisión en papel 80g, corte de cartulina 250g, corte de cartón corrugado 3-4mm.
  * 🧴 *Plásticos*: Grabado mate de alto contraste sobre acrílico oscuro.
  * ⚡ *Electrónica & PCBs*: Grabado directo en placa de baquelita / FR2, ablación de máscara de esmalte para corrosión de pistas en cobre.
  * 🔘 *Metales*: Marcado blanco brillante en aluminio anodizado negro.
* **Perfiles Personalizados**: Guarda tus propios parámetros con el botón `💾 Save Profile` y gestiónalos en la sección de perfiles guardados.

#### Calibración Auto-Home y Finales de Carrera ($H)
Para evitar pérdidas de pasos y colisiones con los marcos de la máquina:
* **Auto-Home al finalizar trabajo**: Garantiza que el cabezal regrese a `(0,0)` de manera controlada con avance seguro `F3000` y pausa de estabilización `G4 P0.5`.
* **Auto-Home entre dibujos en lote**: En trabajos con múltiples imágenes, referencia suavemente a origen antes de comenzar el siguiente dibujo.
* **Ciclo de Microswitches ($H)**: Añade el ciclo físico de finales de carrera para máquinas equipadas con interruptores de fin de carrera físicos.

#### Simulación Virtual del Trazado
* Presiona `▶ Simulate Trace` para ver cómo se moverá el cabezal sobre la mesa antes de encender el láser físico.
* Una **pluma virtual roja** con resplandor térmico dinámico recorrerá las trayectorias de corte en tiempo real mientras el botón pasa a `⏹ Stop Simulation`.

#### Exportación con Diálogos Nativos de Linux
* Puedes exportar en cualquier momento haciendo clic en:
  * `💾 Save .GCode`: Guarda el archivo con extensión `.gcode`.
  * `.NC`: Exporta directamente con extensión estándar CNC `.nc`.
  * `👁️ View Code`: Abre el inspector de código en pantalla con conteo de líneas y botón de copiado directo al portapapeles (`📋 Copy G-Code`).
* La aplicación llama al diálogo nativo de GNOME / GTK para que guardes el archivo en cualquier carpeta del sistema de archivos con nombre sugerido y confirmación de sobreescritura.

---

### 6. Conexión USB y Permisos en Linux

Si vas a conectar tu máquina Creality Falcon por cable USB a la computadora, añade tu usuario al grupo `dialout` para tener acceso de lectura/escritura sobre el puerto serie (`/dev/ttyACM0` o `/dev/ttyUSB0`):

```bash
sudo usermod -a -G dialout $USER
```
*(Reinicia la sesión del usuario para que los cambios de grupo surtan efecto).*

---

### 7. Estructura del Proyecto

```text
falcon_laser_v3/
├── Falcon-Studio-v3.desktop  # Lanzador de escritorio para entornos Linux GNOME/KDE/XFCE
├── falcon_studio             # Script bash ejecutable principal
├── falcon_app.py             # Aplicación de escritorio GTK 3.0 + WebKitGTK y servidor loopback
├── falcon_engine.py          # Motor matemático de procesamiento de imagen y generación G-code
├── icon.png                  # Icono oficial de la aplicación
├── README.md                 # Documentación bilingüe completa (English & Español)
└── ui/
    ├── index.html            # Interfaz gráfica bilingüe con soporte semántico
    ├── style.css             # Hoja de estilos con tema oscuro y diseño responsivo
    └── app.js                # Lógica del cliente, renderizador Canvas 2D, parser y traductor i18n
```

---

### 8. Solución de Problemas (Troubleshooting)

1. **`ValueError: Namespace WebKit2 not available`**:
   Indica que no tienes instalado el paquete de WebKitGTK en tu sistema.
   * Ejecuta: `sudo apt install gir1.2-webkit2-4.1` (o `gir1.2-webkit2-4.0` en versiones previas).
2. **Permiso denegado al ejecutar `./falcon_studio`**:
   Asegúrate de que los scripts tengan permisos de ejecución:
   ```bash
   chmod +x falcon_studio falcon_app.py
   ```
3. **Las fuentes o botones se ven muy pequeños en pantallas 4K / HiDPI**:
   WebKitGTK respeta el escalado de tu entorno de escritorio. Puedes forzar el escalado de GTK antes de iniciar:
   ```bash
   GDK_SCALE=1 GDK_DPI_SCALE=1.2 ./falcon_studio
   ```
4. **El archivo G-Code generado no se guarda con el diálogo nativo**:
   Si por alguna razón la librería GTK no abre el diálogo en tu gestor de ventanas, la aplicación detectará el evento y realizará automáticamente una descarga a través de tu carpeta de descargas del sistema como fallback seguro.

---

## 📜 Licencia & Créditos

Desarrollado como parte de la suite **LaserGRBL / Falcon Laser Suite** para Linux. Optimizado para controladoras CNC basadas en GRBL 1.1 y grabadoras láser de diodo Creality Falcon.
