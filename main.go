package main

import (
	"net/http"
	"strconv"

	//jwtmiddleware "github.com/auth0/go-jwt-middleware"
	//jwt "github.com/dgrijalva/jwt-go"

	//jwtmiddleware "github.com/auth0/go-jwt-middleware"
	//jwtmiddleware "github.com/auth0/go-jwt-middleware"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

// Joke contains information about a single joke
//this is Importat to understand the encoding and decoding tildal enforcments
type Joke struct {
	ID    int    `json:"id" binding:"required"`
	Likes int    `json:"likes"`
	Joke  string `json:"joke" binding:"required"`
}

var jokes = []Joke{
	Joke{1, 0, "Did you hear aout the resturant on the moon? Great food, no atmosphere."},
	Joke{2, 0, "What do you all a fake noodle? An Impasta."},
	Joke{3, 0, "How many apples grow on a tree? All of them>"},
	Joke{4, 0, "Want to hear a joke about paper? Nevermind it's tearable>"},
	Joke{5, 0, "I Just watched a program about beavers. It was the best dam program I've ever seen."},
	Joke{6, 0, "Why did the coffee file a police report? It got mugged."},
	Joke{7, 0, "How does a penguin build it's house? Igloos it together."},
}

//var jwtMiddleWare *jwtmiddleware.JWTMiddleware

func main() {
	config := Configuration{}
	config.GetConfigurations()
	config.InitalizeConfigurations()

	/*
		jwtMiddleware := jwtmiddleware.New(jwtMiddleWare.Options{
			ValidationGetGetter: func(token *jwt.Token) (interface{}, error){
				aud := os.Getenv("AUTHO_API_AUDIENCE")
				//setting the VerifyAudiene second parameter 'req' to false will return
				//true if the current token audience matches what audience we are checing for
				//* ITS VERY IMPORTANT TO VERIFY THE AUDIENCE OF A JWT TOKEN REQUEST
				checkAudiene := token.Claims.(jwt.MapClaims).VerifyAudience(aud, false)
				if !checkAudiene {
					return token, error.New("Invalid Audience")
				}

				//verify iss claim

				//this part is validating the DOMAIN with the JWT Request
				iss := os.Getenv("AUTH0_DOMAIN")
				checkIss := token.Claims.(jwt.MapClaims).VerifyIssuer(iss, false)
				if !checkIss {
					return token, errors.New("Invalid Issuer")
				}

				cert, err := getPermCert(token)
				if err != nil {
					log.Fatal("Could not get cert: %+v", err)
				}

				result, _ := jwt.ParseRSAPublicKeyFromPEM([]byte(cert))

			}

		})
	*/
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
	api.GET("/jokes", JokeHandler)

	// POST /jokes/likes/:JokeID
	api.POST("/jokes/like/:jokeID", LikeJokesHandler)

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

//JokeHandler Retrieves a list of avaliable Jokes
//basically the index page to get all the jokes
func JokeHandler(c *gin.Context) {
	c.Header("Content-Type", "application/json")
	c.JSON(http.StatusOK, jokes)
	/*
		c.JSON(http.StatusOK, gin.H{
			"message": "Jokes Handler not implemented yet",
		})
	*/
}

//LikeJokesHandler inrements the likes of a partiular Joke Item
func LikeJokesHandler(c *gin.Context) {

	c.Header("Content-Type", "application/json")

	//confirm joke ID sent is valide
	//remember to import the `strconv` package

	//this validates the parameter in the url, if the JokesID is parsable into to an int
	if jokeid, err := strconv.Atoi(c.Param("jokeID")); err == nil {
		for i := 0; i < len(jokes); i++ {
			if jokes[i].ID == jokeid {
				//we found the ID of the joke that was voted on
				jokes[i].Likes += 1
			}
		}

		c.JSON(http.StatusOK, &jokes)
	} else {
		c.AbortWithStatus(http.StatusNotFound)
	}

	/*
		c.JSON(http.StatusOK, gin.H{
			"message": "LikeJokesHandler not implemented",
		})
	*/
}
