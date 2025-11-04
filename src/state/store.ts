import { create } from 'zustand'

type Session = {
  ts: string
  target: string
  score: number
}

type State = {
  sessions: Session[]
  addSession: (s: Session) => void
  lang: 'pl' | 'de'
  setLang: (l: 'pl'|'de') => void
}

const initial = (() => {
  try { return JSON.parse(localStorage.getItem('df_sessions')||'[]') } catch { return [] }
})()

export const useAppStore = create<State>((set, get) => ({
  sessions: initial,
  addSession: (s) => {
    const next = [...get().sessions, s].slice(-100)
    localStorage.setItem('df_sessions', JSON.stringify(next))
    set({ sessions: next })
  },
  lang: (localStorage.getItem('df_lang') as 'pl'|'de') || 'pl',
  setLang: (l) => { localStorage.setItem('df_lang', l); set({ lang: l }) }
}))