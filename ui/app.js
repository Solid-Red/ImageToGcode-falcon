/* ============================================================
   FALCON G-CODE STUDIO v3 - CLIENT JAVASCRIPT (NATIVE LINUX)
   Multi-Image Composition & Bed Management (400 × 400 mm)
   Bilingual Support (English Default & Spanish Option)
   Integration with Native GTK 3.0 Dialogs
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  // ============================================================
  // I18N / DICCIONARIO DE IDIOMAS (ENGLISH DEFAULT & SPANISH)
  // ============================================================
  const translations = {
    en: {
      brandSubtitle: "Linux Native Desktop App • Creality Falcon (400 × 400 mm)",
      btnImportGcodeTop: "📂 Import G-Code",
      btnImportGcodeTopTitle: "Import .gcode or .nc file to bed",
      btnGenerateGcodeTop: "⚡ Generate G-Code",
      btnGenerateGcodeTopTitle: "Generate G-Code with active images on bed",
      btnExportGcodeTop: "💾 Export .gcode",
      btnExportGcodeTopTitle: "Save with native Linux dialog",
      btnExportNcTopTitle: "Export with .nc extension",
      statPosWorkLabel: "Active Position",
      statPosWorkSub: "Falcon Area: 400 × 400 mm",
      statDimensionsLabel: "Selected Design",
      statResolutionDefault: "Resolution: 6 l/mm",
      statLaserPowerLabel: "Laser Power",
      statFeedRateLabel: "Feed & Passes",
      statPassesDefault: "1 Pass",
      statGcodeLinesLabel: "G-Code Status",
      statGcodeLinesDefault: "0 lines",
      statEstTimeDefault: "Est. time: --",
      bedTitle: "📐 Creality Falcon Work Bed (400 × 400 mm)",
      bedHint: "Drag to move • Pull corners to resize • Supports multiple images",
      zoomInTitle: "Zoom in",
      zoomOutTitle: "Zoom out",
      btnResetView: "Center Bed",
      btnResetViewTitle: "Reset bed view",
      bedBadgeText: "images to engrave",
      outOfBoundsWarningDefault: "⚠️ Warning! The design exceeds the bed limits (400 × 400 mm)",
      legendOrigin: "Origin (0,0)",
      legendActiveImg: "Active Image",
      legendGcode: "Generated/Loaded G-Code",
      legendPen: "Virtual Pen",
      toolbarAlignLabel: "Quick Alignment:",
      btnAlignBottomLeft: "↙ Origin (0,0)",
      btnAlignBottomLeftTitle: "Place active image at origin (0,0)",
      btnAlignCenter: "⌖ Center",
      btnAlignCenterTitle: "Center active image on bed (400x400 mm)",
      btnAlignTopLeft: "↖ Top-Left",
      btnAlignTopLeftTitle: "Place at top-left",
      btnAlignBottomRight: "↘ Bottom-Right",
      btnAlignBottomRightTitle: "Place at bottom-right",
      jobStatusWaiting: "Waiting for generation",
      jobInfoLinesDefault: "0 lines of code",
      jobInfoTimeDefault: "Est. time: 0m 0s",
      btnMainGenerate: "⚡ GENERATE G-CODE",
      btnMainGenerateTitle: "Generate G-Code for all images marked with 🖨️",
      btnSimulateTrace: "▶ Simulate Trace",
      btnSimulateTraceTitle: "Virtually simulate laser trace over the bed",
      btnExportGcodeMain: "💾 Save .GCode",
      btnExportGcodeMainTitle: "Export and save with native dialog",
      btnExportNcMainTitle: "Export .NC file for CNC",
      btnViewGcodeMain: "👁️ View Code",
      btnViewGcodeMainTitle: "Inspect G-Code",
      tabImageSettingsBtn: "🖼️ Images & Bed",
      tabLaserSettingsBtn: "⚡ Power & Materials",
      btnModeImage: "🖼️ Images to G-Code",
      btnModeGcode: "📂 Imported G-Code",
      gcodeDropPrompt: "📂 <strong>Load G-Code File</strong> or drag here",
      gcodeDropSub: ".GCODE, .NC, .GC, .TAP, .TXT",
      btnUnloadGcodeTitle: "Remove G-Code from bed",
      lblGcodeDimensions: "📐 Dimensions:",
      lblGcodeLines: "📊 Lines:",
      lblGcodeOrigin: "📍 Origin:",
      lblGcodeLaserPower: "⚡ Laser Power:",
      lblGcodeCutDist: "📏 Cut Distance:",
      lblGcodeEstTime: "⏱️ Estimated Time:",
      gcodeActionsTitle: "Bed Positioning (400×400 mm):",
      btnGcodeShiftOrigin: "↙ Align to (0,0)",
      btnGcodeShiftOriginTitle: "Align to (0,0)",
      btnGcodeCenterBed: "⌖ Center Bed",
      btnGcodeCenterBedTitle: "Center G-code on bed",
      btnGcodeExportCard: "💾 Save",
      btnGcodeExportCardTitle: "Save this G-Code file",
      btnViewGcodeModal: "👁️ View Code",
      btnViewGcodeModalTitle: "Inspect code lines",
      imgDropPrompt: "📁 <strong>Load / Add Images</strong> or drag here",
      imgDropSub: "Drag one or multiple images at once (PNG, JPG, BMP, WEBP)",
      imgLayersTitle: "🖼️ Bed Images Menu",
      btnAddMoreImages: "➕ Add",
      btnAddMoreImagesTitle: "Add more images to bed",
      btnClearAllImages: "🗑️ Clear",
      btnClearAllImagesTitle: "Remove all images from bed",
      imgLayersHint: "Check 🖨️ to include in engraving or uncheck to skip. Click to select and move.",
      emptyImagesHint: "No images on bed. Load or drag one or multiple images.",
      posImgBoxTitle: "📍 Position:",
      selectedImageBadge: "Selected",
      lblPosImgX: "X Position (mm):",
      lblPosImgY: "Y Position (mm):",
      dimBoxTitle: "📏 Engraving Size (mm)",
      btnLockAspect: "🔒 Aspect",
      btnLockAspectTitle: "Lock aspect ratio",
      lblDimWidth: "Width (mm):",
      lblDimHeight: "Height (mm):",
      lblScale: "Scale:",
      btnFitBed: "Max",
      btnFitBedTitle: "Fit to maximum bed size",
      qualityBoxTitle: "⚙️ Conversion & Engraving Quality",
      lblAlgoSelect: "Engraving Method:",
      optAlgoAtkinson: "Atkinson Dithering (Crisp wood)",
      optAlgoFs: "Floyd-Steinberg (Smooth gradients)",
      optAlgoGrayscale: "Grayscale (Variable power S)",
      optAlgoThreshold: "Pure Black & White (Cut/Silhouette)",
      lblLinesPerMm: "Resolution:",
      optLines4: "4 l/mm (Fast draft)",
      optLines6: "6 l/mm (Balanced standard)",
      optLines8: "8 l/mm (High definition)",
      optLines10: "10 l/mm (Ultra-fine detail)",
      lblBrightness: "Brightness",
      lblContrast: "Contrast",
      chkInvertLabel: "Invert Colors (Negative - for dark materials/metal)",
      autoHomeTitle: "🏠 Auto-Home & Limit Switches ($H)",
      autoHomeTag: "Active Calibration",
      chkAutoHomeEndLabel: "<strong>Auto-Home on job completion</strong> (Calibrates to Home 0,0)",
      chkAutoHomeBetweenLabel: "<strong>Auto-Home after each drawing</strong> (In multi-image batch)",
      chkHardwareHomingLabel: "<strong style=\"color: var(--laser-cyan);\">Limit switches cycle ($H) active</strong> (Runs calibrated $H without forcing start)",
      autoHomeHint: "💡 <strong>Always starts from Home (0,0):</strong> The cycle <code>$H</code> references limit switches without hitting rails and resynchronizes coordinates after each engraving.",
      btnGenerateGcodeSide: "⚡ Generate G-Code for this Position",
      btnExportGcodeSide: "💾 Save .GCODE File",
      btnExportGcodeSideTitle: "Save with native Linux dialog",
      btnExportNcSideTitle: "Export .NC (Universal CNC)",
      machineWattTitle: "⚡ Machine Optical Power",
      optWatt5w: "Creality Falcon 5W (Your current machine)",
      optWatt10w: "Creality Falcon 10W (Dual Diode)",
      optWatt22w: "Creality Falcon 22W / 40W (High Power)",
      materialProfilesTitle: "📚 Material Profiles & Power",
      btnSaveCustomProfile: "💾 Save Profile",
      btnSaveCustomProfileTitle: "Save current settings as new profile",
      btnDeleteCustomProfile: "🗑️ Delete",
      btnDeleteCustomProfileTitle: "Delete this custom profile",
      matPowerLbl: "Power:",
      matSpeedLbl: "Speed:",
      matPassesLbl: "Passes:",
      matModeLbl: "Laser Mode:",
      manualSettingsTitle: "🎛️ Manual Laser Power Settings",
      lblMinPower: "Minimum Power (S):",
      lblMaxPower: "Maximum Power (S):",
      lblLaserMode: "GRBL Laser Mode:",
      optModeM4: "M4 (Dynamic - scales with speed)",
      optModeM3: "M3 (Constant - fixed power)",
      lblSpeedEngrave: "Engraving Speed (mm/min):",
      lblPassCount: "Cut Passes:",
      modalGcodeTitle: "📄 G-Code Inspection",
      btnCopyGcode: "📋 Copy G-Code",
      btnModalDownloadGcode: "💾 Save File",

      // Dynamic JS strings & messages
      noneSelected: "(None selected)",
      toEngraveBadge: "🖨️ To Engrave",
      skippedBadge: "Skipped",
      aspectLocked: "🔒 Aspect",
      aspectFree: "🔓 Free",
      inBatch: "in batch",
      activeCountLabel: "active",
      resolution: "Resolution",
      points: "Points",
      lines: "lines",
      passSingular: "Pass",
      passPlural: "Passes",
      pendingGen: "Pending generation",
      estTime: "Est. time",
      layerActive: "ACTIVE",
      layerIgnored: "SKIPPED",
      layerPrintToggleTitle: "Include or skip in laser engraving",
      deleteImageTitle: "Remove this image from bed",
      confirmClearAll: "Do you want to remove all images from the work bed?",
      emptyGcodeFile: "The selected G-Code file is empty.",
      outOfBoundsGcode: (b) => `⚠️ Warning! G-Code exceeds bed (400×400): X [${b.minX.toFixed(1)} to ${b.maxX.toFixed(1)} mm], Y [${b.minY.toFixed(1)} to ${b.maxY.toFixed(1)} mm].`,
      outOfBoundsImg: (name) => `⚠️ Warning! Image "${name}" exceeds the physical bed limits (400 × 400 mm)`,
      customProfilesCategory: "⭐ My Custom Profiles",
      customProfileCut: "✂️ [CUT]",
      customProfileEngrave: "🎨 [ENGRAVE]",
      promptProfileName: "Enter a name for this material profile:",
      alertProfileSaved: (name) => `✅ Profile '${name}' saved successfully.`,
      confirmDeleteProfile: "Do you want to delete this custom profile?",
      alertNoImages: "⚠️ No images placed on the work bed.\n\nPlease load or drag images first.",
      alertNoActiveImages: "⚠️ No images are selected for engraving in the menu.\n\nPlease check the 🖨️ box in the Images Menu for the ones you wish to engrave.",
      btnGeneratingHero: "⏳ GENERATING G-CODE...",
      btnGeneratingSide: "⏳ Generating G-Code...",
      btnGeneratingTop: "⏳ Generating...",
      calculatingBadge: "Calculating algorithm...",
      gcodeReadyBadge: (count) => `G-Code Ready (${count} imgs)`,
      gcodeReadyShort: "G-Code Ready",
      alertGcodeSuccess: (activeCount, totalCount, lines, time) => `✅ Multi-image G-Code generated successfully!\n\n• Images included: ${activeCount} of ${totalCount}\n• Total lines of code: ${lines.toLocaleString()}\n• Estimated execution time: ${time}\n\nYou can now export it (.gcode / .nc) or simulate virtual tracing on the bed.`,
      stopSimulationBtn: "⏹ Stop Simulation",
      simulateTraceBtn: "▶ Simulate Trace",
      simulatingBadge: "Simulating Trace...",
      simulationCompletedBadge: "Simulation Completed",
      alertNeedGcodeForSim: "To simulate tracing, generate G-Code first or import a file onto the bed.",
      confirmGenBeforeExport: (count) => `You have not yet generated G-Code for the ${count} active image(s) on the bed.\n\nDo you want to generate the G-Code now to save it?`,
      alertNoImagesToExport: "⚠️ No active images to print or G-Code file loaded.\n\nPlease activate at least one image in the menu or import a file.",
      saveDialogTitle: "Save G-Code File",
      saveDialogFilterGcode: "G-Code Files (*.gcode, *.nc)",
      saveDialogFilterAll: "All Files (*.*)",
      savedBadge: (fname) => `💾 Saved: ${fname}`,
      alertSavedFile: (path) => `✅ G-Code file successfully saved on your system:\n\n${path}`,
      alertNoGcodeToView: "No G-Code file generated or loaded yet.",
      copiedBadge: "✅ Copied!",
      copyGcodeBtn: "📋 Copy G-Code"
    },
    es: {
      brandSubtitle: "Aplicación Nativa Linux • Creality Falcon (400 × 400 mm)",
      btnImportGcodeTop: "📂 Importar G-Code",
      btnImportGcodeTopTitle: "Importar archivo .gcode o .nc a la mesa",
      btnGenerateGcodeTop: "⚡ Generar G-Code",
      btnGenerateGcodeTopTitle: "Generar G-Code con las imágenes activas en la mesa",
      btnExportGcodeTop: "💾 Exportar .gcode",
      btnExportGcodeTopTitle: "Guardar con diálogo nativo de Linux",
      btnExportNcTopTitle: "Exportar con extensión .nc",
      statPosWorkLabel: "Posición Activa",
      statPosWorkSub: "Área Falcon: 400 × 400 mm",
      statDimensionsLabel: "Diseño Seleccionado",
      statResolutionDefault: "Resolución: 6 l/mm",
      statLaserPowerLabel: "Potencia Láser",
      statFeedRateLabel: "Avance & Pasadas",
      statPassesDefault: "1 Pasada",
      statGcodeLinesLabel: "Estado de G-Code",
      statGcodeLinesDefault: "0 líneas",
      statEstTimeDefault: "Tiempo est.: --",
      bedTitle: "📐 Mesa de Trabajo Creality Falcon (400 × 400 mm)",
      bedHint: "Arrastra para mover • Tira de esquinas para redimensionar • Soporta múltiples imágenes",
      zoomInTitle: "Acercar",
      zoomOutTitle: "Alejar",
      btnResetView: "Centrar Mesa",
      btnResetViewTitle: "Restablecer vista de la mesa",
      bedBadgeText: "imágenes para grabar",
      outOfBoundsWarningDefault: "⚠️ ¡Atención! El diseño excede los límites de la mesa (400 × 400 mm)",
      legendOrigin: "Origen (0,0)",
      legendActiveImg: "Imagen Activa",
      legendGcode: "G-Code Generado/Cargado",
      legendPen: "Pluma Virtual",
      toolbarAlignLabel: "Alineación Rápida:",
      btnAlignBottomLeft: "↙ Origen (0,0)",
      btnAlignBottomLeftTitle: "Colocar imagen activa en origen (0,0)",
      btnAlignCenter: "⌖ Centrar",
      btnAlignCenterTitle: "Centrar imagen activa en la mesa (400x400 mm)",
      btnAlignTopLeft: "↖ Arriba-Izq",
      btnAlignTopLeftTitle: "Colocar arriba a la izquierda",
      btnAlignBottomRight: "↘ Abajo-Der",
      btnAlignBottomRightTitle: "Colocar abajo a la derecha",
      jobStatusWaiting: "Esperando generación",
      jobInfoLinesDefault: "0 líneas de código",
      jobInfoTimeDefault: "Tiempo est.: 0m 0s",
      btnMainGenerate: "⚡ GENERAR G-CODE",
      btnMainGenerateTitle: "Generar G-Code para todas las imágenes marcadas con 🖨️",
      btnSimulateTrace: "▶ Simular Trazado",
      btnSimulateTraceTitle: "Simular virtualmente el trazado de la pluma sobre la mesa",
      btnExportGcodeMain: "💾 Guardar .GCode",
      btnExportGcodeMainTitle: "Exportar y guardar con selector nativo",
      btnExportNcMainTitle: "Exportar archivo .NC para CNC",
      btnViewGcodeMain: "👁️ Ver Código",
      btnViewGcodeMainTitle: "Inspeccionar código G-Code",
      tabImageSettingsBtn: "🖼️ Imágenes & Mesa",
      tabLaserSettingsBtn: "⚡ Potencia & Materiales",
      btnModeImage: "🖼️ Imágenes a G-Code",
      btnModeGcode: "📂 G-Code Importado",
      gcodeDropPrompt: "📂 <strong>Cargar Archivo G-Code</strong> o arrastrar aquí",
      gcodeDropSub: ".GCODE, .NC, .GC, .TAP, .TXT",
      btnUnloadGcodeTitle: "Quitar G-Code de la mesa",
      lblGcodeDimensions: "📐 Dimensiones:",
      lblGcodeLines: "📊 Líneas:",
      lblGcodeOrigin: "📍 Origen:",
      lblGcodeLaserPower: "⚡ Potencia Láser:",
      lblGcodeCutDist: "📏 Distancia Corte:",
      lblGcodeEstTime: "⏱️ Tiempo Estimado:",
      gcodeActionsTitle: "Posicionamiento en Mesa (400×400 mm):",
      btnGcodeShiftOrigin: "↙ Alinear a (0,0)",
      btnGcodeShiftOriginTitle: "Alinear a (0,0)",
      btnGcodeCenterBed: "⌖ Centrar Mesa",
      btnGcodeCenterBedTitle: "Centrar G-code en la mesa",
      btnGcodeExportCard: "💾 Guardar",
      btnGcodeExportCardTitle: "Guardar este archivo G-Code",
      btnViewGcodeModal: "👁️ Ver Código",
      btnViewGcodeModalTitle: "Inspeccionar líneas",
      imgDropPrompt: "📁 <strong>Cargar / Añadir Imágenes</strong> o arrastrar aquí",
      imgDropSub: "Arrastra una o varias imágenes a la vez (PNG, JPG, BMP, WEBP)",
      imgLayersTitle: "🖼️ Menú de Imágenes en Mesa",
      btnAddMoreImages: "➕ Añadir",
      btnAddMoreImagesTitle: "Añadir más imágenes a la mesa",
      btnClearAllImages: "🗑️ Vaciar",
      btnClearAllImagesTitle: "Quitar todas las imágenes de la mesa",
      imgLayersHint: "Marca 🖨️ para incluir en el grabado o desmárcala para omitirla. Clic para seleccionar y mover.",
      emptyImagesHint: "No hay imágenes en la mesa. Carga o arrastra una o varias imágenes.",
      posImgBoxTitle: "📍 Posición:",
      selectedImageBadge: "Seleccionada",
      lblPosImgX: "Posición X (mm):",
      lblPosImgY: "Posición Y (mm):",
      dimBoxTitle: "📏 Tamaño del Grabado (mm)",
      btnLockAspect: "🔒 Proporción",
      btnLockAspectTitle: "Bloquear proporción",
      lblDimWidth: "Ancho (mm):",
      lblDimHeight: "Alto (mm):",
      lblScale: "Escala:",
      btnFitBed: "Max",
      btnFitBedTitle: "Ajustar al tamaño máximo de la mesa",
      qualityBoxTitle: "⚙️ Conversión y Calidad de Grabado",
      lblAlgoSelect: "Método de Grabado:",
      optAlgoAtkinson: "Atkinson Dithering (Madera nítida)",
      optAlgoFs: "Floyd-Steinberg (Degradados suaves)",
      optAlgoGrayscale: "Escala de Grises (Potencia variable S)",
      optAlgoThreshold: "Blanco y Negro Puro (Corte/Silueta)",
      lblLinesPerMm: "Resolución:",
      optLines4: "4 l/mm (Borrador rápido)",
      optLines6: "6 l/mm (Estándar equilibrado)",
      optLines8: "8 l/mm (Alta definición)",
      optLines10: "10 l/mm (Detalle ultra fino)",
      lblBrightness: "Brillo",
      lblContrast: "Contraste",
      chkInvertLabel: "Invertir Colores (Negativo - para materiales oscuros/metal)",
      autoHomeTitle: "🏠 Auto-Home & Microswitches ($H)",
      autoHomeTag: "Calibración Activa",
      chkAutoHomeEndLabel: "<strong>Auto-Home al finalizar trabajo</strong> (Calibra a Home 0,0)",
      chkAutoHomeBetweenLabel: "<strong>Auto-Home después de cada dibujo</strong> (En lote multi-imagen)",
      chkHardwareHomingLabel: "<strong style=\"color: var(--laser-cyan);\">Ciclo de Microswitches ($H) activo</strong> (Ejecuta $H calibrado sin forzar el inicio)",
      autoHomeHint: "💡 <strong>Inicia siempre desde Home (0,0):</strong> El ciclo <code>$H</code> calibra los finales de carrera sin golpear los rieles y re-sincroniza las coordenadas tras cada grabado.",
      btnGenerateGcodeSide: "⚡ Generar G-Code para esta Posición",
      btnExportGcodeSide: "💾 Guardar Archivo .GCODE",
      btnExportGcodeSideTitle: "Guardar con diálogo nativo Linux",
      btnExportNcSideTitle: "Exportar .NC (Universal CNC)",
      machineWattTitle: "⚡ Potencia Óptica de la Máquina",
      optWatt5w: "Creality Falcon 5W (Tu máquina actual)",
      optWatt10w: "Creality Falcon 10W (Diodo Dual)",
      optWatt22w: "Creality Falcon 22W / 40W (Alta Potencia)",
      materialProfilesTitle: "📚 Perfiles de Materiales & Potencia",
      btnSaveCustomProfile: "💾 Guardar Perfil",
      btnSaveCustomProfileTitle: "Guardar parámetros actuales como nuevo perfil",
      btnDeleteCustomProfile: "🗑️ Borrar",
      btnDeleteCustomProfileTitle: "Eliminar este perfil personalizado",
      matPowerLbl: "Potencia:",
      matSpeedLbl: "Velocidad:",
      matPassesLbl: "Pasadas:",
      matModeLbl: "Modo Láser:",
      manualSettingsTitle: "🎛️ Parámetros Manuales de Potencia Láser",
      lblMinPower: "Potencia Mínima (S):",
      lblMaxPower: "Potencia Máxima (S):",
      lblLaserMode: "Modo Láser GRBL:",
      optModeM4: "M4 (Dinámico - escala con velocidad)",
      optModeM3: "M3 (Constante - potencia fija)",
      lblSpeedEngrave: "Velocidad Grabado (mm/min):",
      lblPassCount: "Pasadas de Corte:",
      modalGcodeTitle: "📄 Inspección de G-Code",
      btnCopyGcode: "📋 Copiar G-Code",
      btnModalDownloadGcode: "💾 Guardar Archivo",

      // Dynamic JS strings & messages
      noneSelected: "(Ninguna seleccionada)",
      toEngraveBadge: "🖨️ Para Grabar",
      skippedBadge: "Omitida",
      aspectLocked: "🔒 Proporción",
      aspectFree: "🔓 Libre",
      inBatch: "en lote",
      activeCountLabel: "activas",
      resolution: "Resolución",
      points: "Puntos",
      lines: "líneas",
      passSingular: "Pasada",
      passPlural: "Pasadas",
      pendingGen: "Pendiente de generar",
      estTime: "Tiempo est.",
      layerActive: "ACTIVA",
      layerIgnored: "OMITIDA",
      layerPrintToggleTitle: "Incluir u omitir en el grabado láser",
      deleteImageTitle: "Eliminar esta imagen de la mesa",
      confirmClearAll: "¿Deseas quitar todas las imágenes de la mesa de trabajo?",
      emptyGcodeFile: "El archivo G-Code seleccionado está vacío.",
      outOfBoundsGcode: (b) => `⚠️ ¡Atención! El G-Code excede la mesa (400×400): X [${b.minX.toFixed(1)} a ${b.maxX.toFixed(1)} mm], Y [${b.minY.toFixed(1)} a ${b.maxY.toFixed(1)} mm].`,
      outOfBoundsImg: (name) => `⚠️ ¡Atención! La imagen "${name}" excede los límites físicos de la mesa (400 × 400 mm)`,
      customProfilesCategory: "⭐ Mis Perfiles Personalizados",
      customProfileCut: "✂️ [CORTE]",
      customProfileEngrave: "🎨 [GRABADO]",
      promptProfileName: "Introduce un nombre para este perfil de material:",
      alertProfileSaved: (name) => `✅ Perfil '${name}' guardado correctamente.`,
      confirmDeleteProfile: "¿Deseas eliminar este perfil personalizado?",
      alertNoImages: "⚠️ No hay imágenes colocadas en la mesa de trabajo.\n\nPor favor carga o arrastra imágenes primero.",
      alertNoActiveImages: "⚠️ Ninguna imagen está seleccionada para imprimir en el menú.\n\nPor favor activa la casilla 🖨️ en el Menú de Imágenes para las que desees grabar.",
      btnGeneratingHero: "⏳ GENERANDO G-CODE...",
      btnGeneratingSide: "⏳ Generando G-Code...",
      btnGeneratingTop: "⏳ Generando...",
      calculatingBadge: "Calculando algoritmo...",
      gcodeReadyBadge: (count) => `G-Code Listo (${count} imgs)`,
      gcodeReadyShort: "G-Code Listo",
      alertGcodeSuccess: (activeCount, totalCount, lines, time) => `✅ ¡G-Code multi-imagen generado con éxito!\n\n• Imágenes incluidas: ${activeCount} de ${totalCount}\n• Total líneas de código: ${lines.toLocaleString()}\n• Tiempo estimado de ejecución: ${time}\n\nYa puedes exportarlo (.gcode / .nc) o simular el trazado virtual en la mesa.`,
      stopSimulationBtn: "⏹ Detener Simulación",
      simulateTraceBtn: "▶ Simular Trazado",
      simulatingBadge: "Simulando Trazado...",
      simulationCompletedBadge: "Simulación Completada",
      alertNeedGcodeForSim: "Para simular el trazado, primero genera el G-Code o importa un archivo a la mesa.",
      confirmGenBeforeExport: (count) => `Aún no has generado el G-Code para las ${count} imagen(es) activas en la mesa.\n\n¿Deseas generar el G-Code ahora para guardarlo?`,
      alertNoImagesToExport: "⚠️ No hay imágenes activas para imprimir ni archivo G-Code cargado.\n\nPor favor activa al menos una imagen en el menú o importa un archivo.",
      saveDialogTitle: "Guardar Archivo G-Code",
      saveDialogFilterGcode: "Archivos G-Code (*.gcode, *.nc)",
      saveDialogFilterAll: "Todos los archivos (*.*)",
      savedBadge: (fname) => `💾 Guardado: ${fname}`,
      alertSavedFile: (path) => `✅ Archivo G-Code guardado correctamente en tu sistema:\n\n${path}`,
      alertNoGcodeToView: "No hay ningún archivo G-Code generado o cargado todavía.",
      copiedBadge: "✅ ¡Copiado!",
      copyGcodeBtn: "📋 Copiar G-Code"
    }
  };

  // Idioma activo (Por defecto en INGLÉS como fue solicitado, con opción a Español)
  let currentLang = localStorage.getItem("falcon_laser_lang") || "en";

  function t(key, ...args) {
    const dict = translations[currentLang] || translations["en"];
    const val = dict[key] !== undefined ? dict[key] : (translations["en"][key] !== undefined ? translations["en"][key] : key);
    if (typeof val === "function") {
      return val(...args);
    }
    return val;
  }

  // --- ESTADO PRINCIPAL DE LA APLICACIÓN ---
  const state = {
    // Mesa de trabajo física Creality Falcon (400 × 400 mm)
    bedWidthMm: 400.0,
    bedHeightMm: 400.0,

    // Colección de Múltiples Imágenes sobre la mesa
    images: [], // [ { id, name, base64, imageObj, baseWidthPx, baseHeightPx, aspectRatio, aspectLocked, x, y, w, h, printEnabled } ]
    activeImageId: null,

    // Interacción Canvas
    interactionMode: "NONE", // 'NONE', 'DRAG_IMAGE', 'RESIZE_HANDLE', 'PAN_BED'
    activeHandle: null, // 'TL', 'TR', 'BL', 'BR'
    dragStartMouseX: 0,
    dragStartMouseY: 0,
    dragStartImgX: 0,
    dragStartImgY: 0,
    dragStartImgW: 0,
    dragStartImgH: 0,

    // Vista de cámara Canvas (Zoom & Offset en px)
    zoom: 1.0,
    offsetX: 40,
    offsetY: 40,

    // Modos de Trabajo & G-Code
    sourceMode: "IMAGE", // 'IMAGE' o 'GCODE'
    importedGcode: null, // { filename, rawGcode, lineCount, bounds, stats, rapidLines, cutLines }
    generatedJob: null,  // { gcode, line_count, estimated_time_formatted, origin_x, origin_y, ... }

    // Simulación Virtual de Trazado
    isSimulating: false,
    simAnimId: null,
    simIndex: 0,
    virtualPen: { x: 0, y: 0, laserOn: false, power: 0 }
  };

  // ============================================================
  // ELEMENTOS DOM
  // ============================================================

  // Selector de Idioma
  const btnLangEn = document.getElementById("btnLangEn");
  const btnLangEs = document.getElementById("btnLangEs");

  // Header & Acciones Rápidas
  const gcodeFileInput = document.getElementById("gcodeFileInput");
  const btnImportGcodeTop = document.getElementById("btnImportGcodeTop");
  const btnGenerateGcodeTop = document.getElementById("btnGenerateGcodeTop");
  const btnExportGcodeTop = document.getElementById("btnExportGcodeTop");
  const btnExportNcTop = document.getElementById("btnExportNcTop");

  // Barra de Resumen Técnico
  const statPosWork = document.getElementById("statPosWork");
  const statDimensions = document.getElementById("statDimensions");
  const statResolution = document.getElementById("statResolution");
  const statLaserPower = document.getElementById("statLaserPower");
  const statMachineWatt = document.getElementById("statMachineWatt");
  const statFeedRate = document.getElementById("statFeedRate");
  const statPasses = document.getElementById("statPasses");
  const statGcodeLines = document.getElementById("statGcodeLines");
  const statEstTime = document.getElementById("statEstTime");

  // Mesa de Trabajo y Canvas
  const canvasContainer = document.getElementById("canvasContainer");
  const bedCanvas = document.getElementById("bedCanvas");
  const ctx = bedCanvas.getContext("2d");
  const btnZoomIn = document.getElementById("btnZoomIn");
  const btnZoomOut = document.getElementById("btnZoomOut");
  const btnResetView = document.getElementById("btnResetView");
  const outOfBoundsWarning = document.getElementById("outOfBoundsWarning");
  const legendCursorCoords = document.getElementById("legendCursorCoords");
  const bedBadgeActiveCount = document.getElementById("bedBadgeActiveCount");
  const bedBadgeTotalCount = document.getElementById("bedBadgeTotalCount");

  // Barra de Alineación Rápida
  const btnAlignBottomLeft = document.getElementById("btnAlignBottomLeft");
  const btnAlignCenter = document.getElementById("btnAlignCenter");
  const btnAlignTopLeft = document.getElementById("btnAlignTopLeft");
  const btnAlignBottomRight = document.getElementById("btnAlignBottomRight");

  // Barra Principal de Generación & Exportación
  const jobStatusBadge = document.getElementById("jobStatusBadge");
  const jobInfoLines = document.getElementById("jobInfoLines");
  const jobInfoTime = document.getElementById("jobInfoTime");
  const btnMainGenerate = document.getElementById("btnMainGenerate");
  const btnSimulateTrace = document.getElementById("btnSimulateTrace");
  const btnExportGcodeMain = document.getElementById("btnExportGcodeMain");
  const btnExportNcMain = document.getElementById("btnExportNcMain");
  const btnViewGcodeMain = document.getElementById("btnViewGcodeMain");

  // Pestañas Laterales
  const sideTabBtns = document.querySelectorAll(".side-tab-btn");
  const sidePanes = document.querySelectorAll(".side-pane");

  // Conmutador Imagen vs G-Code
  const btnModeImage = document.getElementById("btnModeImage");
  const btnModeGcode = document.getElementById("btnModeGcode");
  const imageWorkflowPane = document.getElementById("imageWorkflowPane");
  const gcodeWorkflowPane = document.getElementById("gcodeWorkflowPane");

  // Menú de Múltiples Imágenes en Mesa
  const imgCountBadge = document.getElementById("imgCountBadge");
  const btnAddMoreImages = document.getElementById("btnAddMoreImages");
  const btnClearAllImages = document.getElementById("btnClearAllImages");
  const imageListContainer = document.getElementById("imageListContainer");
  const emptyImagesHint = document.getElementById("emptyImagesHint");

  // Propiedades de la Imagen Seleccionada
  const selectedImagePropsBox = document.getElementById("selectedImagePropsBox");
  const selectedImageNameTag = document.getElementById("selectedImageNameTag");
  const selectedImageBadge = document.getElementById("selectedImageBadge");
  const dropArea = document.getElementById("dropArea");
  const fileInput = document.getElementById("fileInput");
  const posImgX = document.getElementById("posImgX");
  const posImgY = document.getElementById("posImgY");
  const dimWidth = document.getElementById("dimWidth");
  const dimHeight = document.getElementById("dimHeight");
  const btnLockAspect = document.getElementById("btnLockAspect");
  const scaleBtns = document.querySelectorAll(".btn-scale");
  const btnFitBed = document.getElementById("btnFitBed");

  // G-Code Importado
  const gcodeDropArea = document.getElementById("gcodeDropArea");
  const importedGcodeCard = document.getElementById("importedGcodeCard");
  const gcodeFileName = document.getElementById("gcodeFileName");
  const gcodeFileSize = document.getElementById("gcodeFileSize");
  const btnUnloadGcode = document.getElementById("btnUnloadGcode");
  const gcodeDimensions = document.getElementById("gcodeDimensions");
  const gcodeLineCount = document.getElementById("gcodeLineCount");
  const gcodeOrigin = document.getElementById("gcodeOrigin");
  const gcodePowerRange = document.getElementById("gcodePowerRange");
  const gcodeCutDist = document.getElementById("gcodeCutDist");
  const gcodeEstTime = document.getElementById("gcodeEstTime");
  const btnGcodeShiftOrigin = document.getElementById("btnGcodeShiftOrigin");
  const btnGcodeCenterBed = document.getElementById("btnGcodeCenterBed");
  const btnGcodeExportCard = document.getElementById("btnGcodeExportCard");
  const btnViewGcodeModal = document.getElementById("btnViewGcodeModal");

  // Conversión & Filtros
  const algoSelect = document.getElementById("algoSelect");
  const linesPerMm = document.getElementById("linesPerMm");
  const sliderBrightness = document.getElementById("sliderBrightness");
  const valBrightness = document.getElementById("valBrightness");
  const sliderContrast = document.getElementById("sliderContrast");
  const valContrast = document.getElementById("valContrast");
  const chkInvert = document.getElementById("chkInvert");
  const btnGenerateGcode = document.getElementById("btnGenerateGcode");
  const btnExportGcodeSide = document.getElementById("btnExportGcodeSide");
  const btnExportNcSide = document.getElementById("btnExportNcSide");

  // Potencia & Perfiles
  const machineWattSelect = document.getElementById("machineWattSelect");
  const presetSelect = document.getElementById("presetSelect");
  const btnSaveCustomProfile = document.getElementById("btnSaveCustomProfile");
  const btnDeleteCustomProfile = document.getElementById("btnDeleteCustomProfile");
  const customProfileActions = document.getElementById("customProfileActions");
  const matCardTitle = document.getElementById("matCardTitle");
  const matCardBadge = document.getElementById("matCardBadge");
  const matCardPower = document.getElementById("matCardPower");
  const matCardSpeed = document.getElementById("matCardSpeed");
  const matCardPasses = document.getElementById("matCardPasses");
  const matCardMode = document.getElementById("matCardMode");
  const matCardTip = document.getElementById("matCardTip");
  const minPower = document.getElementById("minPower");
  const maxPower = document.getElementById("maxPower");
  const laserMode = document.getElementById("laserMode");
  const speedEngrave = document.getElementById("speedEngrave");
  const passCount = document.getElementById("passCount");
  const chkAutoHomeEnd = document.getElementById("chkAutoHomeEnd");
  const chkAutoHomeBetween = document.getElementById("chkAutoHomeBetween");
  const chkHardwareHoming = document.getElementById("chkHardwareHoming");

  // Modal Visor de G-Code
  const gcodeModalOverlay = document.getElementById("gcodeModalOverlay");
  const modalGcodeTitle = document.getElementById("modalGcodeTitle");
  const btnCloseGcodeModal = document.getElementById("btnCloseGcodeModal");
  const modalGcodeStats = document.getElementById("modalGcodeStats");
  const btnCopyGcode = document.getElementById("btnCopyGcode");
  const btnModalDownloadGcode = document.getElementById("btnModalDownloadGcode");
  const modalGcodeText = document.getElementById("modalGcodeText");

  // ============================================================
  // FUNCIÓN PRINCIPAL DE CAMBIO DE IDIOMA
  // ============================================================
  function setLanguage(lang) {
    currentLang = (lang === "es") ? "es" : "en";
    localStorage.setItem("falcon_laser_lang", currentLang);
    document.documentElement.lang = currentLang;

    // Actualizar botones de idioma en header
    if (btnLangEn && btnLangEs) {
      btnLangEn.classList.toggle("active", currentLang === "en");
      btnLangEs.classList.toggle("active", currentLang === "es");
    }

    // Actualizar elementos con atributo data-i18n
    document.querySelectorAll("[data-i18n]").forEach(elem => {
      const key = elem.getAttribute("data-i18n");
      const translation = t(key);
      if (translation !== undefined) {
        if (translation.includes("<") && translation.includes(">")) {
          elem.innerHTML = translation;
        } else {
          elem.textContent = translation;
        }
      }
    });

    // Actualizar títulos / tooltips con atributo data-i18n-title
    document.querySelectorAll("[data-i18n-title]").forEach(elem => {
      const key = elem.getAttribute("data-i18n-title");
      const translation = t(key);
      if (translation !== undefined) {
        elem.title = translation;
      }
    });

    // Re-poblar selector de perfiles de materiales
    populatePresetDropdown();

    // Actualizar textos dinámicos
    syncActiveImageToInputs();
    renderImageListMenu();
    updateSummaryStrip();
    checkOutOfBounds();

    // Actualizar textos de botones según estado de simulación
    if (state.isSimulating) {
      btnSimulateTrace.textContent = t("stopSimulationBtn");
      jobStatusBadge.textContent = t("simulatingBadge");
    } else {
      btnSimulateTrace.textContent = t("simulateTraceBtn");
      if (state.importedGcode || state.generatedJob) {
        jobStatusBadge.textContent = t("gcodeReadyShort");
      } else {
        jobStatusBadge.textContent = t("jobStatusWaiting");
      }
    }
  }

  if (btnLangEn) btnLangEn.addEventListener("click", () => setLanguage("en"));
  if (btnLangEs) btnLangEs.addEventListener("click", () => setLanguage("es"));

  // ============================================================
  // 1. MANEJO DE PESTAÑAS Y MODOS
  // ============================================================
  sideTabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      sideTabBtns.forEach(b => b.classList.remove("active"));
      sidePanes.forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      const target = document.getElementById(btn.dataset.tab);
      if (target) target.classList.add("active");
    });
  });

  if (btnModeImage && btnModeGcode) {
    btnModeImage.addEventListener("click", () => switchSourceMode("IMAGE"));
    btnModeGcode.addEventListener("click", () => switchSourceMode("GCODE"));
  }

  function switchSourceMode(mode) {
    state.sourceMode = mode;
    if (mode === "GCODE") {
      btnModeImage.classList.remove("active");
      btnModeGcode.classList.add("active");
      imageWorkflowPane.style.display = "none";
      gcodeWorkflowPane.style.display = "block";
    } else {
      btnModeGcode.classList.remove("active");
      btnModeImage.classList.add("active");
      gcodeWorkflowPane.style.display = "none";
      imageWorkflowPane.style.display = "block";
    }
    updateSummaryStrip();
    checkOutOfBounds();
    drawBed();
  }

  // ============================================================
  // 2. GESTIÓN MULTI-IMAGEN (MENÚ DE CAPAS)
  // ============================================================

  function getActiveImage() {
    if (!state.activeImageId) return null;
    return state.images.find(img => img.id === state.activeImageId) || null;
  }

  function selectImage(id) {
    state.activeImageId = id;
    renderImageListMenu();
    syncActiveImageToInputs();
    checkOutOfBounds();
    drawBed();
  }

  function syncActiveImageToInputs() {
    const active = getActiveImage();
    if (!active) {
      if (selectedImageNameTag) selectedImageNameTag.textContent = t("noneSelected");
      if (selectedImageBadge) selectedImageBadge.style.display = "none";
      posImgX.value = 20;
      posImgY.value = 20;
      dimWidth.value = 80;
      dimHeight.value = 80;
      return;
    }

    if (selectedImageNameTag) selectedImageNameTag.textContent = active.name;
    if (selectedImageBadge) {
      selectedImageBadge.style.display = "inline-block";
      selectedImageBadge.textContent = active.printEnabled ? t("toEngraveBadge") : t("skippedBadge");
      selectedImageBadge.style.background = active.printEnabled ? "var(--laser-cyan-glow)" : "rgba(90, 104, 128, 0.3)";
      selectedImageBadge.style.color = active.printEnabled ? "var(--laser-cyan)" : "var(--text-dim)";
    }

    posImgX.value = active.x;
    posImgY.value = active.y;
    dimWidth.value = active.w;
    dimHeight.value = active.h;
    btnLockAspect.classList.toggle("active", active.aspectLocked);
    btnLockAspect.textContent = active.aspectLocked ? t("aspectLocked") : t("aspectFree");

    updateSummaryStrip();
  }

  function addImagesToBed(fileList) {
    if (!fileList || fileList.length === 0) return;

    let staggerX = 20.0;
    let staggerY = 20.0;

    if (state.images.length > 0) {
      const last = state.images[state.images.length - 1];
      if (last.x + last.w + 90 <= state.bedWidthMm) {
        staggerX = last.x + last.w + 10;
        staggerY = last.y;
      } else {
        staggerX = 20.0;
        staggerY = Math.min(320, last.y + last.h + 10);
      }
    }

    Array.from(fileList).forEach((file, index) => {
      const name = file.name.toLowerCase();
      if (name.endsWith(".gcode") || name.endsWith(".nc") || name.endsWith(".gc") || name.endsWith(".tap") || name.endsWith(".txt")) {
        const reader = new FileReader();
        reader.onload = (e) => loadGcodeContent(e.target.result, file.name, formatFileSize(file.size));
        reader.readAsText(file);
        return;
      }

      const reader = new FileReader();
      reader.onload = (ev) => {
        const base64 = ev.target.result;
        const img = new Image();
        img.onload = () => {
          const ratio = img.width / img.height;
          const defaultW = 75.0;
          const defaultH = Math.round((defaultW / ratio) * 10) / 10;

          const posX = Math.min(state.bedWidthMm - defaultW, staggerX + (index * 15));
          const posY = Math.min(state.bedHeightMm - defaultH, staggerY + (index * 15));

          const newImg = {
            id: "img_" + Date.now() + "_" + Math.random().toString(36).substr(2, 6),
            name: file.name,
            base64: base64,
            imageObj: img,
            baseWidthPx: img.width,
            baseHeightPx: img.height,
            aspectRatio: ratio,
            aspectLocked: true,
            x: Math.max(0, posX),
            y: Math.max(0, posY),
            w: defaultW,
            h: defaultH,
            printEnabled: true
          };

          state.images.push(newImg);
          state.activeImageId = newImg.id;

          switchSourceMode("IMAGE");
          renderImageListMenu();
          syncActiveImageToInputs();
          checkOutOfBounds();
          drawBed();
        };
        img.src = base64;
      };
      reader.readAsDataURL(file);
    });
  }

  function removeImage(id) {
    const idx = state.images.findIndex(i => i.id === id);
    if (idx === -1) return;

    state.images.splice(idx, 1);
    if (state.activeImageId === id) {
      state.activeImageId = state.images.length > 0 ? state.images[Math.max(0, idx - 1)].id : null;
    }

    renderImageListMenu();
    syncActiveImageToInputs();
    checkOutOfBounds();
    drawBed();
  }

  function toggleImagePrint(id, enabled) {
    const img = state.images.find(i => i.id === id);
    if (!img) return;
    img.printEnabled = enabled;
    renderImageListMenu();
    syncActiveImageToInputs();
    updateSummaryStrip();
    drawBed();
  }

  function renderImageListMenu() {
    imgCountBadge.textContent = state.images.length;
    const activeCount = state.images.filter(i => i.printEnabled).length;
    bedBadgeActiveCount.textContent = activeCount;
    bedBadgeTotalCount.textContent = state.images.length;

    if (state.images.length > 0) {
      btnClearAllImages.style.display = "inline-block";
      emptyImagesHint.style.display = "none";
    } else {
      btnClearAllImages.style.display = "none";
      emptyImagesHint.style.display = "block";
    }

    const cards = imageListContainer.querySelectorAll(".image-layer-card");
    cards.forEach(c => c.remove());

    state.images.forEach((img, idx) => {
      const card = document.createElement("div");
      card.className = `image-layer-card ${img.id === state.activeImageId ? "selected" : ""} ${!img.printEnabled ? "disabled" : ""}`;
      card.dataset.id = img.id;

      card.innerHTML = `
        <div class="layer-thumb-wrap">
          <img src="${img.base64}" class="layer-thumb" alt="Thumbnail">
        </div>
        <div class="layer-details">
          <div class="layer-title-row">
            <span class="layer-name" title="${img.name}">#${idx+1} ${img.name}</span>
            <span class="layer-badge ${img.printEnabled ? "active" : "ignored"}">${img.printEnabled ? t("layerActive") : t("layerIgnored")}</span>
          </div>
          <div class="layer-metrics">
            ${img.w.toFixed(1)} × ${img.h.toFixed(1)} mm • (X: ${img.x.toFixed(1)}, Y: ${img.y.toFixed(1)})
          </div>
        </div>
        <div class="layer-actions">
          <label class="layer-print-toggle" title="${t("layerPrintToggleTitle")}">
            <input type="checkbox" ${img.printEnabled ? "checked" : ""} class="chk-print">
            <span>🖨️</span>
          </label>
          <button class="btn-delete-layer" title="${t("deleteImageTitle")}">🗑️</button>
        </div>
      `;

      card.addEventListener("click", (e) => {
        if (e.target.closest(".layer-print-toggle") || e.target.closest(".btn-delete-layer")) return;
        selectImage(img.id);
      });

      const chk = card.querySelector(".chk-print");
      chk.addEventListener("change", (e) => {
        e.stopPropagation();
        toggleImagePrint(img.id, chk.checked);
      });

      const btnDel = card.querySelector(".btn-delete-layer");
      btnDel.addEventListener("click", (e) => {
        e.stopPropagation();
        removeImage(img.id);
      });

      imageListContainer.appendChild(card);
    });
  }

  if (btnAddMoreImages) {
    btnAddMoreImages.addEventListener("click", () => fileInput.click());
  }

  if (btnClearAllImages) {
    btnClearAllImages.addEventListener("click", () => {
      if (confirm(t("confirmClearAll"))) {
        state.images = [];
        state.activeImageId = null;
        renderImageListMenu();
        syncActiveImageToInputs();
        checkOutOfBounds();
        drawBed();
      }
    });
  }

  fileInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) addImagesToBed(e.target.files);
  });
  dropArea.addEventListener("click", () => fileInput.click());

  [canvasContainer, dropArea, gcodeDropArea].forEach(elem => {
    if (!elem) return;
    elem.addEventListener("dragover", (e) => {
      e.preventDefault();
      elem.classList.add("dragover");
    });
    elem.addEventListener("dragleave", (e) => {
      e.preventDefault();
      elem.classList.remove("dragover");
    });
    elem.addEventListener("drop", (e) => {
      e.preventDefault();
      elem.classList.remove("dragover");
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        addImagesToBed(e.dataTransfer.files);
      }
    });
  });

  btnLockAspect.addEventListener("click", () => {
    const active = getActiveImage();
    if (!active) return;
    active.aspectLocked = !active.aspectLocked;
    btnLockAspect.classList.toggle("active", active.aspectLocked);
    btnLockAspect.textContent = active.aspectLocked ? t("aspectLocked") : t("aspectFree");
  });

  dimWidth.addEventListener("input", () => {
    const active = getActiveImage();
    if (!active) return;
    const val = parseFloat(dimWidth.value) || 10;
    active.w = Math.max(5, Math.min(400, val));
    if (active.aspectLocked && active.aspectRatio) {
      active.h = Math.round((active.w / active.aspectRatio) * 10) / 10;
      dimHeight.value = active.h;
    }
    renderImageListMenu();
    updateSummaryStrip();
    checkOutOfBounds();
    drawBed();
  });

  dimHeight.addEventListener("input", () => {
    const active = getActiveImage();
    if (!active) return;
    const val = parseFloat(dimHeight.value) || 10;
    active.h = Math.max(5, Math.min(400, val));
    if (active.aspectLocked && active.aspectRatio) {
      active.w = Math.round((active.h * active.aspectRatio) * 10) / 10;
      dimWidth.value = active.w;
    }
    renderImageListMenu();
    updateSummaryStrip();
    checkOutOfBounds();
    drawBed();
  });

  scaleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const active = getActiveImage();
      if (!active) return;
      const scale = parseFloat(btn.dataset.scale);
      if (scale) {
        active.w = Math.round(75 * scale);
        active.h = Math.round((active.w / active.aspectRatio) * 10) / 10;
        dimWidth.value = active.w;
        dimHeight.value = active.h;
        renderImageListMenu();
        updateSummaryStrip();
        checkOutOfBounds();
        drawBed();
      }
    });
  });

  btnFitBed.addEventListener("click", () => {
    const active = getActiveImage();
    if (!active) return;
    if (active.aspectRatio >= 1.0) {
      active.w = 380;
      active.h = Math.round(380 / active.aspectRatio);
    } else {
      active.h = 380;
      active.w = Math.round(380 * active.aspectRatio);
    }
    dimWidth.value = active.w;
    dimHeight.value = active.h;
    centerActiveImageOnBed();
  });

  posImgX.addEventListener("input", () => {
    const active = getActiveImage();
    if (!active) return;
    active.x = parseFloat(posImgX.value) || 0;
    renderImageListMenu();
    updateSummaryStrip();
    checkOutOfBounds();
    drawBed();
  });

  posImgY.addEventListener("input", () => {
    const active = getActiveImage();
    if (!active) return;
    active.y = parseFloat(posImgY.value) || 0;
    renderImageListMenu();
    updateSummaryStrip();
    checkOutOfBounds();
    drawBed();
  });

  btnAlignBottomLeft.addEventListener("click", () => {
    const active = getActiveImage();
    if (!active) return;
    active.x = 0;
    active.y = 0;
    syncActiveImageToInputs();
    renderImageListMenu();
    drawBed();
  });

  btnAlignCenter.addEventListener("click", centerActiveImageOnBed);

  function centerActiveImageOnBed() {
    const active = getActiveImage();
    if (!active) return;
    active.x = Math.max(0, Math.round(((state.bedWidthMm - active.w) / 2) * 10) / 10);
    active.y = Math.max(0, Math.round(((state.bedHeightMm - active.h) / 2) * 10) / 10);
    syncActiveImageToInputs();
    renderImageListMenu();
    drawBed();
  }

  btnAlignTopLeft.addEventListener("click", () => {
    const active = getActiveImage();
    if (!active) return;
    active.x = 0;
    active.y = Math.max(0, Math.round((state.bedHeightMm - active.h) * 10) / 10);
    syncActiveImageToInputs();
    renderImageListMenu();
    drawBed();
  });

  btnAlignBottomRight.addEventListener("click", () => {
    const active = getActiveImage();
    if (!active) return;
    active.x = Math.max(0, Math.round((state.bedWidthMm - active.w) * 10) / 10);
    active.y = 0;
    syncActiveImageToInputs();
    renderImageListMenu();
    drawBed();
  });

  function checkOutOfBounds() {
    let isOver = false;
    let warningMsg = t("outOfBoundsWarningDefault");

    if (state.sourceMode === "GCODE" && state.importedGcode) {
      const b = state.importedGcode.bounds;
      isOver = (b.maxX > state.bedWidthMm) || (b.minX < 0) || (b.maxY > state.bedHeightMm) || (b.minY < 0);
      if (isOver) {
        warningMsg = t("outOfBoundsGcode", b);
      }
    } else {
      const activeItems = state.images.filter(i => i.printEnabled);
      for (const img of activeItems) {
        if ((img.x + img.w > state.bedWidthMm) || img.x < 0 || (img.y + img.h > state.bedHeightMm) || img.y < 0) {
          isOver = true;
          warningMsg = t("outOfBoundsImg", img.name);
          break;
        }
      }
    }

    outOfBoundsWarning.textContent = warningMsg;
    outOfBoundsWarning.style.display = isOver ? "block" : "none";
  }

  sliderBrightness.addEventListener("input", () => valBrightness.textContent = sliderBrightness.value);
  sliderContrast.addEventListener("input", () => valContrast.textContent = sliderContrast.value);
  if (linesPerMm) linesPerMm.addEventListener("change", updateSummaryStrip);
  if (minPower) minPower.addEventListener("input", updateSummaryStrip);
  if (maxPower) maxPower.addEventListener("input", updateSummaryStrip);
  if (speedEngrave) speedEngrave.addEventListener("input", updateSummaryStrip);
  if (passCount) passCount.addEventListener("input", updateSummaryStrip);
  if (laserMode) laserMode.addEventListener("change", updateSummaryStrip);

  // ============================================================
  // 3. PARSER Y PROCESADOR DE G-CODE (IMPORTACIÓN & EXPORTACIÓN)
  // ============================================================
  function parseGcode(rawGcode, filename = "falcon_job.gcode") {
    const lines = rawGcode.split(/\r?\n/);
    let curX = 0, curY = 0, curZ = 0;
    let curF = 3000;
    let curS = 0;
    let laserActive = false;
    let gLaserMode = "M4";
    let isAbsolute = true;
    let unitScale = 1.0;

    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;
    let maxS = 0, minActiveS = Infinity;

    let totalCutDist = 0;
    let totalRapidDist = 0;
    let estSeconds = 0;

    const rapidLines = [];
    const cutLines = [];
    let motionMode = "G0";

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      const semiIdx = line.indexOf(";");
      if (semiIdx !== -1) line = line.substring(0, semiIdx);
      line = line.replace(/\(.*?\)/g, "").trim().toUpperCase();
      if (!line) continue;

      if (line.includes("G90")) isAbsolute = true;
      if (line.includes("G91")) isAbsolute = false;
      if (line.includes("G20")) unitScale = 25.4;
      if (line.includes("G21")) unitScale = 1.0;

      if (line.includes("M3")) { laserActive = true; gLaserMode = "M3"; }
      if (line.includes("M4")) { laserActive = true; gLaserMode = "M4"; }
      if (line.includes("M5")) { laserActive = false; curS = 0; }
      if (line.includes("$H")) {
        curX = 0;
        curY = 0;
        curZ = 0;
        laserActive = false;
        curS = 0;
      }

      const sMatch = line.match(/S([+-]?\d+(?:\.\d+)?)/);
      if (sMatch) {
        curS = parseFloat(sMatch[1]);
        if (curS > maxS) maxS = curS;
        if (curS > 0 && curS < minActiveS) minActiveS = curS;
        if (curS > 0) laserActive = true;
      }

      const fMatch = line.match(/F([+-]?\d+(?:\.\d+)?)/);
      if (fMatch) {
        curF = parseFloat(fMatch[1]);
        if (curF <= 0) curF = 3000;
      }

      if (/\bG0\b|\bG00\b/.test(line)) motionMode = "G0";
      else if (/\bG1\b|\bG01\b/.test(line)) motionMode = "G1";
      else if (/\bG2\b|\bG02\b/.test(line)) motionMode = "G2";
      else if (/\bG3\b|\bG03\b/.test(line)) motionMode = "G3";

      let targetX = curX;
      let targetY = curY;
      let targetZ = curZ;
      let hasMove = false;

      const xMatch = line.match(/X([+-]?\d+(?:\.\d+)?)/);
      if (xMatch) {
        targetX = isAbsolute ? parseFloat(xMatch[1]) * unitScale : curX + parseFloat(xMatch[1]) * unitScale;
        hasMove = true;
      }
      const yMatch = line.match(/Y([+-]?\d+(?:\.\d+)?)/);
      if (yMatch) {
        targetY = isAbsolute ? parseFloat(yMatch[1]) * unitScale : curY + parseFloat(yMatch[1]) * unitScale;
        hasMove = true;
      }
      const zMatch = line.match(/Z([+-]?\d+(?:\.\d+)?)/);
      if (zMatch) {
        targetZ = isAbsolute ? parseFloat(zMatch[1]) * unitScale : curZ + parseFloat(zMatch[1]) * unitScale;
        hasMove = true;
      }

      if (hasMove) {
        const dx = targetX - curX;
        const dy = targetY - curY;
        const dist = Math.hypot(dx, dy);

        if (targetX < minX) minX = targetX;
        if (targetX > maxX) maxX = targetX;
        if (targetY < minY) minY = targetY;
        if (targetY > maxY) maxY = targetY;

        const isCutting = (motionMode === "G1" || motionMode === "G2" || motionMode === "G3") && laserActive && curS > 0;

        if (dist > 0.001) {
          if (isCutting) {
            totalCutDist += dist;
            estSeconds += (dist / curF) * 60;
            if (cutLines.length < 35000 || i % 2 === 0) {
              cutLines.push([curX, curY, targetX, targetY, curS]);
            }
          } else {
            totalRapidDist += dist;
            estSeconds += (dist / (curF || 6000)) * 60;
            if (rapidLines.length < 20000 || i % 2 === 0) {
              rapidLines.push([curX, curY, targetX, targetY]);
            }
          }
        }

        curX = targetX;
        curY = targetY;
        curZ = targetZ;
      }
    }

    if (minX === Infinity) { minX = 0; maxX = 0; }
    if (minY === Infinity) { minY = 0; maxY = 0; }
    if (minActiveS === Infinity) minActiveS = 0;

    const width = Math.max(0, maxX - minX);
    const height = Math.max(0, maxY - minY);
    const estMinutes = Math.floor(estSeconds / 60);
    const estSecRem = Math.floor(estSeconds % 60);
    const estFormatted = estMinutes > 0 ? `${estMinutes}m ${estSecRem}s` : `${estSecRem}s`;

    return {
      filename,
      rawGcode,
      lineCount: lines.length,
      bounds: { minX, maxX, minY, maxY, width, height },
      stats: {
        totalCutDist: Math.round(totalCutDist),
        totalRapidDist: Math.round(totalRapidDist),
        estimatedSeconds: Math.round(estSeconds),
        estimatedFormatted: estFormatted,
        maxS,
        minActiveS,
        laserMode: gLaserMode
      },
      rapidLines,
      cutLines
    };
  }

  function transformGcodeCoordinates(rawGcode, shiftX, shiftY) {
    const lines = rawGcode.split(/\r?\n/);
    const out = [];
    const coordRegex = /([XY])([+-]?\d+(?:\.\d+)?)/g;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      const trimmed = line.trim();
      if (trimmed.startsWith(";") || trimmed.startsWith("(")) {
        out.push(line);
        continue;
      }

      let comment = "";
      const semiIdx = line.indexOf(";");
      if (semiIdx !== -1) {
        comment = line.substring(semiIdx);
        line = line.substring(0, semiIdx);
      }

      const newLine = line.replace(coordRegex, (match, axis, valStr) => {
        const val = parseFloat(valStr);
        if (axis === "X") return `X${(val + shiftX).toFixed(3)}`;
        if (axis === "Y") return `Y${(val + shiftY).toFixed(3)}`;
        return match;
      });

      out.push(newLine + comment);
    }
    return out.join("\n");
  }

  function formatFileSize(bytes) {
    if (!bytes || bytes <= 0) return "0 KB";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  async function loadGcodeContent(rawText, filename = "falcon_job.gcode", fileSizeStr = "") {
    if (!rawText || !rawText.trim()) {
      alert(t("emptyGcodeFile"));
      return;
    }

    const parsed = parseGcode(rawText, filename);
    state.importedGcode = parsed;
    state.generatedJob = {
      gcode: rawText,
      line_count: parsed.lineCount,
      estimated_time_formatted: parsed.stats.estimatedFormatted,
      origin_x: parsed.bounds.minX,
      origin_y: parsed.bounds.minY,
      width_mm: parsed.bounds.width,
      height_mm: parsed.bounds.height
    };
    state.sourceMode = "GCODE";

    try {
      await fetch("/api/load_gcode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gcode: rawText, filename: filename })
      });
    } catch (_) {}

    updateGcodeUI(parsed, fileSizeStr);
    updateSummaryStrip();
    checkOutOfBounds();
    drawBed();
  }

  function updateGcodeUI(parsed, fileSizeStr = "") {
    switchSourceMode("GCODE");

    if (importedGcodeCard) {
      importedGcodeCard.style.display = "flex";
      gcodeFileName.textContent = parsed.filename;
      gcodeFileSize.textContent = fileSizeStr || formatFileSize(parsed.rawGcode.length);
      gcodeDimensions.textContent = `${parsed.bounds.width.toFixed(1)} × ${parsed.bounds.height.toFixed(1)} mm`;
      gcodeLineCount.textContent = `${parsed.lineCount.toLocaleString()} ${t("lines")}`;
      gcodeOrigin.textContent = `X: ${parsed.bounds.minX.toFixed(1)}, Y: ${parsed.bounds.minY.toFixed(1)} mm`;
      gcodePowerRange.textContent = `S${parsed.stats.minActiveS} - S${parsed.stats.maxS} (${parsed.stats.laserMode})`;
      gcodeCutDist.textContent = `${(parsed.stats.totalCutDist / 1000).toFixed(2)} m (${parsed.stats.totalCutDist} mm)`;
      gcodeEstTime.textContent = parsed.stats.estimatedFormatted;
    }

    jobStatusBadge.className = "job-badge generated";
    jobStatusBadge.textContent = t("gcodeReadyShort");
    jobInfoLines.textContent = `${parsed.lineCount.toLocaleString()} ${t("lines")}`;
    jobInfoTime.textContent = `${t("estTime")}: ${parsed.stats.estimatedFormatted}`;

    const tabImageBtn = document.querySelector('[data-tab="tabImageSettings"]');
    if (tabImageBtn && !tabImageBtn.classList.contains("active")) {
      tabImageBtn.click();
    }
  }

  if (btnUnloadGcode) {
    btnUnloadGcode.addEventListener("click", () => {
      stopSimulation();
      state.importedGcode = null;
      if (importedGcodeCard) importedGcodeCard.style.display = "none";
      jobStatusBadge.className = "job-badge idle";
      jobStatusBadge.textContent = t("jobStatusWaiting");
      jobInfoLines.textContent = `0 ${t("lines")}`;
      jobInfoTime.textContent = `${t("estTime")}: --`;
      updateSummaryStrip();
      checkOutOfBounds();
      drawBed();
    });
  }

  if (btnGcodeShiftOrigin) {
    btnGcodeShiftOrigin.addEventListener("click", async () => {
      if (!state.importedGcode) return;
      const b = state.importedGcode.bounds;
      const shiftX = -b.minX;
      const shiftY = -b.minY;
      const transformed = transformGcodeCoordinates(state.importedGcode.rawGcode, shiftX, shiftY);
      await loadGcodeContent(transformed, state.importedGcode.filename, gcodeFileSize.textContent);
    });
  }

  if (btnGcodeCenterBed) {
    btnGcodeCenterBed.addEventListener("click", async () => {
      if (!state.importedGcode) return;
      const b = state.importedGcode.bounds;
      const centerX = (b.minX + b.maxX) / 2;
      const centerY = (b.minY + b.maxY) / 2;
      const shiftX = 200 - centerX;
      const shiftY = 200 - centerY;
      const transformed = transformGcodeCoordinates(state.importedGcode.rawGcode, shiftX, shiftY);
      await loadGcodeContent(transformed, state.importedGcode.filename, gcodeFileSize.textContent);
    });
  }

  if (btnImportGcodeTop) btnImportGcodeTop.addEventListener("click", () => gcodeFileInput.click());
  if (gcodeDropArea) gcodeDropArea.addEventListener("click", () => gcodeFileInput.click());
  if (gcodeFileInput) {
    gcodeFileInput.addEventListener("change", (e) => {
      if (e.target.files.length > 0) addImagesToBed(e.target.files);
    });
  }

  // ============================================================
  // 4. RESUMEN TÉCNICO (BARRA SUPERIOR)
  // ============================================================
  function updateSummaryStrip() {
    if (state.sourceMode === "GCODE" && state.importedGcode) {
      const b = state.importedGcode.bounds;
      const s = state.importedGcode.stats;
      statPosWork.textContent = `X: ${b.minX.toFixed(1)} | Y: ${b.minY.toFixed(1)} mm`;
      statDimensions.textContent = `${b.width.toFixed(1)} × ${b.height.toFixed(1)} mm`;
      statResolution.textContent = `${t("points")}: ${state.importedGcode.lineCount.toLocaleString()}`;
      statLaserPower.textContent = `S${s.minActiveS} - S${s.maxS} (${s.laserMode})`;
      statFeedRate.textContent = `${speedEngrave ? speedEngrave.value : 3500} mm/min`;
      statPasses.textContent = `${passCount ? passCount.value : 1} ${passCount && passCount.value == 1 ? t("passSingular") : t("passPlural")}`;
      statGcodeLines.textContent = `${state.importedGcode.lineCount.toLocaleString()} ${t("lines")}`;
      statEstTime.textContent = `${t("estTime")}: ${s.estimatedFormatted}`;
    } else {
      const active = getActiveImage();
      const activeCount = state.images.filter(i => i.printEnabled).length;

      if (active) {
        statPosWork.textContent = `X: ${active.x.toFixed(1)} | Y: ${active.y.toFixed(1)} mm`;
        statDimensions.textContent = `${active.w.toFixed(1)} × ${active.h.toFixed(1)} mm (${activeCount} ${t("inBatch")})`;
      } else {
        statPosWork.textContent = `X: 0.0 | Y: 0.0 mm`;
        statDimensions.textContent = `0 × 0 mm (${activeCount} ${t("activeCountLabel")})`;
      }

      statResolution.textContent = `${t("resolution")}: ${linesPerMm ? linesPerMm.value : 6} l/mm`;
      statLaserPower.textContent = `S${minPower ? minPower.value : 0} - S${maxPower ? maxPower.value : 850} (${laserMode ? laserMode.value : 'M4'})`;
      statFeedRate.textContent = `${speedEngrave ? speedEngrave.value : 3500} mm/min`;
      statPasses.textContent = `${passCount ? passCount.value : 1} ${passCount && passCount.value == 1 ? t("passSingular") : t("passPlural")}`;

      if (state.generatedJob) {
        statGcodeLines.textContent = `${state.generatedJob.line_count.toLocaleString()} ${t("lines")}`;
        statEstTime.textContent = `${t("estTime")}: ${state.generatedJob.estimated_time_formatted}`;
      } else {
        statGcodeLines.textContent = t("pendingGen");
        statEstTime.textContent = `${t("estTime")}: --`;
      }
    }

    if (machineWattSelect) {
      const wText = machineWattSelect.options[machineWattSelect.selectedIndex]?.text || "Creality Falcon 5W";
      statMachineWatt.textContent = wText.split("(")[0].trim();
    }
  }

  // ============================================================
  // 5. PERFILES DE MATERIALES CREALITY FALCON 5W (BILINGÜES)
  // ============================================================
  const MACHINE_POWER_MODELS = {
    "5w": { name: "Creality Falcon 5W", multiplier: 1.0 },
    "10w": { name: "Creality Falcon 10W", multiplier: 1.8 },
    "22w": { name: "Creality Falcon 22W / 40W", multiplier: 3.5 }
  };

  const DEFAULT_MATERIAL_PROFILES_5W = [
    {
      id: "wood_engrave_detailed",
      category: { en: "🪵 Wood", es: "🪵 Madera" },
      type: "engrave",
      name: {
        en: "Wood - Detailed Photo Engraving (Pine, Balsa, Plywood)",
        es: "Madera - Grabado Fotográfico / Detallado (Pino, Balsa, Chapa)"
      },
      algo: "dither_atkinson", linesPerMm: 7.0, minPower: 0, maxPower: 750, speed: 3500, passes: 1, laserMode: "M4", invert: false,
      tip: {
        en: "Atkinson dithering highlights smooth gradients and natural wood grain without overburning with the 5W laser.",
        es: "El tramado Atkinson resalta degradados suaves y vetas naturales sin quemar en exceso con el láser de 5W."
      }
    },
    {
      id: "wood_engrave_fast",
      category: { en: "🪵 Wood", es: "🪵 Madera" },
      type: "engrave",
      name: {
        en: "Wood - Fast Engraving / Silhouettes & Logos",
        es: "Madera - Grabado Rápido / Siluetas y Logotipos"
      },
      algo: "threshold", linesPerMm: 5.0, minPower: 0, maxPower: 850, speed: 4500, passes: 1, laserMode: "M4", invert: false,
      tip: {
        en: "Sharp high-contrast black lines at high speed for text and logos.",
        es: "Líneas negras nítidas de alto contraste a gran velocidad para textos y logos."
      }
    },
    {
      id: "wood_cut_balsa_2mm",
      category: { en: "🪵 Wood", es: "🪵 Madera" },
      type: "cut",
      name: {
        en: "Balsa Wood 2mm - Clean Cut",
        es: "Madera Balsa 2mm - Corte Limpio"
      },
      algo: "threshold", linesPerMm: 6.0, minPower: 0, maxPower: 950, speed: 550, passes: 1, laserMode: "M3", invert: false,
      tip: {
        en: "Full cut in 1 pass at 550 mm/min. Clean edges without charring.",
        es: "Corte completo en 1 pasada a 550 mm/min. Bordes limpios sin carbonización."
      }
    },
    {
      id: "wood_cut_plywood_3mm",
      category: { en: "🪵 Wood", es: "🪵 Madera" },
      type: "cut",
      name: {
        en: "Plywood 3mm - Multi-pass Cut",
        es: "Madera Contrachapada (Plywood) 3mm - Corte"
      },
      algo: "threshold", linesPerMm: 6.0, minPower: 0, maxPower: 1000, speed: 220, passes: 3, laserMode: "M3", invert: false,
      tip: {
        en: "Requires 3 passes at 220 mm/min with 5W. Use masking tape or Air Assist to prevent smoke stains.",
        es: "Con 5W requiere 3 pasadas a 220 mm/min. Usa cinta de carrocero o Air Assist para evitar humo."
      }
    },
    {
      id: "fabric_cut_cotton",
      category: { en: "🧵 Fabric", es: "🧵 Tela" },
      type: "cut",
      name: {
        en: "Fabric / Cotton / Silk - Fine Cut",
        es: "Tela / Algodón / Seda - Corte Fino"
      },
      algo: "threshold", linesPerMm: 5.0, minPower: 0, maxPower: 350, speed: 4200, passes: 1, laserMode: "M3", invert: false,
      tip: {
        en: "Cuts and heat-seals edges to prevent fraying. Keep moderate power to avoid scorching.",
        es: "Corta y sella los bordes para que no se deshilachen. Mantén potencia moderada para no quemar."
      }
    },
    {
      id: "fabric_engrave_denim",
      category: { en: "🧵 Fabric", es: "🧵 Tela" },
      type: "engrave",
      name: {
        en: "Denim / Jeans - Fading & Engraving",
        es: "Tela Vaquera (Denim / Jeans) - Decolorado / Grabado"
      },
      algo: "dither_fs", linesPerMm: 6.0, minPower: 0, maxPower: 260, speed: 4500, passes: 1, laserMode: "M4", invert: false,
      tip: {
        en: "Bleaches outer indigo dye creating crisp white contrast without breaking fibers.",
        es: "Decolora el tinte índigo exterior creando contraste blanco nítido sin romper las fibras."
      }
    },
    {
      id: "paper_cut_80g",
      category: { en: "📄 Paper", es: "📄 Papel" },
      type: "cut",
      name: {
        en: "Standard Paper (80g) - Precision Cut",
        es: "Papel Común (80g) - Corte de Precisión"
      },
      algo: "threshold", linesPerMm: 5.0, minPower: 0, maxPower: 220, speed: 5500, passes: 1, laserMode: "M3", invert: false,
      tip: {
        en: "High speed and low power to prevent yellowing or burning the paper.",
        es: "Velocidad alta y potencia mínima para no quemar ni amarillear el papel."
      }
    },
    {
      id: "cardstock_cut_250g",
      category: { en: "📑 Cardstock", es: "📑 Cartulina" },
      type: "cut",
      name: {
        en: "Heavy Cardstock (200g - 300g) - Cut",
        es: "Cartulina Gruesa (200g - 300g) - Corte"
      },
      algo: "threshold", linesPerMm: 6.0, minPower: 0, maxPower: 550, speed: 3200, passes: 1, laserMode: "M3", invert: false,
      tip: {
        en: "Clean continuous cut in 1 pass. Ideal for stencils, packaging, and crafts.",
        es: "Corte continuo limpio en 1 sola pasada. Ideal para plantillas, cajas y manualidades."
      }
    },
    {
      id: "cardboard_cut_corrugated",
      category: { en: "📦 Cardboard", es: "📦 Cartón" },
      type: "cut",
      name: {
        en: "Corrugated Cardboard 3-4mm - Cut",
        es: "Cartón Corrugado 3-4mm - Corte"
      },
      algo: "threshold", linesPerMm: 5.0, minPower: 0, maxPower: 900, speed: 1200, passes: 2, laserMode: "M3", invert: false,
      tip: {
        en: "2 passes at medium speed prevents inner fluting from overheating.",
        es: "2 pasadas a velocidad media evitan que el canal interior corrugado se sobrecaliente."
      }
    },
    {
      id: "acrylic_dark_engrave",
      category: { en: "🧴 Plastic / Acrylic", es: "🧴 Plástico / Acrílico" },
      type: "engrave",
      name: {
        en: "Black / Dark Acrylic - Engraving",
        es: "Acrílico Negro / Opaco - Grabado"
      },
      algo: "grayscale", linesPerMm: 8.0, minPower: 50, maxPower: 600, speed: 2800, passes: 1, laserMode: "M4", invert: true,
      tip: {
        en: "High-contrast matte finish. (Must be dark as 450nm diode does not absorb in clear acrylic).",
        es: "Acabado mate de gran contraste. (Debe ser oscuro ya que el diodo de 450nm no absorbe en acrílico transparente)."
      }
    },
    {
      id: "bakelite_direct_engrave",
      category: { en: "⚡ Bakelite & PCB", es: "⚡ Baquelita & PCB" },
      type: "engrave",
      name: {
        en: "Bakelite / FR2 Board - Direct Engraving",
        es: "Baquelita / Placa FR2 - Grabado Directo"
      },
      algo: "dither_atkinson", linesPerMm: 8.0, minPower: 50, maxPower: 850, speed: 2200, passes: 1, laserMode: "M4", invert: false,
      tip: {
        en: "Phenolic resin darkens permanently without impairing insulating properties.",
        es: "La resina fenólica se oscurece y marca permanentemente sin alterar las propiedades aislantes."
      }
    },
    {
      id: "copper_mask_ablation",
      category: { en: "🪙 Copper", es: "🪙 Cobre" },
      type: "engrave",
      name: {
        en: "Copper - Etch-Resist Mask Ablation",
        es: "Cobre - Grabado de Pistas por Máscara (Etch-Resist)"
      },
      algo: "threshold", linesPerMm: 10.0, minPower: 0, maxPower: 700, speed: 2400, passes: 1, laserMode: "M4", invert: false,
      tip: {
        en: "Coat copper board with matte black enamel. Laser vaporizes paint where copper will be etched.",
        es: "Pinta la placa de cobre con esmalte negro mate. El láser vaporiza la pintura donde va el cobre a corroer."
      }
    },
    {
      id: "aluminum_anodized_black",
      category: { en: "🔘 Aluminum", es: "🔘 Aluminio" },
      type: "engrave",
      name: {
        en: "Black Anodized Aluminum - Bright White Marking",
        es: "Aluminio Anodizado Negro / Color - Marcado Blanco Brillante"
      },
      algo: "dither_atkinson", linesPerMm: 8.0, minPower: 0, maxPower: 880, speed: 2200, passes: 1, laserMode: "M4", invert: true,
      tip: {
        en: "Laser bleaches anodic dye leaving bright white permanent contrast.",
        es: "El láser blanquea el tinte del óxido anódico dejando un contraste blanco brillante."
      }
    }
  ];

  let customProfiles = JSON.parse(localStorage.getItem("falcon_laser_custom_profiles") || "[]");

  function getAllProfiles() {
    return [...DEFAULT_MATERIAL_PROFILES_5W, ...customProfiles];
  }

  function getLocalizedText(obj) {
    if (!obj) return "";
    if (typeof obj === "string") return obj;
    return obj[currentLang] || obj["en"] || "";
  }

  function populatePresetDropdown() {
    const all = getAllProfiles();
    const categories = {};
    all.forEach(p => {
      const cat = getLocalizedText(p.category) || (currentLang === "es" ? "Otros" : "Other");
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(p);
    });

    const prevVal = presetSelect.value;
    presetSelect.innerHTML = "";

    for (const [catName, list] of Object.entries(categories)) {
      const optGroup = document.createElement("optgroup");
      optGroup.label = catName;
      list.forEach(p => {
        const opt = document.createElement("option");
        opt.value = p.id;
        const typeLabel = (p.type === "cut") ? t("customProfileCut") : t("customProfileEngrave");
        opt.textContent = `${typeLabel} ${getLocalizedText(p.name)}`;
        optGroup.appendChild(opt);
      });
      presetSelect.appendChild(optGroup);
    }

    if (prevVal && all.some(p => p.id === prevVal)) {
      presetSelect.value = prevVal;
    } else {
      presetSelect.value = "wood_engrave_detailed";
    }
    applySelectedMaterialProfile();
  }

  function applySelectedMaterialProfile() {
    const selId = presetSelect.value;
    const all = getAllProfiles();
    const prof = all.find(p => p.id === selId);
    if (!prof) return;

    const watt = machineWattSelect ? machineWattSelect.value : "5w";
    const multiplier = MACHINE_POWER_MODELS[watt] ? MACHINE_POWER_MODELS[watt].multiplier : 1.0;
    const scaledSpeed = Math.round(prof.speed * multiplier);

    minPower.value = prof.minPower;
    maxPower.value = prof.maxPower;
    speedEngrave.value = scaledSpeed;
    passCount.value = prof.passes;
    laserMode.value = prof.laserMode;
    algoSelect.value = prof.algo;
    linesPerMm.value = prof.linesPerMm;
    chkInvert.checked = prof.invert;

    matCardTitle.textContent = getLocalizedText(prof.name);
    matCardBadge.textContent = (prof.type === "cut") ? (currentLang === "es" ? "CORTE" : "CUT") : (currentLang === "es" ? "GRABADO" : "ENGRAVE");
    matCardBadge.className = `mat-card-badge ${prof.type === "cut" ? "cut" : "engrave"}`;
    matCardPower.textContent = `S${prof.minPower} - S${prof.maxPower} (${Math.round((prof.maxPower/1000)*100)}%)`;
    matCardSpeed.textContent = `${scaledSpeed} mm/min`;
    matCardPasses.textContent = `${prof.passes} ${prof.passes === 1 ? t("passSingular") : t("passPlural")}`;
    matCardMode.textContent = `${prof.laserMode} (${prof.laserMode === "M4" ? (currentLang === "es" ? "Dinámico" : "Dynamic") : (currentLang === "es" ? "Constante" : "Constant")})`;
    matCardTip.textContent = `💡 ${getLocalizedText(prof.tip)}`;

    const isCustom = customProfiles.some(cp => cp.id === prof.id);
    customProfileActions.style.display = isCustom ? "block" : "none";

    updateSummaryStrip();
  }

  presetSelect.addEventListener("change", applySelectedMaterialProfile);
  if (machineWattSelect) machineWattSelect.addEventListener("change", applySelectedMaterialProfile);

  if (btnSaveCustomProfile) {
    btnSaveCustomProfile.addEventListener("click", () => {
      const name = prompt(t("promptProfileName"));
      if (!name || !name.trim()) return;

      const newId = "custom_" + Date.now();
      const newProf = {
        id: newId,
        category: t("customProfilesCategory"),
        type: (laserMode.value === "M3") ? "cut" : "engrave",
        name: name.trim(),
        algo: algoSelect.value,
        linesPerMm: parseFloat(linesPerMm.value),
        minPower: parseInt(minPower.value) || 0,
        maxPower: parseInt(maxPower.value) || 800,
        speed: parseInt(speedEngrave.value) || 3000,
        passes: parseInt(passCount.value) || 1,
        laserMode: laserMode.value,
        invert: chkInvert.checked,
        tip: (currentLang === "es") ? "Perfil personalizado guardado por el usuario." : "Custom profile saved by user."
      };

      customProfiles.push(newProf);
      localStorage.setItem("falcon_laser_custom_profiles", JSON.stringify(customProfiles));
      populatePresetDropdown();
      presetSelect.value = newId;
      applySelectedMaterialProfile();
      alert(t("alertProfileSaved", name));
    });
  }

  if (btnDeleteCustomProfile) {
    btnDeleteCustomProfile.addEventListener("click", () => {
      const selId = presetSelect.value;
      if (!confirm(t("confirmDeleteProfile"))) return;
      customProfiles = customProfiles.filter(cp => cp.id !== selId);
      localStorage.setItem("falcon_laser_custom_profiles", JSON.stringify(customProfiles));
      populatePresetDropdown();
    });
  }

  // ============================================================
  // 6. CANVAS INTERACTIVO 2D (MESA CREALITY FALCON 400x400 mm)
  // ============================================================
  function resizeCanvas() {
    bedCanvas.width = canvasContainer.clientWidth;
    bedCanvas.height = canvasContainer.clientHeight - 30;
  }
  window.addEventListener("resize", () => {
    resizeCanvas();
    drawBed();
  });
  resizeCanvas();

  function mmToPxX(mmX) {
    return state.offsetX + (mmX * state.zoom);
  }
  function mmToPxY(mmY) {
    return state.offsetY + ((state.bedHeightMm - mmY) * state.zoom);
  }
  function pxToMmX(pxX) {
    return (pxX - state.offsetX) / state.zoom;
  }
  function pxToMmY(pxY) {
    return state.bedHeightMm - ((pxY - state.offsetY) / state.zoom);
  }

  btnResetView.addEventListener("click", () => {
    const minDim = Math.min(bedCanvas.width, bedCanvas.height);
    state.zoom = (minDim * 0.85) / state.bedWidthMm;
    state.offsetX = (bedCanvas.width - (state.bedWidthMm * state.zoom)) / 2;
    state.offsetY = (bedCanvas.height - (state.bedHeightMm * state.zoom)) / 2;
    drawBed();
  });
  btnZoomIn.addEventListener("click", () => { state.zoom *= 1.25; drawBed(); });
  btnZoomOut.addEventListener("click", () => { state.zoom /= 1.25; drawBed(); });

  bedCanvas.addEventListener("wheel", (e) => {
    e.preventDefault();
    const mouseMmX = pxToMmX(e.offsetX);
    const mouseMmY = pxToMmY(e.offsetY);
    const factor = e.deltaY < 0 ? 1.15 : 0.87;
    state.zoom *= factor;
    state.offsetX = e.offsetX - (mouseMmX * state.zoom);
    state.offsetY = e.offsetY - ((state.bedHeightMm - mouseMmY) * state.zoom);
    drawBed();
  });

  function getHandleAtPoint(mmX, mmY) {
    const active = getActiveImage();
    if (!active) return null;
    const handleThresholdMm = 6.0 / state.zoom;

    const left = active.x;
    const right = active.x + active.w;
    const bottom = active.y;
    const top = active.y + active.h;

    if (Math.hypot(mmX - left, mmY - top) <= handleThresholdMm) return "TL";
    if (Math.hypot(mmX - right, mmY - top) <= handleThresholdMm) return "TR";
    if (Math.hypot(mmX - left, mmY - bottom) <= handleThresholdMm) return "BL";
    if (Math.hypot(mmX - right, mmY - bottom) <= handleThresholdMm) return "BR";
    return null;
  }

  function findImageAtPoint(mmX, mmY) {
    for (let i = state.images.length - 1; i >= 0; i--) {
      const img = state.images[i];
      if (mmX >= img.x && mmX <= (img.x + img.w) && mmY >= img.y && mmY <= (img.y + img.h)) {
        return img;
      }
    }
    return null;
  }

  bedCanvas.addEventListener("mousedown", (e) => {
    const mouseMmX = pxToMmX(e.offsetX);
    const mouseMmY = pxToMmY(e.offsetY);

    const handle = getHandleAtPoint(mouseMmX, mouseMmY);
    const active = getActiveImage();

    if (handle && active) {
      state.interactionMode = "RESIZE_HANDLE";
      state.activeHandle = handle;
      state.dragStartMouseX = mouseMmX;
      state.dragStartMouseY = mouseMmY;
      state.dragStartImgX = active.x;
      state.dragStartImgY = active.y;
      state.dragStartImgW = active.w;
      state.dragStartImgH = active.h;
      return;
    }

    const clickedImg = findImageAtPoint(mouseMmX, mouseMmY);
    if (clickedImg) {
      if (state.activeImageId !== clickedImg.id) {
        selectImage(clickedImg.id);
      }
      state.interactionMode = "DRAG_IMAGE";
      state.dragStartMouseX = mouseMmX;
      state.dragStartMouseY = mouseMmY;
      state.dragStartImgX = clickedImg.x;
      state.dragStartImgY = clickedImg.y;
      return;
    }

    state.interactionMode = "PAN_BED";
    state.dragStartMouseX = e.clientX - state.offsetX;
    state.dragStartMouseY = e.clientY - state.offsetY;
  });

  window.addEventListener("mousemove", (e) => {
    const rect = bedCanvas.getBoundingClientRect();
    const mouseCanvasX = e.clientX - rect.left;
    const mouseCanvasY = e.clientY - rect.top;
    const mouseMmX = pxToMmX(mouseCanvasX);
    const mouseMmY = pxToMmY(mouseCanvasY);

    if (mouseCanvasX >= 0 && mouseCanvasX <= bedCanvas.width && mouseCanvasY >= 0 && mouseCanvasY <= bedCanvas.height) {
      legendCursorCoords.textContent = `X: ${Math.round(mouseMmX * 10) / 10} mm | Y: ${Math.round(mouseMmY * 10) / 10} mm`;
    }

    if (state.interactionMode === "NONE") {
      const handle = getHandleAtPoint(mouseMmX, mouseMmY);
      if (handle === "TL" || handle === "BR") {
        bedCanvas.style.cursor = "nwse-resize";
      } else if (handle === "TR" || handle === "BL") {
        bedCanvas.style.cursor = "nesw-resize";
      } else if (findImageAtPoint(mouseMmX, mouseMmY)) {
        bedCanvas.style.cursor = "move";
      } else {
        bedCanvas.style.cursor = "crosshair";
      }
    }

    const active = getActiveImage();

    if (state.interactionMode === "DRAG_IMAGE" && active) {
      const deltaX = mouseMmX - state.dragStartMouseX;
      const deltaY = mouseMmY - state.dragStartMouseY;
      active.x = Math.round((state.dragStartImgX + deltaX) * 10) / 10;
      active.y = Math.round((state.dragStartImgY + deltaY) * 10) / 10;
      posImgX.value = active.x;
      posImgY.value = active.y;
      renderImageListMenu();
      updateSummaryStrip();
      drawBed();
    } else if (state.interactionMode === "RESIZE_HANDLE" && active) {
      const deltaX = mouseMmX - state.dragStartMouseX;
      let newW = state.dragStartImgW;

      if (state.activeHandle === "TR" || state.activeHandle === "BR") {
        newW = Math.max(8, state.dragStartImgW + deltaX);
      } else if (state.activeHandle === "TL" || state.activeHandle === "BL") {
        newW = Math.max(8, state.dragStartImgW - deltaX);
        active.x = Math.round((state.dragStartImgX + (state.dragStartImgW - newW)) * 10) / 10;
      }

      active.w = Math.round(newW * 10) / 10;
      if (active.aspectLocked && active.aspectRatio) {
        active.h = Math.round((active.w / active.aspectRatio) * 10) / 10;
      }
      dimWidth.value = active.w;
      dimHeight.value = active.h;
      posImgX.value = active.x;
      renderImageListMenu();
      updateSummaryStrip();
      drawBed();
    } else if (state.interactionMode === "PAN_BED") {
      state.offsetX = e.clientX - state.dragStartMouseX;
      state.offsetY = e.clientY - state.dragStartMouseY;
      drawBed();
    }
  });

  window.addEventListener("mouseup", () => {
    state.interactionMode = "NONE";
    bedCanvas.style.cursor = "crosshair";
    checkOutOfBounds();
  });

  function drawBed() {
    ctx.clearRect(0, 0, bedCanvas.width, bedCanvas.height);

    const bW = state.bedWidthMm;
    const bH = state.bedHeightMm;

    const x0 = mmToPxX(0);
    const y0 = mmToPxY(0);
    const xMax = mmToPxX(bW);
    const yMax = mmToPxY(bH);

    // Fondo de la Mesa Creality Falcon
    ctx.fillStyle = "#090d14";
    ctx.fillRect(x0, yMax, xMax - x0, y0 - yMax);

    ctx.strokeStyle = "#1f2d47";
    ctx.lineWidth = 2.5;
    ctx.strokeRect(x0, yMax, xMax - x0, y0 - yMax);

    // Cuadrícula Milimétrica
    for (let x = 0; x <= bW; x += 10) {
      const isMajor = (x % 50 === 0);
      ctx.lineWidth = isMajor ? 1.2 : 0.6;
      ctx.strokeStyle = isMajor ? "#1a2538" : "#0e1420";
      ctx.beginPath();
      ctx.moveTo(mmToPxX(x), mmToPxY(0));
      ctx.lineTo(mmToPxX(x), mmToPxY(bH));
      ctx.stroke();

      if (isMajor && x > 0 && x < bW) {
        ctx.fillStyle = "#3f506d";
        ctx.font = "9px monospace";
        ctx.fillText(`${x}`, mmToPxX(x) - 8, mmToPxY(0) + 12);
      }
    }

    for (let y = 0; y <= bH; y += 10) {
      const isMajor = (y % 50 === 0);
      ctx.lineWidth = isMajor ? 1.2 : 0.6;
      ctx.strokeStyle = isMajor ? "#1a2538" : "#0e1420";
      ctx.beginPath();
      ctx.moveTo(mmToPxX(0), mmToPxY(y));
      ctx.lineTo(mmToPxX(bW), mmToPxY(y));
      ctx.stroke();

      if (isMajor && y > 0 && y < bH) {
        ctx.fillStyle = "#3f506d";
        ctx.font = "9px monospace";
        ctx.fillText(`${y}`, mmToPxX(0) - 24, mmToPxY(y) + 3);
      }
    }

    // Origen Físico (0,0)
    ctx.fillStyle = "#00e676";
    ctx.beginPath();
    ctx.arc(x0, y0, 5, 0, Math.PI * 2);
    ctx.fill();

    // DIBUJAR TODAS LAS IMÁGENES
    state.images.forEach((img, idx) => {
      const imgX = mmToPxX(img.x);
      const imgY = mmToPxY(img.y + img.h);
      const imgW = img.w * state.zoom;
      const imgH = img.h * state.zoom;
      const isSelected = (img.id === state.activeImageId);

      ctx.save();
      ctx.globalAlpha = img.printEnabled ? (isSelected ? 0.95 : 0.75) : 0.32;
      ctx.drawImage(img.imageObj, imgX, imgY, imgW, imgH);
      ctx.restore();

      const isOver = (img.x + img.w > bW) || (img.y + img.h > bH) || (img.x < 0) || (img.y < 0);

      if (isSelected) {
        ctx.strokeStyle = isOver ? "#ff2a5f" : (img.printEnabled ? "#00e5ff" : "#8c9bb4");
        ctx.lineWidth = 1.8;
        ctx.setLineDash([4, 3]);
        ctx.strokeRect(imgX, imgY, imgW, imgH);
        ctx.setLineDash([]);

        const handleRadius = 4.5;
        ctx.fillStyle = isOver ? "#ff2a5f" : (img.printEnabled ? "#00e5ff" : "#8c9bb4");
        const corners = [
          [imgX, imgY],
          [imgX + imgW, imgY],
          [imgX, imgY + imgH],
          [imgX + imgW, imgY + imgH]
        ];
        corners.forEach(([cx, cy]) => {
          ctx.beginPath();
          ctx.arc(cx, cy, handleRadius, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 1;
          ctx.stroke();
        });

        ctx.fillStyle = isOver ? "#ff2a5f" : (img.printEnabled ? "#00e5ff" : "#8c9bb4");
        ctx.font = "bold 10px monospace";
        ctx.fillText(`#${idx+1} [${img.w} × ${img.h} mm]`, imgX + 6, imgY - 6);

      } else {
        ctx.strokeStyle = isOver ? "#ff2a5f" : (img.printEnabled ? "rgba(0, 229, 255, 0.4)" : "rgba(140, 155, 180, 0.25)");
        ctx.lineWidth = 1.0;
        if (!img.printEnabled) ctx.setLineDash([3, 3]);
        ctx.strokeRect(imgX, imgY, imgW, imgH);
        ctx.setLineDash([]);

        ctx.fillStyle = img.printEnabled ? "#8c9bb4" : "#5a6880";
        ctx.font = "9px monospace";
        ctx.fillText(`#${idx+1}`, imgX + 4, imgY + 12);
      }
    });

    // DIBUJAR G-CODE SOBRE LA MESA
    if (state.importedGcode) {
      const g = state.importedGcode;

      if (g.rapidLines && g.rapidLines.length > 0) {
        ctx.strokeStyle = "rgba(0, 229, 255, 0.22)";
        ctx.lineWidth = 0.8;
        ctx.setLineDash([2, 2]);
        ctx.beginPath();
        for (let i = 0; i < g.rapidLines.length; i++) {
          const [rx1, ry1, rx2, ry2] = g.rapidLines[i];
          ctx.moveTo(mmToPxX(rx1), mmToPxY(ry1));
          ctx.lineTo(mmToPxX(rx2), mmToPxY(ry2));
        }
        ctx.stroke();
        ctx.setLineDash([]);
      }

      if (g.cutLines && g.cutLines.length > 0) {
        ctx.strokeStyle = "#ff9100";
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        for (let i = 0; i < g.cutLines.length; i++) {
          const [cx1, cy1, cx2, cy2] = g.cutLines[i];
          ctx.moveTo(mmToPxX(cx1), mmToPxY(cy1));
          ctx.lineTo(mmToPxX(cx2), mmToPxY(cy2));
        }
        ctx.stroke();
      }

      const b = g.bounds;
      const bx = mmToPxX(b.minX);
      const by = mmToPxY(b.maxY);
      const bw = b.width * state.zoom;
      const bh = b.height * state.zoom;

      const isOver = (b.maxX > bW) || (b.maxY > bH) || (b.minX < 0) || (b.minY < 0);
      ctx.strokeStyle = isOver ? "#ff2a5f" : "#ff9100";
      ctx.lineWidth = 1.8;
      ctx.setLineDash([5, 4]);
      ctx.strokeRect(bx, by, bw, bh);
      ctx.setLineDash([]);

      ctx.fillStyle = isOver ? "#ff2a5f" : "#ff9100";
      ctx.font = "bold 10px monospace";
      ctx.fillText(`📄 ${g.filename} (${b.width.toFixed(1)} × ${b.height.toFixed(1)} mm)`, bx + 6, by - 6);
    }

    // PLUMA VIRTUAL DE TRAZADO
    const penX = mmToPxX(state.virtualPen.x);
    const penY = mmToPxY(state.virtualPen.y);

    if (state.virtualPen.laserOn) {
      const laserGlow = ctx.createRadialGradient(penX, penY, 2, penX, penY, 18);
      laserGlow.addColorStop(0, "rgba(255, 42, 95, 0.95)");
      laserGlow.addColorStop(0.4, "rgba(255, 145, 0, 0.6)");
      laserGlow.addColorStop(1, "rgba(255, 42, 95, 0)");
      ctx.fillStyle = laserGlow;
      ctx.beginPath();
      ctx.arc(penX, penY, 18, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.strokeStyle = "#ff2a5f";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(penX - 10, penY); ctx.lineTo(penX + 10, penY);
    ctx.moveTo(penX, penY - 10); ctx.lineTo(penX + 10, penY);
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(penX, penY, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }

  setTimeout(() => btnResetView.click(), 120);

  // ============================================================
  // 7. GENERADOR DE G-CODE PRINCIPAL (MÚLTIPLES IMÁGENES)
  // ============================================================
  async function generateGcodeForCurrentPosition() {
    const activeItems = state.images.filter(i => i.printEnabled);

    if (state.images.length === 0) {
      alert(t("alertNoImages"));
      return null;
    }

    if (activeItems.length === 0) {
      alert(t("alertNoActiveImages"));
      return null;
    }

    setGeneratingState(true);

    const payload = {
      lines_per_mm: parseFloat(linesPerMm.value),
      speed_engrave: parseFloat(speedEngrave.value),
      speed_travel: 6000.0,
      min_power: parseInt(minPower.value),
      max_power: parseInt(maxPower.value),
      laser_mode: laserMode.value,
      auto_home_end: chkAutoHomeEnd ? chkAutoHomeEnd.checked : true,
      auto_home_between: chkAutoHomeBetween ? chkAutoHomeBetween.checked : true,
      hardware_homing: chkHardwareHoming ? chkHardwareHoming.checked : true,
      items: activeItems.map(img => ({
        id: img.id,
        name: img.name,
        image_base64: img.base64,
        width_mm: img.w,
        height_mm: img.h,
        origin_x: img.x,
        origin_y: img.y,
        lines_per_mm: parseFloat(linesPerMm.value),
        speed_engrave: parseFloat(speedEngrave.value),
        speed_travel: 6000.0,
        min_power: parseInt(minPower.value),
        max_power: parseInt(maxPower.value),
        laser_mode: laserMode.value,
        algorithm: algoSelect.value,
        brightness: parseFloat(sliderBrightness.value),
        contrast: parseFloat(sliderContrast.value),
        gamma: 1.0,
        invert: chkInvert.checked,
        passes: parseInt(passCount.value),
        print_enabled: true
      }))
    };

    try {
      const res = await fetch("/api/generate_gcode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        state.generatedJob = data;

        const parsed = parseGcode(data.gcode, data.filename || `falcon_multi_${activeItems.length}_images.gcode`);
        state.importedGcode = parsed;

        jobStatusBadge.className = "job-badge generated";
        jobStatusBadge.textContent = t("gcodeReadyBadge", activeItems.length);
        jobInfoLines.textContent = `${data.line_count.toLocaleString()} ${t("lines")}`;
        jobInfoTime.textContent = `${t("estTime")}: ${data.estimated_time_formatted}`;

        updateSummaryStrip();
        drawBed();
        return data;
      } else {
        alert(`Error: ${data.error}`);
        return null;
      }
    } catch (e) {
      alert(`Network / communication error: ${e.message}`);
      return null;
    } finally {
      setGeneratingState(false);
    }
  }

  function setGeneratingState(isGen) {
    if (isGen) {
      btnMainGenerate.disabled = true;
      btnMainGenerate.textContent = t("btnGeneratingHero");
      if (btnGenerateGcode) {
        btnGenerateGcode.disabled = true;
        btnGenerateGcode.textContent = t("btnGeneratingSide");
      }
      if (btnGenerateGcodeTop) {
        btnGenerateGcodeTop.disabled = true;
        btnGenerateGcodeTop.textContent = t("btnGeneratingTop");
      }
      jobStatusBadge.className = "job-badge idle";
      jobStatusBadge.textContent = t("calculatingBadge");
    } else {
      btnMainGenerate.disabled = false;
      btnMainGenerate.textContent = t("btnMainGenerate");
      if (btnGenerateGcode) {
        btnGenerateGcode.disabled = false;
        btnGenerateGcode.textContent = t("btnGenerateGcodeSide");
      }
      if (btnGenerateGcodeTop) {
        btnGenerateGcodeTop.disabled = false;
        btnGenerateGcodeTop.textContent = t("btnGenerateGcodeTop");
      }
    }
  }

  btnMainGenerate.addEventListener("click", async () => {
    const job = await generateGcodeForCurrentPosition();
    if (job) {
      const activeCount = state.images.filter(i => i.printEnabled).length;
      alert(t("alertGcodeSuccess", activeCount, state.images.length, job.line_count, job.estimated_time_formatted));
    }
  });

  if (btnGenerateGcode) btnGenerateGcode.addEventListener("click", () => btnMainGenerate.click());
  if (btnGenerateGcodeTop) btnGenerateGcodeTop.addEventListener("click", () => btnMainGenerate.click());

  // ============================================================
  // 8. SIMULADOR VIRTUAL DE TRAZADO
  // ============================================================
  btnSimulateTrace.addEventListener("click", () => {
    if (state.isSimulating) {
      stopSimulation();
    } else {
      startSimulation();
    }
  });

  function startSimulation() {
    let lines = [];
    if (state.importedGcode && state.importedGcode.cutLines && state.importedGcode.cutLines.length > 0) {
      lines = state.importedGcode.cutLines;
    }

    if (!lines || lines.length === 0) {
      alert(t("alertNeedGcodeForSim"));
      return;
    }

    state.isSimulating = true;
    state.simIndex = 0;
    btnSimulateTrace.textContent = t("stopSimulationBtn");
    btnSimulateTrace.classList.remove("btn-accent");
    btnSimulateTrace.classList.add("btn-danger");
    jobStatusBadge.className = "job-badge simulating";
    jobStatusBadge.textContent = t("simulatingBadge");

    runSimStep(lines);
  }

  function runSimStep(lines) {
    if (!state.isSimulating) return;

    const stepSize = Math.max(1, Math.floor(lines.length / 400));
    state.simIndex = Math.min(lines.length - 1, state.simIndex + stepSize);

    const curLine = lines[state.simIndex];
    if (curLine) {
      state.virtualPen.x = curLine[2];
      state.virtualPen.y = curLine[3];
      state.virtualPen.laserOn = true;
      state.virtualPen.power = curLine[4] || 500;
    }

    drawBed();

    if (state.simIndex >= lines.length - 1) {
      stopSimulation();
      jobStatusBadge.className = "job-badge generated";
      jobStatusBadge.textContent = t("simulationCompletedBadge");
      return;
    }

    state.simAnimId = requestAnimationFrame(() => runSimStep(lines));
  }

  function stopSimulation() {
    state.isSimulating = false;
    if (state.simAnimId) cancelAnimationFrame(state.simAnimId);
    state.virtualPen.laserOn = false;
    btnSimulateTrace.textContent = t("simulateTraceBtn");
    btnSimulateTrace.classList.remove("btn-danger");
    btnSimulateTrace.classList.add("btn-accent");
    if (state.importedGcode || state.generatedJob) {
      jobStatusBadge.className = "job-badge generated";
      jobStatusBadge.textContent = t("gcodeReadyShort");
    } else {
      jobStatusBadge.className = "job-badge idle";
      jobStatusBadge.textContent = t("jobStatusWaiting");
    }
    drawBed();
  }

  // ============================================================
  // 9. EXPORTACIÓN CON DIÁLOGO NATIVO GTK DE LINUX
  // ============================================================
  async function exportCurrentGcode(extension = "gcode") {
    let gcodeText = "";
    let baseName = "falcon_job";

    if (state.sourceMode === "GCODE" && state.importedGcode) {
      gcodeText = state.importedGcode.rawGcode;
      baseName = state.importedGcode.filename.replace(/\.[^/.]+$/, "") || "falcon_imported";
    } else if (state.generatedJob && state.generatedJob.gcode) {
      gcodeText = state.generatedJob.gcode;
      const count = state.images.filter(i => i.printEnabled).length;
      baseName = `falcon_multi_${count}_images`;
    }

    if (!gcodeText) {
      const activeCount = state.images.filter(i => i.printEnabled).length;
      if (activeCount > 0) {
        if (confirm(t("confirmGenBeforeExport", activeCount))) {
          const job = await generateGcodeForCurrentPosition();
          if (job && job.gcode) {
            gcodeText = job.gcode;
            baseName = `falcon_multi_${activeCount}_images`;
          } else {
            return;
          }
        } else {
          return;
        }
      } else {
        alert(t("alertNoImagesToExport"));
        return;
      }
    }

    const today = new Date().toISOString().slice(0, 10);
    const suggested = `${baseName}_${today}.${extension}`;

    // Intentar abrir el diálogo nativo de guardado GTK de Linux con textos localizados
    try {
      const res = await fetch("/api/native_save_file", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gcode: gcodeText,
          filename: suggested,
          dialog_title: t("saveDialogTitle"),
          filter_gcode_name: t("saveDialogFilterGcode"),
          filter_all_name: t("saveDialogFilterAll")
        })
      });
      const data = await res.json();
      if (data.success && data.path) {
        jobStatusBadge.className = "job-badge generated";
        jobStatusBadge.textContent = t("savedBadge", data.filename);
        alert(t("alertSavedFile", data.path));
        return;
      } else if (data.cancelled) {
        return;
      }
    } catch (_) {}

    // Fallback estándar en navegador
    const blob = new Blob([gcodeText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = suggested;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  if (btnExportGcodeMain) btnExportGcodeMain.addEventListener("click", () => exportCurrentGcode("gcode"));
  if (btnExportNcMain) btnExportNcMain.addEventListener("click", () => exportCurrentGcode("nc"));
  if (btnExportGcodeTop) btnExportGcodeTop.addEventListener("click", () => exportCurrentGcode("gcode"));
  if (btnExportNcTop) btnExportNcTop.addEventListener("click", () => exportCurrentGcode("nc"));
  if (btnExportGcodeSide) btnExportGcodeSide.addEventListener("click", () => exportCurrentGcode("gcode"));
  if (btnExportNcSide) btnExportNcSide.addEventListener("click", () => exportCurrentGcode("nc"));
  if (btnGcodeExportCard) btnGcodeExportCard.addEventListener("click", () => exportCurrentGcode("gcode"));
  if (btnModalDownloadGcode) btnModalDownloadGcode.addEventListener("click", () => exportCurrentGcode("gcode"));

  // ============================================================
  // 10. MODAL DE INSPECCIÓN DE G-CODE
  // ============================================================
  function openGcodeViewerModal() {
    let gcode = "";
    let fname = "falcon_job.gcode";
    if (state.sourceMode === "GCODE" && state.importedGcode) {
      gcode = state.importedGcode.rawGcode;
      fname = state.importedGcode.filename;
    } else if (state.generatedJob && state.generatedJob.gcode) {
      gcode = state.generatedJob.gcode;
      const count = state.images.filter(i => i.printEnabled).length;
      fname = `falcon_multi_${count}_images.gcode`;
    }

    if (!gcode) {
      alert(t("alertNoGcodeToView"));
      return;
    }

    modalGcodeTitle.textContent = `${t("modalGcodeTitle")}: ${fname}`;
    modalGcodeStats.textContent = `${gcode.split(/\r?\n/).length.toLocaleString()} ${t("lines")}`;
    modalGcodeText.value = gcode;
    gcodeModalOverlay.style.display = "flex";
  }

  if (btnViewGcodeMain) btnViewGcodeMain.addEventListener("click", openGcodeViewerModal);
  if (btnViewGcodeModal) btnViewGcodeModal.addEventListener("click", openGcodeViewerModal);

  if (btnCloseGcodeModal) {
    btnCloseGcodeModal.addEventListener("click", () => {
      gcodeModalOverlay.style.display = "none";
    });
  }

  if (gcodeModalOverlay) {
    gcodeModalOverlay.addEventListener("click", (e) => {
      if (e.target === gcodeModalOverlay) gcodeModalOverlay.style.display = "none";
    });
  }

  if (btnCopyGcode) {
    btnCopyGcode.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(modalGcodeText.value);
        btnCopyGcode.textContent = t("copiedBadge");
        setTimeout(() => btnCopyGcode.textContent = t("copyGcodeBtn"), 2000);
      } catch {
        modalGcodeText.select();
        document.execCommand("copy");
        btnCopyGcode.textContent = t("copiedBadge");
        setTimeout(() => btnCopyGcode.textContent = t("copyGcodeBtn"), 2000);
      }
    });
  }

  // Inicialización de Idioma y UI
  setLanguage(currentLang);
});
