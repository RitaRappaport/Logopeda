import React from 'react';
import { useAppStore } from '../state/store';

export default function Gamification() {
  const sessions = useAppStore((s) => s.sessions);
  const total = sessions.reduce((a, b) => a + b.score, 0);
  const avg = sessions.length ? Math.round(total / sessions.length) : 0;
  const streak = (() => {
    let st = 0,
      prevDay: string | null = null;
    const days = sessions.map((s) => s.ts.slice(0, 10)).reverse();
    for (const d of days) {
      if (!prevDay) {
        st = 1;
        prevDay = d;
        continue;
      }
      const dt = (new Date(prevDay).getTime() - new Date(d).getTime()) / (24 * 3600 * 1000);
      if (dt === 0) continue;
      if (dt === 1) {
        st += 1;
        prevDay = d;
      } else break;
    }
    return st;
  })();

  const badges = [];
  if (avg >= 80) badges.push('Wymowa 80+');
  if (streak >= 3) badges.push('Seria 3 dni');
  if (sessions.length >= 10) badges.push('10 sesji');

  return (
    <div className="space-y-2">
      <div className="text-sm text-slate-600">
        Średni wynik: <b>{avg}</b> · Seria dni: <b>{streak}</b>
      </div>
      <div className="flex gap-2 flex-wrap">
        {badges.length ? (
          badges.map((b) => (
            <span
              key={b}
              className="px-2 py-1 rounded-full bg-accent-light text-accent text-xs border"
            >
              {b}
            </span>
          ))
        ) : (
          <span className="text-slate-500 text-sm">Brak odznak — działaj!</span>
        )}
      </div>
    </div>
  );
}
