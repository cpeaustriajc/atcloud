package handler

import (
	"fmt"
	"io"
	"net/http"
	"os"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	api_key := os.Getenv("OPENWEATHERMAP_API_KEY")

	response, err := http.Get("http://api.openweathermap.org/data/2.5/weather?lat=14.2161&lon=121.178&APPID=" + api_key)

	if err != nil {
		fmt.Fprintf(w, "Error: %s", err)
		return
	}

	defer response.Body.Close()

	body, err := io.ReadAll(response.Body)

	if err != nil {
		fmt.Fprintf(w, "Error: %s", err)
		return
	}

	fmt.Fprintf(w, "%s", body)
}
