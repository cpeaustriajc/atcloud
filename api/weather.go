package handler

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
)

type WeatherData struct {
	Weather []struct {
		Description string `json:"description"`
	} `json:"weather"`
	Main struct {
		Temp float64 `json:"temp"`
	} `json:"main"`

	Name string `json:"name"`

	Cod int `json:"cod"`

	Coord struct {
		Lon float64 `json:"lon"`
		Lat float64 `json:"lat"`
	} `json:"coord"`

	Sys struct {
		Country string `json:"country"`
	} `json:"sys"`

	Clouds struct {
		All int `json:"all"`
	} `json:"clouds"`

	Wind struct {
		Speed float64 `json:"speed"`
		Deg   float64 `json:"deg"`
	} `json:"wind"`

	Rain struct {
		OneH   float64 `json:"1h"`
		ThreeH float64 `json:"3h"`
	} `json:"rain"`

	Snow struct {
		OneH   float64 `json:"1h"`
		ThreeH float64 `json:"3h"`
	} `json:"snow"`

	Dt int `json:"dt"`

	Id int `json:"id"`

	Base string `json:"base"`

	Visibility int `json:"visibility"`
}

func Handler(w http.ResponseWriter, r *http.Request) {
	api_key := os.Getenv("OPENWEATHERMAP_API_KEY")

	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var coords struct {
		Lat float64 `json:"lat"`
		Lon float64 `json:"lon"`
	}

	err := json.NewDecoder(r.Body).Decode(&coords)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	url := fmt.Sprintf("https://api.openweathermap.org/data/2.5/weather?lat=%f&lon=%f&appid=%s", coords.Lat, coords.Lon, api_key)

	response, err := http.Get(url)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer response.Body.Close()

	var weather WeatherData
	err = json.NewDecoder(response.Body).Decode(&weather)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(weather)
}
