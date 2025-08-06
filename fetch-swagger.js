// fetch-swagger.js (ESM version with dotenv)
import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerUrl = process.env.BACKEND_API_SWAGGER_URL;
if (!swaggerUrl) {
  console.error('BACKEND_API_SWAGGER_URL environment variable is not set.');
  process.exit(1);
}


const outputPath = path.join(__dirname, 'docs', 'api.json');

const fetch = (url, cb) => {
  const mod = url.startsWith('https') ? https : http;
  mod.get(url, (res) => {
    if (res.statusCode !== 200) {
      cb(new Error(`Failed to fetch: ${res.statusCode}`));
      return;
    }
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => cb(null, data));
  }).on('error', cb);
};

fetch(swaggerUrl, (err, data) => {
  if (err) {
    console.error('Error fetching Swagger JSON:', err.message);
    process.exit(1);
  }
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, data, 'utf8');
  console.log(`Swagger JSON saved to ${outputPath}`);
});