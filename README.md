# Sistema de Gestión de Actividades y Tareas Diarias

Este es el proyecto final para la materia de Desarrollo Basado en Modelos. Consiste en una aplicación web tipo cliente-servidor que permite registrar, editar, organizar y eliminar tareas con sus respectivas prioridades y fechas de entrega.

La interfaz de usuario está construida con HTML, CSS y JavaScript puro. El servidor está desarrollado en Java usando Spring Boot y la información se almacena en una base de datos MySQL desplegada mediante contenedor Docker.

## Requisitos de instalación

Para ejecutar este proyecto en tu computadora, necesitas tener instalado lo siguiente:

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

### 4. Usar la herramienta

Con la base de datos y el servidor corriendo, regresa a la carpeta principal del proyecto y abre el archivo `index.html`.