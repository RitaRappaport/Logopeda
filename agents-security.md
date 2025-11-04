# 🔐 AGENTS-SECURITY.MD — Protokół bezpieczeństwa projektu DeutschFonetyka

---

## 1. Cel
Zapewnić maksymalne bezpieczeństwo danych audio, prywatności użytkowników i czystości repozytorium.

---

## 2. Model działania

| Obszar | Zasada |
| :--- | :--- |
| **Dane audio** | Nagrania nigdy nie opuszczają przeglądarki. Przechowywane lokalnie jako `Blob` (URL.createObjectURL). |
| **Uprawnienia** | Mikrofon włączany wyłącznie po akceptacji użytkownika. Brak automatycznego dostępu. |
| **Brak backendu** | Wszystko działa lokalnie (Web Audio API). Brak serwera, brak transferu danych. |
| **Aktualizacje** | Wszystkie zależności aktualizowane automatycznie przez Dependabot. |
| **Analiza kodu** | Każdy PR sprawdzany przez Codex pod kątem bezpieczeństwa (no external scripts). |

---

## 3. Nagłówki bezpieczeństwa (CSP + Permissions Policy)

W pliku `_headers` lub `vercel.json` dodaj:


Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; media-src 'self' blob: data:; object-src 'none';
Permissions-Policy: microphone=(self)


---

## 4. Service Worker (PWA)

- Cache tylko lokalnych plików z `/dist/`.  
- Nigdy nie cache’uj danych z zewnętrznych źródeł.  
- Stosuj `cache-first` tylko dla ikon i manifestu.  
- Regularnie czyść stare cache.  

---

## 5. Ochrona przed XSS

- Zawsze używaj Reactowego `textContent`, nigdy `dangerouslySetInnerHTML`.  
- Nie interpoluj danych z zewnętrznych źródeł w HTML.  
- Waliduj dane wejściowe (np. ID z YouTube: `/^[A-Za-z0-9_-]{11}$/`).  

---

## 6. Ochrona repozytorium

- Zakaz commitowania `.env`.  
- Każdy commit skanowany przez GitHub Actions (`npm audit`).  
- Brak zewnętrznych bibliotek JS z CDN.  

---

## 7. Procedura incydentu

W przypadku podejrzenia naruszenia:
1. Utwórz `issue` z tagiem `security`.  
2. Oznacz typ: `vulnerability`, `privacy`, `xss`.  
3. Utwórz branch `hotfix/security-<opis>`.  
4. Po naprawie — PR z etykietą `security-patch`.  

---

## 8. Test bezpieczeństwa (lokalnie)

npm run lint
npm audit
npm run build


Jeśli `npm audit` wyświetli błędy poziomu *critical* → PR nie może być zmergowany.

---

## 9. Odpowiedzialność

- **Codex (AI-CEO)** – nadzór nad polityką bezpieczeństwa.  
- **GPT-5 (Security Guardian)** – analiza ryzyka i audyt kodu.  
- **Oksana (Lead Human)** – akceptacja zmian, które dotyczą prywatności użytkownika.  

> „Bezpieczeństwo to forma szacunku.” 💎
