package main

import (
	"fmt"
	"net/http"

	appauthmiddleware "JokeApp/authmiddleware"

	jwtmiddleware "github.com/auth0/go-jwt-middleware"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"

	apphandlers "JokeApp/handlers"
)

// Joke contains information about a single joke
//this is Importat to understand the encoding and decoding tildal enforcments
type Joke struct {
	ID    int    `json:"id" binding:"required"`
	Likes int    `json:"likes"`
	Joke  string `json:"joke" binding:"required"`
}

//the middleware
var appJwtMiddleWare *jwtmiddleware.JWTMiddleware

func main() {

	//per := appauthmiddleware.Person{}

	config := Configuration{}
	//config.GetConfigurations()
	config.InitalizeConfigurations()
	appJwtMiddleWare = appauthmiddleware.GetMiddleWare()
	router := gin.Default()

	//server frontent static files
	//trigger test again

	router.Use(static.Serve("/", static.LocalFile("./views", true)))
	//tes1
	//setup route group for the API
	//seems this funtionality is the ability to group multiple routes into groups!
	//it seems size wise and scale
	//	net/http -> mux -> gin https://forum.golangbridge.org/t/is-gorilla-mux-a-mainly-used-package-to-write-restful-api/7089

	//technically this Grouping feature allows for grouping multiple routes
	//** Look this up

	/*
		The app will consist of two routes,
			/Jokes - which will retrive a list of jokes a user can see
			/jokes/like/:jokeID - which will capture likes sent to a particular joke

	*/

	api := router.Group("/api")
	{

		api.GET("/", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message": "pong",
			})
		})
	}

	//lets do another method of adding routes to a group above
	// GET J/JOKEs
	//adding the middleweare on this requst the .GET accepts multiple handlers, and
	//our authMiuddleWare() returns a gin.HandlerFunc - handler function
	api.GET("/jokes", authMiddlewareHandler(), apphandlers.JokeHandler)

	// POST /jokes/likes/:JokeID
	api.POST("/jokes/like/:jokeID", apphandlers.LikeJokesHandler)

	//baseUrl:port/api/v2 route group!
	apiV2 := router.Group("api/v2")
	{
		apiV2.GET("/SayHello", func(c *gin.Context) {
			c.JSON(http.StatusRequestTimeout, gin.H{
				"Saying Hello": "With Partial Status Code",
			})
		})
	}

	router.Run(":" + config.Port)

}
func authMiddlewareHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Get the client secret key
		//the CheckJWT makes a call out to the server to validate and comes back with a response and request style

		err := appJwtMiddleWare.CheckJWT(c.Writer, c.Request)
		if err != nil {
			// Token not found
			fmt.Println(err)
			c.Abort()
			c.Writer.WriteHeader(http.StatusUnauthorized)
			c.Writer.Write([]byte("Unauthorized"))
			return
		}
	}
}
