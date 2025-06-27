import express from 'express';
import routes from './routes/index.js';

const app = express();

app.use(express.json());

// Rota raiz para health check
app.get('/', (req, res) => {
  res.status(200).send('API Pokedex rodando!');
});

// Rotas da API
app.use('/api', routes);

export default app;
