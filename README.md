# DeutschFonetyka — Starter (PWA, React + TS)

Minimalny szkielet MVP do treningu niemieckiej wymowy dla polskich użytkowników:
- **Studio**: nagrywanie mikrofonu, wizualizacja fali, detekcja wysokości (autokorelacja), pasmo celu i scoring.
- **Ćwiczenia**: proste ilustracje SVG (język/wargi), podpowiedzi artykulacyjne.
- **Grywalizacja**: średni wynik, seria dni, proste odznaki.
- **Klipy referencyjne**: bezpieczne osadzanie z YouTube (nocookie).
- **i18n**: PL/DE (react-i18next).
- **PWA**: manifest, prosty service worker (cache podstawowych zasobów).
- **Bezpieczeństwo**: CSP, brak zewnętrznych skryptów, brak logowania, dane sesji lokalnie (localStorage).

## Uruchomienie
```bash
npm i
npm run dev
```

## Budowa (PWA)
```bash
npm run build && npm run preview
```

## Integracja z VS Code
- Otwórz katalog w Visual Studio Code (`File → Open Folder...`).
- Zaakceptuj rekomendowane rozszerzenia (ESLint, Prettier, Tailwind CSS IntelliSense, i18n Ally, SVG Viewer).
- Skorzystaj z przygotowanych zadań (`Terminal → Run Task…`) do instalacji zależności oraz uruchomienia/deployu (`Start dev server`, `Build production bundle`, `Preview production build`).
- Szczegółowe wskazówki znajdziesz w [docs/vscode_integration.md](docs/vscode_integration.md) wraz z instrukcjami, jak wdrożyć moduł logopedyczny opisany w raporcie Sprintu 1.

## Notatki bezpieczeństwa
- **CSP** w `index.html` ogranicza źródła (w tym iframy YT).
- **Brak eval/inline JS** (poza style-src 'unsafe-inline' dla Tailwinda).
- **Mikrofon**: używany tylko po zgodzie; nagrania pozostają lokalnie (blob URL).

## Roadmapa → PRO
- Precyzyjny **alignment fonemowy** (serwer: FastAPI + wav2vec2/Whisper + ctc-segmentation).
- **Biblioteka klipów** (YouTube API + DW rss), filtrowanie po fonemach/hasłach.
- **Zaawansowane ilustracje** i instrukcje logopedyczne (widok boczny jamy ustnej).
- **Web Push** (opcjonalnie): subtelne przypomnienia, max 1/dzień, z cichym domyślnym planem.