"use client";

import { useEffect, useState } from "react";

export default function Clock() {
	const [time, setTime] = useState<string>(() => "");

	// biome-ignore lint: time is needed to be in dependency array to update every tick
	useEffect(() => {
		const now = new Date().toLocaleTimeString("en-PH", {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		});
		const interval = setInterval(() => {
			setTime(now);
		}, 1000);

		return () => clearInterval(interval);
	}, [time]);

	return (
		<div className="h-16">
			<time className="text-6xl font-mono">{time}</time>
		</div>
	);
}
