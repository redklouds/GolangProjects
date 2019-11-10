FROM golang:latest

LABEL maintainer="Dannyly@redklouds.com"
LABEL version="1.0"

#staying with the golang project structure in the image
RUN mkdir /go/src/app
RUN mkdir /go/pkg
#run mkdir /go/bin


#download dep into the image
RUN go get -u github.com/golang/dep/cmd/dep

#add the go files
    #not that all the files will be put into app
ADD . /go/src/app

COPY ./Gopkg.toml /go/src/app

WORKDIR /go/src/app

RUN dep ensure

RUN go test -v 

RUN go build -o main .

#WORKDIR /app

#copy . /app

#this container is simply a container, i will build the executable on the outside
# and place them inside the container, PROS: quick smaller dockerfile

#RUN go build -o main .

EXPOSE 3000

CMD ["./main"]
