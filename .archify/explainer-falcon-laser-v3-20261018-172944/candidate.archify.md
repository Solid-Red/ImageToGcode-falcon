# Funcionamiento y Arquitectura de Falcon G-Code Studio v3 {#falcon-laser-v3-analisis}

Falcon G-Code Studio v3 es una aplicación de escritorio nativa para Linux desarrollada en GTK 3.0 y WebKitGTK. Su arquitectura combina un compositor interactivo de mesa de trabajo de 400 × 400 mm, un motor matemático de tramado y vectorización, telemetría de trayectorias y generación de G-code para máquinas Creality Falcon.

- La arquitectura híbrida elimina dependencias pesadas mediante WebKitGTK con aceleración por hardware y un servidor local embebido.
- El motor matemático soporta grabado raster mediante modulación M4 y corte vectorial con optimización TSP para minimizar desplazamientos en vacío.
- La mesa de trabajo permite componer múltiples imágenes simultáneas con manipulación de capas, recorte y detección de límites de seguridad.
- La exportación se comunica directamente con el sistema de archivos de Linux mediante diálogos nativos Gtk.FileChooserDialog.

@answer scope="Falcon G-Code Studio v3 · Python 3 · GTK 3.0 · WebKitGTK · NumPy · Pillow · GRBL 1.1"
@meta locale=es

@source app title="Lanzador GTK y Servidor Embebido" path=falcon_app.py lines=43:153
@source engine title="Motor de Procesamiento Raster" path=falcon_engine.py lines=16:84
@source vector title="Algoritmos Vectoriales y TSP" path=falcon_engine.py lines=532:630
@source ui title="Compositor Canvas y Telemetría" path=ui/app.js lines=2472:2560

## ¿Cómo interactúan los componentes de la aplicación? {#arquitectura-sistema}

@architecture id=arch-falcon title="Mapa de componentes de Falcon Studio v3"
| user | Operador | frontend |
| ui | Interfaz WebKit | frontend |
| srv | Servidor Local | backend |
| engine | Falcon Engine | backend |
| dialog | Diálogo GTK | security |
| file | Archivo G-Code | database |
| cnc | Máquina Falcon | external |
| user > ui | Edición |
| ui > srv | Peticiones |
| srv > engine | Algoritmos |
| srv > dialog | Guardado |
| dialog > file | Escritura |
| file > cnc | Grabado |

## ¿Cómo se transforma una imagen en trayectorias G-Code? {#pipeline-gcode}

@workflow id=flow-gcode title="Pipeline de conversión de imagen a código G"
| input | Imagen en Mesa | frontend |
| filters | Filtros de Imagen | backend |
| mode | ¿Es Corte Vectorial? | backend |
| raster | Tramado y Potencia M4 | backend |
| vector | Marching Squares y Skeleton | backend |
| tsp | Simplificación y TSP | backend |
| gcode | G-Code y Auto-Home | backend |
| input > filters | Ajustes |
| filters > mode | Selección |
| mode > vector | Sí | emphasis |
| mode > raster | No |
| vector > tsp | Polilíneas |
| tsp > gcode | Rutas óptimas |
| raster > gcode | Líneas de barrido |

@steps id=steps-gcode
| s1 | Imagen en Mesa | Se carga y posiciona la imagen en el canvas interactivo con resolución configurable. | flow-gcode | input |
| s2 | Filtros de Imagen | Se aplican ajustes de brillo, contraste, gamma e inversión de color en tiempo real. | flow-gcode | filters |
| s3 | ¿Es Corte Vectorial? | Se bifurca el proceso según el modo de trabajo elegido: barrido raster o seguimiento. | flow-gcode | mode |
| s4 | Tramado y Potencia M4 | En modo barrido se ejecuta tramado Atkinson o escala de grises con modulación M4. | flow-gcode | raster |
| s5 | Marching Squares y Skeleton | En modo vectorial se extraen contornos cerrados o líneas centrales de 1 píxel. | flow-gcode | vector |
| s6 | Simplificación y TSP | Ramer-Douglas-Peucker reduce vértices y el algoritmo TSP minimiza movimientos en vacío G0. | flow-gcode | tsp |
| s7 | G-Code y Auto-Home | Se emite el archivo final con coordenadas absolutas, avances F y secuencias de retorno Home. | flow-gcode | gcode |

## ¿Cómo funciona el ciclo de guardado nativo en Linux? {#secuencia-guardado}

@sequence id=seq-save title="Secuencia de exportación con diálogo nativo GTK"
| actor ui | Interfaz WebKit | frontend |
| actor srv | Servidor HTTP | backend |
| actor main | Hilo Principal GTK | backend |
| actor fs | Sistema de Archivos | database |
| ui | srv | POST /api/generate_gcode |
| srv | ui | 200 OK con código y telemetría | return |
| ui | srv | POST /api/native_save_file |
| srv | main | GLib.idle_add(ask_save_on_main) |
| main | ui | Abre Gtk.FileChooserDialog nativo | emphasis |
| main | srv | Retorna ruta seleccionada por el usuario | return |
| srv | fs | Escribe archivo .gcode directamente |
| srv | ui | 200 OK con confirmación y ruta | return |

## ¿Qué técnicas de conversión ofrece el motor matemático? {#tecnicas-motor}

| Algoritmo | Tipo de Proceso | Uso Recomendado | Características Técnicas |
| --- | --- | --- | --- |
| Atkinson Dithering | Raster {good:Fotografía} | Retratos en madera, corcho y cuero | Difusión de error de 8 direcciones sin saturar sombras |
| Floyd-Steinberg | Raster {good:Gradientes} | Sombras fotográficas suaves | Difusión de error estándar de 4 coeficientes |
| Escala de Grises | Raster {good:Relieve} | Grabado 3D y materiales sensibles | Modulación continua de potencia S0-S1000 con M4 |
| Umbral Blanco/Negro | Raster {good:Logotipos} | Siluetas, sellos y tipografías planas | Binarización limpia a corte o grabado pleno |
| Marching Squares | Vector {good:Corte Contorno} | Corte exterior e interior de piezas | Detección de isolíneas con deduplicación de gemelos |
| Skeleton / Adelgazado | Vector {good:Marcado Línea} | Dibujos lineales y grabado rápido | Reducción morfológica a líneas centrales de 1 píxel |

## Fortalezas y recomendaciones de mantenimiento {#recomendaciones}

- [ ] La separación de responsabilidades entre el compositor Canvas y el motor NumPy garantiza alta velocidad de respuesta.
- [ ] La optimización TSP en trayectorias vectoriales reduce significativamente los tiempos de quemado y el desgaste mecánico.
- [ ] Se recomienda sustituir la apertura y cierre de socket efímero en `start_internal_server` por enlace directo al puerto 0 de `ThreadingHTTPServer`.
- [ ] Es conveniente añadir un selector de tasa de baudios en caso de integrar control serial directo USB (`/dev/ttyUSB0`) en futuras versiones.
- [ ] El soporte bilingüe en caliente (inglés/español) está completamente sincronizado tanto en la web como en los diálogos nativos GTK.
