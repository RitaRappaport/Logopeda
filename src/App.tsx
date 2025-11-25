import React from 'react';
import Studio from './components/Studio';
import Exercises from './components/Exercises';
import Gamification from './components/Gamification';

export default function App() {
  const [tab, setTab] = React.useState<'studio' | 'exercises' | 'gamification'>('studio');

  return (
    <div className="min-h-screen bg-neutral p-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-primary mb-2">DeutschFonetyka</h1>
        <p className="text-slate-600">PWA do nauki wymowy języka niemieckiego</p>
      </header>

      <nav className="flex gap-2 mb-6">
        <button
          onClick={() => setTab('studio')}
          className={`px-4 py-2 rounded transition ${tab === 'studio' ? 'bg-primary text-white' : 'bg-white border'}`}
          aria-label="Przejdź do Studio"
          aria-current={tab === 'studio' ? 'page' : undefined}
        >
          Studio
        </button>
        <button
          onClick={() => setTab('exercises')}
          className={`px-4 py-2 rounded transition ${tab === 'exercises' ? 'bg-primary text-white' : 'bg-white border'}`}
          aria-label="Przejdź do Ćwiczeń"
          aria-current={tab === 'exercises' ? 'page' : undefined}
        >
          Ćwiczenia
        </button>
        <button
          onClick={() => setTab('gamification')}
          className={`px-4 py-2 rounded transition ${tab === 'gamification' ? 'bg-primary text-white' : 'bg-white border'}`}
          aria-label="Przejdź do Rankingów"
          aria-current={tab === 'gamification' ? 'page' : undefined}
        >
          Rankingi
        </button>
      </nav>

      <main>
        {tab === 'studio' && <Studio />}
        {tab === 'exercises' && <Exercises />}
        {tab === 'gamification' && <Gamification />}
      </main>

      <footer className="mt-8 pt-4 border-t text-center text-sm text-slate-500">
        <p>„Każdy dźwięk to most między intencją a światem." — DeutschFonetyka</p>
      </footer>
    </div>
  );
}
