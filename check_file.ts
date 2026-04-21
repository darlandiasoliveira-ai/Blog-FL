import * as fs from 'fs';

try {
  const stats = fs.statSync('fl.png');
  console.log(`Size of fl.png: ${stats.size} bytes`);
} catch (e) {
  console.log('Error reading fl.png:', e);
}
