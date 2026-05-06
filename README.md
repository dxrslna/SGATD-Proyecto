# Sistema de Gestión de Actividades y Tareas Diarias

Este es el proyecto para la materia de Desarrollo Basado en Modelos. Consiste en una aplicación web tipo cliente-servidor que permite registrar, editar, organizar y eliminar tareas con sus respectivas prioridades y fechas de entrega.

La interfaz de usuario está construida con HTML, CSS y JavaScript. El servidor está desarrollado en Java usando Spring Boot y la información se almacena en una base de datos MySQL desplegada mediante contenedor Docker.

## Requisitos de instalación

Para ejecutar este proyecto, necesitas tener instalado lo siguiente:

- JDK versión 17 o superior.
- Docker Engine/Docker Desktop.
- MySQL Workbench (para administrar y visualizar la base de datos).

## Instrucciones de ejecución

### 1. Iniciar la base de datos

En una terminal, dentro de la carpeta principal del proyecto ejecuta el siguiente comando para descargar y encender el contenedor de MySQL:

```bash
docker-compose up -d
```
El contenedor tiene que inicializarse correctamente en el puerto 3306.

### 2. Configurar la conexión en MySQL Workbench

1. Abre **MySQL Workbench** y haz clic en el ícono de **+** junto a *MySQL Connections*.
2. Configura la nueva conexión con los siguientes datos:
   - **Connection Name:** SGATD_DB (o el nombre que prefieras)
   - **Hostname:** `localhost`
   - **Port:** `3306`
   - **Username:** `root`
3. Haz clic en **Store in Vault...** e ingresa la contraseña: `root`.
4. Presiona **Test Connection** para verificar que se conecte correctamente al contenedor y luego haz clic en **OK**.
5. Al abrir la conexión, podrás ver la base de datos `sgatd_db` a la izquierda. Nota: Las tablas serán creadas automáticamente por el servidor backend cuando lo inicies.

### 3. Iniciar el servidor backend

En otra terminal, dentro de la carpeta principal del proyecto, ingresa a la carpeta del backend:

```bash
cd sgatd.backend
```
Inicia el servidor con el comando correspondiente:
```bash
.\mvnw.cmd clean spring-boot:run
```
O si usas Linux o Git Bash:
```bash
./mvnw clean spring-boot:run
```
El servidor estará listo cuando la consola indique que Tomcat ha iniciado en el puerto 8080.

### 4. Despliegue del Frontend (Apache / XAMPP)

> **⚠️ IMPORTANTE:** Aunque el frontend se sirva a través de Apache, **es obligatorio** tener la base de datos (Paso 1) y el servidor backend (Paso 3) ejecutándose en sus respectivas terminales para que el sistema pueda guardar y mostrar las tareas.

El frontend de la aplicación (HTML, CSS y JS) puede ser ejecutado directamente abriendo `index.html`, o mejor aún, servido mediante un servidor web como **Apache** (usando **XAMPP**).

#### Opción A: Usar script automático para XAMPP (Recomendado)
1. Ejecuta el archivo `deploy-xampp.bat` haciendo doble clic sobre él en tu explorador de archivos.
2. Este script creará automáticamente una carpeta llamada `sgatd` en el directorio de XAMPP (`C:\xampp\htdocs\sgatd`) y copiará los archivos del frontend.
3. Abre el **Panel de Control de XAMPP** e inicia el servicio de **Apache**. *(Nota: No necesitas iniciar MySQL ni Tomcat en XAMPP, ya que usas Docker y Spring Boot para la base de datos y el backend).*
4. Ingresa a [http://localhost/sgatd](http://localhost/sgatd) en tu navegador web.

#### Opción B: Copia manual a XAMPP
1. Abre tu explorador de archivos y ve a la carpeta de instalación de XAMPP (usualmente `C:\xampp\htdocs`).
2. Crea una nueva carpeta llamada `sgatd`.
3. Copia los archivos `index.html`, `script.js` y `style.css` de este proyecto dentro de la nueva carpeta `C:\xampp\htdocs\sgatd`.
4. Abre el **Panel de Control de XAMPP** e inicia el servicio de **Apache**.
5. Abre tu navegador y dirígete a [http://localhost/sgatd](http://localhost/sgatd).

#### Opción C: Ejecución local sin servidor web
Con la base de datos y el servidor backend corriendo, simplemente regresa a la carpeta principal del proyecto y abre el archivo `index.html` haciendo doble clic.
