# Amlode

## Docker
```
docker compose up
docker system prune
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## FIWARE

Para poder levantar la aplicación hay que levanta el docker-compose.yml con docker compose up, con esto levantamos los servicios de:
- Orion,
- Mongo-Db,
- Adminmongo,
- Mysql-db,
- Keyrock. 

Esto nos permite poder consumir los endpoints de Orion y de Keyrock.

Orion:
localhost:1026/version(GET)
localhost:1026/v2/entities(GET)
localhost:1026/v2/entities/:id?type=user(GET)
localhost:1026/v2/entities(POST)
localhost:1026/v2/entities/:id /attrs?type=user(PATH)
localhost:1026/v2/entities/:id (DELETE)

Keyrock:
Paso 1: http://localhost:3000/v1/auth/tokens(POST)
  En el body 
{
  "name": "admin@test.com",
  "password": "1234"
}

Te devuelve un X-Subject-Header en headers que se pone en el paso dos en X-Auth-token.

Paso 2: http://localhost:3000/v1/applications(POST)

El paso dos te devuelve el ID y el SECRET que se pone en el paso tres en Authorization (basic auth) junto con:
Content-Type: application/x-www-form-urlencoded
body:
  grant_type: "Password"
  username: "admin@test.com"
  Password: "1234"
para que genere el QAUTH2.

Paso 3: http://localhost:3000/oauth2/token(POST)

Si se hacen los tres pasos, se genera una aplicación en el localhost:3000, si entramos con: admin@test.com / 1234 lo podemos ver. 

El paso que nos interesa es el paso 3, que nos devuelve el token para la sesión. Podemos usar variables de entorno para guardar nuestro ID de cliente y ID secret y así poder utilizar el tercer endpoint. Solamente pueden entrar al logueo las personas autorizadas por nuestra aplicación, donde el acceso se realiza en la pagina.

Para obetener datos de la persona que se logueo(token, si expiró o no, datos del usuario, etc), se realiza el siguiente endpoint:
http://localhost:3000/user?access_token=:token(GET)



