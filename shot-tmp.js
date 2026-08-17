const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  const el = await page.$("#partner-marquee");
  if (!el) { console.log("NOT FOUND"); process.exit(1); }
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);
  await el.screenshot({ path: "marquee-glow.png" });
  const errs = [];
  page.on("console", m => { if (m.type() === "error") errs.push(m.text()); });
  await page.waitForTimeout(500);
  console.log("errors:", errs);
  await browser.close();
})();
