<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# SOCIAL SERVER

Una sencilla apirestfull construida desde cero (0) en [NESTJS](https://nestjs.com/)

**SOCIAL SERVER** forma parte de un MERN

Es recomendable tener el cliente o **CL** de nestjs instalado de forma global, para eso utilizaremos el comando

```
$ npm i -g @nestjs/cli
```

Una ves con esto ya podemos comenzar a generar nuestro proyecto o contruccion de la apirest en [nestjs](https://nestjs.com/)

## Para generar nuestro proyecto lo hacemos con la siguiente instruccion

```
$ nest new project-name
```

NestJs, es un framework que viene todo sesaclopado o para armar como un juego de [legos](https://www.lego.com/es-ar/kids)

## Servidor [Static](https://docs.nestjs.com/recipes/serve-static#serve-static) una pagina html o proyecto react o vue.js

lo hacemos de la siguiente forma

```
$ yarn add @nestjs/serve-static
```

luego agregamos a la seccion bootstrap, especificamente en el imports:

```
imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
  ]
```

## Agregar un [prefijo](https://docs.nestjs.com/faq/global-prefix#global-prefix) a nuestra apirest, dentro del archivo main.ts

```
  app.setGlobalPrefix('api/v1');

```

# Configuracion de las [variables globales](https://docs.nestjs.com/techniques/configuration#use-module-globally) _.env_

archivo app.modules.ts

```
yarn add @nestjs/config
```

creamos una carpeta desntro src llamada config y dentro creamos un carchillo llamado env.config.ts _src/config/env.config.ts_ dentro de _env.config.ts_ colocamos lo siguiente

```
export const EnvConfiguration = () => ({
  enviroment: process.env.NODE_ENV,
  defaultLimit: +process.env.DEFAULT_LIMIT || 5,
});

```

## Crear imagen de docker para base datos docker-compose.yml

```
version: '3'

services:
  db:
    image: mongo:5.0-focal
    container_name: socialmdb
    # restart: always
    ports:
      - 27022:27017
    environment:
      MONGODB_DATABASE: nest-social
    volumes:
      - ./mongo:/data/db

```

Ejecutar imagen con el siguiente comando

```
docker compose up -d
```

## Conecion con la base de datos [mongodb](https://docs.nestjs.com/techniques/mongodb)
