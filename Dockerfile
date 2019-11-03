FROM golang:latest

LABEL maintainer="Dannyly@redklouds.com"

WORKDIR /app

copy . /app

#this container is simply a container, i will build the executable on the outside
# and place them inside the container, PROS: quick smaller dockerfile

