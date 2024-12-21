import { build } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function buildProject() {
  try {
    // Construir el panel de administración
    await build({
      root: resolve(__dirname, 'public/admin'),
      build: {
        outDir: resolve(__dirname, 'dist/admin'),
        emptyOutDir: true
      }
    });

    console.log('Build completado exitosamente');
  } catch (error) {
    console.error('Error en el build:', error);
    process.exit(1);
  }
}

buildProject();