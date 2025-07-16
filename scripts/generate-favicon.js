const fs = require('fs');
const { createCanvas } = require('canvas');
const sharp = require('sharp');

// Créer un favicon simple avec les initiales JD
async function generateFavicon() {
  // Créer un canvas de 512x512
  const canvas = createCanvas(512, 512);
  const ctx = canvas.getContext('2d');

  // Fond bleu
  ctx.fillStyle = '#3b82f6';
  ctx.fillRect(0, 0, 512, 512);

  // Texte blanc au centre
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 300px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('JD', 256, 300);

  // Sauvegarder en différentes tailles
  const buffer = canvas.toBuffer('image/png');
  
  // Créer le dossier public s'il n'existe pas
  if (!fs.existsSync('public')) {
    fs.mkdirSync('public');
  }

  // Sauvegarder favicon.ico
  await sharp(buffer)
    .resize(32, 32)
    .toFile('public/favicon.ico');

  // Sauvegarder les différentes tailles
  await sharp(buffer)
    .resize(16, 16)
    .toFile('public/favicon-16x16.png');

  await sharp(buffer)
    .resize(32, 32)
    .toFile('public/favicon-32x32.png');

  // Apple Touch Icon
  await sharp(buffer)
    .resize(180, 180)
    .toFile('public/apple-touch-icon.png');

  console.log('Favicons générés avec succès!');
}

generateFavicon().catch(console.error);
