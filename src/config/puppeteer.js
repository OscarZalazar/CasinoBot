import { join } from 'path';

export const PUPPETEER_CONFIG = {
  headless: "new",
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--disable-gpu',
    '--no-first-run',
    '--no-zygote',
    '--single-process'
  ],
  executablePath: '/usr/bin/google-chrome'
};