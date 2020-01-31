#!/bin/bash


docker run -p 80:80 -v $PWD/nginx.conf:/etc/nginx/nginx.conf -v $PWD/build:/usr/share/nginx/html nginx:alpine
