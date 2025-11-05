import React, { useEffect, useState } from "react";
import ExercisePlayer from "./ExercisePlayer";

type PackIndex = { packs: { id:string; title:string; description:string; file:string; badge?:string }[] };
type Unit = {
  phoneme: string; letter: string; examples: string[];
  hint_articulation: string; native_sample?: string;
};

export default function Exercises() {
  const [packs, setPacks] = useState<PackIndex["packs"]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [activePack, setActivePack] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/content/exercises/index.json").then(r => r.json())
      .then((d: PackIndex) => setPacks(d.packs))
      .catch(() => setError("Nie udało się pobrać listy ćwiczeń."));
  }, []);

  async function openPack(file: string, id: string) {
    setActivePack(id); setError(null);
    try {
      const d = await fetch(file).then(r => r.json());
      setUnits(d.units || []);
    } catch {
      setError("Błąd ładowania pakietu ćwiczeń.");
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Zestawy ćwiczeń (PL/DE)</h1>

      {!activePack && (
        <div className="grid gap-3">
          {packs.map(p => (
            <button key={p.id}
              onClick={() => openPack(p.file, p.id)}
              className="text-left p-4 rounded-2xl border hover:shadow-sm transition">
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">{p.title}</span>
                {p.badge && <span className="text-xs px-2 py-0.5 rounded-full border">{p.badge}</span>}
              </div>
              <div className="text-sm opacity-70">{p.description}</div>
            </button>
          ))}
          {packs.length === 0 && <div className="opacity-70 text-sm">Ładuję</div>}
        </div>
      )}

      {activePack && (
        <div className="grid gap-4">
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded-lg border" onClick={() => { setActivePack(null); setUnits([]); }}>
               Wróć
            </button>
            <div className="text-lg font-semibold">Pakiet: {activePack}</div>
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          {units.map((u, idx) => (
            <ExercisePlayer key={idx} unit={u} />
          ))}
          {units.length === 0 && !error && <div className="opacity-70 text-sm">Brak jednostek w tym pakiecie.</div>}
        </div>
      )}
    </div>
  );
}