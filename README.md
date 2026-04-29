# Sistema de Gestión de Actividades y Tareas Diarias

Este es el proyecto final para la materia de Desarrollo Basado en Modelos. Consiste en una aplicación web tipo cliente-servidor que permite registrar, editar, organizar y eliminar tareas con sus respectivas prioridades y fechas de entrega.

La interfaz de usuario está construida con HTML, CSS y JavaScript puro. El servidor está desarrollado en Java usando Spring Boot y la información se almacena en una base de datos MySQL desplegada mediante contenedor Docker.

## Requisitos de instalación

Para ejecutar este proyecto en tu computadora, necesitas tener instalado lo siguiente:

- JDK versión 17 o superior.
- Docker Engine/Docker Desktop.

## Instrucciones de ejecución

### 1. Iniciar la base de datos

En una terminal, dentro de la carpeta principal del proyecto ejecuta el siguiente comando para descargar y encender el contenedor de MySQL:

```bash
docker-compose up -d
```
El contenedor tiene que inicializarse correctamente en el puerto 3306.

### 2. Iniciar el servidor backend

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

### 3. Usar la herramienta

Con la base de datos y el servidor corriendo, regresa a la carpeta principal del proyecto y abre el archivo `index.html`.