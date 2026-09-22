import express from 'express';
import {
    listarAvaliacoes,
    buscarAvaliacao,
    listarAvaliacoesDestaques,
    criarAvaliacao,
    atualizarAvaliacao,
    deletarAvaliacao
} from '../controllers/avaliacoesController.js';
import autenticar from '../middlewares/autenticar.js';

const router = express.Router();

router.get('/', autenticar, listarAvaliacoes);          // GET /avaliacoes
router.get('/destaque', listarAvaliacoesDestaques);     // GET /avaliacoes/destaque
router.get('/:id', autenticar, buscarAvaliacao);        // GET /avaliacoes/:id
router.post('/', criarAvaliacao);                       // POST /avaliacoes
router.put('/:id', autenticar, atualizarAvaliacao);     // PUT /avaliacoes/:id
router.delete('/:id', autenticar, deletarAvaliacao);    // DELETE /avaliacoes/:id

export default router;