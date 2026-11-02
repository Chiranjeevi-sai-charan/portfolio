// Prints a score table from the reports lhci wrote to .lighthouseci
import fs from 'node:fs'

const dir = '.lighthouseci'
const rows = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith('.json') && f.startsWith('lhr-'))
  .map((f) => JSON.parse(fs.readFileSync(`${dir}/${f}`, 'utf8')))
  .map((r) => ({
    route: new URL(r.finalDisplayedUrl).pathname,
    perf: Math.round(r.categories.performance.score * 100),
    a11y: Math.round(r.categories.accessibility.score * 100),
    best: Math.round(r.categories['best-practices'].score * 100),
    seo: Math.round(r.categories.seo.score * 100),
    lcp: r.audits['largest-contentful-paint'].displayValue,
  }))

console.table(rows)
console.log('Best Practices is lower locally: Vercel scripts 404 and Clarity sets cookies.')
