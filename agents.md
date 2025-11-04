# 🤖 AGENTS.MD — Systemowy przewodnik dla agentów projektu „DeutschFonetyka”

Ten dokument definiuje kontekst, strukturę, zasady i priorytety projektu, aby agenci AI (Codex, Copilot, MCP, Cloud Agents) mogli działać autonomicznie, spójnie i w zgodzie z wizją twórców.

---

## 1. Project Overview

| Sekcja | Opis |
| :--- | :--- |
| **Project Name & Goal** | **DeutschFonetyka** – aplikacja edukacyjna (PWA) pomagająca Polakom wyeliminować akcent w języku niemieckim poprzez ćwiczenia artykulacyjne, analizę wymowy i gamifikację. |
| **Target Audience** | Polscy użytkownicy uczący się języka niemieckiego, w tym osoby chcące mówić „jak native”. Aplikacja ma wspierać samodzielny trening aparatu mowy. |
| **Core Functionality** | Nagrywanie i analiza mowy (pitch + waveform), porównanie z native speakerem, ćwiczenia logopedyczne z ilustracjami, wizualizacja kompatybilności, gra z poziomami i nagrodami. |
| **Project Structure** | Główne foldery: `src/components` (UI), `src/state` (Zustand store), `src/utils` (analiza audio), `public` (ikony, manifest PWA), `agents.md` (meta sterowanie). |
| **Tech Stack** | React + TypeScript + Vite + TailwindCSS + Zustand + lucide-react (ikony). Testy: Vitest. Style: shadcn/ui. |
| **Deployment** | Lokalnie (npm run dev / build) oraz GitHub Pages w trybie PWA. |
| **Security Focus** | Aplikacja działa całkowicie lokalnie (brak backendu). Dostęp do mikrofonu tylko po akceptacji użytkownika. Brak logowania. Dane sesji przechowywane w `localStorage`. |

---

## 2. Agent Guidelines and Preferences

| Sekcja | Instrukcja |
| :--- | :--- |
| **Coding Style & Naming** | Używaj **PascalCase** dla komponentów React (`StudioPanel`), **camelCase** dla funkcji i zmiennych (`startRec`, `loopMic`). 1 komponent = 1 plik. Maks. 300 linii na komponent. |
| **Formatting & Linting** | Obowiązkowo Prettier + ESLint (`npm run lint`). Nigdy nie wyłączaj lintowania w PR. |
| **UI Policy (Component Usage)** | Używaj wyłącznie komponentów z **shadcn/ui** i Tailwind. Unikaj tworzenia własnych stylów inline. Kolory: błękit, mięta, biel. Minimalizm w stylu japońskim. |
| **Accessibility** | Wszystkie przyciski muszą mieć etykiety `aria-label`. Kolorystyka powinna mieć kontrast WCAG AA. |
| **Context Protocol (MCP)** | Jeśli agent implementuje nową funkcję zewnętrznej biblioteki, **używaj MCP Context 7** do pobrania aktualnej dokumentacji i przykładów z repozytorium źródłowego. |
| **Security & Privacy** | Nigdy nie zapisuj danych audio ani transkrypcji w sieci. Wszystkie operacje (nagrywanie, porównanie, analiza) muszą działać lokalnie. |
| **Code Review Focus** | Przy przeglądzie kodu agenci powinni sprawdzać: <br>1️⃣ Bezpieczeństwo (brak nieautoryzowanych źródeł).<br>2️⃣ Czytelność.<br>3️⃣ Zgodność z architekturą.<br>4️⃣ Złożoność funkcji (czy można uprościć). |
| **Game/UX Rules** | System nagród i poziomów ma motywować, ale nie rozpraszać. Animacje lekkie, w duchu „zen”. Każdy sukces = krótka pochwała i efekt dźwiękowy. |

---

## 3. Execution Commands

| Komenda | Cel |
| :--- | :--- |
| `npm install` | Instalacja zależności. |
| `npm run dev` | Uruchomienie lokalnego serwera deweloperskiego (Vite). |
| `npm run build` | Budowanie wersji produkcyjnej. |
| `npm run lint` | Analiza stylu kodu. |
| `npm run test` | Uruchomienie testów jednostkowych (Vitest). |

**Testy:**  
- Wszystkie testy w folderze `/test`.  
- Testujemy logikę (analiza pitch, wave, zapis sesji).  
- Testy snapshotów dla komponentów UI.

**Środowisko:**  
- Nigdy nie commituj pliku `.env`.  
- Klucze API (jeśli pojawią się w przyszłości) muszą być przechowywane w `.env.local` i dostępne przez `import.meta.env.VITE_*`.  

---

## 4. Git & PR Process

| Sekcja | Zasady |
| :--- | :--- |
| **Commit Messages** | Format: `type(scope): description` np. `fix(studio): pitch smoothing` lub `feat(levels): add reward system`. |
| **Branching Strategy** | Każda nowa funkcja = gałąź `feature/<nazwa>`. Poprawki błędów = `fix/<nazwa>`. Nie commituj bez PR. |
| **Pull Requests** | Każdy PR musi zawierać: <br>- opis zmian,<br>- kroki testowe,<br>- listę potencjalnych ryzyk. |
| **Reviews** | Codex (CEO-agent) akceptuje PR po przejściu checklisty: poprawność, kompletność, przejrzystość, bezpieczeństwo, styl. |
| **Versioning** | Stosujemy Semantic Versioning (x.y.z). Każdy merge do `main` = wersja patch/minor. |

---

## 5. Long-Term Vision

- Po integracji modułu logopedycznego (ćwiczenia mięśni języka, gardła, podniebienia) aplikacja stanie się narzędziem terapeutyczno-edukacyjnym kla
