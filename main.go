package main

import (
	"net/http"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func main() {

	router := gin.Default()

	//server frontent static files

	router.Use(static.Serve("/", static.LocalFile("./views", true)))

	//setup route group for the API
	//seems this funtionality is the ability to group multiple routes into groups!
	//it seems size wise and scale
	//	net/http -> mux -> gin https://forum.golangbridge.org/t/is-gorilla-mux-a-mainly-used-package-to-write-restful-api/7089

	//technically this Grouping feature allows for grouping multiple routes
	//** Look this up
	api := router.Group("/api")
	{

		api.GET("/", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message": "pong",
			})
		})
	}

	//baseUrl:port/api/v2 route group!
	apiV2 := router.Group("api/v2")
	{
		apiV2.GET("/SayHello", func(c *gin.Context) {
			c.JSON(http.StatusRequestTimeout, gin.H{
				"Saying Hello": "With Partial Status Code",
			})
		})
	}

	router.Run(":3000")

}
