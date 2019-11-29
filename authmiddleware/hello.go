package authmiddleware

import (
	"errors"
	"fmt"
)

//https://blog.learngoprogramming.com/code-organization-tips-with-packages-d30de0d11f46
type Person struct {
	Name string `json:"name"`
	Age  int32  `json:"age"`
}

func (per Person) SayHello() (retMsg string, err error) {
	if per.Name != "" {
		retMessage := fmt.Sprint("Hello %s you are %d", per.Name, per.Age)
		return retMessage, nil
	}
	return "", errors.New("Invalid ")
}

func New() (person *Person) {
	return &Person{}
}
