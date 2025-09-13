import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { chromium, firefox, webkit } from "playwright";
import type { Browser, Page } from "playwright";
import { z } from "zod";

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

const server = new McpServer({
  name: "playwright-mcp",
  version: "0.1.0"
});

server.registerTool(
  "open_page",
  {
    title: "Open Page",
    description: "Open a URL in a headless browser and wait for network idle.",
    inputSchema: {
      url: z.string().describe("The URL to open.")
    }
  },
  async ({ url }) => {
    const p = await ensurePage();
    await p.goto(url, { waitUntil: "networkidle" });
    return { content: [{ type: "text", text: `Opened ${url}` }] };
  }
);

server.registerTool(
  "click",
  {
    title: "Click Element",
    description: "Click an element using a selector.",
    inputSchema: {
      selector: z.string().describe("CSS/XPath selector."),
      timeoutMs: z.number().optional().describe("Optional timeout.")
    }
  },
  async ({ selector, timeoutMs }) => {
    const p = await ensurePage();
    await p.click(selector, { timeout: timeoutMs ?? 10000 });
    return { content: [{ type: "text", text: `Clicked ${selector}` }] };
  }
);

server.registerTool(
  "fill",
  {
    title: "Fill Input",
    description: "Fill an input/textarea with text.",
    inputSchema: {
      selector: z.string().describe("CSS/XPath selector."),
      value: z.string().describe("Text to fill.")
    }
  },
  async ({ selector, value }) => {
    const p = await ensurePage();
    await p.fill(selector, value);
    return { content: [{ type: "text", text: `Filled ${selector}` }] };
  }
);

server.registerTool(
  "evaluate",
  {
    title: "Evaluate JavaScript",
    description: "Run JavaScript in the page context and return the result as JSON.",
    inputSchema: {
      expression: z.string().describe("JS expression e.g. document.title")
    }
  },
  async ({ expression }) => {
    const p = await ensurePage();
    const result = await p.evaluate((expr) => {
      // eslint-disable-next-line no-eval
      return eval(expr as string);
    }, expression);
    return { content: [{ type: "text", text: JSON.stringify(result) }] };
  }
);

server.registerTool(
  "screenshot",
  {
    title: "Take Screenshot",
    description: "Take a PNG screenshot and return as base64.",
    inputSchema: {
      selector: z.string().optional().describe("Optional element selector."),
      fullPage: z.boolean().optional().describe("Full page screenshot.")
    }
  },
  async ({ selector, fullPage }) => {
    const p = await ensurePage();
    let buffer: Buffer;
    if (selector) {
      const el = await p.$(selector);
      if (!el) throw new Error(`Element not found: ${selector}`);
      buffer = await el.screenshot({ type: "png" });
    } else {
      buffer = await p.screenshot({ type: "png", fullPage: Boolean(fullPage) });
    }
    const b64 = buffer.toString("base64");
    return { 
      content: [{ 
        type: "text", 
        text: b64,
        mimeType: "image/png;base64"
      }] 
    };
  }
);

process.on("SIGINT", async () => {
  await browser?.close();
  process.exit(0);
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});

