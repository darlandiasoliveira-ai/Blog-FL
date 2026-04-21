import * as fs from 'fs';

const imagePath = 'src/assets/logo-branca.png';
const base64 = fs.readFileSync(imagePath, 'base64');
const dataUri = `data:image/png;base64,${base64}`;

const configPath = 'src/config.ts';
let config = fs.readFileSync(configPath, 'utf-8');

// Replace the logoUrl property with the dataUri
config = config.replace(/logoUrl:\s*logoImage/, `logoUrl: "${dataUri}"`);
// Also remove the import statement
config = config.replace(/import logoImage from '\.\/assets\/logo-branca\.png';\n/, '');

fs.writeFileSync(configPath, config);
console.log('Successfully embedded logo as base64 data URI.');
