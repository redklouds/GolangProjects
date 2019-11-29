package authmiddleware

//This file is to create the Auth Middle ware object
import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"

	jwtmiddleware "github.com/auth0/go-jwt-middleware"
	"github.com/dgrijalva/jwt-go"
)

type Response struct {
	Message string `json:"message"`
}

type Jwks struct {
	Keys []JSONWebKeys `json:"keys"`
}

type JSONWebKeys struct {
	Kty string   `json:"kty"`
	Kid string   `json:"kid"`
	Use string   `json:"use"`
	N   string   `json:"n"`
	E   string   `json:"e"`
	X5c []string `json:"x5c"`
}

func GetMiddleWare() (jwtMiddleW *jwtmiddleware.JWTMiddleware) {
	jwtMiddlewareObj := jwtmiddleware.New(jwtmiddleware.Options{
		//ValidationKeyGetter is a function that returns a key to validate the JWT
		// The function that will return the Key to validate the JWT.
		// It can be either a shared secret or a public key.
		// Default value: nil
		ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
			aud := os.Getenv("AUTH0_API_AUDIENCE")
			//setting the VerifyAudiene second parameter 'req' to false will return
			//true if the current token audience matches what audience we are checing for
			//* ITS VERY IMPORTANT TO VERIFY THE AUDIENCE OF A JWT TOKEN REQUEST
			checkAudiene := token.Claims.(jwt.MapClaims).VerifyAudience(aud, false)

			if !checkAudiene {
				return token, errors.New("Invalid Audience")
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
			return result, nil

		},
		SigningMethod: jwt.SigningMethodRS256,
	})

	return jwtMiddlewareObj
}

/*
By default, your API uses RS256 as the algorithm for signing tokens. Since RS256 uses a private/public keypair, it verifies the tokens against the public key for your Auth0 account. The public key is in the JSON Web Key Set (JWKS) format, and can be accessed here.

Create the function to get the remote JWKS for your Auth0 account and return the certificate with the public key in PEM format.
*/
func getPermCert(token *jwt.Token) (string, error) {
	cert := ""

	//resp, err := http.Get("https://redklouds-inc-dev.auth0.com/.well-known/jwks.json")
	authDomain := os.Getenv("AUTH0_DOMAIN") + ".well-known/jwks.json"
	fmt.Println(authDomain)
	//resp, err := http.Get(os.Getenv("AUTH0_DOMAIN") + ".well-known/jwks.json")
	resp, err := http.Get(authDomain)
	if err != nil {
		return cert, err
	}
	defer resp.Body.Close()

	var jwks = Jwks{}
	err = json.NewDecoder(resp.Body).Decode(&jwks)

	if err != nil {
		return cert, err
	}

	for k, _ := range jwks.Keys {
		if token.Header["kid"] == jwks.Keys[k].Kid {
			cert = "-----BEGIN CERTIFICATE-----\n" + jwks.Keys[k].X5c[0] + "\n-----END CERTIFICATE-----"
		}
	}
	/*
		x5c := jwks.Keys[0].X5c
		for k, v := range x5c {
			if token.Header["kid"] == jwks.Keys[k].Kid {
				cert = "-----BEGIN CERTIFICATE-----\n" + v + "\n-----END CERTIFICATE-----"
			}
		}
	*/
	if cert == "" {
		return cert, errors.New("unable to find appropriate key")
	}

	return cert, nil
}
