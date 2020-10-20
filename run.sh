#!/bin/bash

#arrancar BD (si se cierra verificar que existe carpeta /data/db en directorio raíz del SO)
gnome-terminal -e 'sudo mongod'

#arrancar servidor node
nodemon

