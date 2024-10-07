# Proyecto Empleados- Solictudes (React, Node, Postgres, Docker)

## Instrucciones de instalación

1. **Clonar el repositorio**

   Clona este repositorio de Git en tu máquina local utilizando el siguiente comando:

   git clone https://github.com/968578/prueba-konecta


   Ingresas a la carpeta con el siguiente comando:

   cd prueba-konecta

2. **Levantar la APP**

    Debes verificar que los puertos 5001 y 5173 esten libres por que la app usa esos puertos
    Con el siguiente comando levantas la app:

    docker-compose up --build -d

2. **Ingresa a la APP**

    Usuario= super-admin
    Contraseña= omar1234

    -Este proyecto levantará una aplicación frontend en el puerto 5173 y una aplicación backend en el puerto -
    5001.
    -La sesión vence cada 5 minutos, lo que te llevará al login al expirar.
    -Cuando docker termine abre la aplicación en tu navegador en la siguiente dirección: http://localhost:5173/.

