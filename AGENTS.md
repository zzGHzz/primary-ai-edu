# Repository Guidelines

## Project Structure & Module Organization
- `docs/` holds all project documentation. Core brief: `docs/requirement.md` (requirements and expected outputs).
- Prefer adding supporting artifacts under `docs/` (e.g., `docs/ai-tool-comparison.md`, `docs/implementation-plan.md`, `docs/assets/`).
- Use kebab-case for filenames and keep topics single-purpose.

## Build, Test, and Development Commands
- No build is required; this is a docs-first repository.
- Preview Markdown with your editor’s built-in viewer or a CLI tool.
- Optional linting (recommended):
  - `markdownlint "docs/**/*.md"` — style/lint checks for Markdown.
  - `markdown-link-check docs/requirement.md` — validate links.

## Coding Style & Naming Conventions
- Markdown: `#` for titles, increment heading levels by one; wrap lines at ~100 chars.
- Use `-` for bullets, fenced code blocks for commands/paths, and relative links.
- Filenames: kebab-case (e.g., `ai-tool-comparison.md`).
- Keep content concise, action-oriented, and specific to the HK primary education context.

## Testing Guidelines
- Run Markdown lint and link checks before PRs (when available).
- Ensure examples/commands are runnable and paths exist.
- Include small, concrete examples (matrices, checklists) in separate files.

## Commit & Pull Request Guidelines
- Use Conventional Commits: `docs:`, `feat:`, `chore:`, `refactor:`.
- Commit messages: imperative mood; include scope when helpful (e.g., `docs(requirement): add risk rubric`).
- PRs must include: purpose, summary of changes, linked issue(s), and a brief preview note or screenshot if layout changes matter.

## Security & Configuration Tips
- Do not include sensitive student/teacher/school data. Anonymize examples.
- Note data residency and PDPO considerations when proposing tools.
- Store credentials outside the repo; reference env/config patterns instead of real values.

## Agent-Specific Instructions
- When adding new documents, update cross-links and keep section headings consistent.
- Prefer incremental, single-topic PRs. If introducing tooling, document how to install and run it in `docs/`.

