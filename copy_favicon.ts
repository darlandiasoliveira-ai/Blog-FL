import * as fs from 'fs';

fs.copyFileSync('src/assets/logo-fl2.png', 'public/brand-icon.png');
console.log('Favicon replaced successfully!');
