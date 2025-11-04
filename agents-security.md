# 🔐 AGENTS-SECURITY.MD — Protokół bezpieczeństwa (DeutschFonetyka)

Dokument dla agentów (Codex/Cloud Agents/CI) – minimalny, praktyczny i egzekwowalny. Priorytet: **lokalna prywatność audio**, **zero sekretów w repo**, **PWA bezpieczna domyślnie**.

---

## 0) Założenia i model zagrożeń

- **MVP = 100% lokalnie**: nagrywanie, analiza, scoring, wizualizacja – wszystko w przeglądarce. Brak backendu.
- **Dane wrażliwe**: strumień mikrofonu, nagrania audio (Blob/URL). Pozostają lokalnie.
- **Zagrożenia** (STRIDE skrótowo):
  - **S**poofing: fałszywe źródła skryptów/CDN.
  - **T**ampering: złośliwy SW/iframy, XSS.
  - **R**epudiation: brak audytu – minimalizujemy przez PR/CI.
  - **I**nformation disclosure: wycieki audio/ID klipów, fingerprinting.
  - **D**enial of service: SW cache bloat, pętle audio.
  - **E**levation of privilege: nadużycie uprawnień mikrofonu/iframes.

**Cel:** brak zewnętrznych skryptów, ścisła CSP, [Permissions Policy], kontrolowany SW, sanityzacja wejść, minimalne zależności.

---

## 1) Nagłówki bezpieczeństwa / CSP / Permissions-Policy

> Uwaga: przy hostingu statycznym (GitHub Pages, Netlify, Vercel) ustaw nagłówki w pliku konfiguracyjnym hosta (np. `_headers` / `vercel.json`) **albo** minimalny wariant meta-CSP w `index.html` (gorsze niż nagłówki HTTP, ale lepsze niż nic).

### 1.1 Content Security Policy (CSP)

**Preferowany (nagłówek HTTP, skrócona lista do PWA + YouTube-nocookie):**
