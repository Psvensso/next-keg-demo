"use client";
import { useState } from "react";

const Btn = () => {
  const [clicks, setClicks] = useState(0);
  return (
    <button onClick={() => setClicks((s) => s + 1)}>Clicks: {clicks}</button>
  );
};

export default Btn;
