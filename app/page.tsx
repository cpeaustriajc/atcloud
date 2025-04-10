import type { Metadata } from "next";
import Image from "next/image";
import type { CurrentWeatherResponse } from "./weather.types";
import ClockView from "./clock-view";

export const runtime = "edge";

const getFullUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  return `https://${process.env.VERCEL_URL}`;
};

const getCurrentWeather = async () => {
  const res = await fetch(`${getFullUrl()}/api/weather`, {
    next: { tags: ["weather"] },
  });

  if (!res.ok) {
    console.error(
      "Failed to get the latest weather data.",
      res.status,
      res.statusText
    );
    throw new Error("Failed to get the latest weather data.");
  }

  return (await res.json()) as CurrentWeatherResponse;
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await getCurrentWeather();
  return {
    icons: [
      {
        type: "image/png",
        url: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      },
    ],
  };
}

export default async function Home() {
  const data = await getCurrentWeather();

  const toCelsius = (kelvin: number) => {
    return Math.round(kelvin - 273.15);
  };

  const getWindDirection = (degrees: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round((degrees % 360) / 45);
    return directions[index];
  };

  return (
    <>
      <div className="grid place-items-center place-content-center h-full gap-2">
        <ClockView />
        <Image
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          width={128}
          height={128}
          priority
          placeholder="blur"
          blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-cloud'%3E%3Cpath d='M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z'/%3E%3C/svg%3E"
          alt="The current condition of the weather displayed by an icon"
        />
        <h1 className="text-5xl font-bold">
          {toCelsius(data.main.temp)}&deg;C
        </h1>
        <p className="text-2xl">{data.weather[0].main}</p>
        <p className="text-2xl font-bold">{data.name}</p>
        <p className="text-xs">
          Feels Like: {toCelsius(data.main.feels_like)}&deg;C | Humidity:{" "}
          {data.main.humidity}{" "}
        </p>
        <p className="text-xs">
          Wind Direction: {getWindDirection(data.wind.deg)} | Wind Speed:{" "}
          {data.wind.speed} km/h{" "}
        </p>
      </div>
      <div className="h-[5%] flex justify-center items-center flex-col">
        <p className="text-sm">App made with Next.js and Edge Functions</p>
        <p className="text-sm">
          Made by:{" "}
          <a
            href="https://github.com/cpeaustriajc"
            className="underline  text-xs text-blue-500 font-bold"
          >
            cpeaustriajc
          </a>
        </p>
      </div>
    </>
  );
}
