package main


import (
	"net/http"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)


func main(){

	router := gin.Default()
	

	//server frontent static files

	router.Use(static.Serve("/", static.LocalFile("./views", true)))

	//setup route group for the API
	//seems this funtionality is the ability to group multiple routes into groups!
	//it seems size wise and scale
	//	net/http -> mux -> gin https://forum.golangbridge.org/t/is-gorilla-mux-a-mainly-used-package-to-write-restful-api/7089

	api := router.group("/api"){
		
	}

}