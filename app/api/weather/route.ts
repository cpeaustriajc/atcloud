import { NextResponse } from "next/server";
import { geolocation } from "@vercel/edge";

export const runtime = "edge";

export async function GET(request: Request) {
  const { latitude: lat, longitude: lon } = geolocation(request);

  const openWeatherMapUrl = new URL(
    "https://api.openweathermap.org/data/2.5/weather"
  );

  if (!lat || !lon) return NextResponse.error();

  openWeatherMapUrl.searchParams.set("lat", lat);
  openWeatherMapUrl.searchParams.set("lon", lon);
  openWeatherMapUrl.searchParams.set(
    "appid",
    process.env["OPENWEATHERMAP_API_KEY"] ?? ""
  );
  const res = await fetch(openWeatherMapUrl.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return NextResponse.json(res);
}
