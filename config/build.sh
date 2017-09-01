#!/bin/bash
docker ps -a | awk '{ print $1,$2 }' | grep pkandel/symbiote:latest | awk '{print $1 }' | xargs -I {} docker rm {} -f
if [ -z "${1}" ]; then
   version="latest"
else
   version="${1}"
fi

docker build --no-cache -t pkandel/symbiote:${version} .
