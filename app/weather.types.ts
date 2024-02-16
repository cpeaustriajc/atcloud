import type { CountryCode } from "./country-code.types";

export type Time = number;

export type Base = "stations" | "cities" | string;

export type Unit = "imperial" | "metric" | "standard";

export type WeatherCondition = ThunderstormConditions | Conditions | RainConditions | SnowConditions | AtmosphereConditions | ClearConditions | CloudsCondition;

// Condition-Codes from https://openweathermap.org/weather-conditions

export type ThunderstormConditions = 200 | 201 | 202 | 210 | 211 | 212 | 221 | 230 | 231 | 232;
export type Conditions = 300 | 301 | 302 | 310 | 311 | 312 | 313 | 314 | 321;
export type RainConditions = 500 | 501 | 502 | 503 | 504 | 511 | 520 | 521 | 522 | 531;
export type SnowConditions = 600 | 601 | 602 | 611 | 612 | 613 | 615 | 616 | 620 | 621 | 622;
export type AtmosphereConditions = 701 | 711 | 721 | 731 | 741 | 751 | 761 | 762 | 771 | 781;
export type ClearConditions = 800;
export type CloudsCondition = 801 | 802 | 803 | 804;

export interface Weather {
  id: WeatherCondition;
  main: string;
  description: string;
  icon: string;
}
export interface Coordinate {
  lon: number;
  lat: number;
}

export interface CurrentWeatherSys {
  type?: number;
  id?: number;
  message?: number;
  country: CountryCode;
  sunrise: Time;
  sunset: Time;
}

export interface Main {
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  temp_min: number;
  temp_max: number;
  sea_level: number;
  grnd_level: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust?: number;
}

export interface Clouds {
  all: number; // Cloudiness, %
}

export interface ForecastPrecipitation {
  "3h": number; // Rain volume for the last 3 hours, mm
}

export interface Precipitation extends ForecastPrecipitation {
  "1h"?: number;
}

export interface CurrentWeatherResponse {
  coord: Coordinate;
  weather: Weather[];
  base: Base;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  rain?: Precipitation;
  snow?: Precipitation;
  dt: number;
  sys: CurrentWeatherSys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
