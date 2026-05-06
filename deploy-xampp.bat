@echo off
echo ==============================================
echo Desplegando Frontend en XAMPP (Apache)
echo ==============================================

set XAMPP_HTDOCS=C:\xampp\htdocs
set PROJECT_NAME=sgatd
set TARGET_DIR=%XAMPP_HTDOCS%\%PROJECT_NAME%

if not exist "%XAMPP_HTDOCS%" (
    echo [ERROR] No se encontro el directorio htdocs de XAMPP en %XAMPP_HTDOCS%.
    echo Si instalaste XAMPP en otra ubicacion, por favor realiza la copia manual.
    pause
    exit /b
)

echo Creando directorio %TARGET_DIR% ...
if not exist "%TARGET_DIR%" mkdir "%TARGET_DIR%"

echo Copiando archivos del frontend...
copy index.html "%TARGET_DIR%\index.html" /Y
copy style.css "%TARGET_DIR%\style.css" /Y
copy script.js "%TARGET_DIR%\script.js" /Y

echo ==============================================
echo Despliegue completado con exito.
echo.
echo Ahora puedes abrir el Panel de Control de XAMPP, iniciar Apache,
echo e ingresar a: http://localhost/%PROJECT_NAME%
echo ==============================================
pause
