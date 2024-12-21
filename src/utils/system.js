import { execSync } from 'child_process';
import { log } from './logger.js';

export function checkSystemDependencies() {
  try {
    // Check for required system libraries
    const libraries = [
      'libx11-xcb1',
      'libxcomposite1',
      'libxdamage1',
      'libxext6',
      'libxfixes3',
      'libxrandr2',
      'libgbm1',
      'libasound2',
      'libatk1.0-0',
      'libgtk-3-0'
    ];

    const missing = libraries.filter(lib => {
      try {
        execSync(`dpkg -s ${lib}`, { stdio: 'ignore' });
        return false;
      } catch {
        return true;
      }
    });

    if (missing.length > 0) {
      log(`Missing required libraries: ${missing.join(', ')}`, 'warn');
      return false;
    }

    return true;
  } catch (error) {
    log(`Error checking dependencies: ${error.message}`, 'error');
    return false;
  }
}