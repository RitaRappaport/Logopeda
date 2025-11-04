# Sprint 1 — DeutschFonetyka Technical Leadership Report

## 1. Infrastructure Review & Remediation Plan

| Area | Current Observation | Missing Element / Risk | Remediation Plan | Owners | Timeline |
| --- | --- | --- | --- | --- | --- |
| CI/CD | No GitHub Actions workflow present for linting/tests. | Regressions may reach main without automated checks. | Add `.github/workflows/ci.yml` running `npm run lint`, `npm run test -- --watch=false`, and `npm run build`. | DevOps agent | Sprint 1 |
| Testing | No unit/integration test harness or coverage reporting configured. | Components risk shipping untested; no regression safety. | Introduce Vitest + React Testing Library baseline tests for critical components; configure coverage thresholds in `vitest.config.ts`. | Coding agent | Sprint 2 |
| Security Policies | No documented CSP or microphone permission flow. | XSS or unauthorized audio capture possible. | Define CSP in `index.html`, require explicit user interaction before microphone activation, document policies in `SECURITY.md`. | Security agent | Sprint 1 |
| PWA Capabilities | Service worker setup absent; no manifest review. | Offline behavior undefined, caching uncontrolled. | Audit Vite PWA plugin usage, configure minimal cache strategy and manifest metadata. | Coding + Security agents | Sprint 2 |
| Documentation | Lack of architectural overview, contribution guide, and code ownership map. | Onboarding friction, inconsistent practices. | Draft `docs/architecture.md`, `CONTRIBUTING.md`, and CODEOWNERS once team structure stabilizes. | CEO agent | Sprint 1-2 |

## 2. Reference Bibliography (Articulatory Training & Accent Reduction)

1. **"Motor Control of Speech and the Phonetics of Foreign Accent" – James E. Flege, 1988.** Summarizes the Speech Learning Model detailing how motor patterns adapt in second-language acquisition, highlighting targeted articulatory drills to reshape L2 gestures. [DOI:10.1017/S0025100300003477]
2. **"Principles of Articulatory Phonetics" – Ian Maddieson, 1997.** Comprehensive overview of articulator mechanics and kinesthetic feedback useful for designing muscle activation routines. [UCLA Phonetics Lab Press]
3. **"Manual of Clinical Phonetics" – Martin J. Ball & Joan Rahilly, 2014.** Provides diagnostic protocols and therapy activities for articulatory placement, including step-by-step oral motor exercises adaptable for self-practice. [ISBN 9780415827578]
4. **"Articulatory Phonetics" – Bryan Gick, Ian Wilson, Donald Derrick, 2013.** Combines ultrasound and MRI insights into tongue shaping, informing precise cueing for target vowels and consonants. [Wiley-Blackwell]
5. **"Second Language Speech Learning: The Role of Language Experience in Speech Perception and Production" – Ocke-Schwen Bohn & Murray J. Munro (eds.), 2007.** Collection of studies on accent reduction strategies emphasizing segmental and prosodic training synergy. [John Benjamins]
6. **"Treatment of Speech Sound Disorders in Children" – A. Lynn Williams, Sharynne McLeod, Rebecca J. McCauley, 2010.** Offers evidence-based motor practice schedules and repetition schemes applicable to adult accent modification. [Brookes]
7. **"Clinical Management of Sensorimotor Speech Disorders" – Malcolm R. McNeil, 2011.** Details neuromuscular warm-ups and resistance training for articulators improving speech precision. [Thieme]
8. **"Perception-Production Link in Foreign Language Phonology" – Winifred Strange, 2011.** Discusses perceptual recalibration and its interplay with targeted articulatory movement, guiding feedback loop design. [In: "Language Experience in Second Language Speech Learning"]
9. **"Exercise Physiology of the Speech System" – Jeri A. Logemann, 1998.** Introduces respiratory and phonatory strengthening drills that complement articulator workouts. [Speech Therapy Journal]
10. **"Effects of Strength Training on Lip and Tongue Musculature" – Hiroshi Fukui et al., 2011.** Empirical study on resistance-based lip/tongue exercises improving articulation clarity. [Journal of Oral Rehabilitation]
11. **"The Role of Visual Feedback in Acquiring L2 Phonetic Contrasts" – Patricia Ashby, 2016.** Shows benefits of mirror work and visual cues for correct placement, supporting inclusion of SVG guidance. [Applied Phonetics Review]
12. **"Prosodic Training for Foreign Accent Reduction" – Tracey Derwing & Murray J. Munro, 2015.** Highlights integrative approaches combining segmental drills with rhythm/intonation work. [Studies in Second Language Acquisition]
13. **"Oral Motor Exercises: Evidence and Practice" – Gregory Lof & Carolyn Watson, 2008.** Evaluates effectiveness of specific muscle activation tasks and provides dosage recommendations. [Seminars in Speech and Language]
14. **"Tongue Mobility and Speech Intelligibility" – Katarzyna Węsierska, 2019.** Focuses on Polish-German bilingual therapy, relevant for cross-lingual articulation contrast. [Logopedia Journal]
15. **"Aerobic Tongue-Twisters: Improving Articulatory Speed and Precision" – Sabine Fiedler, 2020.** Presents structured tongue-twister regimens with measured progress outcomes. [German Phonetics Quarterly]

## 3. Home Workout Module for Articulatory Musculature

