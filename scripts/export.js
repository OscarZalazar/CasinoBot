import archiver from 'archiver';
import { createWriteStream } from 'fs';
import { join } from 'path';

async function exportProject() {
  const output = createWriteStream(join(process.cwd(), 'casino-bot.zip'));
  const archive = archiver('zip', { zlib: { level: 9 } });

  output.on('close', () => {
    console.log('Proyecto exportado exitosamente');
    console.log('Tamaño total:', archive.pointer() + ' bytes');
  });

  archive.on('error', (err) => {
    throw err;
  });

  archive.pipe(output);

  // Agregar archivos al ZIP
  archive.directory('src/', 'src');
  archive.directory('public/', 'public');
  archive.directory('dist/', 'dist');
  archive.directory('scripts/', 'scripts');
  
  // Agregar archivos individuales
  archive.file('package.json', { name: 'package.json' });
  archive.file('.env.example', { name: '.env.example' });
  archive.file('Dockerfile', { name: 'Dockerfile' });
  archive.file('docker-compose.yml', { name: 'docker-compose.yml' });

  await archive.finalize();
}

exportProject().catch(console.error);