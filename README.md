# Sistema de Gestión de Actividades y Tareas Diarias

## Requisitos de instalación

- JDK versión 17 o superior
- Docker Engine/Docker Desktop
- MySQL Workbench
- XAMPP

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

> Aunque el frontend se sirva a través de Apache, es necesario tener la base de datos y el servidor backend ejecutándose en sus respectivas terminales para que el sistema pueda guardar y mostrar las tareas.


#### Usar script automático
1. Ejecuta el archivo `deploy-xampp.bat`
2. Este script creará automáticamente una carpeta llamada `sgatd` en el directorio de XAMPP (`C:\xampp\htdocs\sgatd`) y copiará los archivos del frontend.
3. Abre XAMPP e inicia el servicio de Apache solamente.
4. Ingresa a [http://localhost/sgatd](http://localhost/sgatd).

#### En caso de que no funcione el script:
1. Abre tu explorador de archivos y ve a la carpeta de instalación de XAMPP
2. Crea una nueva carpeta llamada `sgatd`.
3. Copia los archivos `index.html`, `script.js` y `style.css` de este proyecto dentro de la carpeta `C:\xampp\htdocs\sgatd`.
4. Abre XAMPP e inicia el servicio de Apache
5. Abre tu navegador y dirígete a [http://localhost/sgatd](http://localhost/sgatd).