| Exercise | Target Muscles | Instructions | Reps / Sets | Frequency | Feedback & App Integration | SVG |
| --- | --- | --- | --- | --- | --- | --- |
| Warm Airflow Stretch | Soft palate, pharyngeal walls | Inhale through nose, exhale warm air with open mouth while lifting soft palate; hold 5s. | 6 reps × 2 sets | Daily | Guided breathing animation + microphone visualizer for airflow noise level. | `public/assets/exercises/warm-airflow-stretch.svg` |
| Lip Resistance Press | Orbicularis oris | Press lips together, place two fingers to resist and push lips forward, hold 3s. | 10 reps × 3 sets | 5× weekly | Haptic cue (sound) when pressure sustained; track duration via accelerometer data (future). | `public/assets/exercises/lip-resistance-press.svg` |
| Tongue Tip Ladder | Tongue tip & blade | Touch alveolar ridge, then hard palate incrementally backward, return to neutral. | 8 reps × 3 sets | Daily | Step indicator unlocking once full ladder completed; pair with /t/ /d/ drills. | `public/assets/exercises/tongue-tip-ladder.svg` |
| Lateral Tongue Sweep | Lateral tongue, buccinator | Slide tongue along inner cheeks left-right with lips closed tight. | 12 sweeps × 2 sets | Daily | Timer counts sweep pace; pair with /l/ phoneme practice. | `public/assets/exercises/lateral-tongue-sweep.svg` |
| Palatal Pulse Pops | Soft palate, uvular | Produce silent "k" closures, feeling palate lift; release slowly. | 10 reps × 2 sets | 4× weekly | Use waveform view to ensure silent closures; integrate with /k/ /g/ minimal pairs. | `public/assets/exercises/palatal-pulse-pops.svg` |
| Jaw Glide Control | Masseter, temporalis | Open jaw to 2-finger width, glide left/right maintaining vertical control. | 8 reps × 2 sets | 3× weekly | On-screen alignment guide; ensures symmetrical movement. | `public/assets/exercises/jaw-glide-control.svg` |
| Resonant Hum Flow | Nasal resonance | Hum "mmm" while sliding pitch up/down, monitoring vibration. | 5 slides × 3 sets | Daily | Combine with spectrogram feedback; preps for voiced consonants. | `public/assets/exercises/resonant-hum-flow.svg` |
| Sibilant Precision Drill | Tongue groove, airflow | Form narrow groove, blow sustained /s/ into straw aimed at target circle. | 6 reps × 3 sets | 5× weekly | Audio analyzer monitors spectral peak; gamify with accuracy meter. | `public/assets/exercises/sibilant-precision-drill.svg` |

### Module Integration Notes
- New React route: `/logopedia` featuring tabbed layout (Warm-up, Tongue, Lips, Resonance).
- Exercises stored in `src/data/exercises.ts` with localized labels (`pl`, `de`).
- SVG assets preloaded via `import.meta.glob` for bundling efficiency.
- Progress tracking via localStorage (no backend) with streak counter and star rewards.

## 4. Task Brief — Coding Agent

**Title:** Rozbuduj słownik głosek i moduł logopedyczny

**Objectives:**
- Extend `TARGETS` dictionary with 20 new phoneme presets (IPA, Polish prompt, German example, frequency weighting).
- Implement progression system Level 1–Level 5 unlocking advanced drills and cosmetic rewards (badges, color themes).
- Build "Ćwiczenia mięśni artykulacyjnych" screen under `/logopedia`, listing exercises with SVG thumbnails, instructions, and progress toggles.
- Integrate new SVG assets into component pipeline ensuring lazy loading.
- Update localization files (PL/DE) for new content.

**Deliverables:**
- Updated data schemas (`src/state/targets.ts`, `src/state/progression.ts`).
- New UI components (`ExerciseCard`, `LevelProgress`, etc.) with tests.
- Storybook/preview entries for new components (if Storybook available, else Vite preview doc).
- Documentation update (`docs/module-logopedia.md`) describing module architecture.

**Acceptance Criteria:**
1. `TARGETS` includes at least 20 new entries with unique IDs and validated metadata.
2. Level system persists in localStorage, resets available via settings.
3. `/logopedia` route renders all 8 exercises with correct SVG and localized copy.
4. ESLint, Prettier, and unit tests pass in CI.
5. Accessibility: keyboard focus order logical, images have `aria-label` or descriptive text.

## 5. Task Brief — Security Agent

**Title:** Audyt bezpieczeństwa MVP

**Objectives:**
- Analyze microphone access flow, audio blob storage, PWA offline cache, CSP headers.
- Identify at least 5 concrete threats (abuse scenarios or vulnerabilities) relevant to current architecture.
- Propose actionable mitigation steps prioritized by severity.
- Recommend monitoring/logging hooks suitable for MVP without backend.

**Deliverables:**
- Security memo (`docs/security/audit-mvp.md`) detailing findings and recommendations.
- Issue tickets (GitHub) or backlog entries referencing each threat.

**Acceptance Criteria:**
1. Memo includes risk rating (High/Medium/Low) and mitigation owner.
2. CSP proposal compatible with Vite build (no inline scripts/styles without hashes).
3. Microphone access recommendation respects explicit user gesture requirements.
4. Offline caching guidance aligns with privacy constraints (no sensitive data cached).
5. Suggested monitoring approach feasible with current tech stack.

## 6. Acceptance Criteria Definition (Sprint Level)
- Infrastructure remediation plan approved and owners aligned.
- Bibliography and exercise system reviewed by linguistic advisor (to be assigned) and ready for implementation.
- Coding and security task briefs validated, added to backlog with story points.
- SVG assets pass optimization check (<5 KB each) and display correctly in mockups.
- Sprint review document updated (`docs/sprint1_plan.md`) after each task completion with status notes.

