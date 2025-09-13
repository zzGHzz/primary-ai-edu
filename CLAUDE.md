# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Build and Test
- `npm run build` - Compile TypeScript to `dist/` directory
- `npm test` - Currently returns "No tests yet" (placeholder)

### MCP Playwright Server
- `npm run start:mcp:playwright` - Start the built MCP server from `dist/`
- `npm run dev:mcp:playwright` - Run MCP server in development mode with ts-node
- `npx playwright install` - Install browser binaries (needed for actual browser automation)

### Linting and Documentation
- `markdownlint "docs/**/*.md"` - Lint Markdown files for style consistency
- `markdown-link-check docs/requirement.md` - Validate links in documentation
- `node scripts/fetch-edu-pages.mjs` - Fetch and validate educational platform URLs

## Project Architecture

### Core Purpose
This is a research and documentation repository for implementing AI tools in Hong Kong primary education. The project evaluates AI platforms for classroom integration while addressing data privacy and student safety concerns.

### Key Components

**Documentation-First Structure**
- `docs/requirement.md` - Primary requirements from school principal perspective
- `docs/ai-integration-plan.md` - Strategic implementation roadmap
- `docs/ai-tool-comparison.md` - Comparative analysis of AI platforms
- `docs/tools/` - Evaluation matrices and assessment forms

**MCP Playwright Server** (`src/servers/playwright-mcp.ts`)
- Model Context Protocol server for web automation
- Provides tools: `open_page`, `click`, `fill`, `evaluate`, `screenshot`
- Designed for educational platform research and validation
- Runs headless by default for security

**Utility Scripts**
- `scripts/fetch-edu-pages.mjs` - Validates accessibility of educational platform URLs
- Uses Playwright's request API without full browser download

### Configuration Files
- `tsconfig.json` - TypeScript with ES2022 modules, strict typing enabled
- `docs/mcp-config-example.json` - Reference for MCP client setup
- `AGENTS.md` - Repository-specific development guidelines

## Development Guidelines

### Commit Standards
- Use Conventional Commits: `docs:`, `feat:`, `chore:`, `refactor:`
- Include scope when helpful: `docs(requirement): add risk rubric`
- Write commit messages in imperative mood

### Content Standards
- Focus on Hong Kong primary education context
- Anonymize all student/teacher/school data examples
- Consider PDPO (Personal Data Privacy Ordinance) compliance
- Document data residency requirements for tools

### File Organization
- Use kebab-case for filenames
- Keep documentation under `docs/`
- Single-purpose files preferred
- Cross-link related documents
- Markdown: use `#` for titles, wrap at ~100 characters

### Security Considerations
- No credentials or sensitive data in repository
- Reference environment/config patterns instead of real values
- MCP server runs headless only by default
- Avoid navigating to authenticated school systems without authorization