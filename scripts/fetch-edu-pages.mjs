// Minimal HTTP fetch using Playwright's request API (no browser download required)
import { request } from 'playwright';

const urls = [
  'https://edu.google.com/intl/en/products/workspace-for-education/',
  'https://edu.google.com/intl/en/products/gemini/',
  'https://www.microsoft.com/education/solutions/copilot',
  'https://districts.khanacademy.org/khanmigo',
  'https://www.khanacademy.org/khan-labs',
  'https://www.canva.com/education/',
  'https://quizizz.com/for-schools',
  'https://nearpod.com/',
  'https://www.pcpd.org.hk/'],
  now = new Date().toISOString();

function extractTitle(html) {
  const m = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return m ? m[1].trim() : '(no <title>)';
}

const ctxPromise = request.newContext({
  userAgent: 'Mozilla/5.0 (compatible; AI-Edu-Validator/1.0)',
  timeout: 20000,
});

try {
  const ctx = await ctxPromise;
  const out = [];
  for (const url of urls) {
    try {
      const resp = await ctx.get(url);
      const status = resp.status();
      const ok = resp.ok();
      const body = await resp.text();
      const title = extractTitle(body);
      out.push({ url, status, ok, title });
    } catch (e) {
      out.push({ url, status: 0, ok: false, title: `Error: ${e.message}` });
    }
  }
  await ctx.dispose();
  console.log(JSON.stringify({ fetchedAt: now, results: out }, null, 2));
} catch (err) {
  console.error('Failed to create request context:', err);
  process.exit(1);
}

