import { geolocation } from "@vercel/edge";
import { NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

export async function GET(request: Request) {
  const { city, latitude, longitude } = geolocation(request);

  const url = new URL(`https://api.openweathermap.org/data/2.5/weather`);

  if (latitude && longitude) {
    url.searchParams.set("lat", latitude);
    url.searchParams.set("lon", longitude);
  } else {
    url.searchParams.set("q", city || "California");
  }

  url.searchParams.set("appid", process.env.OPENWEATHERMAP_API_KEY);
  url.searchParams.set("units", "metric");

  const response = await fetch(url.toString());

  const weather = await response.json();

  return NextResponse.json(weather);
}
