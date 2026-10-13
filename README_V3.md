# Falcon G-Code Studio v3 (Creality Falcon Laser)
### Suite Nativa de Escritorio para Linux • Composición Multi-Imagen & Generador de G-Code

**Falcon G-Code Studio v3** es una aplicación de escritorio nativa para Linux diseñada específicamente para las máquinas de corte y grabado CNC Láser **Creality Falcon** (modelos de 5W, 10W, 22W, 40W y controladoras GRBL 1.1) con área de trabajo de **400 × 400 mm**.

La versión 3 reemplaza entornos web externos y arquitecturas pesadas por una **aplicación nativa en GTK 3.0 con aceleración gráfica por hardware WebKitGTK**, incorporando gestión multi-imagen sobre la mesa de trabajo, visualización y análisis de archivos G-Code importados, biblioteca de materiales para diodo de 450nm, simulación virtual de trazado y soporte **bilingüe completo (Inglés por defecto con cambio instantáneo a Español)**.

---

## 📑 Tabla de Contenidos

1. [Novedades en la Versión 3](#-novedades-en-la-versión-3)
2. [Soporte Bilingüe (Inglés / Español)](#-soporte-bilingüe-inglés--español)
3. [Requisitos del Sistema e Instalación](#-requisitos-del-sistema-e-instalación)
4. [Cómo Iniciar la Aplicación](#-cómo-iniciar-la-aplicación)
5. [Guía de Uso y Funcionalidades](#-guía-de-uso-y-funcionalidades)
   - [Mesa de Trabajo Interactiva 2D (400 × 400 mm)](#1-mesa-de-trabajo-interactiva-2d-400--400-mm)
   - [Composición Multi-Imagen & Menú de Capas](#2-composición-multi-imagen--menú-de-capas)
   - [Modo G-Code Importado & Telemetría](#3-modo-g-code-importado--telemetría)
   - [Calidad de Grabado y Algoritmos](#4-calidad-de-grabado-y-algoritmos)
   - [Biblioteca de Materiales & Potencia](#5-biblioteca-de-materiales--potencia)
   - [Calibración Auto-Home & Finales de Carrera ($H)](#6-calibración-auto-home--finales-de-carrera-h)
   - [Simulación Virtual del Trazado](#7-simulación-virtual-del-trazado)
   - [Exportación con Diálogos Nativos de Linux](#8-exportación-con-diálogos-nativos-de-linux)
6. [Permisos de Conexión USB en Linux](#-permisos-de-conexión-usb-en-linux)
7. [Estructura del Proyecto](#-estructura-del-proyecto)
8. [Solución de Problemas (Troubleshooting)](#-solución-de-problemas-troubleshooting)

---

## 🌟 Novedades en la Versión 3

Comparado con las versiones V1 y V2, la versión 3 introduce mejoras sustanciales:

| Característica | Versión 2 (Flutter) | Versión 3 (Falcon Studio v3) |
| :--- | :--- | :--- |
| **Arquitectura** | Flutter Desktop / Web | **GTK 3.0 + WebKitGTK Acelerado (Nativo)** |
| **Idioma de la UI** | Fijo en Español | **Inglés por defecto con selector dinámico a Español (EN / ES)** |
| **Imágenes en Mesa** | 1 imagen a la vez | **Multi-imagen simultánea con menú de capas individual** |
| **Manipulación en Cama** | Solo visualización | **Arrastre directo con ratón y tiradores de esquina para redimensionar** |
| **Archivos G-Code** | Visualizador básico | **Parser completo con telemetría, re-centrado y alineación a (0,0)** |
| **Seguridad de Mesa** | Sin aviso visual | **Detección automática de límites (Out of Bounds) para 400×400 mm** |
| **Guardado de Archivos** | Descarga en navegador | **Diálogo nativo GTK FileChooserDialog del sistema Linux** |
| **Perfiles de Materiales** | Presets básicos | **13 perfiles calibrados para diodo 450nm + Perfiles personalizados de usuario** |
| **Auto-Home ($H)** | Botón manual | **Opciones configurables por lote: fin de trabajo, entre imágenes y ciclo $H** |

---

## 🌐 Soporte Bilingüe (Inglés / Español)

La interfaz de usuario está configurada en **Inglés por defecto** y cuenta con un selector de idioma de acceso rápido ubicado en la cabecera superior:

* **`[ EN ]` (English)**: Idioma predeterminado del sistema.
* **`[ ES ]` (Español)**: Conmutación inmediata en un solo clic.

### Características del Sistema de Idioma:
1. **Cambio en Caliente (Sin Recarga)**: Todo el texto del UI (botones, menús, leyendas, opciones desplegables, tarjetas de especificaciones y diálogos de alerta) se traduce en tiempo real sin reiniciar el trabajo en curso ni perder las imágenes colocadas en la mesa.
2. **Persistencia Automática**: La preferencia elegida se almacena en `localStorage` (`falcon_laser_lang`), manteniendo el idioma seleccionado entre sesiones.
3. **Diálogos de Archivos Nativos Sincronizados**: El diálogo nativo de Linux (`Gtk.FileChooserDialog`) adopta el título y los filtros según el idioma activo (`Save G-Code File` o `Guardar Archivo G-Code`).

---

## 📦 Requisitos del Sistema e Instalación

Falcon G-Code Studio v3 corre de forma ligera en distribuciones Linux estándar con entorno gráfico X11 o Wayland.

### 1. Dependencias del Sistema

#### En Ubuntu / Debian / Linux Mint / Pop!_OS:
```bash
sudo apt update
sudo apt install -y python3 python3-pip python3-pil python3-numpy \
                    python3-gi gir1.2-gtk-3.0 gir1.2-webkit2-4.1
```
> *Nota*: Si tu sistema utiliza una versión anterior de WebKitGTK (Ubuntu 20.04), instala `gir1.2-webkit2-4.0`. El lanzador `falcon_app.py` detecta y enlaza automáticamente ambas versiones.

#### En Arch Linux / Manjaro:
```bash
sudo pacman -S python python-pillow python-numpy gtk3 webkit2gtk
```

#### En Fedora / RHEL:
```bash
sudo dnf install -y python3 python3-pillow python3-numpy gtk3 webkit2gtk4.1
```

---

## 🚀 Cómo Iniciar la Aplicación

Tienes 3 métodos sencillos para ejecutar la suite:

### Método 1: Lanzador de Terminal (Recomendado)
Abre un terminal en la carpeta `falcon_laser_v3` y ejecuta:
```bash
./falcon_studio
```

### Método 2: Acceso Directo de Escritorio
Puedes copiar el archivo `.desktop` a tu menú de aplicaciones de Linux:
```bash
cp Falcon-Studio-v3.desktop ~/.local/share/applications/
update-desktop-database ~/.local/share/applications/
```
Aparecerá en tu menú de aplicaciones bajo la categoría de **Gráficos** y **Herramientas de Ingeniería** con el nombre **Falcon G-Code Studio v3**.

### Método 3: Ejecución Directa en Python
```bash
python3 falcon_app.py
```

---

## 🛠️ Guía de Uso y Funcionalidades

### 1. Mesa de Trabajo Interactiva 2D (400 × 400 mm)
* **Cuadrícula Milimétrica**: Muestra el área física real de la Creality Falcon (400 × 400 mm) con subdivisiones mayores cada 50 mm y origen físico `(0,0)` en la esquina inferior izquierda.
* **Control de Vista**:
  * **Zoom**: Usa la rueda del ratón o los botones `[ ➕ ]` / `[ ➖ ]`.
  * **Desplazamiento (Pan)**: Haz clic y arrastra sobre cualquier zona vacía de la mesa.
  * **Centrar Mesa (`Center Bed`)**: Restablece el encuadre óptimo instantáneamente.
* **Coordenadas en Vivo**: Muestra la posición del cursor milimétrico en tiempo real en la leyenda inferior.

### 2. Composición Multi-Imagen & Menú de Capas
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

### 3. Modo G-Code Importado & Telemetría
* Puedes arrastrar o importar archivos existentes con extensiones `.gcode`, `.nc`, `.gc`, `.tap` o `.txt`.
* El visor interpreta el archivo y dibuja en pantalla:
  * **Líneas discontinuas en cian**: Movimientos rápidos sin láser (`G0`).
  * **Líneas continuas en naranja**: Trayectorias activas de quemado/corte (`G1`, `G2`, `G3`).
* **Alineación de G-Code**: Botones dedicados para reubicar trabajos antiguos:
  * `↙ Align to (0,0)`: Desplaza todo el código G para que inicie en el origen físico.
  * `⌖ Center Bed`: Centra todo el archivo en la mesa de 400×400 mm.
* **Telemetría**: Cálculo en vivo de dimensiones efectivas, cantidad de líneas de comando, potencia mínima y máxima (`S`), distancia de corte en metros y tiempo estimado de ejecución.

### 4. Calidad de Grabado y Algoritmos
La versión 3 incluye el motor de procesamiento de imagen de alto rendimiento `FalconImageGcodeGenerator`:
1. **Atkinson Dithering**: Algoritmo óptimo para madera y materiales orgánicos. Conserva detalles finos de rostros y texturas sin saturar los negros.
2. **Floyd-Steinberg**: Difusión de error balanceada para degradados suaves y sombras fotográficas.
3. **Escala de Grises (Grayscale)**: Modula continuamente la potencia del láser `S` según la tonalidad del píxel mediante modo dinámico `M4`.
4. **Blanco y Negro Puro (Threshold)**: Ideal para cortes limpios de siluetas, tipografías y logotipos vectoriales convertidos a mapa de bits.
5. **Ajustes Ópticos**: Brillo, contraste, inversión a negativo (necesario para metales y superficies oscuras) y resolución seleccionable entre `4 l/mm`, `6 l/mm` (estándar), `8 l/mm` y `10 l/mm`.

### 5. Biblioteca de Materiales & Potencia
* **Selector de Potencia Óptica del Cabezal**: Permite elegir entre `5W` (diodo estándar), `10W` (diodo dual) o `22W / 40W` (alta potencia), escalando automáticamente las velocidades recomendadas de avance.
* **13 Perfiles Predeterminados Calibrados para 5W**:
  * 🪵 *Madera*: Grabado fotográfico detallado, grabado rápido de logos, corte limpio de balsa 2mm, corte contrachapado (plywood) 3mm.
  * 🧵 *Tela*: Corte fino de algodón/seda, grabado y decolorado de tela vaquera (denim/jeans).
  * 📄 *Papel y Cartón*: Corte de precisión en papel 80g, corte de cartulina 250g, corte de cartón corrugado 3-4mm.
  * 🧴 *Plásticos*: Grabado mate de alto contraste sobre acrílico oscuro.
  * ⚡ *Electrónica & PCBs*: Grabado directo en placa de baquelita / FR2, ablación de máscara de esmalte para corrosión de pistas en cobre.
  * 🔘 *Metales*: Marcado blanco brillante en aluminio anodizado negro.
* **Perfiles Personalizados**: Guarda tus propios parámetros con el botón `💾 Save Profile` y gestiónalos en la sección de perfiles guardados.

### 6. Calibración Auto-Home & Finales de Carrera ($H)
Para evitar pérdidas de pasos y colisiones con los marcos de la máquina:
* **Auto-Home al finalizar trabajo**: Garantiza que el cabezal regrese a `(0,0)` de manera controlada con avance seguro `F3000` y pausa de estabilización `G4 P0.5`.
* **Auto-Home entre dibujos en lote**: En trabajos con múltiples imágenes, referencia suavemente a origen antes de comenzar el siguiente dibujo.
* **Ciclo de Microswitches ($H)**: Añade el ciclo físico de finales de carrera para máquinas equipadas con interruptores de fin de carrera físicos.

### 7. Simulación Virtual del Trazado
* Presiona `▶ Simulate Trace` para ver cómo se moverá el cabezal sobre la mesa antes de encender el láser físico.
* Una **pluma virtual roja** con resplandor térmico dinámico recorrerá las trayectorias de corte en tiempo real mientras el botón pasa a `⏹ Stop Simulation`.

### 8. Exportación con Diálogos Nativos de Linux
* Puedes exportar en cualquier momento haciendo clic en:
  * `💾 Save .GCode`: Guarda el archivo con extensión `.gcode`.
  * `.NC`: Exporta directamente con extensión estándar CNC `.nc`.
  * `👁️ View Code`: Abre el inspector de código en pantalla con conteo de líneas y botón de copiado directo al portapapeles (`📋 Copy G-Code`).
* La aplicación llama al diálogo nativo de GNOME / GTK para que guardes el archivo en cualquier carpeta del sistema de archivos con nombre sugerido y confirmación de sobreescritura.

---

## 🔌 Permisos de Conexión USB en Linux

Si vas a conectar tu máquina Creality Falcon por cable USB a la computadora, añade tu usuario al grupo `dialout` para tener acceso de lectura/escritura sobre el puerto serie (`/dev/ttyACM0` o `/dev/ttyUSB0`):

```bash
sudo usermod -a -G dialout $USER
```
*(Reinicia la sesión del usuario para que los cambios de grupo surtan efecto).*

---

## 📁 Estructura del Proyecto

```text
falcon_laser_v3/
├── Falcon-Studio-v3.desktop  # Lanzador de escritorio para entornos Linux GNOME/KDE/XFCE
├── falcon_studio             # Script bash ejecutable principal
├── falcon_app.py             # Aplicación de escritorio GTK 3.0 + WebKitGTK y servidor loopback
├── falcon_engine.py          # Motor matemático de procesamiento de imagen y generación G-code
├── icon.png                  # Icono oficial de la aplicación
├── README.md                 # Esta documentación completa
└── ui/
    ├── index.html            # Interfaz gráfica bilingüe con soporte semántico
    ├── style.css             # Hoja de estilos con tema oscuro y diseño responsivo
    └── app.js                # Lógica del cliente, renderizador Canvas 2D, parser y traductor i18n
```

---

## ❓ Solución de Problemas (Troubleshooting)

### 1. `ValueError: Namespace WebKit2 not available`
Indica que no tienes instalado el paquete de WebKitGTK en tu sistema.
* Ejecuta: `sudo apt install gir1.2-webkit2-4.1` (o `gir1.2-webkit2-4.0` en versiones previas).

### 2. Permiso denegado al ejecutar `./falcon_studio`
Asegúrate de que los scripts tengan permisos de ejecución:
```bash
chmod +x falcon_studio falcon_app.py
```

### 3. Las fuentes o botones se ven muy pequeños en pantallas 4K / HiDPI
WebKitGTK respeta el escalado de tu entorno de escritorio. Puedes forzar el escalado de GTK antes de iniciar:
```bash
GDK_SCALE=1 GDK_DPI_SCALE=1.2 ./falcon_studio
```

### 4. El archivo G-Code generado no se guarda con el diálogo nativo
Si por alguna razón la librería GTK no abre el diálogo en tu gestor de ventanas, la aplicación detectará el evento y realizará automáticamente una descarga a través de tu carpeta de descargas del sistema como fallback seguro.

---

## 📜 Licencia & Créditos

Desarrollado como parte de la suite **LaserGRBL / Falcon Laser Suite** para Linux. Optimizado para controladoras CNC basadas en GRBL 1.1 y grabadoras láser de diodo Creality Falcon.
