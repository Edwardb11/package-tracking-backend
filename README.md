##  REST API 

**¿Qué es una REST API?**
Es una interfaz de programación de aplicaciones (API) que se ajusta a los límites de la arquitectura REST y permite la interacción con los servicios web de RESTful.
![image](https://miro.medium.com/max/1400/1*8xiomMtgtp1aeVAUFYRv1g.png)


## Demo

[API](https://package-tracking-backend-production.up.railway.app/api/v1)

### Ejecutar localmente

1. Clona el proyecto.

```bash
git clone https://github.com/Edwardb11/package-tracking-backend
```

2. Ir al directorio del proyecto.
```bash
   cd package-tracking-backend
```
3. Instalar dependencias.

```bash
 npm install
```
4. Configure su archivo ```.env``` usando ```.env.example``` como referencia.
Para ejecutar este proyecto, deberá agregar las siguientes variables de entorno a su archivo ```.env```.

```bash
Archivo: .env
ACCESS_TOKEN_SECRET = jsfgfjguwrg8783wgbjs849h2fu3cnsvh8wyr8fhwfvi2g225
REFRESH_TOKEN_SECRET = 825y8i3hnfjmsbv7gwajbl7fobqrjfvbs7gbfj2q3bgh8f42
PORT = 5000
MYSQLHOST = containers-us-west-49.railway.app
MYSQLUSER = root
MYSQLPASSWORD = B8DWKu6xUy2fAaAPXc2P
MYSQLDATABASE = railway
MYSQLPORT = 6787
ORIGIN = https://package-tracking-frontend.vercel.app

```

5. Inicie el servidor de nodos.
```bash
npm run dev
```
6. Abra el servidor de desarrollo en ```http://localhost:5000```

### Documentación 
- [Documentación](https://github.com/Edwardb11/package-tracking-backend/wiki)
### Autor

- [@Edwardb11](https://www.github.com/Edwardb11)
