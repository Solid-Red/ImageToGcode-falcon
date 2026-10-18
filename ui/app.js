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
      btnOpenGcodeDir: "📁 G-Codes",
      btnOpenGcodeDirTitle: "Open predefined G-Codes folder in file manager",
      btnOpenImagesDir: "🖼️ Images",
      btnOpenImagesDirTitle: "Open predefined Images folder in file manager",
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
      btnGroup: "🔗 Group",
      btnUngroup: "🔓 Ungroup",
      btnDuplicateGroup: "📋 Duplicate Group",
      btnDuplicateImage: "📋 Duplicate Image",
      btnClearSelection: "Clear",
      selectedCount: "selected",
      groupDefaultName: (num) => `Group ${num}`,
      groupMembersCount: (count) => `(${count} images)`,
      duplicateGroupTitle: "Duplicate entire group to place more copies across the bed",
      duplicateImageTitle: "Duplicate this image",
      ungroupTitle: "Ungroup these images",
      selectForGroupTitle: "Select to group with other images",
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
      rotationBoxTitle: "🔄 Rotation & Orientation",
      btnRotateCCWTitle: "Rotate 90° Counter-Clockwise (-90°)",
      btnRotateCWTitle: "Rotate 90° Clockwise (+90°)",
      btnRotate180Title: "Rotate 180°",
      btnFlipHTitle: "Flip Horizontal (Mirror)",
      btnFlipVTitle: "Flip Vertical",
      lblCustomAngle: "Custom Angle (°):",
      btnApplyRotate: "⟳ Rotate",
      rotateLayerTitle: "Rotate 90° Clockwise",
      btnOpenTextModal: "🔤 Text",
      btnOpenTextModalLabel: "Write Letters / Text",
      btnAddTextQuick: "🔤 Text",
      btnEditTextLayer: "✏️ Edit Text",
      modalTextTitle: "🔤 Text & Letter Generator for Cutting",
      lblTextContent: "Text to cut or engrave:",
      lblFontFamily: "Font / Typography:",
      lblTextMode: "Cut / Draw Mode:",
      optTextSolid: "⬛ Solid Fill (Silhouette / Outer Cut)",
      optTextOutline: "⬜ Hollow Outline (Line Stroke / Bordered Letters)",
      lblStrokeWidth: "Stroke Width:",
      lblTargetHeight: "Height on Bed (mm):",
      lblLetterSpacing: "Spacing (px):",
      lblLivePreview: "Live Preview (Sharp):",
      textCuttingTip: "💡 <strong>Tip for Cutting:</strong> When cutting in wood or acrylic, <em>Allerta Stencil</em> or <em>Impact</em> prevents internal counters of letters like A, B, D, O, P, R from falling out.",
      btnApplyInsertText: "➕ Insert on Bed",
      btnUpdateText: "💾 Update Text",
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

      // CNC Trajectory Mode & Vector Settings (English)
      pathModeTitle: "🎯 CNC Trajectory Mode",
      badgeBarrido: "Barrido (Raster)",
      badgeSeguimiento: "Seguimiento (Curvas)",
      modeBarridoTitle: "Scanlines (Raster)",
      modeBarridoSub: "Horizontal line-by-line",
      modeSeguimientoTitle: "Curve Tracking (Vector)",
      modeSeguimientoSub: "Continuous outlines & curves",
      vectorSettingsTitle: "✒️ Curve & Pen / Plotter Settings",
      lblVectorType: "Path Tracking Method:",
      optVectorContourOuter: "✂️ Outer Silhouette (Single cut pass per piece)",
      optVectorContour: "📐 Outlines & Inner Holes (Single pass per curve)",
      optVectorCenterline: "✒️ Centerline (Single-stroke pen sketches)",
      lblCurveTolerance: "Curve Smoothing:",
      optTolFine: "Fine (0.15 mm - Detailed)",
      optTolBalanced: "Balanced (0.35 mm - Smooth)",
      optTolFast: "Fast (0.70 mm - Fast draft)",
      lblToolType: "Pen / Tool Actuation:",
      optToolLaser: "Laser / Servo (PWM M3/M5)",
      optToolZ: "Motorized Z Axis (G0 Z up / G1 Z down)",
      lblVectorOp: "Target Operation:",
      optVectorOpCut: "✂️ Laser Deep Cut (Slow: 150 - 500 mm/min)",
      optVectorOpPen: "✒️ Pen Plotter / Drawing (Fast: 1500 - 3000 mm/min)",
      optVectorOpScore: "⚡ Laser Score / Marking (Medium: 1500 - 3500 mm/min)",
      lblVectorPasses: "Cut Passes:",
      lblSpeedCut: "Cutting Speed (mm/min):",
      lblSpeedDraw: "Drawing Speed (mm/min):",
      lblSpeedPresets: "Speed:",
      lblZUp: "Z Up (Travel mm):",
      lblZDown: "Z Down (Draw mm):",
      lblZSpeed: "Z Speed (mm/min):",
      lblThreshold: "Line Detection Threshold:",
      hintSeguimiento: "💡 <strong>Curve Tracking:</strong> The CNC pen/laser glides smoothly along shapes and lines without scanning row by row.",
      hintSeguimientoCut: "💡 <strong>Deep Cut Mode:</strong> Operates at slow speed (150 - 500 mm/min) with constant laser power M3 S1000 so the beam penetrates and cleanly cuts the material without burning edges.",
      hintSeguimientoPen: "💡 <strong>Pen Plotter Mode:</strong> Operates at smooth higher speed (1500 - 3000 mm/min) following continuous curves with clean pen lifts.",
      lblItemCutStyle: "🎯 Style / Cutting Mode for this image:",
      btnStyleCut: "✂️ Cut",
      btnStyleScore: "⚡ Score",
      btnStyleRaster: "🖨️ Raster",
      btnStylePen: "🖊️ Pen",
      btnStyleCutTitle: "Deep Cut: High power (M3 S1000), slow speed (300 mm/min)",
      btnStyleScoreTitle: "Vector Score / Marking: Dynamic power (M4 S350), 1500 mm/min",
      btnStyleRasterTitle: "Raster Scan: Photo & wood engraving, 3500 mm/min",
      btnStylePenTitle: "Pen Plotter: Continuous vector tracking, 2500 mm/min",
      lblVectorLaserPower: "Laser Power S (0-1000):",
      lblVectorLaserMode: "Laser Mode:",
      lblConfiguringImage: "Configuring image:",

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
      alertGcodeSuccess: (activeCount, totalCount, lines, time, gcodePath, imgCount, imgDir) => {
        let msg = `✅ Multi-image G-Code generated successfully!\n\n• Images included: ${activeCount} of ${totalCount}\n• Total lines of code: ${lines.toLocaleString()}\n• Estimated execution time: ${time}`;
        if (gcodePath) {
          msg += `\n\n📁 Auto-saved G-Code:\n${gcodePath}`;
        }
        if (imgCount && imgCount > 0) {
          msg += `\n\n🖼️ Saved used images (${imgCount}):\n${imgDir || "output/images"}`;
        }
        msg += `\n\nYou can also export it (.gcode / .nc) or simulate virtual tracing on the bed.`;
        return msg;
      },
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
      copyGcodeBtn: "📋 Copy G-Code",
      cropBoxTitle: "✂️ Crop & Edit Image",
      badgeCropped: "Cropped",
      cropBoxHint: "Crop image to generate G-Code only for the desired section.",
      btnOpenCropModal: "Crop Image",
      btnCropImage: "Crop Image",
      btnRestoreCrop: "↺ Restore",
      cropLayerTitle: "Crop image (select area for G-Code)",
      btnOpenCropSidebar: "✂️ Crop",
      modalCropTitle: "Crop Image for G-Code Generation",
      lblCropRatio: "Aspect Ratio:",
      btnRatioFree: "Free",
      btnRatioOriginal: "Original",
      btnCropSelectAll: "⬛ All",
      btnCropCenter: "⌖ Center",
      btnCropZoomIn: "Zoom In",
      btnCropZoomOut: "Zoom Out",
      btnCropFit: "Fit View",
      cropHelpTip: "🖱️ Drag on the image to select the area. Drag handles or edges to adjust.",
      cropMetricsTitle: "📐 Crop Dimensions",
      cropLblOriginalPx: "Original Image:",
      cropLblCroppedPx: "Cropped Size:",
      cropLblBedMm: "Size on Bed:",
      cropLblPercent: "Selected Area:",
      cropLblPreview: "Cropped Preview:",
      cropGuideGcode: "G-Code will be generated ONLY for the cropped area, saving time and laser wear.",
      btnRestoreOriginal: "↺ Restore Original Image",
      btnApplyCropText: "Apply Crop",
      alertCropApplied: "Image cropped successfully. Ready for G-Code generation.",
      alertCropRestored: "Original image restored successfully.",
      alertNoImageToCrop: "Please select an image on the bed to crop.",
      moveLayerUpTitle: "Move up (engrave earlier in G-Code)",
      moveLayerDownTitle: "Move down (engrave later in G-Code)",
      btnMoveFirstTitle: "Move to top (engrave 1st)",
      btnMoveLastTitle: "Move to bottom (engrave last)",
      lblPrintOrder: "Engraving Order:",
      orderFraction: (idx, total) => `#${idx} of ${total}`,
      orderSubHint: "(G-Code sequence)"
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
      btnOpenGcodeDir: "📁 G-Codes",
      btnOpenGcodeDirTitle: "Abrir carpeta predefinida de archivos G-Code en el gestor de archivos",
      btnOpenImagesDir: "🖼️ Imágenes",
      btnOpenImagesDirTitle: "Abrir carpeta predefinida de imágenes utilizadas en el gestor de archivos",
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
      btnGroup: "🔗 Agrupar",
      btnUngroup: "🔓 Desagrupar",
      btnDuplicateGroup: "📋 Duplicar Grupo",
      btnDuplicateImage: "📋 Duplicar Imagen",
      btnClearSelection: "Desmarcar",
      selectedCount: "seleccionadas",
      groupDefaultName: (num) => `Grupo ${num}`,
      groupMembersCount: (count) => `(${count} imágenes)`,
      duplicateGroupTitle: "Duplicar todo el grupo para colocar más copias en la mesa de trabajo",
      duplicateImageTitle: "Duplicar esta imagen",
      ungroupTitle: "Desagrupar estas imágenes",
      selectForGroupTitle: "Seleccionar para agrupar con otras imágenes",
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
      rotationBoxTitle: "🔄 Rotación y Orientación",
      btnRotateCCWTitle: "Rotar 90° a la izquierda (-90°)",
      btnRotateCWTitle: "Rotar 90° a la derecha (+90°)",
      btnRotate180Title: "Rotar 180°",
      btnFlipHTitle: "Voltear Horizontal (Espejo)",
      btnFlipVTitle: "Voltear Vertical",
      lblCustomAngle: "Ángulo Libre (°):",
      btnApplyRotate: "⟳ Rotar",
      rotateLayerTitle: "Rotar 90° a la derecha",
      btnOpenTextModal: "🔤 Texto",
      btnOpenTextModalLabel: "Escribir Letras / Texto",
      btnAddTextQuick: "🔤 Texto",
      btnEditTextLayer: "✏️ Editar",
      modalTextTitle: "🔤 Generador de Texto & Letras para Corte",
      lblTextContent: "Texto a cortar o grabar:",
      lblFontFamily: "Tipografía / Fuente:",
      lblTextMode: "Modo de Trazo:",
      optTextSolid: "⬛ Relleno Sólido (Corte Exterior / Silueta)",
      optTextOutline: "⬜ Contorno Hueco (Trazo de Líneas / Letras con Borde)",
      lblStrokeWidth: "Grosor de Contorno:",
      lblTargetHeight: "Altura en Mesa (mm):",
      lblLetterSpacing: "Espaciado (px):",
      lblLivePreview: "Vista Previa Nítida:",
      textCuttingTip: "💡 <strong>Consejo para Corte:</strong> Al cortar en madera o acrílico, la fuente <em>Allerta Stencil</em> o <em>Impact</em> evita que los centros de letras como A, B, D, O, P, R o números como 0, 4, 6, 8, 9 se caigan al cortar.",
      btnApplyInsertText: "➕ Insertar en la Mesa",
      btnUpdateText: "💾 Actualizar Texto",
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

      // Modo de Trayectoria CNC & Ajustes Vectoriales (Español)
      pathModeTitle: "🎯 Modo de Trayectoria CNC",
      badgeBarrido: "Barrido (Raster)",
      badgeSeguimiento: "Seguimiento (Curvas)",
      modeBarridoTitle: "Barrido (Raster)",
      modeBarridoSub: "Línea por línea horizontal",
      modeSeguimientoTitle: "Seguimiento (Curvas)",
      modeSeguimientoSub: "Trazado continuo y contornos",
      vectorSettingsTitle: "✒️ Ajustes de Curvas y Pluma / Plotter",
      lblVectorType: "Tipo de Seguimiento:",
      optVectorContourOuter: "✂️ Silueta Exterior (1 sola pasada limpia por pieza)",
      optVectorContour: "📐 Contornos y Huecos Interiores (1 pasada por curva)",
      optVectorCenterline: "✒️ Centro de Línea (Trazo único de pluma)",
      lblCurveTolerance: "Suavizado de Curvas:",
      optTolFine: "Fino (0.15 mm - Curvas detalladas)",
      optTolBalanced: "Equilibrado (0.35 mm - Suave y fluido)",
      optTolFast: "Rápido (0.70 mm - Trazo ligero)",
      lblToolType: "Control de Pluma / Herramienta:",
      optToolLaser: "Láser / Servo (PWM M3/M5)",
      optToolZ: "Eje Z Motorizado (G0 Z arriba / G1 Z abajo)",
      lblVectorOp: "Objetivo de Operación:",
      optVectorOpCut: "✂️ Corte Láser Profundo (Lento: 150 - 500 mm/min)",
      optVectorOpPen: "✒️ Pluma / Plotter / Dibujo (Rápido: 1500 - 3000 mm/min)",
      optVectorOpScore: "⚡ Marcado / Grabado Vectorial (Medio: 1500 - 3500 mm/min)",
      lblVectorPasses: "Pasadas de Corte:",
      lblSpeedCut: "Velocidad de Corte (mm/min):",
      lblSpeedDraw: "Velocidad de Dibujo (mm/min):",
      lblSpeedPresets: "Atajos Velocidad:",
      lblZUp: "Z Arriba (Reposo mm):",
      lblZDown: "Z Abajo (Dibujo mm):",
      lblZSpeed: "Velocidad Eje Z (mm/min):",
      lblThreshold: "Umbral de Detección de Línea:",
      hintSeguimiento: "💡 <strong>Modo Seguimiento:</strong> La pluma o láser recorre las curvas del diseño de forma continua sin rayar línea por línea.",
      hintSeguimientoCut: "💡 <strong>Modo Corte Profundo:</strong> Opera a velocidad lenta (150 - 500 mm/min) con láser continuo M3 S1000 para penetrar y cortar limpiamente el material sin quemar bordes.",
      hintSeguimientoPen: "💡 <strong>Modo Pluma / Plotter:</strong> Opera a velocidad ágil (1500 - 3000 mm/min) siguiendo curvas fluidas con levantamiento limpio de pluma.",
      lblItemCutStyle: "🎯 Estilo / Tipo de corte para esta imagen:",
      btnStyleCut: "✂️ Corte",
      btnStyleScore: "⚡ Marcado",
      btnStyleRaster: "🖨️ Barrido",
      btnStylePen: "🖊️ Pluma",
      btnStyleCutTitle: "Corte Profundo: Alta potencia (M3 S1000), velocidad lenta (300 mm/min)",
      btnStyleScoreTitle: "Marcado / Grabado Vectorial: Potencia dinámica (M4 S350), 1500 mm/min",
      btnStyleRasterTitle: "Grabado Barrido: Línea a línea para fotos, 3500 mm/min",
      btnStylePenTitle: "Pluma Plotter: Trazado vectorial continuo, 2500 mm/min",
      lblVectorLaserPower: "Potencia Láser S (0-1000):",
      lblVectorLaserMode: "Modo Láser:",
      lblConfiguringImage: "Configurando:",

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
      alertGcodeSuccess: (activeCount, totalCount, lines, time, gcodePath, imgCount, imgDir) => {
        let msg = `✅ ¡G-Code multi-imagen generado con éxito!\n\n• Imágenes incluidas: ${activeCount} de ${totalCount}\n• Total líneas de código: ${lines.toLocaleString()}\n• Tiempo estimado de ejecución: ${time}`;
        if (gcodePath) {
          msg += `\n\n📁 G-Code guardado automáticamente en:\n${gcodePath}`;
        }
        if (imgCount && imgCount > 0) {
          msg += `\n\n🖼️ Imágenes utilizadas respaldadas (${imgCount}):\n${imgDir || "output/images"}`;
        }
        msg += `\n\nYa puedes exportarlo (.gcode / .nc) o simular el trazado virtual en la mesa.`;
        return msg;
      },
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
      copyGcodeBtn: "📋 Copiar G-Code",
      cropBoxTitle: "✂️ Recorte & Edición de Imagen",
      badgeCropped: "Recortada",
      cropBoxHint: "Recorta la imagen para generar G-Code únicamente de la parte deseada.",
      btnOpenCropModal: "Recortar Imagen",
      btnCropImage: "Recortar Imagen",
      btnRestoreCrop: "↺ Restaurar",
      cropLayerTitle: "Recortar imagen (seleccionar parte para G-Code)",
      btnOpenCropSidebar: "✂️ Recortar",
      modalCropTitle: "Recortar Imagen para Generación de G-Code",
      lblCropRatio: "Proporción:",
      btnRatioFree: "Libre",
      btnRatioOriginal: "Original",
      btnCropSelectAll: "⬛ Toda",
      btnCropCenter: "⌖ Centrar",
      btnCropZoomIn: "Acercar",
      btnCropZoomOut: "Alejar",
      btnCropFit: "Ajustar",
      cropHelpTip: "🖱️ Arrastra sobre la imagen para seleccionar el área. Mueve las esquinas o bordes para ajustar.",
      cropMetricsTitle: "📐 Dimensiones del Recorte",
      cropLblOriginalPx: "Imagen Original:",
      cropLblCroppedPx: "Tamaño Recorte:",
      cropLblBedMm: "Medida en Mesa:",
      cropLblPercent: "Área Seleccionada:",
      cropLblPreview: "Vista Previa Recortada:",
      cropGuideGcode: "El G-Code se generará ÚNICAMENTE con la parte seleccionada, optimizando tiempo de corte y grabado.",
      btnRestoreOriginal: "↺ Restaurar Original",
      btnApplyCropText: "Aplicar Recorte",
      alertCropApplied: "Imagen recortada con éxito. Lista para generar G-Code.",
      alertCropRestored: "Imagen original restaurada con éxito.",
      alertNoImageToCrop: "Por favor, selecciona una imagen en la mesa para recortar.",
      moveLayerUpTitle: "Subir orden (grabar/cortar antes en el G-Code)",
      moveLayerDownTitle: "Bajar orden (grabar/cortar después en el G-Code)",
      btnMoveFirstTitle: "Mover al principio (grabar 1º)",
      btnMoveLastTitle: "Mover al final (grabar último)",
      lblPrintOrder: "Orden de Grabado:",
      orderFraction: (idx, total) => `#${idx} de ${total}`,
      orderSubHint: "(Secuencia G-Code)"
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
    images: [], // [ { id, name, base64, imageObj, baseWidthPx, baseHeightPx, aspectRatio, aspectLocked, x, y, w, h, printEnabled, groupId } ]
    activeImageId: null,

    // Agrupación y Selección Múltiple de Diseños
    groups: {}, // { [groupId]: { id, name, color } }
    selectedImageIds: [], // IDs seleccionadas para agrupar
    dragGroupOffsets: null, // Array de { id, startX, startY } al arrastrar un grupo sincronizado

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
    workMode: "barrido", // 'barrido' o 'seguimiento'
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
  const btnOpenGcodeDir = document.getElementById("btnOpenGcodeDir");
  const btnOpenImagesDir = document.getElementById("btnOpenImagesDir");

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

  // Barra de Selección Múltiple y Agrupación
  const groupMultiSelectBar = document.getElementById("groupMultiSelectBar");
  const groupSelectCount = document.getElementById("groupSelectCount");
  const btnGroupSelected = document.getElementById("btnGroupSelected");
  const btnClearSelection = document.getElementById("btnClearSelection");

  // Propiedades de la Imagen Seleccionada
  const selectedImagePropsBox = document.getElementById("selectedImagePropsBox");
  const selectedImageNameTag = document.getElementById("selectedImageNameTag");
  const selectedImageBadge = document.getElementById("selectedImageBadge");
  const btnEditTextLayer = document.getElementById("btnEditTextLayer");
  const btnOpenTextModal = document.getElementById("btnOpenTextModal");
  const btnAddTextQuick = document.getElementById("btnAddTextQuick");
  const textModalOverlay = document.getElementById("textModalOverlay");
  const modalTextTitle = document.getElementById("modalTextTitle");
  const btnCloseTextModal = document.getElementById("btnCloseTextModal");
  const btnCancelTextModal = document.getElementById("btnCancelTextModal");
  const btnApplyInsertText = document.getElementById("btnApplyInsertText");
  const lblBtnInsertText = document.getElementById("lblBtnInsertText");

  const txtInputContent = document.getElementById("txtInputContent");
  const txtFontFamily = document.getElementById("txtFontFamily");
  const btnTextBold = document.getElementById("btnTextBold");
  const btnTextItalic = document.getElementById("btnTextItalic");
  const btnTextUppercase = document.getElementById("btnTextUppercase");
  const txtModeSelect = document.getElementById("txtModeSelect");
  const groupStrokeWidth = document.getElementById("groupStrokeWidth");
  const sliderStrokeWidth = document.getElementById("sliderStrokeWidth");
  const valStrokeWidth = document.getElementById("valStrokeWidth");
  const txtTargetHeight = document.getElementById("txtTargetHeight");
  const txtLetterSpacing = document.getElementById("txtLetterSpacing");
  const textPreviewCanvas = document.getElementById("textPreviewCanvas");
  const textMetricsEstimate = document.getElementById("textMetricsEstimate");

  // Elementos de la Herramienta de Recorte (Crop Tool)
  const cropSettingsBox = document.getElementById("cropSettingsBox");
  const cropStatusBadgeBox = document.getElementById("cropStatusBadgeBox");
  const btnOpenCropModal = document.getElementById("btnOpenCropModal");
  const btnRestoreOriginalCrop = document.getElementById("btnRestoreOriginalCrop");
  const btnOpenCropQuick = document.getElementById("btnOpenCropQuick");
  const cropStatusBadge = document.getElementById("cropStatusBadge");

  const cropModalOverlay = document.getElementById("cropModalOverlay");
  const modalCropTitle = document.getElementById("modalCropTitle");
  const cropImageNameTag = document.getElementById("cropImageNameTag");
  const btnCloseCropModal = document.getElementById("btnCloseCropModal");
  const btnCancelCropModal = document.getElementById("btnCancelCropModal");
  const btnApplyCrop = document.getElementById("btnApplyCrop");
  const btnRestoreOriginalCropModal = document.getElementById("btnRestoreOriginalCropModal");

  const cropCanvasViewport = document.getElementById("cropCanvasViewport");
  const cropCanvas = document.getElementById("cropCanvas");
  const cropMiniPreviewCanvas = document.getElementById("cropMiniPreviewCanvas");
  const cropValOriginalPx = document.getElementById("cropValOriginalPx");
  const cropValCroppedPx = document.getElementById("cropValCroppedPx");
  const cropValBedMm = document.getElementById("cropValBedMm");
  const cropValPercent = document.getElementById("cropValPercent");

  const cropRatioBtns = document.querySelectorAll(".crop-ratio-btn");
  const btnCropSelectAll = document.getElementById("btnCropSelectAll");
  const btnCropCenter = document.getElementById("btnCropCenter");
  const btnCropZoomIn = document.getElementById("btnCropZoomIn");
  const btnCropZoomOut = document.getElementById("btnCropZoomOut");
  const btnCropFit = document.getElementById("btnCropFit");

  const dropArea = document.getElementById("dropArea");
  const fileInput = document.getElementById("fileInput");
  const posImgX = document.getElementById("posImgX");
  const posImgY = document.getElementById("posImgY");
  const dimWidth = document.getElementById("dimWidth");
  const dimHeight = document.getElementById("dimHeight");
  const btnLockAspect = document.getElementById("btnLockAspect");
  const scaleBtns = document.querySelectorAll(".btn-scale");
  const btnFitBed = document.getElementById("btnFitBed");

  // Barra de Grupo e Imagen Seleccionada
  const selectedImageGroupRow = document.getElementById("selectedImageGroupRow");
  const valActiveGroupBadge = document.getElementById("valActiveGroupBadge");
  const valActiveGroupCount = document.getElementById("valActiveGroupCount");
  const btnActiveDuplicateGroup = document.getElementById("btnActiveDuplicateGroup");
  const btnActiveUngroup = document.getElementById("btnActiveUngroup");
  const singleDuplicateRow = document.getElementById("singleDuplicateRow");
  const btnActiveDuplicateSingle = document.getElementById("btnActiveDuplicateSingle");

  // Orden de Impresión / Secuencia G-Code
  const selectedImageOrderRow = document.getElementById("selectedImageOrderRow");
  const valActivePrintOrder = document.getElementById("valActivePrintOrder");
  const btnActiveMoveFirst = document.getElementById("btnActiveMoveFirst");
  const btnActiveMoveUp = document.getElementById("btnActiveMoveUp");
  const btnActiveMoveDown = document.getElementById("btnActiveMoveDown");
  const btnActiveMoveLast = document.getElementById("btnActiveMoveLast");

  // Rotación y Orientación
  const btnRotateCCW = document.getElementById("btnRotateCCW");
  const btnRotateCW = document.getElementById("btnRotateCW");
  const btnRotate180 = document.getElementById("btnRotate180");
  const btnFlipH = document.getElementById("btnFlipH");
  const btnFlipV = document.getElementById("btnFlipV");
  const customRotateAngle = document.getElementById("customRotateAngle");
  const btnApplyCustomRotate = document.getElementById("btnApplyCustomRotate");

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

  // Modo de Trayectoria (Barrido vs Seguimiento)
  const btnModeBarrido = document.getElementById("btnModeBarrido");
  const btnModeSeguimiento = document.getElementById("btnModeSeguimiento");
  const activeModeBadge = document.getElementById("activeModeBadge");
  const rasterSettingsBox = document.getElementById("rasterSettingsBox");
  const vectorSettingsBox = document.getElementById("vectorSettingsBox");

  const vectorOpSelect = document.getElementById("vectorOpSelect");
  const vectorPassesSelect = document.getElementById("vectorPassesSelect");
  const vectorTypeSelect = document.getElementById("vectorTypeSelect");
  const curveTolSelect = document.getElementById("curveTolSelect");
  const toolTypeSelect = document.getElementById("toolTypeSelect");
  const speedDrawInput = document.getElementById("speedDrawInput");
  const lblSpeedDrawDynamic = document.getElementById("lblSpeedDrawDynamic");
  const btnSpeedPresets = document.querySelectorAll(".btn-speed-preset");
  const zAxisControls = document.getElementById("zAxisControls");
  const zUpInput = document.getElementById("zUpInput");
  const zDownInput = document.getElementById("zDownInput");
  const zSpeedInput = document.getElementById("zSpeedInput");
  const sliderThreshold = document.getElementById("sliderThreshold");
  const valThreshold = document.getElementById("valThreshold");
  const chkInvertVector = document.getElementById("chkInvertVector");
  const vectorLaserPowerInput = document.getElementById("vectorLaserPowerInput");
  const vectorLaserModeSelect = document.getElementById("vectorLaserModeSelect");
  const btnQuickStyles = document.querySelectorAll(".btn-quick-style");
  const tab2SelectedImageName = document.getElementById("tab2SelectedImageName");
  const tab2SelectedStyleBadge = document.getElementById("tab2SelectedStyleBadge");

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
    const img = state.images.find(i => i.id === state.activeImageId) || null;
    if (img) ensureImageProperties(img);
    return img;
  }

  let isSyncingInputs = false;

  function ensureImageProperties(img) {
    if (!img) return;
    if (!img.originalBase64) img.originalBase64 = img.base64;
    if (img.isCropped === undefined) img.isCropped = false;
    if (!img.workMode) img.workMode = state.workMode || "barrido";
    if (!img.vectorOp) img.vectorOp = "cut";
    if (!img.vectorType) img.vectorType = (img.vectorOp === "cut") ? "contour_outer" : "contour";
    if (!img.toolType) img.toolType = "laser";
    if (img.zUp === undefined) img.zUp = 3.0;
    if (img.zDown === undefined) img.zDown = 0.0;
    if (img.zSpeed === undefined) img.zSpeed = 1200.0;
    if (img.curveTolerance === undefined) img.curveTolerance = 0.35;
    if (img.speedDraw === undefined) img.speedDraw = (img.vectorOp === "cut" ? 300 : (img.vectorOp === "score" ? 1500 : 2500));
    if (img.threshold === undefined) img.threshold = 128;
    if (img.linesPerMm === undefined) img.linesPerMm = 6.0;
    if (img.speedEngrave === undefined) img.speedEngrave = 3500.0;
    if (img.minPower === undefined) img.minPower = 0;
    if (img.maxPower === undefined) img.maxPower = (img.workMode === "seguimiento" && img.vectorOp === "cut" ? 1000 : (img.vectorOp === "score" ? 350 : 850));
    if (img.laserMode === undefined) img.laserMode = (img.workMode === "seguimiento" && img.vectorOp === "cut" ? "M3" : "M4");
    if (!img.algorithm) img.algorithm = "dither_atkinson";
    if (img.brightness === undefined) img.brightness = 1.0;
    if (img.contrast === undefined) img.contrast = 1.0;
    if (img.invert === undefined) img.invert = false;
    if (img.passes === undefined) img.passes = 1;
    if (img.groupId === undefined) img.groupId = null;
  }

  // ============================================================
  // GESTIÓN DE GRUPOS, SELECCIÓN MÚLTIPLE Y DUPLICACIÓN
  // ============================================================
  const GROUP_COLORS = [
    "#00e5ff", // cyan
    "#b388ff", // purple
    "#ff9100", // amber/orange
    "#00e676", // emerald
    "#ff4081", // pink
    "#ffd600", // yellow
    "#00b0ff", // blue
    "#ff5252"  // coral
  ];

  function hexToRgba(hex, alpha) {
    if (!hex || hex[0] !== "#") return `rgba(0, 229, 255, ${alpha})`;
    const h = hex.replace("#", "");
    const r = parseInt(h.substring(0, 2), 16) || 0;
    const g = parseInt(h.substring(2, 4), 16) || 0;
    const b = parseInt(h.substring(4, 6), 16) || 0;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function getGroupColor(index) {
    return GROUP_COLORS[index % GROUP_COLORS.length];
  }

  function getGroupById(groupId) {
    if (!groupId) return null;
    return state.groups[groupId] || null;
  }

  function getImagesInGroup(groupId) {
    if (!groupId) return [];
    return state.images.filter(i => i.groupId === groupId);
  }

  function generateNextGroupName() {
    const existingNums = Object.values(state.groups).map(g => {
      const match = g.name.match(/\d+/);
      return match ? parseInt(match[0], 10) : 0;
    });
    const nextNum = existingNums.length > 0 ? Math.max(...existingNums) + 1 : 1;
    return t("groupDefaultName", nextNum);
  }

  function toggleImageSelection(id) {
    const idx = state.selectedImageIds.indexOf(id);
    if (idx === -1) {
      state.selectedImageIds.push(id);
    } else {
      state.selectedImageIds.splice(idx, 1);
    }
    updateMultiSelectBar();
    renderImageListMenu();
  }

  function clearImageSelection() {
    state.selectedImageIds = [];
    updateMultiSelectBar();
    renderImageListMenu();
  }

  function updateMultiSelectBar() {
    if (!groupMultiSelectBar) return;
    const count = state.selectedImageIds.length;
    if (count > 0) {
      groupMultiSelectBar.style.display = "flex";
      if (groupSelectCount) groupSelectCount.textContent = count;
      if (btnGroupSelected) {
        btnGroupSelected.disabled = (count < 2);
        btnGroupSelected.textContent = `${t("btnGroup")} (${count})`;
      }
    } else {
      groupMultiSelectBar.style.display = "none";
    }
  }

  function createGroupFromSelection() {
    if (state.selectedImageIds.length < 2) return;
    const groupId = "grp_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
    const groupName = generateNextGroupName();
    const groupCount = Object.keys(state.groups).length;
    const groupColor = getGroupColor(groupCount);

    state.groups[groupId] = {
      id: groupId,
      name: groupName,
      color: groupColor
    };

    state.selectedImageIds.forEach(id => {
      const img = state.images.find(i => i.id === id);
      if (img) img.groupId = groupId;
    });

    state.activeImageId = state.selectedImageIds[0];
    state.selectedImageIds = [];
    updateMultiSelectBar();
    renderImageListMenu();
    syncActiveImageToInputs();
    drawBed();
  }

  function ungroup(groupId) {
    if (!groupId) return;
    state.images.forEach(img => {
      if (img.groupId === groupId) {
        img.groupId = null;
      }
    });
    delete state.groups[groupId];
    renderImageListMenu();
    syncActiveImageToInputs();
    drawBed();
  }

  function duplicateGroup(groupId) {
    const group = state.groups[groupId];
    const groupItems = getImagesInGroup(groupId);
    if (!groupItems.length) return;

    // Calcular bounding box del grupo original
    const minX = Math.min(...groupItems.map(i => i.x));
    const maxX = Math.max(...groupItems.map(i => i.x + i.w));
    const minY = Math.min(...groupItems.map(i => i.y));
    const maxY = Math.max(...groupItems.map(i => i.y + i.h));
    const groupW = maxX - minX;
    const groupH = maxY - minY;

    // Calcular posición óptima para la nueva copia en la mesa
    let offsetX = groupW + 10;
    let offsetY = 0;

    if (maxX + offsetX > state.bedWidthMm) {
      // Si no cabe a la derecha, intentar abajo (nueva fila)
      offsetX = 10 - minX;
      offsetY = groupH + 10;
      if (maxY + offsetY > state.bedHeightMm) {
        // Si excede la mesa, desplazar con escalonamiento
        offsetX = 15;
        offsetY = 15;
      }
    }

    // Crear nuevo grupo clonado
    const newGroupId = "grp_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
    const newGroupName = generateNextGroupName();
    const newGroupColor = getGroupColor(Object.keys(state.groups).length);

    state.groups[newGroupId] = {
      id: newGroupId,
      name: newGroupName,
      color: newGroupColor
    };

    const clonedImages = [];
    groupItems.forEach(origImg => {
      ensureImageProperties(origImg);
      const newImg = JSON.parse(JSON.stringify(origImg));
      newImg.id = "img_" + Date.now() + "_" + Math.random().toString(36).substr(2, 6);
      newImg.name = origImg.name + " (Copia)";
      newImg.groupId = newGroupId;
      newImg.x = Math.max(0, Math.min(state.bedWidthMm - newImg.w, Math.round((origImg.x + offsetX) * 10) / 10));
      newImg.y = Math.max(0, Math.min(state.bedHeightMm - newImg.h, Math.round((origImg.y + offsetY) * 10) / 10));

      const imgObj = new Image();
      imgObj.src = newImg.base64;
      newImg.imageObj = imgObj;

      clonedImages.push(newImg);
      state.images.push(newImg);
    });

    if (clonedImages.length > 0) {
      state.activeImageId = clonedImages[0].id;
    }

    renderImageListMenu();
    syncActiveImageToInputs();
    updateSummaryStrip();
    checkOutOfBounds();
    drawBed();
  }

  function duplicateSingleImage(imageId) {
    const origImg = state.images.find(i => i.id === imageId);
    if (!origImg) return;
    ensureImageProperties(origImg);

    const newImg = JSON.parse(JSON.stringify(origImg));
    newImg.id = "img_" + Date.now() + "_" + Math.random().toString(36).substr(2, 6);
    newImg.name = origImg.name + " (Copia)";
    newImg.groupId = null;
    newImg.x = Math.max(0, Math.min(state.bedWidthMm - newImg.w, Math.round((origImg.x + 15) * 10) / 10));
    newImg.y = Math.max(0, Math.min(state.bedHeightMm - newImg.h, Math.round((origImg.y + 15) * 10) / 10));

    const imgObj = new Image();
    imgObj.src = newImg.base64;
    newImg.imageObj = imgObj;

    state.images.push(newImg);
    state.activeImageId = newImg.id;

    renderImageListMenu();
    syncActiveImageToInputs();
    updateSummaryStrip();
    checkOutOfBounds();
    drawBed();
  }

  function getStyleBadgeInfo(img) {
    ensureImageProperties(img);
    const pStr = `${img.passes || 1}p`;
    if (img.workMode === "seguimiento") {
      if (img.vectorOp === "cut") {
        return {
          label: `✂️ CORTE • S${img.maxPower} • ${Math.round(img.speedDraw)} mm/m (${pStr})`,
          type: "cut",
          color: "#ff3366"
        };
      } else if (img.vectorOp === "score") {
        return {
          label: `⚡ MARCADO • S${img.maxPower} • ${Math.round(img.speedDraw)} mm/m (${pStr})`,
          type: "score",
          color: "#ffb300"
        };
      } else {
        return {
          label: `🖊️ PLUMA • ${Math.round(img.speedDraw)} mm/m (${pStr})`,
          type: "pen",
          color: "#c084fc"
        };
      }
    } else {
      return {
        label: `🖨️ BARRIDO • S${img.maxPower} • ${Math.round(img.speedEngrave)} mm/m (${pStr})`,
        type: "raster",
        color: "#00e5ff"
      };
    }
  }

  function updateTab2Indicator(active) {
    if (!tab2SelectedImageName || !tab2SelectedStyleBadge) return;
    if (!active) {
      tab2SelectedImageName.textContent = t("noneSelected");
      tab2SelectedStyleBadge.style.display = "none";
      return;
    }
    tab2SelectedImageName.textContent = active.name;
    const badge = getStyleBadgeInfo(active);
    tab2SelectedStyleBadge.style.display = "inline-flex";
    tab2SelectedStyleBadge.className = `layer-style-pill ${badge.type}`;
    tab2SelectedStyleBadge.textContent = badge.label;
  }

  function saveActiveImageSettings() {
    if (isSyncingInputs) return;
    const active = getActiveImage();
    if (!active) return;

    active.workMode = state.workMode;
    if (vectorOpSelect) active.vectorOp = vectorOpSelect.value;
    if (vectorTypeSelect) active.vectorType = vectorTypeSelect.value;
    if (toolTypeSelect) active.toolType = toolTypeSelect.value;
    if (zUpInput) active.zUp = parseFloat(zUpInput.value) || 3.0;
    if (zDownInput) active.zDown = parseFloat(zDownInput.value) || 0.0;
    if (zSpeedInput) active.zSpeed = parseFloat(zSpeedInput.value) || 1200.0;
    if (curveTolSelect) active.curveTolerance = parseFloat(curveTolSelect.value) || 0.35;
    if (speedDrawInput) active.speedDraw = parseFloat(speedDrawInput.value) || 300.0;
    if (sliderThreshold) active.threshold = parseInt(sliderThreshold.value) || 128;
    if (linesPerMm) active.linesPerMm = parseFloat(linesPerMm.value) || 6.0;
    if (speedEngrave) active.speedEngrave = parseFloat(speedEngrave.value) || 3500.0;
    if (minPower) active.minPower = parseInt(minPower.value) || 0;
    if (maxPower) active.maxPower = parseInt(maxPower.value) || 850;
    if (laserMode) active.laserMode = laserMode.value;
    if (algoSelect) active.algorithm = algoSelect.value;
    if (sliderBrightness) active.brightness = parseFloat(sliderBrightness.value) || 1.0;
    if (sliderContrast) active.contrast = parseFloat(sliderContrast.value) || 1.0;

    if (state.workMode === "seguimiento") {
      active.invert = chkInvertVector ? chkInvertVector.checked : false;
      active.passes = parseInt(vectorPassesSelect ? vectorPassesSelect.value : (passCount ? passCount.value : 1)) || 1;
    } else {
      active.invert = chkInvert ? chkInvert.checked : false;
      active.passes = parseInt(passCount ? passCount.value : 1) || 1;
    }

    updateTab2Indicator(active);

    const curStyle = (active.workMode === "barrido") ? "raster" : (active.vectorOp || "cut");
    if (btnQuickStyles) {
      btnQuickStyles.forEach(btn => {
        btn.classList.toggle("active", btn.dataset.style === curStyle);
      });
    }

    const card = imageListContainer ? imageListContainer.querySelector(`.image-layer-card[data-id="${active.id}"]`) : null;
    if (card) {
      const pill = card.querySelector(".layer-style-pill");
      const badge = getStyleBadgeInfo(active);
      if (pill) {
        pill.className = `layer-style-pill ${badge.type}`;
        pill.textContent = badge.label;
      }
    }
    drawBed();
  }

  function applyQuickStyle(style) {
    const active = getActiveImage();
    if (!active) return;

    if (style === "cut") {
      state.workMode = "seguimiento";
      if (vectorOpSelect) vectorOpSelect.value = "cut";
      if (vectorTypeSelect) vectorTypeSelect.value = "contour_outer";
      if (laserMode) laserMode.value = "M3";
      if (vectorLaserModeSelect) vectorLaserModeSelect.value = "M3";
      if (maxPower) maxPower.value = 1000;
      if (vectorLaserPowerInput) vectorLaserPowerInput.value = 1000;
      if (speedDrawInput) speedDrawInput.value = 300;
      if (vectorPassesSelect) vectorPassesSelect.value = "1";
      if (passCount) passCount.value = 1;
      if (lblSpeedDrawDynamic) lblSpeedDrawDynamic.textContent = t("lblSpeedCut");
      updateSpeedPresetButtons(300);
    } else if (style === "score") {
      state.workMode = "seguimiento";
      if (vectorOpSelect) vectorOpSelect.value = "score";
      if (vectorTypeSelect) vectorTypeSelect.value = "contour";
      if (laserMode) laserMode.value = "M4";
      if (vectorLaserModeSelect) vectorLaserModeSelect.value = "M4";
      if (maxPower) maxPower.value = 350;
      if (vectorLaserPowerInput) vectorLaserPowerInput.value = 350;
      if (speedDrawInput) speedDrawInput.value = 1500;
      if (vectorPassesSelect) vectorPassesSelect.value = "1";
      if (passCount) passCount.value = 1;
      if (lblSpeedDrawDynamic) lblSpeedDrawDynamic.textContent = t("lblSpeedDraw");
      updateSpeedPresetButtons(1500);
    } else if (style === "raster") {
      state.workMode = "barrido";
      if (laserMode) laserMode.value = "M4";
      if (vectorLaserModeSelect) vectorLaserModeSelect.value = "M4";
      if (maxPower) maxPower.value = 850;
      if (vectorLaserPowerInput) vectorLaserPowerInput.value = 850;
      if (minPower) minPower.value = 0;
      if (speedEngrave) speedEngrave.value = 3500;
      if (passCount) passCount.value = 1;
      if (vectorPassesSelect) vectorPassesSelect.value = "1";
    } else if (style === "pen") {
      state.workMode = "seguimiento";
      if (vectorOpSelect) vectorOpSelect.value = "pen";
      if (vectorTypeSelect) vectorTypeSelect.value = "centerline";
      if (speedDrawInput) speedDrawInput.value = 2500;
      if (lblSpeedDrawDynamic) lblSpeedDrawDynamic.textContent = t("lblSpeedDraw");
      updateSpeedPresetButtons(2500);
    }

    if (btnModeBarrido && btnModeSeguimiento) {
      btnModeBarrido.classList.toggle("active", state.workMode === "barrido");
      btnModeSeguimiento.classList.toggle("active", state.workMode === "seguimiento");
    }
    if (rasterSettingsBox) rasterSettingsBox.style.display = (state.workMode === "barrido") ? "block" : "none";
    if (vectorSettingsBox) vectorSettingsBox.style.display = (state.workMode === "seguimiento") ? "flex" : "none";
    if (activeModeBadge) activeModeBadge.textContent = (state.workMode === "barrido") ? t("badgeBarrido") : t("badgeSeguimiento");

    saveActiveImageSettings();
    syncActiveImageToInputs();
    renderImageListMenu();
    drawBed();
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
      if (selectedImageNameTag) {
        selectedImageNameTag.textContent = t("noneSelected");
        selectedImageNameTag.removeAttribute("title");
      }
      if (selectedImageBadge) selectedImageBadge.style.display = "none";
      if (btnEditTextLayer) btnEditTextLayer.style.display = "none";
      if (btnOpenCropQuick) btnOpenCropQuick.style.display = "none";
      if (cropStatusBadge) cropStatusBadge.style.display = "none";
      if (cropSettingsBox) cropSettingsBox.style.display = "none";
      if (cropStatusBadgeBox) cropStatusBadgeBox.style.display = "none";
      if (btnRestoreOriginalCrop) btnRestoreOriginalCrop.style.display = "none";
      if (selectedImageGroupRow) selectedImageGroupRow.style.display = "none";
      if (singleDuplicateRow) singleDuplicateRow.style.display = "none";
      if (selectedImageOrderRow) selectedImageOrderRow.style.display = "none";
      updateTab2Indicator(null);
      posImgX.value = 20;
      posImgY.value = 20;
      dimWidth.value = 80;
      dimHeight.value = 80;
      return;
    }

    ensureImageProperties(active);
    isSyncingInputs = true;
    try {
      if (selectedImageNameTag) {
        selectedImageNameTag.textContent = active.name;
        selectedImageNameTag.title = active.name;
      }
      if (selectedImageBadge) {
        selectedImageBadge.style.display = "inline-block";
        selectedImageBadge.textContent = active.printEnabled ? t("toEngraveBadge") : t("skippedBadge");
        selectedImageBadge.style.background = active.printEnabled ? "var(--laser-cyan-glow)" : "rgba(90, 104, 128, 0.3)";
        selectedImageBadge.style.color = active.printEnabled ? "var(--laser-cyan)" : "var(--text-dim)";
      }
      if (btnEditTextLayer) {
        btnEditTextLayer.style.display = (active && active.isText) ? "inline-flex" : "none";
      }
      if (btnOpenCropQuick) {
        btnOpenCropQuick.style.display = "inline-flex";
      }
      if (cropStatusBadge) {
        cropStatusBadge.style.display = active.isCropped ? "inline-block" : "none";
      }
      if (cropSettingsBox) {
        cropSettingsBox.style.display = "block";
      }
      if (cropStatusBadgeBox) {
        cropStatusBadgeBox.style.display = active.isCropped ? "inline-block" : "none";
      }
      if (btnRestoreOriginalCrop) {
        btnRestoreOriginalCrop.style.display = (active.isCropped && active.originalBase64) ? "inline-block" : "none";
      }

      // Actualizar fila de grupo o duplicación individual
      if (active.groupId && state.groups[active.groupId]) {
        const grp = state.groups[active.groupId];
        const grpCount = state.images.filter(i => i.groupId === active.groupId).length;
        if (selectedImageGroupRow) selectedImageGroupRow.style.display = "flex";
        if (singleDuplicateRow) singleDuplicateRow.style.display = "none";
        if (valActiveGroupBadge) {
          valActiveGroupBadge.textContent = `👥 ${grp.name}`;
          valActiveGroupBadge.style.color = grp.color;
          valActiveGroupBadge.style.borderColor = grp.color;
          valActiveGroupBadge.style.background = hexToRgba(grp.color, 0.15);
        }
        if (valActiveGroupCount) {
          valActiveGroupCount.textContent = t("groupMembersCount", grpCount);
        }
      } else {
        if (selectedImageGroupRow) selectedImageGroupRow.style.display = "none";
        if (singleDuplicateRow) singleDuplicateRow.style.display = "block";
      }

      // Actualizar fila de orden de impresión
      const activeIdx = state.images.findIndex(i => i.id === active.id);
      if (selectedImageOrderRow) {
        selectedImageOrderRow.style.display = (state.images.length > 0) ? "flex" : "none";
      }
      if (valActivePrintOrder && activeIdx !== -1) {
        valActivePrintOrder.textContent = t("orderFraction", activeIdx + 1, state.images.length);
      }
      if (btnActiveMoveFirst) btnActiveMoveFirst.disabled = (activeIdx <= 0);
      if (btnActiveMoveUp) btnActiveMoveUp.disabled = (activeIdx <= 0);
      if (btnActiveMoveDown) btnActiveMoveDown.disabled = (activeIdx === -1 || activeIdx >= state.images.length - 1);
      if (btnActiveMoveLast) btnActiveMoveLast.disabled = (activeIdx === -1 || activeIdx >= state.images.length - 1);

      posImgX.value = active.x;
      posImgY.value = active.y;
      dimWidth.value = active.w;
      dimHeight.value = active.h;
      btnLockAspect.classList.toggle("active", active.aspectLocked);
      btnLockAspect.textContent = active.aspectLocked ? t("aspectLocked") : t("aspectFree");

      // Cargar modo de trayectoria
      state.workMode = active.workMode || "barrido";
      if (btnModeBarrido && btnModeSeguimiento) {
        btnModeBarrido.classList.toggle("active", state.workMode === "barrido");
        btnModeSeguimiento.classList.toggle("active", state.workMode === "seguimiento");
      }
      if (rasterSettingsBox) rasterSettingsBox.style.display = (state.workMode === "barrido") ? "block" : "none";
      if (vectorSettingsBox) vectorSettingsBox.style.display = (state.workMode === "seguimiento") ? "flex" : "none";
      if (activeModeBadge) activeModeBadge.textContent = (state.workMode === "barrido") ? t("badgeBarrido") : t("badgeSeguimiento");

      // Cargar parámetros vectoriales
      if (vectorOpSelect) vectorOpSelect.value = active.vectorOp || "cut";
      if (vectorTypeSelect) vectorTypeSelect.value = active.vectorType || "contour";
      if (toolTypeSelect) toolTypeSelect.value = active.toolType || "laser";
      if (zAxisControls) zAxisControls.style.display = (active.toolType === "z_axis") ? "flex" : "none";
      if (zUpInput) zUpInput.value = active.zUp ?? 3.0;
      if (zDownInput) zDownInput.value = active.zDown ?? 0.0;
      if (zSpeedInput) zSpeedInput.value = active.zSpeed ?? 1200.0;
      if (curveTolSelect) curveTolSelect.value = active.curveTolerance ?? 0.35;
      if (speedDrawInput) speedDrawInput.value = active.speedDraw ?? 300.0;
      if (sliderThreshold) sliderThreshold.value = active.threshold ?? 128;
      if (valThreshold) valThreshold.textContent = active.threshold ?? 128;
      if (chkInvertVector) chkInvertVector.checked = !!active.invert;
      if (vectorPassesSelect) vectorPassesSelect.value = String(active.passes ?? 1);

      if (lblSpeedDrawDynamic) {
        lblSpeedDrawDynamic.textContent = (active.vectorOp === "cut") ? t("lblSpeedCut") : t("lblSpeedDraw");
      }
      updateSpeedPresetButtons(active.speedDraw);

      // Cargar parámetros raster
      if (algoSelect) algoSelect.value = active.algorithm || "dither_atkinson";
      if (linesPerMm) linesPerMm.value = active.linesPerMm ?? 6.0;
      if (sliderBrightness) sliderBrightness.value = active.brightness ?? 1.0;
      if (valBrightness) valBrightness.textContent = (active.brightness ?? 1.0).toFixed(2);
      if (sliderContrast) sliderContrast.value = active.contrast ?? 1.0;
      if (valContrast) valContrast.textContent = (active.contrast ?? 1.0).toFixed(2);
      if (chkInvert) chkInvert.checked = !!active.invert;

      // Cargar potencia, velocidad de grabado y pasadas
      if (minPower) minPower.value = active.minPower ?? 0;
      if (maxPower) maxPower.value = active.maxPower ?? (active.vectorOp === "cut" ? 1000 : 850);
      if (vectorLaserPowerInput) vectorLaserPowerInput.value = maxPower.value;
      if (laserMode) laserMode.value = active.laserMode ?? (active.vectorOp === "cut" ? "M3" : "M4");
      if (vectorLaserModeSelect) vectorLaserModeSelect.value = laserMode.value;
      if (speedEngrave) speedEngrave.value = active.speedEngrave ?? 3500;
      if (passCount) passCount.value = active.passes ?? 1;

      // Actualizar botón de estilo rápido activo
      const curStyle = (active.workMode === "barrido") ? "raster" : (active.vectorOp || "cut");
      if (btnQuickStyles) {
        btnQuickStyles.forEach(btn => {
          btn.classList.toggle("active", btn.dataset.style === curStyle);
        });
      }

      updateTab2Indicator(active);
      updateSummaryStrip();
    } finally {
      isSyncingInputs = false;
    }
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
            originalBase64: base64,
            isCropped: false,
            imageObj: img,
            baseWidthPx: img.width,
            baseHeightPx: img.height,
            originalWidthPx: img.width,
            originalHeightPx: img.height,
            aspectRatio: ratio,
            aspectLocked: true,
            x: Math.max(0, posX),
            y: Math.max(0, posY),
            w: defaultW,
            h: defaultH,
            printEnabled: true,
            isText: false,
            workMode: state.workMode || "barrido",
            vectorOp: vectorOpSelect ? vectorOpSelect.value : "cut",
            vectorType: vectorTypeSelect ? vectorTypeSelect.value : "contour",
            toolType: toolTypeSelect ? toolTypeSelect.value : "laser",
            zUp: parseFloat(zUpInput ? zUpInput.value : 3.0),
            zDown: parseFloat(zDownInput ? zDownInput.value : 0.0),
            zSpeed: parseFloat(zSpeedInput ? zSpeedInput.value : 1200.0),
            curveTolerance: parseFloat(curveTolSelect ? curveTolSelect.value : 0.35),
            speedDraw: parseFloat(speedDrawInput ? speedDrawInput.value : 300.0),
            threshold: parseInt(sliderThreshold ? sliderThreshold.value : 128),
            linesPerMm: parseFloat(linesPerMm.value || 6.0),
            speedEngrave: parseFloat(speedEngrave.value || 3500.0),
            minPower: parseInt(minPower.value || 0),
            maxPower: parseInt(maxPower.value || 850),
            laserMode: laserMode.value || "M4",
            algorithm: algoSelect.value || "dither_atkinson",
            brightness: parseFloat(sliderBrightness.value || 1.0),
            contrast: parseFloat(sliderContrast.value || 1.0),
            gamma: 1.0,
            invert: chkInvert ? chkInvert.checked : false,
            passes: parseInt(passCount ? passCount.value : 1) || 1
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

    const removed = state.images[idx];
    const grpId = removed.groupId;

    state.images.splice(idx, 1);
    state.selectedImageIds = state.selectedImageIds.filter(itemId => itemId !== id);
    updateMultiSelectBar();

    if (grpId) {
      const remaining = state.images.filter(i => i.groupId === grpId);
      if (remaining.length <= 1) {
        remaining.forEach(r => r.groupId = null);
        delete state.groups[grpId];
      }
    }

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

  // ============================================================
  // REORDENAMIENTO DE CAPAS Y ORDEN DE IMPRESIÓN (G-CODE SEQUENCE)
  // ============================================================
  function moveImageOrder(id, delta) {
    const fromIdx = state.images.findIndex(i => i.id === id);
    if (fromIdx === -1) return;
    const toIdx = fromIdx + delta;
    if (toIdx < 0 || toIdx >= state.images.length) return;

    const [item] = state.images.splice(fromIdx, 1);
    state.images.splice(toIdx, 0, item);
    state.activeImageId = item.id;

    renderImageListMenu();
    syncActiveImageToInputs();
    updateSummaryStrip();
    drawBed();
  }

  function moveImageToIndex(id, targetIndex) {
    const fromIdx = state.images.findIndex(i => i.id === id);
    if (fromIdx === -1) return;
    const clampedTo = Math.max(0, Math.min(state.images.length - 1, targetIndex));
    if (fromIdx === clampedTo) return;

    const [item] = state.images.splice(fromIdx, 1);
    state.images.splice(clampedTo, 0, item);
    state.activeImageId = item.id;

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
      ensureImageProperties(img);
      const badgeInfo = getStyleBadgeInfo(img);
      const isSelectedForGroup = state.selectedImageIds.includes(img.id);
      const grp = img.groupId ? state.groups[img.groupId] : null;

      const card = document.createElement("div");
      card.className = `image-layer-card ${img.id === state.activeImageId ? "selected" : ""} ${!img.printEnabled ? "disabled" : ""}`;
      card.dataset.id = img.id;
      card.setAttribute("draggable", "true");

      card.innerHTML = `
        <label class="layer-chk-group" title="${t("selectForGroupTitle")}">
          <input type="checkbox" class="chk-group-select" ${isSelectedForGroup ? "checked" : ""}>
        </label>
        <div class="layer-order-col">
          <button type="button" class="btn-order-move btn-order-up" ${idx === 0 ? "disabled" : ""} title="${t("moveLayerUpTitle")}">▲</button>
          <span class="layer-order-idx" title="${t("lblPrintOrder")}">#${idx+1}</span>
          <button type="button" class="btn-order-move btn-order-down" ${idx === state.images.length - 1 ? "disabled" : ""} title="${t("moveLayerDownTitle")}">▼</button>
        </div>
        <div class="layer-thumb-wrap">
          <img src="${img.base64}" class="layer-thumb" alt="Thumbnail">
        </div>
        <div class="layer-details">
          <div class="layer-title-row">
            <span class="layer-name" title="${img.name}">${img.name}</span>
            ${grp ? `<span class="layer-group-pill" style="border-color:${grp.color}; color:${grp.color}; background:${hexToRgba(grp.color, 0.15)}">👥 ${grp.name}</span>` : ""}
            ${img.isCropped ? `<span class="cropped-tag" title="${t("cropBoxHint")}">✂️ ${t("badgeCropped")}</span>` : ""}
            <span class="layer-badge ${img.printEnabled ? "active" : "ignored"}">${img.printEnabled ? t("layerActive") : t("layerIgnored")}</span>
          </div>
          <div class="layer-metrics">
            ${img.w.toFixed(1)} × ${img.h.toFixed(1)} mm • (X: ${img.x.toFixed(1)}, Y: ${img.y.toFixed(1)})
          </div>
          <span class="layer-style-pill ${badgeInfo.type}">${badgeInfo.label}</span>
        </div>
        <div class="layer-actions">
          <button class="btn-duplicate-layer" title="${img.groupId ? t("duplicateGroupTitle") : t("duplicateImageTitle")}">📋</button>
          <button class="btn-crop-layer" title="${t("cropLayerTitle")}">✂️</button>
          <button class="btn-rotate-layer" title="${t("rotateLayerTitle")}">⟳</button>
          <label class="layer-print-toggle" title="${t("layerPrintToggleTitle")}">
            <input type="checkbox" ${img.printEnabled ? "checked" : ""} class="chk-print">
            <span>🖨️</span>
          </label>
          <button class="btn-delete-layer" title="${t("deleteImageTitle")}">🗑️</button>
        </div>
      `;

      card.addEventListener("click", (e) => {
        if (e.target.closest(".layer-print-toggle") || 
            e.target.closest(".btn-delete-layer") || 
            e.target.closest(".btn-rotate-layer") || 
            e.target.closest(".btn-crop-layer") || 
            e.target.closest(".btn-order-move") ||
            e.target.closest(".layer-chk-group") ||
            e.target.closest(".btn-duplicate-layer")) return;
        selectImage(img.id);
      });

      const chkGrp = card.querySelector(".chk-group-select");
      if (chkGrp) {
        chkGrp.addEventListener("change", (e) => {
          e.stopPropagation();
          toggleImageSelection(img.id);
        });
      }

      const btnDup = card.querySelector(".btn-duplicate-layer");
      if (btnDup) {
        btnDup.addEventListener("click", (e) => {
          e.stopPropagation();
          if (img.groupId) {
            duplicateGroup(img.groupId);
          } else {
            duplicateSingleImage(img.id);
          }
        });
      }

      const btnUp = card.querySelector(".btn-order-up");
      if (btnUp) {
        btnUp.addEventListener("click", (e) => {
          e.stopPropagation();
          moveImageOrder(img.id, -1);
        });
      }

      const btnDown = card.querySelector(".btn-order-down");
      if (btnDown) {
        btnDown.addEventListener("click", (e) => {
          e.stopPropagation();
          moveImageOrder(img.id, 1);
        });
      }

      // Drag and Drop para reordenar capas visualmente
      card.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", img.id);
        e.dataTransfer.effectAllowed = "move";
        card.classList.add("dragging");
      });

      card.addEventListener("dragend", () => {
        card.classList.remove("dragging");
        document.querySelectorAll(".image-layer-card").forEach(c => {
          c.classList.remove("drag-over-top", "drag-over-bottom");
        });
      });

      card.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        const rect = card.getBoundingClientRect();
        const midY = rect.top + rect.height / 2;
        if (e.clientY < midY) {
          card.classList.add("drag-over-top");
          card.classList.remove("drag-over-bottom");
        } else {
          card.classList.add("drag-over-bottom");
          card.classList.remove("drag-over-top");
        }
      });

      card.addEventListener("dragleave", () => {
        card.classList.remove("drag-over-top", "drag-over-bottom");
      });

      card.addEventListener("drop", (e) => {
        e.preventDefault();
        card.classList.remove("drag-over-top", "drag-over-bottom");
        const draggedId = e.dataTransfer.getData("text/plain");
        if (!draggedId || draggedId === img.id) return;
        const rect = card.getBoundingClientRect();
        const midY = rect.top + rect.height / 2;
        const dropTargetIdx = state.images.findIndex(i => i.id === img.id);
        const insertIdx = (e.clientY < midY) ? dropTargetIdx : dropTargetIdx + 1;
        const fromIdx = state.images.findIndex(i => i.id === draggedId);
        if (fromIdx === -1) return;
        const [movedItem] = state.images.splice(fromIdx, 1);
        const finalIdx = (fromIdx < insertIdx) ? insertIdx - 1 : insertIdx;
        state.images.splice(finalIdx, 0, movedItem);
        state.activeImageId = movedItem.id;
        renderImageListMenu();
        syncActiveImageToInputs();
        updateSummaryStrip();
        drawBed();
      });

      const btnCrop = card.querySelector(".btn-crop-layer");
      if (btnCrop) {
        btnCrop.addEventListener("click", (e) => {
          e.stopPropagation();
          selectImage(img.id);
          openCropModal(img);
        });
      }

      const btnRot = card.querySelector(".btn-rotate-layer");
      btnRot.addEventListener("click", (e) => {
        e.stopPropagation();
        selectImage(img.id);
        rotateSingleImage(img, 90);
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
    updateMultiSelectBar();
  }

  // Botones de orden en el panel lateral de imagen seleccionada
  if (btnActiveMoveFirst) {
    btnActiveMoveFirst.addEventListener("click", () => {
      const active = getActiveImage();
      if (!active) return;
      moveImageToIndex(active.id, 0);
    });
  }
  if (btnActiveMoveUp) {
    btnActiveMoveUp.addEventListener("click", () => {
      const active = getActiveImage();
      if (!active) return;
      moveImageOrder(active.id, -1);
    });
  }
  if (btnActiveMoveDown) {
    btnActiveMoveDown.addEventListener("click", () => {
      const active = getActiveImage();
      if (!active) return;
      moveImageOrder(active.id, 1);
    });
  }
  if (btnActiveMoveLast) {
    btnActiveMoveLast.addEventListener("click", () => {
      const active = getActiveImage();
      if (!active) return;
      moveImageToIndex(active.id, state.images.length - 1);
    });
  }

  if (btnAddMoreImages) {
    btnAddMoreImages.addEventListener("click", () => fileInput.click());
  }

  if (btnClearAllImages) {
    btnClearAllImages.addEventListener("click", () => {
      if (confirm(t("confirmClearAll"))) {
        state.images = [];
        state.groups = {};
        state.selectedImageIds = [];
        state.dragGroupOffsets = null;
        state.activeImageId = null;
        updateMultiSelectBar();
        renderImageListMenu();
        syncActiveImageToInputs();
        checkOutOfBounds();
        drawBed();
      }
    });
  }

  // Event Listeners para Selección Múltiple, Agrupación y Duplicación
  if (btnGroupSelected) {
    btnGroupSelected.addEventListener("click", () => {
      createGroupFromSelection();
    });
  }

  if (btnClearSelection) {
    btnClearSelection.addEventListener("click", () => {
      clearImageSelection();
    });
  }

  if (btnActiveDuplicateGroup) {
    btnActiveDuplicateGroup.addEventListener("click", () => {
      const active = getActiveImage();
      if (!active || !active.groupId) return;
      duplicateGroup(active.groupId);
    });
  }

  if (btnActiveUngroup) {
    btnActiveUngroup.addEventListener("click", () => {
      const active = getActiveImage();
      if (!active || !active.groupId) return;
      ungroup(active.groupId);
    });
  }

  if (btnActiveDuplicateSingle) {
    btnActiveDuplicateSingle.addEventListener("click", () => {
      const active = getActiveImage();
      if (!active) return;
      duplicateSingleImage(active.id);
    });
  }

  // ============================================================
  // GENERADOR Y EDITOR DE TEXTO / LETRAS PARA CORTE Y GRABADO
  // ============================================================
  const textModalState = {
    editingImageId: null,
    isBold: true,
    isItalic: false,
    isUppercase: false
  };

  function openTextModal(editingImg = null) {
    if (editingImg && editingImg.isText) {
      textModalState.editingImageId = editingImg.id;
      if (modalTextTitle) modalTextTitle.textContent = t("btnUpdateText");
      if (lblBtnInsertText) lblBtnInsertText.textContent = t("btnUpdateText");
      if (txtInputContent) txtInputContent.value = editingImg.textContent || "";
      if (editingImg.textFont && txtFontFamily) txtFontFamily.value = editingImg.textFont;
      textModalState.isBold = !!editingImg.textBold;
      textModalState.isItalic = !!editingImg.textItalic;
      textModalState.isUppercase = !!editingImg.textUppercase;
      if (editingImg.textMode && txtModeSelect) txtModeSelect.value = editingImg.textMode;
      if (editingImg.textStrokeWidth && sliderStrokeWidth) sliderStrokeWidth.value = editingImg.textStrokeWidth;
      if (editingImg.textLetterSpacing && txtLetterSpacing) txtLetterSpacing.value = editingImg.textLetterSpacing;
      if (txtTargetHeight) txtTargetHeight.value = Math.round(editingImg.h);
    } else {
      textModalState.editingImageId = null;
      if (modalTextTitle) modalTextTitle.textContent = t("modalTextTitle");
      if (lblBtnInsertText) lblBtnInsertText.textContent = t("btnApplyInsertText");
      if (txtInputContent && (!txtInputContent.value || txtInputContent.value.trim() === "")) {
        txtInputContent.value = "FALCON";
      }
    }

    if (btnTextBold) btnTextBold.classList.toggle("active", textModalState.isBold);
    if (btnTextItalic) btnTextItalic.classList.toggle("active", textModalState.isItalic);
    if (btnTextUppercase) btnTextUppercase.classList.toggle("active", textModalState.isUppercase);
    if (groupStrokeWidth && txtModeSelect) groupStrokeWidth.style.display = txtModeSelect.value === "outline" ? "block" : "none";
    if (valStrokeWidth && sliderStrokeWidth) valStrokeWidth.textContent = `${sliderStrokeWidth.value} px`;

    if (textModalOverlay) textModalOverlay.style.display = "flex";
    updateTextLivePreview();
    setTimeout(() => { if (txtInputContent) txtInputContent.focus(); }, 50);
  }

  function closeTextModal() {
    if (textModalOverlay) textModalOverlay.style.display = "none";
    textModalState.editingImageId = null;
  }

  function getTextOptions() {
    let rawText = txtInputContent ? txtInputContent.value : "";
    if (textModalState.isUppercase) rawText = rawText.toUpperCase();
    return {
      text: rawText,
      fontFamily: txtFontFamily ? txtFontFamily.value : "'Allerta Stencil', sans-serif",
      isBold: textModalState.isBold,
      isItalic: textModalState.isItalic,
      isOutline: txtModeSelect ? txtModeSelect.value === "outline" : false,
      strokeWidth: sliderStrokeWidth ? parseInt(sliderStrokeWidth.value) || 4 : 4,
      targetHeight: txtTargetHeight ? Math.max(5, parseFloat(txtTargetHeight.value) || 35.0) : 35.0,
      letterSpacing: txtLetterSpacing ? parseInt(txtLetterSpacing.value) || 0 : 0
    };
  }

  function renderTextToCanvas(opts) {
    const text = opts.text || " ";
    const fontFamily = opts.fontFamily || "'Allerta Stencil', sans-serif";
    const isBold = opts.isBold ? "bold" : "normal";
    const isItalic = opts.isItalic ? "italic" : "normal";
    const isOutline = opts.isOutline;
    const strokeWidth = opts.strokeWidth || 4;
    const letterSpacing = opts.letterSpacing || 0;

    const renderFontSize = 140;
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");
    tempCtx.font = `${isItalic} ${isBold} ${renderFontSize}px ${fontFamily}`;

    const lines = text.split("\n");
    let maxLineW = 0;
    lines.forEach(line => {
      const w = tempCtx.measureText(line).width + Math.abs(line.length * letterSpacing);
      if (w > maxLineW) maxLineW = w;
    });

    const lineHeight = renderFontSize * 1.25;
    const totalH = lineHeight * lines.length + 80;
    const totalW = maxLineW + 100;

    tempCanvas.width = Math.max(140, Math.ceil(totalW));
    tempCanvas.height = Math.max(140, Math.ceil(totalH));

    tempCtx.fillStyle = "#ffffff";
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    tempCtx.font = `${isItalic} ${isBold} ${renderFontSize}px ${fontFamily}`;
    tempCtx.textBaseline = "middle";
    tempCtx.textAlign = "center";

    if (letterSpacing !== 0 && tempCtx.letterSpacing !== undefined) {
      tempCtx.letterSpacing = `${letterSpacing}px`;
    }

    const startY = (tempCanvas.height - (lines.length - 1) * lineHeight) / 2;
    const cx = tempCanvas.width / 2;

    lines.forEach((line, idx) => {
      const y = startY + (idx * lineHeight);
      if (isOutline) {
        tempCtx.strokeStyle = "#000000";
        tempCtx.lineWidth = strokeWidth * 2;
        tempCtx.lineJoin = "round";
        tempCtx.lineCap = "round";
        tempCtx.strokeText(line, cx, y);
      } else {
        tempCtx.fillStyle = "#000000";
        tempCtx.fillText(line, cx, y);
      }
    });

    const imgData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
    const pix = imgData.data;
    let minX = tempCanvas.width, maxX = 0, minY = tempCanvas.height, maxY = 0;
    let found = false;

    for (let y = 0; y < tempCanvas.height; y++) {
      for (let x = 0; x < tempCanvas.width; x++) {
        const idx = (y * tempCanvas.width + x) * 4;
        if (pix[idx] < 220 || pix[idx + 1] < 220 || pix[idx + 2] < 220) {
          found = true;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    if (!found) {
      minX = 10; maxX = tempCanvas.width - 10;
      minY = 10; maxY = tempCanvas.height - 10;
    }

    const pad = 12;
    minX = Math.max(0, minX - pad);
    minY = Math.max(0, minY - pad);
    maxX = Math.min(tempCanvas.width, maxX + pad);
    maxY = Math.min(tempCanvas.height, maxY + pad);

    const cropW = Math.max(10, maxX - minX);
    const cropH = Math.max(10, maxY - minY);

    const finalCanvas = document.createElement("canvas");
    finalCanvas.width = cropW;
    finalCanvas.height = cropH;
    const finalCtx = finalCanvas.getContext("2d");

    finalCtx.fillStyle = "#ffffff";
    finalCtx.fillRect(0, 0, cropW, cropH);
    finalCtx.drawImage(tempCanvas, minX, minY, cropW, cropH, 0, 0, cropW, cropH);

    return {
      canvas: finalCanvas,
      dataUrl: finalCanvas.toDataURL("image/png"),
      cropW,
      cropH,
      ratio: cropW / cropH
    };
  }

  function updateTextLivePreview() {
    const opts = getTextOptions();
    if (!opts.text || opts.text.trim() === "") {
      opts.text = " ";
    }

    const rendered = renderTextToCanvas(opts);
    if (textPreviewCanvas) {
      textPreviewCanvas.width = rendered.cropW;
      textPreviewCanvas.height = rendered.cropH;
      const ctx = textPreviewCanvas.getContext("2d");
      ctx.drawImage(rendered.canvas, 0, 0);
    }

    const estW = Math.round(opts.targetHeight * rendered.ratio * 10) / 10;
    if (textMetricsEstimate) {
      textMetricsEstimate.textContent = `${currentLang === "es" ? "Medidas en mesa" : "Bed Size"}: ~${estW} × ${opts.targetHeight} mm (Ratio: ${rendered.ratio.toFixed(2)})`;
    }
  }

  function applyTextToBed() {
    const opts = getTextOptions();
    if (!opts.text || opts.text.trim() === "") {
      alert(currentLang === "es" ? "Por favor escribe algún texto antes de insertar." : "Please type some text before inserting.");
      return;
    }

    const rendered = renderTextToCanvas(opts);
    const targetH = opts.targetHeight;
    const targetW = Math.round(targetH * rendered.ratio * 10) / 10;

    const imgObj = new Image();
    imgObj.onload = () => {
      if (textModalState.editingImageId) {
        const img = state.images.find(i => i.id === textModalState.editingImageId);
        if (img) {
          img.name = `Texto: "${opts.text.substr(0, 15)}"`;
          img.base64 = rendered.dataUrl;
          img.imageObj = imgObj;
          img.baseWidthPx = rendered.cropW;
          img.baseHeightPx = rendered.cropH;
          img.aspectRatio = rendered.ratio;
          img.w = targetW;
          img.h = targetH;
          img.isText = true;
          img.textContent = opts.text;
          img.textFont = opts.fontFamily;
          img.textBold = opts.isBold;
          img.textItalic = opts.isItalic;
          img.textUppercase = textModalState.isUppercase;
          img.textMode = opts.isOutline ? "outline" : "solid";
          img.textStrokeWidth = opts.strokeWidth;
          img.textLetterSpacing = opts.letterSpacing;
        }
      } else {
        const posX = Math.max(10, Math.min(state.bedWidthMm - targetW, Math.round((state.bedWidthMm - targetW) / 2)));
        const posY = Math.max(10, Math.min(state.bedHeightMm - targetH, Math.round((state.bedHeightMm - targetH) / 2)));

        const newTextImg = {
          id: "txt_" + Date.now() + "_" + Math.random().toString(36).substr(2, 6),
          name: `Texto: "${opts.text.substr(0, 15)}"`,
          base64: rendered.dataUrl,
          imageObj: imgObj,
          baseWidthPx: rendered.cropW,
          baseHeightPx: rendered.cropH,
          aspectRatio: rendered.ratio,
          aspectLocked: true,
          x: posX,
          y: posY,
          w: targetW,
          h: targetH,
          printEnabled: true,
          isText: true,
          textContent: opts.text,
          textFont: opts.fontFamily,
          textBold: opts.isBold,
          textItalic: opts.isItalic,
          textUppercase: textModalState.isUppercase,
          textMode: opts.isOutline ? "outline" : "solid",
          textStrokeWidth: opts.strokeWidth,
          textLetterSpacing: opts.letterSpacing,
          workMode: "seguimiento",
          vectorOp: "cut",
          vectorType: "contour",
          toolType: "laser",
          zUp: 3.0,
          zDown: 0.0,
          zSpeed: 1200.0,
          curveTolerance: 0.35,
          speedDraw: 300.0,
          threshold: 128,
          linesPerMm: 6.0,
          speedEngrave: 3500.0,
          minPower: 0,
          maxPower: 1000,
          laserMode: "M3",
          algorithm: "threshold",
          brightness: 1.0,
          contrast: 1.0,
          gamma: 1.0,
          invert: false,
          passes: 1
        };

        state.images.push(newTextImg);
        state.activeImageId = newTextImg.id;
      }

      switchSourceMode("IMAGE");
      renderImageListMenu();
      syncActiveImageToInputs();
      checkOutOfBounds();
      drawBed();
      closeTextModal();
    };
    imgObj.src = rendered.dataUrl;
  }

  if (btnOpenTextModal) btnOpenTextModal.addEventListener("click", () => openTextModal());
  if (btnAddTextQuick) btnAddTextQuick.addEventListener("click", () => openTextModal());
  if (btnCloseTextModal) btnCloseTextModal.addEventListener("click", closeTextModal);
  if (btnCancelTextModal) btnCancelTextModal.addEventListener("click", closeTextModal);
  if (btnApplyInsertText) btnApplyInsertText.addEventListener("click", applyTextToBed);

  if (txtInputContent) txtInputContent.addEventListener("input", updateTextLivePreview);
  if (txtFontFamily) {
    txtFontFamily.addEventListener("change", () => {
      if (document.fonts) {
        document.fonts.load(`140px ${txtFontFamily.value}`).then(updateTextLivePreview).catch(updateTextLivePreview);
      } else {
        updateTextLivePreview();
      }
    });
  }

  if (btnTextBold) {
    btnTextBold.addEventListener("click", () => {
      textModalState.isBold = !textModalState.isBold;
      btnTextBold.classList.toggle("active", textModalState.isBold);
      updateTextLivePreview();
    });
  }

  if (btnTextItalic) {
    btnTextItalic.addEventListener("click", () => {
      textModalState.isItalic = !textModalState.isItalic;
      btnTextItalic.classList.toggle("active", textModalState.isItalic);
      updateTextLivePreview();
    });
  }

  if (btnTextUppercase) {
    btnTextUppercase.addEventListener("click", () => {
      textModalState.isUppercase = !textModalState.isUppercase;
      btnTextUppercase.classList.toggle("active", textModalState.isUppercase);
      updateTextLivePreview();
    });
  }

  if (txtModeSelect) {
    txtModeSelect.addEventListener("change", () => {
      if (groupStrokeWidth) {
        groupStrokeWidth.style.display = txtModeSelect.value === "outline" ? "block" : "none";
      }
      updateTextLivePreview();
    });
  }

  if (sliderStrokeWidth) {
    sliderStrokeWidth.addEventListener("input", () => {
      if (valStrokeWidth) valStrokeWidth.textContent = `${sliderStrokeWidth.value} px`;
      updateTextLivePreview();
    });
  }

  if (txtTargetHeight) txtTargetHeight.addEventListener("input", updateTextLivePreview);
  if (txtLetterSpacing) txtLetterSpacing.addEventListener("input", updateTextLivePreview);

  if (btnEditTextLayer) {
    btnEditTextLayer.addEventListener("click", () => {
      const active = getActiveImage();
      if (!active || !active.isText) return;
      openTextModal(active);
    });
  }

  if (document.fonts) {
    document.fonts.ready.then(() => {
      if (textModalOverlay && textModalOverlay.style.display !== "none") {
        updateTextLivePreview();
      }
    });
  }

  // ============================================================
  // GENERADOR Y HERRAMIENTA DE RECORTE DE IMÁGENES (CROP TOOL)
  // Permite recortar cualquier imagen antes de convertir a G-Code
  // ============================================================
  const cropState = {
    imgItem: null,
    sourceImg: null,
    origW: 0,
    origH: 0,
    cropX: 0,
    cropY: 0,
    cropW: 0,
    cropH: 0,
    ratioMode: "free",
    targetRatio: null,
    zoom: 1.0,
    panX: 0,
    panY: 0,
    isDragging: false,
    dragAction: "none",
    startMouseX: 0,
    startMouseY: 0,
    startCrop: null
  };

  function openCropModal(targetImg = null) {
    const img = targetImg || getActiveImage();
    if (!img) {
      alert(t("alertNoImageToCrop"));
      return;
    }

    ensureImageProperties(img);
    cropState.imgItem = img;
    cropState.ratioMode = "free";
    cropState.targetRatio = null;
    cropState.zoom = 1.0;
    cropState.panX = 0;
    cropState.panY = 0;
    cropState.isDragging = false;
    cropState.dragAction = "none";

    // Actualizar nombre en cabecera
    if (cropImageNameTag) cropImageNameTag.textContent = img.name;

    // Actualizar botones de ratio
    if (cropRatioBtns) {
      cropRatioBtns.forEach(btn => {
        btn.classList.toggle("active", btn.dataset.ratio === "free");
      });
    }

    // Botón restaurar en el modal
    if (btnRestoreOriginalCropModal) {
      btnRestoreOriginalCropModal.style.display = (img.isCropped && img.originalBase64) ? "inline-block" : "none";
    }

    // Mostrar modal
    if (cropModalOverlay) cropModalOverlay.style.display = "flex";

    // Cargar imagen fuente (la original si fue recortada, para permitir re-recortar con precisión)
    const srcBase64 = (img.isCropped && img.originalBase64) ? img.originalBase64 : img.base64;
    const tempImg = new Image();
    tempImg.onload = () => {
      cropState.sourceImg = tempImg;
      cropState.origW = tempImg.naturalWidth || tempImg.width;
      cropState.origH = tempImg.naturalHeight || tempImg.height;

      if (img.isCropped && img.cropRect) {
        // Restaurar caja de recorte previa guardada
        cropState.cropX = Math.max(0, Math.min(cropState.origW - 10, img.cropRect.x));
        cropState.cropY = Math.max(0, Math.min(cropState.origH - 10, img.cropRect.y));
        cropState.cropW = Math.max(10, Math.min(cropState.origW - cropState.cropX, img.cropRect.w));
        cropState.cropH = Math.max(10, Math.min(cropState.origH - cropState.cropY, img.cropRect.h));
      } else {
        // Por defecto, seleccionar toda la imagen
        cropState.cropX = 0;
        cropState.cropY = 0;
        cropState.cropW = cropState.origW;
        cropState.cropH = cropState.origH;
      }

      resizeCropCanvas();
      renderCrop();
    };
    tempImg.src = srcBase64;
  }

  function closeCropModal() {
    if (cropModalOverlay) cropModalOverlay.style.display = "none";
    cropState.imgItem = null;
    cropState.sourceImg = null;
    cropState.isDragging = false;
  }

  function resizeCropCanvas() {
    if (!cropCanvas || !cropCanvasViewport) return;
    const rect = cropCanvasViewport.getBoundingClientRect();
    const w = Math.max(200, Math.floor(rect.width));
    const h = Math.max(200, Math.floor(rect.height));
    if (cropCanvas.width !== w || cropCanvas.height !== h) {
      cropCanvas.width = w;
      cropCanvas.height = h;
    }
  }

  function getCropViewMetrics() {
    const cw = cropCanvas.width;
    const ch = cropCanvas.height;
    const pad = 28;
    const fitScale = Math.min((cw - pad * 2) / cropState.origW, (ch - pad * 2) / cropState.origH);
    const scale = Math.max(0.05, fitScale * cropState.zoom);
    const drawW = cropState.origW * scale;
    const drawH = cropState.origH * scale;
    const drawX = (cw - drawW) / 2 + cropState.panX;
    const drawY = (ch - drawH) / 2 + cropState.panY;

    return {
      cw, ch, scale, drawX, drawY, drawW, drawH,
      imgToCanvasX: (ix) => drawX + ix * scale,
      imgToCanvasY: (iy) => drawY + iy * scale,
      canvasToImgX: (cx) => (cx - drawX) / scale,
      canvasToImgY: (cy) => (cy - drawY) / scale
    };
  }

  function renderCrop() {
    if (!cropCanvas || !cropState.sourceImg) return;
    const ctx = cropCanvas.getContext("2d");
    const m = getCropViewMetrics();

    ctx.clearRect(0, 0, m.cw, m.ch);

    // Fondo oscuro
    ctx.fillStyle = "#080c14";
    ctx.fillRect(0, 0, m.cw, m.ch);

    // Patrón sutil cuadriculado detrás de la imagen (para PNGs transparentes)
    ctx.save();
    ctx.beginPath();
    ctx.rect(m.drawX, m.drawY, m.drawW, m.drawH);
    ctx.clip();
    const checkSize = 16;
    for (let cx = m.drawX; cx < m.drawX + m.drawW; cx += checkSize) {
      for (let cy = m.drawY; cy < m.drawY + m.drawH; cy += checkSize) {
        ctx.fillStyle = ((Math.floor(cx / checkSize) + Math.floor(cy / checkSize)) % 2 === 0) ? "#141c2b" : "#192336";
        ctx.fillRect(cx, cy, checkSize, checkSize);
      }
    }
    // Dibujar imagen completa
    ctx.drawImage(cropState.sourceImg, m.drawX, m.drawY, m.drawW, m.drawH);
    ctx.restore();

    // Coordenadas en canvas del cuadro de recorte
    const bx = m.imgToCanvasX(cropState.cropX);
    const by = m.imgToCanvasY(cropState.cropY);
    const bw = cropState.cropW * m.scale;
    const bh = cropState.cropH * m.scale;

    // Máscara oscura fuera del recorte
    ctx.fillStyle = "rgba(4, 7, 13, 0.72)";
    ctx.fillRect(0, 0, m.cw, Math.max(0, by));
    ctx.fillRect(0, by + bh, m.cw, Math.max(0, m.ch - (by + bh)));
    ctx.fillRect(0, by, Math.max(0, bx), bh);
    ctx.fillRect(bx + bw, by, Math.max(0, m.cw - (bx + bw)), bh);

    // Borde del cuadro de recorte
    ctx.strokeStyle = "#00e5ff";
    ctx.lineWidth = 2;
    ctx.strokeRect(bx, by, bw, bh);

    // Regla de los tercios (guías internas)
    ctx.save();
    ctx.strokeStyle = "rgba(0, 229, 255, 0.3)";
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(bx + bw / 3, by);
    ctx.lineTo(bx + bw / 3, by + bh);
    ctx.moveTo(bx + (2 * bw) / 3, by);
    ctx.lineTo(bx + (2 * bw) / 3, by + bh);
    ctx.moveTo(bx, by + bh / 3);
    ctx.lineTo(bx + bw, by + bh / 3);
    ctx.moveTo(bx, by + (2 * bh) / 3);
    ctx.lineTo(bx + bw, by + (2 * bh) / 3);
    ctx.stroke();
    ctx.restore();

    // 8 Manijas de ajuste (Handles)
    const handleSize = 10;
    const halfH = handleSize / 2;
    const handles = [
      { x: bx, y: by }, // NW
      { x: bx + bw / 2, y: by }, // N
      { x: bx + bw, y: by }, // NE
      { x: bx + bw, y: by + bh / 2 }, // E
      { x: bx + bw, y: by + bh }, // SE
      { x: bx + bw / 2, y: by + bh }, // S
      { x: bx, y: by + bh }, // SW
      { x: bx, y: by + bh / 2 } // W
    ];

    handles.forEach((h, idx) => {
      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = "#00e5ff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      if (idx % 2 === 0) {
        ctx.arc(h.x, h.y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.fillRect(h.x - halfH - 2, h.y - halfH - 2, handleSize + 4, handleSize + 4);
        ctx.strokeRect(h.x - halfH - 2, h.y - halfH - 2, handleSize + 4, handleSize + 4);
      }
    });

    // Etiqueta flotante con dimensiones del recorte
    const dimText = `${Math.round(cropState.cropW)} × ${Math.round(cropState.cropH)} px`;
    ctx.font = "bold 11px monospace";
    const textWidth = ctx.measureText(dimText).width;
    const badgePadX = 8;
    const badgeH = 20;
    const badgeX = Math.max(bx + 6, Math.min(m.cw - textWidth - 24, bx + 6));
    const badgeY = (by >= 28) ? by - 24 : by + 6;

    ctx.fillStyle = "rgba(9, 13, 20, 0.88)";
    ctx.strokeStyle = "rgba(0, 229, 255, 0.4)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(badgeX, badgeY, textWidth + badgePadX * 2, badgeH, 4);
    } else {
      ctx.rect(badgeX, badgeY, textWidth + badgePadX * 2, badgeH);
    }
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#00e5ff";
    ctx.fillText(dimText, badgeX + badgePadX, badgeY + 14);

    // Actualizar métricas del panel lateral
    updateCropMetricsUI();
    // Actualizar mini preview
    updateCropMiniPreview();
  }

  function updateCropMetricsUI() {
    if (cropValOriginalPx) {
      cropValOriginalPx.textContent = `${cropState.origW} × ${cropState.origH} px`;
    }
    if (cropValCroppedPx) {
      cropValCroppedPx.textContent = `${Math.round(cropState.cropW)} × ${Math.round(cropState.cropH)} px`;
    }
    if (cropValBedMm && cropState.imgItem) {
      const scaleX = cropState.imgItem.w / cropState.origW;
      const scaleY = cropState.imgItem.h / cropState.origH;
      const mmW = (cropState.cropW * scaleX).toFixed(1);
      const mmH = (cropState.cropH * scaleY).toFixed(1);
      cropValBedMm.textContent = `${mmW} × ${mmH} mm`;
    }
    if (cropValPercent) {
      const pct = Math.round((cropState.cropW * cropState.cropH) / Math.max(1, (cropState.origW * cropState.origH)) * 100);
      cropValPercent.textContent = `${pct}%`;
    }
  }

  function updateCropMiniPreview() {
    if (!cropMiniPreviewCanvas || !cropState.sourceImg) return;
    const ctx = cropMiniPreviewCanvas.getContext("2d");
    const cw = 240;
    const ch = 140;
    if (cropMiniPreviewCanvas.width !== cw || cropMiniPreviewCanvas.height !== ch) {
      cropMiniPreviewCanvas.width = cw;
      cropMiniPreviewCanvas.height = ch;
    }

    ctx.clearRect(0, 0, cw, ch);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, cw, ch);

    const cropW = Math.max(1, cropState.cropW);
    const cropH = Math.max(1, cropState.cropH);
    const scale = Math.min((cw - 12) / cropW, (ch - 12) / cropH);
    const dw = cropW * scale;
    const dh = cropH * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.drawImage(
      cropState.sourceImg,
      cropState.cropX, cropState.cropY, cropW, cropH,
      dx, dy, dw, dh
    );

    ctx.strokeStyle = "rgba(0, 229, 255, 0.5)";
    ctx.lineWidth = 1;
    ctx.strokeRect(dx, dy, dw, dh);
  }

  function applyAspectRatioToCrop(ratioVal) {
    cropState.targetRatio = ratioVal;
    if (!ratioVal) {
      renderCrop();
      return;
    }

    const curCx = cropState.cropX + cropState.cropW / 2;
    const curCy = cropState.cropY + cropState.cropH / 2;

    let newW = cropState.cropW;
    let newH = newW / ratioVal;

    if (newH > cropState.origH) {
      newH = cropState.origH;
      newW = newH * ratioVal;
    }
    if (newW > cropState.origW) {
      newW = cropState.origW;
      newH = newW / ratioVal;
    }

    cropState.cropW = Math.max(10, Math.round(newW));
    cropState.cropH = Math.max(10, Math.round(newH));
    cropState.cropX = Math.max(0, Math.min(cropState.origW - cropState.cropW, Math.round(curCx - cropState.cropW / 2)));
    cropState.cropY = Math.max(0, Math.min(cropState.origH - cropState.cropH, Math.round(curCy - cropState.cropH / 2)));

    renderCrop();
  }

  function applyCropResult() {
    const active = cropState.imgItem;
    if (!active || !cropState.sourceImg) return;

    const cropX = Math.round(cropState.cropX);
    const cropY = Math.round(cropState.cropY);
    const cropW = Math.round(cropState.cropW);
    const cropH = Math.round(cropState.cropH);

    if (cropW < 5 || cropH < 5) {
      alert("El área seleccionada es demasiado pequeña para procesar.");
      return;
    }

    // Canvas fuera de pantalla para extraer la porción recortada
    const offCanvas = document.createElement("canvas");
    offCanvas.width = cropW;
    offCanvas.height = cropH;
    const offCtx = offCanvas.getContext("2d");

    // Dibujar la porción seleccionada
    offCtx.drawImage(
      cropState.sourceImg,
      cropX, cropY, cropW, cropH,
      0, 0, cropW, cropH
    );

    const newBase64 = offCanvas.toDataURL("image/png");

    // Guardar original si es la primera vez que se recorta
    if (!active.originalBase64) {
      active.originalBase64 = active.base64;
      active.originalWidthPx = cropState.origW;
      active.originalHeightPx = cropState.origH;
    }

    // Calcular nuevas dimensiones físicas y posición física en la mesa
    const scaleX = active.w / cropState.origW;
    const scaleY = active.h / cropState.origH;

    const newW = Math.max(1.0, Math.round(cropW * scaleX * 10) / 10);
    const newH = Math.max(1.0, Math.round(cropH * scaleY * 10) / 10);

    const newX = Math.max(0, Math.min(state.bedWidthMm - newW, Math.round((active.x + cropX * scaleX) * 10) / 10));
    // En el eje Y de la máquina (origen abajo):
    const distFromBottomPx = cropState.origH - (cropY + cropH);
    const newY = Math.max(0, Math.min(state.bedHeightMm - newH, Math.round((active.y + distFromBottomPx * scaleY) * 10) / 10));

    const newImgObj = new Image();
    newImgObj.onload = () => {
      active.imageObj = newImgObj;
      active.base64 = newBase64;
      active.baseWidthPx = cropW;
      active.baseHeightPx = cropH;
      active.w = newW;
      active.h = newH;
      active.x = newX;
      active.y = newY;
      active.aspectRatio = newW / newH;
      active.isCropped = true;
      active.cropRect = { x: cropX, y: cropY, w: cropW, h: cropH };

      closeCropModal();
      syncActiveImageToInputs();
      renderImageListMenu();
      updateSummaryStrip();
      checkOutOfBounds();
      drawBed();
    };
    newImgObj.src = newBase64;
  }

  function restoreOriginalCropImage(targetImg = null) {
    const active = targetImg || getActiveImage();
    if (!active || !active.originalBase64) return;

    const origBase64 = active.originalBase64;
    const origW_px = active.originalWidthPx || active.baseWidthPx;
    const origH_px = active.originalHeightPx || active.baseHeightPx;

    const restoredImg = new Image();
    restoredImg.onload = () => {
      const ratio = origW_px / origH_px;
      let restoredW = Math.round(active.w * 10) / 10;
      let restoredH = Math.round((restoredW / ratio) * 10) / 10;
      if (restoredH > state.bedHeightMm) {
        restoredH = 80;
        restoredW = Math.round((restoredH * ratio) * 10) / 10;
      }

      active.imageObj = restoredImg;
      active.base64 = origBase64;
      active.baseWidthPx = origW_px;
      active.baseHeightPx = origH_px;
      active.w = restoredW;
      active.h = restoredH;
      active.aspectRatio = ratio;
      active.isCropped = false;
      delete active.cropRect;

      closeCropModal();
      syncActiveImageToInputs();
      renderImageListMenu();
      updateSummaryStrip();
      checkOutOfBounds();
      drawBed();
    };
    restoredImg.src = origBase64;
  }

  function getCropHitAction(mouseCanvasX, mouseCanvasY) {
    if (!cropState.sourceImg) return "none";
    const m = getCropViewMetrics();
    const bx = m.imgToCanvasX(cropState.cropX);
    const by = m.imgToCanvasY(cropState.cropY);
    const bw = cropState.cropW * m.scale;
    const bh = cropState.cropH * m.scale;
    const hitRadius = 14;

    function dist(x1, y1, x2, y2) {
      return Math.hypot(x1 - x2, y1 - y2);
    }

    // Esquinas
    if (dist(mouseCanvasX, mouseCanvasY, bx, by) <= hitRadius) return "nw";
    if (dist(mouseCanvasX, mouseCanvasY, bx + bw, by) <= hitRadius) return "ne";
    if (dist(mouseCanvasX, mouseCanvasY, bx + bw, by + bh) <= hitRadius) return "se";
    if (dist(mouseCanvasX, mouseCanvasY, bx, by + bh) <= hitRadius) return "sw";

    // Bordes medios
    if (dist(mouseCanvasX, mouseCanvasY, bx + bw / 2, by) <= hitRadius) return "n";
    if (dist(mouseCanvasX, mouseCanvasY, bx + bw / 2, by + bh) <= hitRadius) return "s";
    if (dist(mouseCanvasX, mouseCanvasY, bx, by + bh / 2) <= hitRadius) return "w";
    if (dist(mouseCanvasX, mouseCanvasY, bx + bw, by + bh / 2) <= hitRadius) return "e";

    // Dentro del cuadro
    if (mouseCanvasX >= bx && mouseCanvasX <= bx + bw && mouseCanvasY >= by && mouseCanvasY <= by + bh) {
      return "move";
    }

    // Sobre la imagen fuera del cuadro
    if (mouseCanvasX >= m.drawX && mouseCanvasX <= m.drawX + m.drawW &&
        mouseCanvasY >= m.drawY && mouseCanvasY <= m.drawY + m.drawH) {
      return "create";
    }

    return "none";
  }

  function getCursorForCropAction(action) {
    switch (action) {
      case "nw":
      case "se":
        return "nwse-resize";
      case "ne":
      case "sw":
        return "nesw-resize";
      case "n":
      case "s":
        return "ns-resize";
      case "w":
      case "e":
        return "ew-resize";
      case "move":
        return "move";
      case "create":
        return "crosshair";
      default:
        return "default";
    }
  }

  if (cropCanvas) {
    cropCanvas.addEventListener("mousedown", (e) => {
      if (e.button !== 0 || !cropState.sourceImg) return;
      const rect = cropCanvas.getBoundingClientRect();
      const mouseCanvasX = e.clientX - rect.left;
      const mouseCanvasY = e.clientY - rect.top;
      const m = getCropViewMetrics();
      const action = getCropHitAction(mouseCanvasX, mouseCanvasY);

      cropState.isDragging = true;
      cropState.dragAction = action;
      cropState.startMouseX = mouseCanvasX;
      cropState.startMouseY = mouseCanvasY;
      cropState.startCrop = {
        x: cropState.cropX,
        y: cropState.cropY,
        w: cropState.cropW,
        h: cropState.cropH
      };

      if (action === "create") {
        const imgX = Math.max(0, Math.min(cropState.origW, m.canvasToImgX(mouseCanvasX)));
        const imgY = Math.max(0, Math.min(cropState.origH, m.canvasToImgY(mouseCanvasY)));
        cropState.cropX = imgX;
        cropState.cropY = imgY;
        cropState.cropW = 1;
        cropState.cropH = 1;
      }
    });

    window.addEventListener("mousemove", (e) => {
      if (!cropCanvas || cropModalOverlay.style.display === "none" || !cropState.sourceImg) return;
      const rect = cropCanvas.getBoundingClientRect();
      const mouseCanvasX = e.clientX - rect.left;
      const mouseCanvasY = e.clientY - rect.top;
      const m = getCropViewMetrics();

      if (!cropState.isDragging) {
        const action = getCropHitAction(mouseCanvasX, mouseCanvasY);
        cropCanvas.style.cursor = getCursorForCropAction(action);
        return;
      }

      const mouseImgX = m.canvasToImgX(mouseCanvasX);
      const mouseImgY = m.canvasToImgY(mouseCanvasY);
      const startMouseImgX = m.canvasToImgX(cropState.startMouseX);
      const startMouseImgY = m.canvasToImgY(cropState.startMouseY);
      const deltaX = mouseImgX - startMouseImgX;
      const deltaY = mouseImgY - startMouseImgY;
      const s = cropState.startCrop;
      const ratio = cropState.targetRatio;

      if (cropState.dragAction === "move") {
        let newX = Math.max(0, Math.min(cropState.origW - s.w, s.x + deltaX));
        let newY = Math.max(0, Math.min(cropState.origH - s.h, s.y + deltaY));
        cropState.cropX = newX;
        cropState.cropY = newY;
      } else if (cropState.dragAction === "create") {
        let left = Math.max(0, Math.min(cropState.origW, Math.min(startMouseImgX, mouseImgX)));
        let right = Math.max(0, Math.min(cropState.origW, Math.max(startMouseImgX, mouseImgX)));
        let top = Math.max(0, Math.min(cropState.origH, Math.min(startMouseImgY, mouseImgY)));
        let bottom = Math.max(0, Math.min(cropState.origH, Math.max(startMouseImgY, mouseImgY)));
        let w = right - left;
        let h = bottom - top;

        if (ratio) {
          if (w / Math.max(1, h) > ratio) {
            w = h * ratio;
          } else {
            h = w / ratio;
          }
          if (mouseImgX < startMouseImgX) left = startMouseImgX - w;
          if (mouseImgY < startMouseImgY) top = startMouseImgY - h;
          left = Math.max(0, Math.min(cropState.origW - w, left));
          top = Math.max(0, Math.min(cropState.origH - h, top));
        }

        cropState.cropX = left;
        cropState.cropY = top;
        cropState.cropW = Math.max(5, w);
        cropState.cropH = Math.max(5, h);
      } else {
        // Redimensionamiento con manijas
        let newX = s.x;
        let newY = s.y;
        let newW = s.w;
        let newH = s.h;

        if (cropState.dragAction.includes("e")) {
          newW = Math.max(10, Math.min(cropState.origW - s.x, s.w + deltaX));
        }
        if (cropState.dragAction.includes("s")) {
          newH = Math.max(10, Math.min(cropState.origH - s.y, s.h + deltaY));
        }
        if (cropState.dragAction.includes("w")) {
          const clampedX = Math.max(0, Math.min(s.x + s.w - 10, s.x + deltaX));
          newW = s.w + (s.x - clampedX);
          newX = clampedX;
        }
        if (cropState.dragAction.includes("n")) {
          const clampedY = Math.max(0, Math.min(s.y + s.h - 10, s.y + deltaY));
          newH = s.h + (s.y - clampedY);
          newY = clampedY;
        }

        if (ratio) {
          if (cropState.dragAction === "n" || cropState.dragAction === "s") {
            newW = newH * ratio;
            newX = Math.max(0, Math.min(cropState.origW - newW, s.x + (s.w - newW) / 2));
          } else if (cropState.dragAction === "w" || cropState.dragAction === "e") {
            newH = newW / ratio;
            newY = Math.max(0, Math.min(cropState.origH - newH, s.y + (s.h - newH) / 2));
          } else {
            newH = newW / ratio;
            if (cropState.dragAction.includes("n")) {
              newY = s.y + s.h - newH;
            }
          }
        }

        cropState.cropX = Math.max(0, Math.min(cropState.origW - 10, newX));
        cropState.cropY = Math.max(0, Math.min(cropState.origH - 10, newY));
        cropState.cropW = Math.max(10, Math.min(cropState.origW - cropState.cropX, newW));
        cropState.cropH = Math.max(10, Math.min(cropState.origH - cropState.cropY, newH));
      }

      renderCrop();
    });

    window.addEventListener("mouseup", () => {
      if (cropState.isDragging) {
        cropState.isDragging = false;
        cropState.dragAction = "none";
        renderCrop();
      }
    });

    // Zoom con rueda del ratón
    cropCanvas.addEventListener("wheel", (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.15 : 0.85;
      cropState.zoom = Math.max(0.5, Math.min(5.0, cropState.zoom * zoomFactor));
      renderCrop();
    });
  }

  if (cropRatioBtns) {
    cropRatioBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        cropRatioBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const r = btn.dataset.ratio;
        cropState.ratioMode = r;

        if (r === "1:1") {
          applyAspectRatioToCrop(1.0);
        } else if (r === "4:3") {
          applyAspectRatioToCrop(4 / 3);
        } else if (r === "16:9") {
          applyAspectRatioToCrop(16 / 9);
        } else if (r === "original") {
          applyAspectRatioToCrop(cropState.origW / cropState.origH);
        } else {
          cropState.targetRatio = null;
          renderCrop();
        }
      });
    });
  }

  if (btnCropSelectAll) {
    btnCropSelectAll.addEventListener("click", () => {
      if (!cropState.sourceImg) return;
      cropState.cropX = 0;
      cropState.cropY = 0;
      cropState.cropW = cropState.origW;
      cropState.cropH = cropState.origH;
      cropState.targetRatio = null;
      if (cropRatioBtns) {
        cropRatioBtns.forEach(b => b.classList.toggle("active", b.dataset.ratio === "free"));
      }
      renderCrop();
    });
  }

  if (btnCropCenter) {
    btnCropCenter.addEventListener("click", () => {
      if (!cropState.sourceImg) return;
      cropState.cropX = Math.max(0, Math.round((cropState.origW - cropState.cropW) / 2));
      cropState.cropY = Math.max(0, Math.round((cropState.origH - cropState.cropH) / 2));
      renderCrop();
    });
  }

  if (btnCropZoomIn) {
    btnCropZoomIn.addEventListener("click", () => {
      cropState.zoom = Math.min(5.0, cropState.zoom * 1.25);
      renderCrop();
    });
  }

  if (btnCropZoomOut) {
    btnCropZoomOut.addEventListener("click", () => {
      cropState.zoom = Math.max(0.5, cropState.zoom / 1.25);
      renderCrop();
    });
  }

  if (btnCropFit) {
    btnCropFit.addEventListener("click", () => {
      cropState.zoom = 1.0;
      cropState.panX = 0;
      cropState.panY = 0;
      renderCrop();
    });
  }

  if (btnCloseCropModal) btnCloseCropModal.addEventListener("click", closeCropModal);
  if (btnCancelCropModal) btnCancelCropModal.addEventListener("click", closeCropModal);
  if (btnApplyCrop) btnApplyCrop.addEventListener("click", applyCropResult);
  if (btnRestoreOriginalCropModal) {
    btnRestoreOriginalCropModal.addEventListener("click", () => {
      const confirmMsg = (currentLang === "es") ? "¿Deseas restaurar la imagen completa original?" : "Restore original uncropped image?";
      if (confirm(confirmMsg)) {
        restoreOriginalCropImage();
      }
    });
  }

  if (btnOpenCropModal) {
    btnOpenCropModal.addEventListener("click", () => openCropModal());
  }

  if (btnOpenCropQuick) {
    btnOpenCropQuick.addEventListener("click", () => openCropModal());
  }

  if (btnRestoreOriginalCrop) {
    btnRestoreOriginalCrop.addEventListener("click", () => {
      const confirmMsg = (currentLang === "es") ? "¿Deseas restaurar la imagen completa original?" : "Restore original uncropped image?";
      if (confirm(confirmMsg)) {
        restoreOriginalCropImage();
      }
    });
  }

  window.addEventListener("resize", () => {
    if (cropModalOverlay && cropModalOverlay.style.display !== "none") {
      resizeCropCanvas();
      renderCrop();
    }
  });

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
    const newX = parseFloat(posImgX.value) || 0;
    const deltaX = newX - active.x;
    if (active.groupId) {
      const groupImgs = state.images.filter(i => i.groupId === active.groupId && i.id !== active.id);
      groupImgs.forEach(i => {
        i.x = Math.round((i.x + deltaX) * 10) / 10;
      });
    }
    active.x = newX;
    renderImageListMenu();
    updateSummaryStrip();
    checkOutOfBounds();
    drawBed();
  });

  posImgY.addEventListener("input", () => {
    const active = getActiveImage();
    if (!active) return;
    const newY = parseFloat(posImgY.value) || 0;
    const deltaY = newY - active.y;
    if (active.groupId) {
      const groupImgs = state.images.filter(i => i.groupId === active.groupId && i.id !== active.id);
      groupImgs.forEach(i => {
        i.y = Math.round((i.y + deltaY) * 10) / 10;
      });
    }
    active.y = newY;
    renderImageListMenu();
    updateSummaryStrip();
    checkOutOfBounds();
    drawBed();
  });

  btnAlignBottomLeft.addEventListener("click", () => {
    const active = getActiveImage();
    if (!active) return;
    if (active.groupId) {
      const grpImgs = state.images.filter(i => i.groupId === active.groupId);
      const minX = Math.min(...grpImgs.map(i => i.x));
      const minY = Math.min(...grpImgs.map(i => i.y));
      const deltaX = -minX;
      const deltaY = -minY;
      grpImgs.forEach(i => {
        i.x = Math.round((i.x + deltaX) * 10) / 10;
        i.y = Math.round((i.y + deltaY) * 10) / 10;
      });
    } else {
      active.x = 0;
      active.y = 0;
    }
    syncActiveImageToInputs();
    renderImageListMenu();
    drawBed();
  });

  btnAlignCenter.addEventListener("click", centerActiveImageOnBed);

  function centerActiveImageOnBed() {
    const active = getActiveImage();
    if (!active) return;
    if (active.groupId) {
      const grpImgs = state.images.filter(i => i.groupId === active.groupId);
      const minX = Math.min(...grpImgs.map(i => i.x));
      const maxX = Math.max(...grpImgs.map(i => i.x + i.w));
      const minY = Math.min(...grpImgs.map(i => i.y));
      const maxY = Math.max(...grpImgs.map(i => i.y + i.h));
      const gW = maxX - minX;
      const gH = maxY - minY;
      const targetMinX = Math.max(0, Math.round(((state.bedWidthMm - gW) / 2) * 10) / 10);
      const targetMinY = Math.max(0, Math.round(((state.bedHeightMm - gH) / 2) * 10) / 10);
      const deltaX = targetMinX - minX;
      const deltaY = targetMinY - minY;
      grpImgs.forEach(i => {
        i.x = Math.round((i.x + deltaX) * 10) / 10;
        i.y = Math.round((i.y + deltaY) * 10) / 10;
      });
    } else {
      active.x = Math.max(0, Math.round(((state.bedWidthMm - active.w) / 2) * 10) / 10);
      active.y = Math.max(0, Math.round(((state.bedHeightMm - active.h) / 2) * 10) / 10);
    }
    syncActiveImageToInputs();
    renderImageListMenu();
    drawBed();
  }

  btnAlignTopLeft.addEventListener("click", () => {
    const active = getActiveImage();
    if (!active) return;
    if (active.groupId) {
      const grpImgs = state.images.filter(i => i.groupId === active.groupId);
      const minX = Math.min(...grpImgs.map(i => i.x));
      const maxY = Math.max(...grpImgs.map(i => i.y + i.h));
      const deltaX = -minX;
      const deltaY = state.bedHeightMm - maxY;
      grpImgs.forEach(i => {
        i.x = Math.round((i.x + deltaX) * 10) / 10;
        i.y = Math.round((i.y + deltaY) * 10) / 10;
      });
    } else {
      active.x = 0;
      active.y = Math.max(0, Math.round((state.bedHeightMm - active.h) * 10) / 10);
    }
    syncActiveImageToInputs();
    renderImageListMenu();
    drawBed();
  });

  btnAlignBottomRight.addEventListener("click", () => {
    const active = getActiveImage();
    if (!active) return;
    if (active.groupId) {
      const grpImgs = state.images.filter(i => i.groupId === active.groupId);
      const maxX = Math.max(...grpImgs.map(i => i.x + i.w));
      const minY = Math.min(...grpImgs.map(i => i.y));
      const deltaX = state.bedWidthMm - maxX;
      const deltaY = -minY;
      grpImgs.forEach(i => {
        i.x = Math.round((i.x + deltaX) * 10) / 10;
        i.y = Math.round((i.y + deltaY) * 10) / 10;
      });
    } else {
      active.x = Math.max(0, Math.round((state.bedWidthMm - active.w) * 10) / 10);
      active.y = 0;
    }
    syncActiveImageToInputs();
    renderImageListMenu();
    drawBed();
  });

  // ============================================================
  // ROTACIÓN Y ORIENTACIÓN DE IMÁGENES
  // ============================================================
  function rotateActiveImage(deg) {
    const active = getActiveImage();
    if (!active) return;
    rotateSingleImage(active, deg);
  }

  function rotateSingleImage(active, deg) {
    if (!active || !active.imageObj) return;

    const srcImg = active.imageObj;
    const rad = (deg * Math.PI) / 180;
    const sin = Math.abs(Math.sin(rad));
    const cos = Math.abs(Math.cos(rad));

    const origW = srcImg.naturalWidth || srcImg.width;
    const origH = srcImg.naturalHeight || srcImg.height;

    // Calcular dimensiones del canvas para contener la imagen rotada
    const newCanvasW = Math.max(1, Math.round(origW * cos + origH * sin));
    const newCanvasH = Math.max(1, Math.round(origW * sin + origH * cos));

    const offCanvas = document.createElement("canvas");
    offCanvas.width = newCanvasW;
    offCanvas.height = newCanvasH;
    const offCtx = offCanvas.getContext("2d");

    // Fondo blanco para que no se quemen áreas vacías
    offCtx.fillStyle = "#ffffff";
    offCtx.fillRect(0, 0, newCanvasW, newCanvasH);

    // Mover origen al centro del canvas, rotar y dibujar la imagen centrada
    offCtx.translate(newCanvasW / 2, newCanvasH / 2);
    offCtx.rotate(rad);
    offCtx.drawImage(srcImg, -origW / 2, -origH / 2);

    const newBase64 = offCanvas.toDataURL("image/png");
    const newImageObj = new Image();
    newImageObj.onload = () => {
      active.imageObj = newImageObj;
      active.base64 = newBase64;
      active.baseWidthPx = newCanvasW;
      active.baseHeightPx = newCanvasH;

      // Mantener el centro físico de la imagen en la misma posición de la mesa
      const centerX = active.x + active.w / 2;
      const centerY = active.y + active.h / 2;

      let newW = active.w;
      let newH = active.h;

      const normDeg = Math.abs(deg % 360);
      if (normDeg === 90 || normDeg === 270) {
        newW = active.h;
        newH = active.w;
      } else if (normDeg !== 0 && normDeg !== 180) {
        const scaleX = active.w / origW;
        const scaleY = active.h / origH;
        const avgScale = (scaleX + scaleY) / 2;
        newW = Math.round((origW * cos + origH * sin) * avgScale * 10) / 10;
        newH = Math.round((origW * sin + origH * cos) * avgScale * 10) / 10;
      }

      active.w = newW;
      active.h = newH;
      active.aspectRatio = active.w / active.h;

      // Mantener dentro de los límites de la mesa
      active.x = Math.max(0, Math.min(state.bedWidthMm - active.w, Math.round((centerX - newW / 2) * 10) / 10));
      active.y = Math.max(0, Math.min(state.bedHeightMm - active.h, Math.round((centerY - newH / 2) * 10) / 10));

      syncActiveImageToInputs();
      renderImageListMenu();
      updateSummaryStrip();
      checkOutOfBounds();
      drawBed();
    };
    newImageObj.src = newBase64;
  }

  function flipActiveImage(flipH, flipV) {
    const active = getActiveImage();
    if (!active || !active.imageObj) return;

    const srcImg = active.imageObj;
    const w = srcImg.naturalWidth || srcImg.width;
    const h = srcImg.naturalHeight || srcImg.height;

    const offCanvas = document.createElement("canvas");
    offCanvas.width = w;
    offCanvas.height = h;
    const offCtx = offCanvas.getContext("2d");

    // Fondo blanco
    offCtx.fillStyle = "#ffffff";
    offCtx.fillRect(0, 0, w, h);

    offCtx.translate(flipH ? w : 0, flipV ? h : 0);
    offCtx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
    offCtx.drawImage(srcImg, 0, 0);

    const newBase64 = offCanvas.toDataURL("image/png");
    const newImageObj = new Image();
    newImageObj.onload = () => {
      active.imageObj = newImageObj;
      active.base64 = newBase64;
      syncActiveImageToInputs();
      renderImageListMenu();
      updateSummaryStrip();
      drawBed();
    };
    newImageObj.src = newBase64;
  }

  if (btnRotateCCW) btnRotateCCW.addEventListener("click", () => rotateActiveImage(-90));
  if (btnRotateCW) btnRotateCW.addEventListener("click", () => rotateActiveImage(90));
  if (btnRotate180) btnRotate180.addEventListener("click", () => rotateActiveImage(180));
  if (btnFlipH) btnFlipH.addEventListener("click", () => flipActiveImage(true, false));
  if (btnFlipV) btnFlipV.addEventListener("click", () => flipActiveImage(false, true));

  if (btnApplyCustomRotate) {
    btnApplyCustomRotate.addEventListener("click", () => {
      const ang = parseFloat(customRotateAngle ? customRotateAngle.value : 0);
      if (ang !== 0) rotateActiveImage(ang);
    });
  }

  // Atajos de teclado
  window.addEventListener("keydown", (e) => {
    // Si el modal de recorte está abierto
    if (cropModalOverlay && cropModalOverlay.style.display !== "none") {
      if (e.key === "Escape") {
        closeCropModal();
        return;
      }
      if (e.key === "Enter") {
        applyCropResult();
        return;
      }
    }

    if (["INPUT", "SELECT", "TEXTAREA"].includes(document.activeElement?.tagName)) return;

    if (e.key === "Escape") {
      if (textModalOverlay && textModalOverlay.style.display !== "none") {
        closeTextModal();
      } else if (gcodeModalOverlay && gcodeModalOverlay.style.display !== "none") {
        gcodeModalOverlay.style.display = "none";
      }
      return;
    }

    if (e.key === "r" || e.key === "R") {
      rotateActiveImage(90);
    }
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

  if (sliderBrightness) {
    sliderBrightness.addEventListener("input", () => {
      if (valBrightness) valBrightness.textContent = sliderBrightness.value;
      saveActiveImageSettings();
    });
  }
  if (sliderContrast) {
    sliderContrast.addEventListener("input", () => {
      if (valContrast) valContrast.textContent = sliderContrast.value;
      saveActiveImageSettings();
    });
  }
  if (chkInvert) chkInvert.addEventListener("change", saveActiveImageSettings);
  if (algoSelect) {
    algoSelect.addEventListener("change", () => {
      saveActiveImageSettings();
      updateSummaryStrip();
    });
  }
  if (linesPerMm) {
    linesPerMm.addEventListener("change", () => {
      saveActiveImageSettings();
      updateSummaryStrip();
    });
  }
  if (minPower) {
    minPower.addEventListener("input", () => {
      saveActiveImageSettings();
      updateSummaryStrip();
    });
  }
  if (maxPower) {
    maxPower.addEventListener("input", () => {
      if (vectorLaserPowerInput) vectorLaserPowerInput.value = maxPower.value;
      saveActiveImageSettings();
      updateSummaryStrip();
    });
  }
  if (vectorLaserPowerInput) {
    vectorLaserPowerInput.addEventListener("input", () => {
      if (maxPower) maxPower.value = vectorLaserPowerInput.value;
      saveActiveImageSettings();
      updateSummaryStrip();
    });
  }
  if (laserMode) {
    laserMode.addEventListener("change", () => {
      if (vectorLaserModeSelect) vectorLaserModeSelect.value = laserMode.value;
      saveActiveImageSettings();
      updateSummaryStrip();
    });
  }
  if (vectorLaserModeSelect) {
    vectorLaserModeSelect.addEventListener("change", () => {
      if (laserMode) laserMode.value = vectorLaserModeSelect.value;
      saveActiveImageSettings();
      updateSummaryStrip();
    });
  }
  if (speedEngrave) {
    speedEngrave.addEventListener("input", () => {
      saveActiveImageSettings();
      updateSummaryStrip();
    });
  }
  if (passCount) {
    passCount.addEventListener("input", () => {
      if (vectorPassesSelect) vectorPassesSelect.value = passCount.value;
      saveActiveImageSettings();
      updateSummaryStrip();
    });
  }
  if (btnQuickStyles) {
    btnQuickStyles.forEach(btn => {
      btn.addEventListener("click", () => {
        applyQuickStyle(btn.dataset.style);
      });
    });
  }

  // Manejador del Selector de Modo de Trayectoria (Barrido vs Seguimiento)
  if (btnModeBarrido && btnModeSeguimiento) {
    btnModeBarrido.addEventListener("click", () => {
      state.workMode = "barrido";
      btnModeBarrido.classList.add("active");
      btnModeSeguimiento.classList.remove("active");
      if (rasterSettingsBox) rasterSettingsBox.style.display = "block";
      if (vectorSettingsBox) vectorSettingsBox.style.display = "none";
      if (activeModeBadge) activeModeBadge.textContent = t("badgeBarrido");
      saveActiveImageSettings();
      updateSummaryStrip();
      resizeCanvas();
      drawBed();
    });

    btnModeSeguimiento.addEventListener("click", () => {
      state.workMode = "seguimiento";
      btnModeSeguimiento.classList.add("active");
      btnModeBarrido.classList.remove("active");
      if (rasterSettingsBox) rasterSettingsBox.style.display = "none";
      if (vectorSettingsBox) vectorSettingsBox.style.display = "flex";
      if (activeModeBadge) activeModeBadge.textContent = t("badgeSeguimiento");
      saveActiveImageSettings();
      updateSummaryStrip();
      resizeCanvas();
      drawBed();
    });
  }

  if (toolTypeSelect) {
    toolTypeSelect.addEventListener("change", () => {
      if (zAxisControls) {
        zAxisControls.style.display = toolTypeSelect.value === "z_axis" ? "flex" : "none";
      }
      saveActiveImageSettings();
      updateSummaryStrip();
    });
  }

  if (sliderThreshold && valThreshold) {
    sliderThreshold.addEventListener("input", () => {
      valThreshold.textContent = sliderThreshold.value;
      saveActiveImageSettings();
    });
  }

  if (chkInvertVector) {
    chkInvertVector.addEventListener("change", saveActiveImageSettings);
  }
  if (curveTolSelect) {
    curveTolSelect.addEventListener("change", saveActiveImageSettings);
  }

  function updateSpeedPresetButtons(spd) {
    if (!btnSpeedPresets) return;
    btnSpeedPresets.forEach(b => {
      b.classList.toggle("active", parseFloat(b.dataset.speed) === parseFloat(spd));
    });
  }

  if (vectorOpSelect) {
    vectorOpSelect.addEventListener("change", () => {
      const op = vectorOpSelect.value;
      if (op === "cut") {
        if (vectorTypeSelect) vectorTypeSelect.value = "contour_outer";
        if (speedDrawInput) speedDrawInput.value = 300;
        if (lblSpeedDrawDynamic) lblSpeedDrawDynamic.textContent = t("lblSpeedCut");
        if (laserMode) laserMode.value = "M3";
        if (vectorLaserModeSelect) vectorLaserModeSelect.value = "M3";
        if (maxPower) maxPower.value = 1000;
        if (vectorLaserPowerInput) vectorLaserPowerInput.value = 1000;
        updateSpeedPresetButtons(300);
      } else if (op === "pen") {
        if (vectorTypeSelect) vectorTypeSelect.value = "centerline";
        if (speedDrawInput) speedDrawInput.value = 2500;
        if (lblSpeedDrawDynamic) lblSpeedDrawDynamic.textContent = t("lblSpeedDraw");
        updateSpeedPresetButtons(2500);
      } else if (op === "score") {
        if (vectorTypeSelect) vectorTypeSelect.value = "contour";
        if (speedDrawInput) speedDrawInput.value = 1500;
        if (lblSpeedDrawDynamic) lblSpeedDrawDynamic.textContent = t("lblSpeedDraw");
        if (laserMode) laserMode.value = "M4";
        if (vectorLaserModeSelect) vectorLaserModeSelect.value = "M4";
        if (maxPower) maxPower.value = 350;
        if (vectorLaserPowerInput) vectorLaserPowerInput.value = 350;
        updateSpeedPresetButtons(1500);
      }
      saveActiveImageSettings();
      updateSummaryStrip();
    });
  }

  if (btnSpeedPresets) {
    btnSpeedPresets.forEach(btn => {
      btn.addEventListener("click", () => {
        const spd = btn.dataset.speed;
        if (speedDrawInput) {
          speedDrawInput.value = spd;
          updateSpeedPresetButtons(spd);
          saveActiveImageSettings();
        }
        updateSummaryStrip();
      });
    });
  }

  if (vectorPassesSelect) {
    vectorPassesSelect.addEventListener("change", () => {
      if (passCount) passCount.value = vectorPassesSelect.value;
      saveActiveImageSettings();
      updateSummaryStrip();
    });
  }

  if (speedDrawInput) {
    speedDrawInput.addEventListener("input", () => {
      updateSpeedPresetButtons(speedDrawInput.value);
      saveActiveImageSettings();
      updateSummaryStrip();
    });
  }
  if (zUpInput) zUpInput.addEventListener("input", () => { saveActiveImageSettings(); updateSummaryStrip(); });
  if (zDownInput) zDownInput.addEventListener("input", () => { saveActiveImageSettings(); updateSummaryStrip(); });
  if (zSpeedInput) zSpeedInput.addEventListener("input", () => { saveActiveImageSettings(); updateSummaryStrip(); });

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

        const isCutting = (motionMode === "G1" || motionMode === "G2" || motionMode === "G3") &&
          ((laserActive && curS > 0) || (targetZ <= 0.05 && curZ <= 0.05));

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
      gcodeFileName.title = parsed.filename;
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

      if (state.workMode === "seguimiento") {
        const isZ = toolTypeSelect && toolTypeSelect.value === "z_axis";
        const vType = vectorTypeSelect && vectorTypeSelect.value === "centerline" 
          ? (currentLang === "es" ? "Centro Línea" : "Centerline") 
          : (vectorTypeSelect && vectorTypeSelect.value === "contour_outer" 
             ? (currentLang === "es" ? "Silueta Exterior" : "Outer Silhouette") 
             : (currentLang === "es" ? "Contornos" : "Contours"));
        const isCut = vectorOpSelect && vectorOpSelect.value === "cut";
        statResolution.textContent = `${vType} • ${isZ ? 'Eje Z' : (isCut ? '✂️ CORTE LÁSER' : 'Láser/Pluma')}`;
        statLaserPower.textContent = isZ ? `Z: ${zDownInput ? zDownInput.value : 0} a ${zUpInput ? zUpInput.value : 3} mm` : (isCut ? `M3 S${maxPower ? maxPower.value : 1000} (100% Corte)` : `S${maxPower ? maxPower.value : 1000} (Trazo)`);
        statFeedRate.textContent = `${speedDrawInput ? speedDrawInput.value : 300} mm/min`;
        const vPasses = vectorPassesSelect ? vectorPassesSelect.value : (passCount ? passCount.value : 1);
        statPasses.textContent = `${vPasses} ${vPasses == 1 ? t("passSingular") : t("passPlural")}`;
      } else {
        statResolution.textContent = `${t("resolution")}: ${linesPerMm ? linesPerMm.value : 6} l/mm`;
        statLaserPower.textContent = `S${minPower ? minPower.value : 0} - S${maxPower ? maxPower.value : 850} (${laserMode ? laserMode.value : 'M4'})`;
        statFeedRate.textContent = `${speedEngrave ? speedEngrave.value : 3500} mm/min`;
        statPasses.textContent = `${passCount ? passCount.value : 1} ${passCount && passCount.value == 1 ? t("passSingular") : t("passPlural")}`;
      }

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

    // Sincronizar con Ajustes de Modo Seguimiento
    if (prof.type === "cut") {
      if (vectorOpSelect) vectorOpSelect.value = "cut";
      if (lblSpeedDrawDynamic) lblSpeedDrawDynamic.textContent = t("lblSpeedCut");
      if (speedDrawInput) speedDrawInput.value = scaledSpeed;
      if (vectorPassesSelect) vectorPassesSelect.value = String(prof.passes || 1);
      updateSpeedPresetButtons(scaledSpeed);
    } else if (state.workMode === "seguimiento" && vectorOpSelect && vectorOpSelect.value === "cut") {
      // Si está en modo seguimiento corte, mantener velocidad de corte adecuada
      if (speedDrawInput && parseFloat(speedDrawInput.value) > 1000) {
        speedDrawInput.value = 300;
        updateSpeedPresetButtons(300);
      }
    }

    if (vectorLaserPowerInput) vectorLaserPowerInput.value = maxPower.value;
    if (vectorLaserModeSelect) vectorLaserModeSelect.value = laserMode.value;
    saveActiveImageSettings();
    syncActiveImageToInputs();
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
      if (clickedImg.groupId) {
        state.dragGroupOffsets = state.images
          .filter(i => i.groupId === clickedImg.groupId)
          .map(i => ({ id: i.id, startX: i.x, startY: i.y }));
      } else {
        state.dragGroupOffsets = null;
      }
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
      if (state.dragGroupOffsets && state.dragGroupOffsets.length > 0) {
        state.dragGroupOffsets.forEach(item => {
          const target = state.images.find(i => i.id === item.id);
          if (target) {
            target.x = Math.round((item.startX + deltaX) * 10) / 10;
            target.y = Math.round((item.startY + deltaY) * 10) / 10;
          }
        });
      } else {
        active.x = Math.round((state.dragStartImgX + deltaX) * 10) / 10;
        active.y = Math.round((state.dragStartImgY + deltaY) * 10) / 10;
      }
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
    state.dragGroupOffsets = null;
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
      const badgeInfo = getStyleBadgeInfo(img);
      const styleColor = badgeInfo.color;

      if (isSelected) {
        ctx.strokeStyle = isOver ? "#ff2a5f" : (img.printEnabled ? styleColor : "#8c9bb4");
        ctx.lineWidth = 2.0;
        ctx.setLineDash([5, 3]);
        ctx.strokeRect(imgX, imgY, imgW, imgH);
        ctx.setLineDash([]);

        const handleRadius = 4.5;
        ctx.fillStyle = isOver ? "#ff2a5f" : (img.printEnabled ? styleColor : "#8c9bb4");
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

        ctx.fillStyle = isOver ? "#ff2a5f" : (img.printEnabled ? styleColor : "#8c9bb4");
        ctx.font = "bold 10px monospace";
        ctx.fillText(`#${idx+1} [${img.w} × ${img.h} mm] • ${badgeInfo.label}`, imgX + 6, imgY - 6);

      } else {
        ctx.strokeStyle = isOver ? "#ff2a5f" : (img.printEnabled ? styleColor : "rgba(140, 155, 180, 0.25)");
        ctx.lineWidth = 1.2;
        if (!img.printEnabled) ctx.setLineDash([3, 3]);
        ctx.strokeRect(imgX, imgY, imgW, imgH);
        ctx.setLineDash([]);

        ctx.fillStyle = isOver ? "#ff2a5f" : (img.printEnabled ? styleColor : "#5a6880");
        ctx.font = "9.5px monospace";
        ctx.fillText(`#${idx+1} • ${badgeInfo.label}`, imgX + 4, imgY + 12);
      }
    });

    // DIBUJAR CONTORNOS Y ETIQUETAS DE GRUPOS
    const renderedGroupIds = new Set();
    state.images.forEach(img => {
      if (img.groupId && !renderedGroupIds.has(img.groupId)) {
        renderedGroupIds.add(img.groupId);
        const grp = state.groups[img.groupId];
        if (!grp) return;
        const grpMembers = state.images.filter(i => i.groupId === img.groupId);
        if (grpMembers.length === 0) return;

        const gMinX = Math.min(...grpMembers.map(i => i.x));
        const gMaxX = Math.max(...grpMembers.map(i => i.x + i.w));
        const gMinY = Math.min(...grpMembers.map(i => i.y));
        const gMaxY = Math.max(...grpMembers.map(i => i.y + i.h));

        const padMm = 2.0;
        const gx = mmToPxX(gMinX - padMm);
        const gy = mmToPxY(gMaxY + padMm);
        const gw = (gMaxX - gMinX + padMm * 2) * state.zoom;
        const gh = (gMaxY - gMinY + padMm * 2) * state.zoom;

        const isGroupActive = grpMembers.some(i => i.id === state.activeImageId);

        ctx.save();
        // Fondo translúcido sutil del grupo
        ctx.fillStyle = hexToRgba(grp.color, isGroupActive ? 0.08 : 0.03);
        ctx.fillRect(gx, gy, gw, gh);

        // Borde discontinuo del grupo
        ctx.strokeStyle = grp.color;
        ctx.lineWidth = isGroupActive ? 2.0 : 1.2;
        ctx.setLineDash(isGroupActive ? [6, 3] : [4, 4]);
        ctx.strokeRect(gx, gy, gw, gh);
        ctx.setLineDash([]);

        // Etiqueta del Grupo en el lienzo
        ctx.fillStyle = grp.color;
        ctx.font = "bold 10px monospace";
        ctx.fillText(`👥 ${grp.name} (${grpMembers.length})`, gx + 6, gy + 12);
        ctx.restore();
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
      const fnameDisplay = g.filename.length > 28 ? g.filename.substring(0, 25) + "..." : g.filename;
      ctx.fillText(`📄 ${fnameDisplay} (${b.width.toFixed(1)} × ${b.height.toFixed(1)} mm)`, bx + 6, by - 6);
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
      work_mode: state.workMode,
      vector_op: vectorOpSelect ? vectorOpSelect.value : "cut",
      vector_type: vectorTypeSelect ? vectorTypeSelect.value : "contour",
      tool_type: toolTypeSelect ? toolTypeSelect.value : "laser",
      z_up: parseFloat(zUpInput ? zUpInput.value : 3.0),
      z_down: parseFloat(zDownInput ? zDownInput.value : 0.0),
      z_speed: parseFloat(zSpeedInput ? zSpeedInput.value : 1200.0),
      curve_tolerance: parseFloat(curveTolSelect ? curveTolSelect.value : 0.35),
      speed_draw: parseFloat(speedDrawInput ? speedDrawInput.value : 300.0),
      threshold: parseInt(sliderThreshold ? sliderThreshold.value : 128),
      lines_per_mm: parseFloat(linesPerMm.value),
      speed_engrave: parseFloat(speedEngrave.value),
      speed_travel: 6000.0,
      min_power: parseInt(minPower.value),
      max_power: parseInt(maxPower.value),
      laser_mode: laserMode.value,
      passes: state.workMode === "seguimiento" ? parseInt(vectorPassesSelect ? vectorPassesSelect.value : 1) : parseInt(passCount.value),
      auto_home_end: chkAutoHomeEnd ? chkAutoHomeEnd.checked : true,
      auto_home_between: chkAutoHomeBetween ? chkAutoHomeBetween.checked : true,
      hardware_homing: chkHardwareHoming ? chkHardwareHoming.checked : true,
      items: activeItems.map(img => {
        ensureImageProperties(img);
        return {
          id: img.id,
          name: img.name,
          image_base64: img.base64,
          width_mm: img.w,
          height_mm: img.h,
          origin_x: img.x,
          origin_y: img.y,
          work_mode: img.workMode || state.workMode,
          vector_op: img.vectorOp || "cut",
          vector_type: img.vectorType || "contour",
          tool_type: img.toolType || "laser",
          z_up: img.zUp !== undefined ? img.zUp : 3.0,
          z_down: img.zDown !== undefined ? img.zDown : 0.0,
          z_speed: img.zSpeed !== undefined ? img.zSpeed : 1200.0,
          curve_tolerance: img.curveTolerance !== undefined ? img.curveTolerance : 0.35,
          speed_draw: img.speedDraw !== undefined ? img.speedDraw : (img.vectorOp === "cut" ? 300.0 : 1500.0),
          threshold: img.threshold !== undefined ? img.threshold : 128,
          lines_per_mm: img.linesPerMm !== undefined ? img.linesPerMm : 6.0,
          speed_engrave: img.speedEngrave !== undefined ? img.speedEngrave : 3500.0,
          speed_travel: 6000.0,
          min_power: img.minPower !== undefined ? img.minPower : 0,
          max_power: img.maxPower !== undefined ? img.maxPower : (img.vectorOp === "cut" ? 1000 : 850),
          laser_mode: img.laserMode || (img.vectorOp === "cut" ? "M3" : "M4"),
          algorithm: img.algorithm || "dither_atkinson",
          brightness: img.brightness !== undefined ? img.brightness : 1.0,
          contrast: img.contrast !== undefined ? img.contrast : 1.0,
          gamma: 1.0,
          invert: !!img.invert,
          passes: img.passes !== undefined ? img.passes : 1,
          print_enabled: true
        };
      })
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
      alert(t("alertGcodeSuccess", activeCount, state.images.length, job.line_count, job.estimated_time_formatted, job.auto_saved_gcode_path, (job.saved_images || []).length, job.images_dir));
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

  async function openOutputFolder(type) {
    try {
      const res = await fetch("/api/open_folder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type })
      });
      const data = await res.json();
      if (!data.success) {
        alert(`Error opening folder: ${data.error || "Unknown error"}`);
      }
    } catch (e) {
      alert(`Network error opening folder: ${e.message}`);
    }
  }

  if (btnOpenGcodeDir) {
    btnOpenGcodeDir.addEventListener("click", () => openOutputFolder("gcodes"));
  }
  if (btnOpenImagesDir) {
    btnOpenImagesDir.addEventListener("click", () => openOutputFolder("images"));
  }

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
