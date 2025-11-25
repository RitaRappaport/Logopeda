import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Studio from './components/Studio';
import Exercises from './components/Exercises';
import Gamification from './components/Gamification';
import { useAppStore } from './state/store';

function LangSwitch() {
  const { i18n } = useTranslation();
  const lang = useAppStore((s) => s.lang);
  const setLang = useAppStore((s) => s.setLang);
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);
  return (
    <select
      value={lang}
      onChange={(e) => setLang(e.target.value as 'pl' | 'de')}
      className="border rounded px-2 py-1"
    >
      <option value="pl">PL</option>
      <option value="de">DE</option>
    </select>
  );
}

export default function App() {
  const { t } = useTranslation();
  return (
    <div className="max-w-5xl mx-auto p-4 font-sans">
      <header className="flex items-center gap-3 py-3 border-b mb-4">
        <div className="w-8 h-8 rounded-full bg-accent" />
        <h1 className="text-xl font-semibold">DeutschFonetyka</h1>
        <div className="ml-auto flex items-center gap-2">
          <LangSwitch />
        </div>
      </header>

      <section className="space-y-6">
        <div className="border rounded p-4">
          <h2 className="text-lg font-semibold mb-2">Studio</h2>
          <Studio />
          <div className="mt-3">
            <Gamification />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="border rounded p-4">
            <h2 className="text-lg font-semibold mb-2">Ćwiczenia logopedyczne</h2>
            <Exercises />
          </div>
          <div className="border rounded p-4">
            <h2 className="text-lg font-semibold mb-2">Klipy referencyjne (YouTube/DW)</h2>
            <p className="text-sm text-slate-600 mb-2">
              Osadzenia z oficjalnych kanałów (bez pobierania). Wklej ID filmu:
            </p>
            <Embedder />
          </div>
        </div>
      </section>

      <footer className="text-xs text-slate-500 text-center mt-8 py-6 border-t">
        © {new Date().getFullYear()} DeutschFonetyka — PWA · prywatność: nagrania lokalnie.
      </footer>
    </div>
  );
}

function Embedder() {
  const [id, setId] = React.useState('');
  const safe = /^[a-zA-Z0-9_-]{11}$/.test(id);
  return (
    <div className="space-y-2">
      <input
        className="border rounded px-2 py-1 w-full"
        placeholder="Wklej 11-znakowy ID z YouTube"
        value={id}
        onChange={(e) => setId(e.target.value.trim())}
      />
      {safe ? (
        <div className="aspect-video w-full">
          <iframe
            className="w-full h-full rounded border"
            src={`https://www.youtube-nocookie.com/embed/${id}`}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="no-referrer"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div className="text-xs text-slate-500">
          Podaj poprawne ID (bez pełnego URL). Materiały DW/ARD zalecane — oficjalne kanały.
        </div>
      )}
    </div>
  );
}
