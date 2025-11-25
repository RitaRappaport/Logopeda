import React from 'react';
import Studio from './components/Studio';
import Exercises from './components/Exercises';
import Gamification from './components/Gamification';

export default function App() {
  const [tab, setTab] = React.useState<'studio' | 'exercises' | 'gamification'>('studio');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-mint-50 p-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
          DeutschFonetyka
        </h1>
        <p className="text-slate-600 text-lg">
          Naucz się wymowy jak native speaker &ndash; z AI i animacjami
        </p>
      </header>

      <nav className="flex gap-3 mb-8 justify-center flex-wrap">
        <button
          onClick={() => setTab('studio')}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            tab === 'studio'
              ? 'bg-primary text-white shadow-lg'
              : 'bg-white border-2 border-slate-200 hover:border-primary'
          }`}
          aria-label="Przejdź do Studio"
          aria-current={tab === 'studio' ? 'page' : undefined}
        >
          🎙️ Studio
        </button>
        <button
          onClick={() => setTab('exercises')}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            tab === 'exercises'
              ? 'bg-primary text-white shadow-lg'
              : 'bg-white border-2 border-slate-200 hover:border-primary'
          }`}
          aria-label="Przejdź do Ćwiczeń"
          aria-current={tab === 'exercises' ? 'page' : undefined}
        >
          📚 Ćwiczenia
        </button>
        <button
          onClick={() => setTab('gamification')}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            tab === 'gamification'
              ? 'bg-primary text-white shadow-lg'
              : 'bg-white border-2 border-slate-200 hover:border-primary'
          }`}
          aria-label="Przejdź do Rankingów"
          aria-current={tab === 'gamification' ? 'page' : undefined}
        >
          🏆 Rankingi
        </button>
      </nav>

      <main className="max-w-6xl mx-auto">
        {tab === 'studio' && <Studio />}
        {tab === 'exercises' && <Exercises />}
        {tab === 'gamification' && <Gamification />}
      </main>

      <footer className="mt-12 pt-6 border-t border-slate-200 text-center text-sm text-slate-500">
        <p>
          &quot;Każdy dźwięk to most między intencją a światem.&quot;
          <br />
          &ndash; DeutschFonetyka
        </p>
      </footer>
    </div>
  );
}
