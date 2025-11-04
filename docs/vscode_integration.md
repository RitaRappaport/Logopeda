# Integracja DeutschFonetyka z VS Code

Ten przewodnik pokazuje, jak szybko uruchomić repozytorium w Visual Studio Code, skorzystać z przygotowanych zadań oraz wdrożyć materiały ze Sprintu 1 w codziennej pracy.

## 1. Wymagania wstępne
- **Node.js 18 LTS** (zalecane `18.18+`) oraz `npm 9+`.
- Zainstalowany **Visual Studio Code** w najnowszej wersji.
- Repozytorium sklonowane lokalnie: `git clone https://github.com/<twoja-organizacja>/Logopeda.git`.

## 2. Otwieranie projektu
1. Uruchom VS Code i wybierz `File → Open Folder...` wskazując katalog `Logopeda`.
2. VS Code odczyta pliki `.vscode/` i zaproponuje instalację rekomendowanych rozszerzeń.
3. Po akceptacji w lewym dolnym rogu pojawi się status ESLint/Prettier, a Tailwind CSS uzyska podpowiedzi klas.

## 3. Rekomendowane rozszerzenia
| Rozszerzenie | Cel |
| --- | --- |
| ESLint (`dbaeumer.vscode-eslint`) | Sygnalizuje problemy z jakością kodu TS/JS. |
| Prettier (`esbenp.prettier-vscode`) | Formatowanie kodu zgodne ze standardem repozytorium. |
| Tailwind CSS IntelliSense (`bradlc.vscode-tailwindcss`) | Podpowiedzi klas Tailwinda i walidacja konfiguracji. |
| i18n Ally (`lokalise.i18n-ally`) | Ułatwia pracę z tłumaczeniami PL/DE. |
| Code Spell Checker (`streetsidesoftware.code-spell-checker`) | Minimalizuje literówki w dokumentacji. |
| SVG Viewer (`cssho.vscode-svgviewer`) | Podgląd wektorowych ilustracji ćwiczeń w edytorze. |

> Jeśli któreś rozszerzenie nie zainstaluje się automatycznie, otwórz `View → Extensions` i wyszukaj je ręcznie.

## 4. Zdefiniowane zadania (Tasks)
W folderze `.vscode/` znajdują się gotowe komendy: `Terminal → Run Task...`

| Zadanie | Kiedy używać |
| --- | --- |
| **Install dependencies** | Pierwsze uruchomienie lub aktualizacja paczek. |
| **Start dev server** | Codzienna praca nad UI – uruchamia Vite z HMR. |
| **Build production bundle** | Kontrola, czy projekt buduje się przed publikacją/CI. |
| **Preview production build** | Lokalny podgląd wersji produkcyjnej (po `Build`). |

Zadanie "Start dev server" jest domyślne (`Ctrl/Cmd + Shift + B`). Vite wystartuje na porcie `5173` – kliknij link w terminalu lub użyj rozszerzenia Live Preview.

## 5. Praca z dokumentacją Sprintu 1
- Otwórz `docs/sprint1_plan.md` w VS Code i użyj `Ctrl/Cmd + Shift + V`, aby zobaczyć podgląd Markdownu.
- Sekcje **Task Brief** zawierają listę prac dla agentów kodujących i security – możesz je kopiować do issue trackerów bezpośrednio z edytora.
- Tabela ćwiczeń wskazuje lokalizację plików SVG (`public/assets/exercises/*.svg`). Otwieraj ilustracje dwuklikiem lub prawym przyciskiem `Open Preview`.

## 6. Wdrażanie modułu logopedycznego
1. Utwórz gałąź roboczą `git checkout -b feature/logopedia-module`.
2. W pliku `src/` dodaj strukturę danych i komponenty opisane w sekcji 4 dokumentu Sprintu 1.
3. W `/public/assets/exercises/` użyj istniejących plików SVG – dzięki rozszerzeniu SVG Viewer zobaczysz ich treść bez opuszczania edytora.
4. Uruchom zadanie **Start dev server** i przejdź do `/logopedia`, aby iteracyjnie rozwijać widok.
5. Po zakończeniu pracy użyj `Source Control` (`Ctrl/Cmd + Shift + G`), aby zatwierdzić zmiany, a następnie wypchnij gałąź i utwórz Pull Request.

## 7. Najlepsze praktyki w VS Code
- Włącz formatowanie przy zapisie (`Settings → Format On Save`), aby Prettier utrzymywał spójny styl.
- Ustaw `"editor.codeActionsOnSave": { "source.fixAll.eslint": true }`, by automatycznie naprawiać drobne problemy ESLint.
- Skorzystaj z funkcji `Go to Definition` (`F12`) dla plików TypeScript oraz `Peek Definition` (`Alt+F12`) w dokumentacji, aby szybciej nawigować po kodzie.
- Dodaj komentarze TODO (`// TODO:`), które następnie możesz filtrować rozszerzeniem `Todo Tree` (opcjonalnie).

Po zastosowaniu powyższych kroków zobaczysz efekty pracy – komponenty i ćwiczenia będą dostępne w trybie deweloperskim, a wszystkie materiały Sprintu 1 pozostaną w jednym, łatwym do przeglądania środowisku VS Code.
