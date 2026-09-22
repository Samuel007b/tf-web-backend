import express from 'express';
import {
    listarUsuarios,
    buscarUsuario,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario,
    loginUsuario
} from '../controllers/userAdminController.js';
import autenticar from '../middlewares/autenticar.js';

const router = express.Router();

router.get('/', autenticar, listarUsuarios);            // GET /user
router.get('/:id', autenticar, buscarUsuario);          // GET /user/:id
router.post('/', autenticar, criarUsuario);             // POST /user
router.put('/:id', autenticar, atualizarUsuario);       // PUT /user/:id
router.delete('/:id', autenticar, deletarUsuario);      // DELETE /user/:id
router.post('/login', loginUsuario);                    // POST /user/login

export default router;