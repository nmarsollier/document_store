### Si queres sabes mas sobre mi:
[Nestor Marsollier](https://github.com/nmarsollier/profile)

# Microservicio de Recursos Restful

Este microservicio es un wrapper a redis que permite agregar documentos por url.
Solo podemos agregar y obtener documentos, asi como tambien listar contenidos.

Es solo para pruebas locales, para simular un servidor restful de contenidos, no sirve para poner en prod.

## Dependencias

## Redis

Las imágenes se almacenan en una instancia de Redis. Seguir los pasos de instalación desde la pagina oficial [redis.io](https://redis.io/download)

No se requiere ninguna configuración adicional, solo levantarlo luego de instalarlo.

Tambien se puede instalar usando docker, ver notas en [ecommerce](https://github.com/nmarsollier/ecommerce)

## Endpoints

### PUT 

Podemos hacer un put a un documento, en la url que queramos :
PUT http://localhost:3001/hola/mundo

Con un body por ejemplo 
```bash
{ 
 "mensaje": "Hola Mundo"
}
```

El id del documento es la url en si.

Luego podemos obtener el documento con GET a la misma url

GET http://localhost:3001/hola/mundo

y obtnemos el dato que agregamos.

Podemos listar los documentos en un path especifico 

GET http://localhost:3001/?list=true

o bien 

GET http://localhost:3001/hola/?list=true

## Docker

### Build

```bash
docker build --no-cache -t document_store https://github.com/nmarsollier/document_store/raw/master/Dockerfile.prod
```

### El contenedor

```bash
# Mac | Windows
docker run -d --name document_store -p 3000:3000 document_store

# Linux
docker run --add-host host.docker.internal:172.17.0.1 -d --name document_store -p 3000:3000 document_store
```
