import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState<Date>(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-16">
      <time className="text-4xl font-mono">{time.toLocaleString()}</time>
    </div>
  );
}
