import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { Tool, CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { chromium, firefox, webkit, Browser, Page } from "playwright";

type BrowserName = "chromium" | "firefox" | "webkit";

let browser: Browser | null = null;
let page: Page | null = null;

async function ensureBrowser(name: BrowserName = "chromium") {
  if (browser) return browser;
  switch (name) {
    case "firefox":
      browser = await firefox.launch({ headless: true });
      break;
    case "webkit":
      browser = await webkit.launch({ headless: true });
      break;
    default:
      browser = await chromium.launch({ headless: true });
  }
  return browser;
}

async function ensurePage() {
  if (page) return page;
  const b = await ensureBrowser();
  const context = await b.newContext();
  page = await context.newPage();
  return page;
}

const tools: Tool[] = [
  {
    name: "open_page",
    description: "Open a URL in a headless browser and wait for network idle.",
    inputSchema: {
      type: "object",
      properties: {
        url: { type: "string", description: "The URL to open." },
      },
      required: ["url"],
    },
  },
  {
    name: "click",
    description: "Click an element using a selector.",
    inputSchema: {
      type: "object",
      properties: {
        selector: { type: "string", description: "CSS/XPath selector." },
        timeoutMs: { type: "number", description: "Optional timeout." },
      },
      required: ["selector"],
    },
  },
  {
    name: "fill",
    description: "Fill an input/textarea with text.",
    inputSchema: {
      type: "object",
      properties: {
        selector: { type: "string" },
        value: { type: "string" },
      },
      required: ["selector", "value"],
    },
  },
  {
    name: "evaluate",
    description: "Run JavaScript in the page context and return the result as JSON.",
    inputSchema: {
      type: "object",
      properties: {
        expression: { type: "string", description: "JS expression e.g. document.title" },
      },
      required: ["expression"],
    },
  },
  {
    name: "screenshot",
    description: "Take a PNG screenshot and return as base64.",
    inputSchema: {
      type: "object",
      properties: {
        selector: { type: "string", description: "Optional element selector." },
        fullPage: { type: "boolean", description: "Full page screenshot." },
      },
    },
  },
];

const server = new Server({
  name: "playwright-mcp",
  version: "0.1.0",
  tools,
});

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const p = await ensurePage();
  const args = (req.params.arguments || {}) as Record<string, any>;
  try {
    switch (req.params.name) {
      case "open_page": {
        const url = String(args.url);
        await p.goto(url, { waitUntil: "networkidle" });
        return { content: [{ type: "text", text: `Opened ${url}` }] };
      }
      case "click": {
        const { selector, timeoutMs } = args;
        await p.click(String(selector), { timeout: timeoutMs ?? 10000 });
        return { content: [{ type: "text", text: `Clicked ${selector}` }] };
      }
      case "fill": {
        const { selector, value } = args;
        await p.fill(String(selector), String(value));
        return { content: [{ type: "text", text: `Filled ${selector}` }] };
      }
      case "evaluate": {
        const { expression } = args;
        const result = await p.evaluate((expr) => {
          // eslint-disable-next-line no-eval
          return eval(expr as string);
        }, String(expression));
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      }
      case "screenshot": {
        const { selector, fullPage } = args;
        let buffer: Buffer;
        if (selector) {
          const el = await p.$(String(selector));
          if (!el) throw new Error(`Element not found: ${selector}`);
          buffer = await el.screenshot({ type: "png" });
        } else {
          buffer = await p.screenshot({ type: "png", fullPage: Boolean(fullPage) });
        }
        const b64 = buffer.toString("base64");
        return { content: [{ type: "text", text: b64, mimeType: "image/png;base64" }] } as any;
      }
      default:
        throw new Error(`Unknown tool: ${req.params.name}`);
    }
  } catch (err: any) {
    return { content: [{ type: "text", text: `Error: ${err.message}` }] };
  }
});

process.on("SIGINT", async () => {
  await browser?.close();
  process.exit(0);
});

server.connect();

