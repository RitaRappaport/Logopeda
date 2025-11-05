import React, { useState } from "react";
import Studio from "./components/Studio";
import Exercises from "./components/Exercises";

export default function App() {
  const [tab, setTab] = useState<"studio"|"ex">("ex");
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="sticky top-0 bg-white/80 backdrop-blur border-b">
        <div className="max-w-4xl mx-auto p-3 flex items-center gap-2">
          <div className="font-bold">DeutschFonetyka</div>
          <nav className="ml-auto flex gap-2">
            <button onClick={() => setTab("ex")} className={"px-3 py-1 rounded-lg border " + (tab==="ex"?"bg-gray-50":"")}>Ćwiczenia</button>
            <button onClick={() => setTab("studio")} className={"px-3 py-1 rounded-lg border " + (tab==="studio"?"bg-gray-50":"")}>Studio</button>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4">
        {tab === "ex" ? <Exercises/> : <Studio/>}
      </main>
    </div>
  );
}