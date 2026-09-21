import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import logger from './middlewares/logger.js';
import tratarErro from './middlewares/erro.js';
import produtoRoutes from './routes/produtoRoutes.js';   // ← novo

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.json({ mensagem: 'Restaurante Dona Cida API está no ar! 🥧' });
});

app.get('/status', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

app.use('/produtos', produtoRoutes);                      // ← novo

app.use(tratarErro);

if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

export default app;