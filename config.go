package main

import (
	"encoding/json"
	"fmt"
	"os"
)

//this is our configuration object that we will parse from the environment json file
type Configuration struct {
	Port              string `json:"Port"`
	Static_variable   string
	Connection_string string
}

//this function takees a pointer to itself as the paramter
//modifying itself will modify the actual object
func (config *Configuration) GetConfigurations() {
	config.Port = os.Getenv("env_port")
	a := os.Getenv("ENV")
	fmt.Print(a)
}

func (config *Configuration) InitalizeConfigurations() (bool, error) {
	environment := os.Getenv("ENV")
	if environment == "Dev" {
		//set values for dev instance
		//if its dev lets get values from config file
		//else for PROD get values from environment
		file, err := os.Open("./config.json")
		if err != nil {
			return false, err
		}
		decoder := json.NewDecoder(file)
		tempConfig := Configuration{}
		err = decoder.Decode(&tempConfig)
		if err != nil {
			return false, err
		}
		config.Port = tempConfig.Port
	} else {
		config.GetConfigurations()
	}

	return true, nil
}

func (config Configuration) setConfig() {
	os.Setenv("env_port", "3000")
}
