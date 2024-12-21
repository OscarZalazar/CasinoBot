export const BROWSER_CONFIG = {
  launch: {
    headless: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu'
    ],
    // Usar Chrome instalado en Windows por defecto
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  }
};