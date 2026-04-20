import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'

// A simple plugin to save wishes to a JSON file during development
const saveWishesPlugin = () => ({
  name: 'save-wishes-plugin',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (req.url === '/api/save-wish' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        
        req.on('end', () => {
          try {
            const newWish = JSON.parse(body);
            const filePath = path.resolve(__dirname, 'public/data/wishes.json');
            
            // Read existing, parse, add new, and write back
            let wishes = [];
            if (fs.existsSync(filePath)) {
              const fileContent = fs.readFileSync(filePath, 'utf8');
              wishes = JSON.parse(fileContent || '[]');
            }
            
            wishes.unshift(newWish);
            fs.writeFileSync(filePath, JSON.stringify(wishes, null, 2), 'utf8');
            
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true }));
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Failed to save wish' }));
          }
        });
      } else {
        next();
      }
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    saveWishesPlugin(),
  ],
  server: {
    watch: {
      ignored: ['**/public/data/wishes.json'],
    }
  }
})
