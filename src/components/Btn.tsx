"use client";
import { useState } from "react";

const Btn = () => {
  const [clicks, setClicks] = useState(0);
  return (
    <button
      className="rounded-full bg-sky-500 px-5 py-2 text-sm leading-5 font-semibold text-white hover:bg-sky-700"
      onClick={() => setClicks((s) => s + 1)}
    >
      Clicks: {clicks}
    </button>
  );
};

export default Btn;
