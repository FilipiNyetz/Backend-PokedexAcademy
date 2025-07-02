import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/index.js';

const app = express();
app.use(express.json());

// Suporte a __dirname com ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir arquivos estáticos da pasta "uploads"
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rota raiz para health check
app.get('/', (req, res) => {
  res.status(200).send('API Pokedex rodando!');
});

// Rotas da API
app.use('/api', routes);

export default app;
