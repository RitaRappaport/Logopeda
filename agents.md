# 🤖 AGENTS.MD — Główny przewodnik dla agentów projektu „DeutschFonetyka”

---

## 1. Kontekst projektu

| Sekcja | Opis |
| :--- | :--- |
| **Nazwa projektu i cel** | **DeutschFonetyka** — aplikacja edukacyjna (PWA) dla Polaków uczących się języka niemieckiego. Pomaga pozbyć się akcentu i wyćwiczyć mięśnie aparatu mowy poprzez analizę dźwięku, wizualizację i ćwiczenia. |
| **Odbiorcy docelowi** | Polscy uczniowie, lektorzy, logopedzi, osoby pracujące w Niemczech, aktorzy, studenci filologii — wszyscy, którzy chcą mówić jak native. |
| **Struktura projektu** | Komponenty React w folderze `/src/components`, logika w `/src/utils`, stan w `/src/state`, styl w `/src/index.css`. |
| **Technologie** | React + TypeScript + Vite + Tailwind + Zustand + shadcn/ui + lucide-react (ikony). Testy: Vitest. |
| **Tryb działania** | Progressive Web App (PWA) działająca w przeglądarce (desktop/mobile). Pełna funkcjonalność offline. |
| **Architektura bezpieczeństwa** | Brak backendu. Analiza audio działa wyłącznie lokalnie (Web Audio API). Nagrania nie są wysyłane do sieci. |

---

## 2. Wytyczne dla agentów

| Obszar | Zasady |
| :--- | :--- |
| **Styl kodu** | Używaj **PascalCase** dla komponentów (`SpeechTrainer`), **camelCase** dla funkcji (`loopMic`). Zawsze komentuj złożone funkcje. |
| **Konwencje commitów** | `feat(scope): opis`, `fix(scope): opis`, `docs:`, `refactor:`. |
| **UI/UX** | Styl minimalistyczny, inspirowany Japonią (biel, błękit, mięta). Proste animacje, płynne przejścia. Komponenty z `shadcn/ui`. |
| **Dostępność (a11y)** | Każdy element interaktywny musi mieć `aria-label`. Kontrast kolorów min. WCAG AA. |
| **Bezpieczeństwo** | Mikrofon aktywowany tylko po kliknięciu. Żadne dane nie są wysyłane. Brak cudzych skryptów/CDN. CSP i Permissions Policy wymuszone. |
| **Recenzja kodu** | Skup się na czystości architektury, bezpieczeństwie i zgodności ze stylem. Utrzymuj małe PR-y. |
| **Dokumentacja** | Każdy nowy moduł wymaga sekcji `/// DOCS:` na górze pliku. |

---

## 3. Komendy i środowisko

| Komenda | Działanie |
| :--- | :--- |
| `npm install` | Instalacja zależności. |
| `npm run dev` | Uruchomienie wersji deweloperskiej. |
| `npm run build` | Budowa wersji produkcyjnej (PWA). |
| `npm run lint` | Sprawdzenie jakości kodu. |
| `npm run test` | Uruchomienie testów (Vitest). |

Środowisko (`.env`):

VITE_APP_ENV=local

Nigdy nie commituj żadnych kluczy API do repozytorium.

---

## 4. Zasady Git i PR

- Każdy PR musi być **opisany i powiązany z zadaniem**.
- Branching:  
  - `feature/<nazwa>` — nowa funkcja  
  - `fix/<nazwa>` — poprawka  
  - `docs/<nazwa>` — dokumentacja  
- Commity atomowe, logiczne, zwięzłe.
- Copilot (AI-CEO) akceptuje PR po przejściu checklisty:
  1. Poprawność kodu  
  2. Bezpieczeństwo  
  3. Spójność stylistyczna  
  4. Wydajność  

---

## 5. Wizja i przyszłość

- Wersja 2.0: analiza fonemów, raport PDF, rankingi, ćwiczenia miofunkcjonalne (język, wargi, żuchwa).  
- Integracja z modułem terapeutycznym (logopedia).  
- Cloud Agents realizują automatyczne PR-y w tle.  
- Lokalny użytkownik korzysta z aplikacji offline — bez ryzyka utraty prywatności.

---

## 6. Zespół

- **RitaRappaport (Project Lead)**  
- **Copilot (AI-CEO)**  
- **GPT-5 (System Engineer)**  
- **Cloud Agents (asynchroniczni koderzy i testerzy)**  

> „Każdy dźwięk to most między intencją a światem.” 🌊  
> — motto projektu DeutschFonetyka
