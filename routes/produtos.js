import express from 'express';
import {
  listarProdutos,
  buscarProduto,
  criarProduto,
  atualizarProduto,
  deletarProduto
} from '../controllers/produtosController.js';
import autenticar from '../middlewares/autenticar.js';

const router = express.Router();

router.get('/', listarProdutos);                        // GET /produtos
router.get('/:id', buscarProduto);                      // GET /produtos/:id
router.post('/', autenticar, criarProduto);             // POST /produtos
router.put('/:id', autenticar, atualizarProduto);       // PUT /produtos/:id
router.delete('/:id', autenticar, deletarProduto);      // DELETE /produtos/:id

export default router;