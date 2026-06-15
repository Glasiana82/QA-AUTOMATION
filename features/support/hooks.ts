import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

setDefaultTimeout(60000);

let browser: Browser;
let context: BrowserContext;
let page: Page;

Before(async function() {
  const headless = process.env.HEADLESS !== 'false';
  const recordVideo = process.env.RECORD_VIDEO === 'true';

  browser = await chromium.launch({ headless });
  const contextOptions: any = {};
  if (recordVideo) {
    contextOptions.recordVideo = { dir: 'test-results/videos/' };
  }

  context = await browser.newContext(contextOptions);
  page = await context.newPage();
  this.page = page;
});

After(async function(this: any, scenario: any) {
  try {
    if (scenario.result && scenario.result.status === 'FAILED' && page) {
      const screenshotsDir = path.resolve('test-results/screenshots');
      if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir, { recursive: true });
      }
      const fileName = `failure-${Date.now()}.png`;
      await page.screenshot({ path: path.join(screenshotsDir, fileName), fullPage: true });
    }
  } catch (error) {
    console.error('Erro ao salvar screenshot de falha:', error);
  }

  if (page) {
    await page.close();
  }
  if (context) {
    await context.close();
  }
  if (browser) {
    await browser.close();
  }
});
