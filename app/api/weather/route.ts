import { NextResponse } from 'next/server';
import { geolocation } from '@vercel/functions';

export const runtime = 'edge';

export async function GET(request: Request) {
    const { latitude: lat, longitude: lon } = geolocation(request);

    const openWeatherMapUrl = new URL(
        'https://api.openweathermap.org/data/3.0/onecall'
    );

    // Defaults to San Francisco
    openWeatherMapUrl.searchParams.set('lat', lat ?? '37.77');
    openWeatherMapUrl.searchParams.set('lon', lon ?? '-122.43');
    openWeatherMapUrl.searchParams.set(
        'appid',
        process.env.OPENWEATHERMAP_API_KEY ?? ''
    );
    const res = await fetch(openWeatherMapUrl.toString());

    if (!res.ok) {
        console.error(
            'Error fetching weather data',
            res.status,
            res.statusText
        );
        return NextResponse.error();
    }

    const data = await res.json();

    return NextResponse.json(data);
}
