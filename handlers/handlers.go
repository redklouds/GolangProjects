package handlers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

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
