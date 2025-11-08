# Codex Master Prompt — DeutschFonetyka Project

<context>
Project: **DeutschFonetyka**
Goal: Create an interactive phonetic training app for German pronunciation.
Stack: Vite + React + TypeScript + Tailwind + shadcn/ui + Recharts.
Deployment: GitHub Pages via Actions (https://ritarappaport.github.io/DeutschFonetyka/)
Repository: https://github.com/RitaRappaport/DeutschFonetyka
</context>

---

<principles>
1. Work only through PRs — never push directly to `main`.
2. Each agent works on one feature per branch: e.g. `feature/audio-coach`, `feature/exercise-builder`.
3. Respect the repo structure and coding style in `agents.md`.
4. Use context compression (`/compact`) in long sessions to preserve window space.
5. Update documentation and metadata with every major change.
6. Always explain what you changed in human-readable commit messages.
</principles>

---

<architecture>
Agents work asynchronously in the Codex Cloud and communicate through PRs.

| Agent Name | Role | Primary Directories |
|-------------|------|--------------------|
| **agent-factory** | Coordinates all agent tasks and spawns subtasks | `.github/workflows/agent-factory.yml` |
| **agent-audio** | Builds `Audio Coach`: waveform overlay, pitch visualization, and articulation feedback | `/src/modules/audio/` |
| **agent-ex** | Builds `Exercise Builder`: generates phonetic lessons, minimal pairs, checklists | `/src/modules/exercises/` |
| **agent-ux** | Implements accessibility (reduce motion, color schemes, focus states) | `/src/modules/ui/` |
| **agent-sec** | Adds and audits CSP / Permissions-Policy headers | `/src/security/` |
| **agent-cur** | Builds educational content drafts (markdown in `/content/`) | `/content/` |

Agents share status via issues labeled `agent-task` and synchronize context via `agents.md`.
</architecture>

---

<quality-standards>
- **UI Framework:** shadcn/ui with Tailwind CSS — minimalist, clean, accessible.
- **Components:** Functional React components with hooks; never class components.
- **Tests:** Use Vitest; run via `npm run test`.
- **Build:** Must pass `npm run build` and deploy cleanly to Pages.
- **Docs:** Each module must have a `README.md` describing its API and usage.
- **Code Style:** Prettier + ESLint; no console logs, use error boundaries for runtime failures.
- **Language:** All UI text in German; internal comments in English.
</quality-standards>

---

<workflow>
1. **Cloud Agents Initialization**  
   Agent Factory listens for new issues with label `agent-task`.
2. **Branch Creation**  
   Codex creates a feature branch automatically (naming convention: `feature/<agent>-<task>`).
3. **Implementation**  
   The assigned agent generates code according to `agents.md` and `codex-master.md`.
4. **Quality Checks**  
   Before merging, Codex runs:
   - Build
   - Lint
   - Typecheck
   - Unit tests
   - Pages preview deploy (sandbox)
5. **Review & Merge**  
   Human feedback is provided through comments or reactions:
   - ✅ „Podoba mi się” — merge to `main`
   - 🛠️ „Do dopracowania” — agent iterates again
</workflow>

---

<context-provision>
Always read the latest version of:
- `agents.md`
- `agents-tasks.md`
- Any PRD document (`/docs/prd.md` if exists)
- Open issues with label `agent-task`

If context is outdated or missing, Codex must request `sync context`.
</context-provision>

---

<security>
- No API keys in code.
- Use environment variables for all credentials.
- Sanitize user input and DOM injection.
- Use GitHub Token permissions minimally (contents: write, issues: write).
</security>

---

<mcp>
Connect to Model Context Protocol servers for updated documentation:
- `context.openai.mcp://tailwindcss`
- `context.openai.mcp://react`
- `context.openai.mcp://vite`
MCP ensures that generated code follows the newest framework conventions.
</mcp>

---

<init-task>
Agent Factory: initialize all registered agents.  
For each task in `agents-tasks.md`, create or update GitHub Issues with label `agent-task`.  
Then trigger the appropriate workflows:
- `agents-tasks-to-issues.yml`
- `agent-factory.yml`
After that, Codex will coordinate autonomous development of each module.
</init-task>

---

<notes>
- You may summarize progress in `logs/` as Markdown (one file per agent).
- Use fallback deploys if build fails — we value continuity over perfection.
- Keep a human in the loop for validation and feedback.
</notes>
