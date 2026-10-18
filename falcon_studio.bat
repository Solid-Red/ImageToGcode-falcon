@echo off
title Falcon G-Code Studio v3
cd /d "%~dp0"
echo ============================================================
echo   Iniciando Falcon G-Code Studio v3...
echo ============================================================
python falcon_app.py
if %errorlevel% neq 0 (
    echo.
    echo Ocurrio un error al ejecutar Falcon Laser Studio.
    pause
)
