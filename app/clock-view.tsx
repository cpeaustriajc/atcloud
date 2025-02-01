"use client";

import dynamic from "next/dynamic";

const Clock = dynamic(() => import("./clock"), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse">
      <div className="h-16 w-96 bg-neutral-800 rounded-sm" />
    </div>
  ),
});

export default function ClockView() {
  return <Clock />;
}
