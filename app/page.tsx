import Image from "next/image";
import { CurrentWeatherResponse } from "./weather.types";

export const runtime = "edge";

const getFullUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return `http://${process.env.VERCEL_URL}`;
  }

  return `https://${process.env.VERCEL_URL}`;
};

export default async function Home() {
  const res = await fetch(`${getFullUrl()}/api/weather`, {
    next: { tags: ["weather"] },
  });

  if (!res.ok) {
    throw new Error("Failed to get the latest weather data.");
  }

  const data = (await res.json()) as CurrentWeatherResponse;

  const toCelsius = (kelvin: number) => {
    return Math.round(kelvin - 273.15);
  };

  return (
    <>
      <div className="h-[95%] flex flex-col justify-center items-center">
        <Image
          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          width={128}
          height={128}
          alt="The current condition of the weather displayed by an icon"
        />
        <h1 className="text-5xl font-bold">
          {toCelsius(data.main.temp)}&deg;C
        </h1>
        <p className="text-2xl font-bold">{data.name}</p>
      </div>
      <div className="h-[5%] flex justify-center items-center flex-col">
        <p className="text-sm">App made with Next.js and Edge Functions</p>
        <p className="text-sm">
          Made by:{" "}
          <a
            href="https://github.com/jaycedotbin"
            className="underline  text-xs text-blue-500 font-bold"
          >
            jaycedotbin
          </a>
        </p>
      </div>
    </>
  );
}
