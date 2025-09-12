# Playwright MCP Server — Usage

## Prerequisites
- Node.js 18+ installed locally.
- Browsers for Playwright installed (optional for now):
  - `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1` was used during install. To enable real browsing, run `npx playwright install` on your machine.

## Installation
- From the repo root:
  - `npm install`
  - If browsers are not installed: `npx playwright install`

## Build and Run
- Build TypeScript: `npm run build`
- Start server: `npm run start:mcp:playwright`
- Dev (no build): `npm run dev:mcp:playwright`

## MCP Client Configuration
- Use `docs/mcp-config-example.json` as a reference for configuring your MCP-enabled client (e.g., Claude Desktop, other MCP clients). Point the command to `dist/servers/playwright-mcp.js` or use the dev script.

## Available Tools
- `open_page({ url })`: open a page and wait for network idle.
- `click({ selector, timeoutMs? })`: click an element.
- `fill({ selector, value })`: fill text inputs.
- `evaluate({ expression })`: run a JS expression in the page and return JSON.
- `screenshot({ selector?, fullPage? })`: returns a base64 PNG string.

## Notes and Safety
- Headless only by default. Avoid navigating to authenticated school systems unless explicitly authorized.
- Do not send PII in prompts. Use generic test pages for demos.
- Logs are not persisted; run behind your school’s gateway if needed for auditing.

