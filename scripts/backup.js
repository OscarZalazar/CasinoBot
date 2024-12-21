```javascript
import { mkdir, copyFile, readdir, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function createBackup() {
  try {
    // Crear nombre de backup con timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = join(process.cwd(), 'backups', timestamp);
    
    // Crear directorio de backup
    await mkdir(backupDir, { recursive: true });
    
    // Directorios a respaldar
    const dirsToBackup = ['src', 'public'];
    
    // Copiar directorios
    for (const dir of dirsToBackup) {
      await copyDirectory(join(process.cwd(), dir), join(backupDir, dir));
    }
    
    // Archivos individuales a respaldar
    const filesToBackup = [
      'package.json',
      'vite.config.js',
      'tailwind.config.js',
      'postcss.config.js',
      'index.html'
    ];
    
    // Copiar archivos individuales
    for (const file of filesToBackup) {
      try {
        await copyFile(
          join(process.cwd(), file),
          join(backupDir, file)
        );
      } catch (err) {
        if (err.code !== 'ENOENT') throw err;
      }
    }

    console.log(`Backup creado exitosamente en ${backupDir}`);
    return backupDir;
  } catch (error) {
    console.error('Error creando backup:', error);
    throw error;
  }
}

async function copyDirectory(src, dest) {
  await mkdir(dest, { recursive: true });
  const entries = await readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath);
    } else {
      await copyFile(srcPath, destPath);
    }
  }
}

createBackup();
```