import prisma from '../prisma/client.js';
import { hashSenha, verificarSenha } from '../utils/senha.js';
import { gerarToken } from '../utils/jwt.js';

const userAdminSelect = {
    id: true,
    login: true,
    nome: true,
    email: true,
    criadoEm: true
}

// GET /user - lista todos os usuários administrativos
export async function listarUsuarios(req, res, next){
    try{
        const usuarios = await prisma.userAdmin.findMany({
            select: userAdminSelect
        });
        res.json(usuarios);
    }
    catch(erro){
        next(erro);
    }
}

// GET /user/:id - busca um usuário pelo id
export async function buscarUsuario(req, res, next){
    try{
        const { id } = req.params;
        if (!Number.isInteger(Number(id)) || Number(id)<=0) {
            return res.status(400).json({ erro: 'ID inválido' });
        }
        const usuario = await prisma.userAdmin.findUnique({
            where: { id: Number(id) },
            select: userAdminSelect
        });
        if (!usuario) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }
        res.json(usuario);
    }
    catch(erro){
        if (erro.code === "P2025"){
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }
        next(erro);
    }
}

// POST /user - cria um novo usuário
export async function criarUsuario(req, res, next){
    try{
        const { login, senha, nome, email } = req.body;
        if (!login || !senha || !nome || !email) {
            return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
        }
        const senhaHash = await hashSenha(senha);
        const novoUsuario = await prisma.userAdmin.create({
            data: {
                login: login,
                senhaHash: senhaHash,
                nome: nome,
                email: email
            },
            select: userAdminSelect
        });
        res.status(201).json(novoUsuario);
    }
    catch(erro){
        if (erro.code === "P2002") {
            return res.status(409).json({ erro: "Login e/ou email já cadastrado" });
        }
        next(erro);
    }
}

// PUT /user/:id - atualiza um usuário existente
export async function atualizarUsuario(req, res, next){
    try{
        const { id } = req.params;
        const { login, senha, nome, email } = req.body;
        if (!Number.isInteger(Number(id)) || Number(id)<=0) {
            return res.status(400).json({ erro: 'ID inválido' });
        }
        const atualizacao = { login, nome, email };
        if (senha) {
            atualizacao.senhaHash = await hashSenha(senha);
        }
        const usuario = await prisma.userAdmin.update({
            where: { id: Number(id) },
            data: atualizacao,
            select: userAdminSelect
        });
        res.json(usuario);
    }
    catch(erro){
        if (erro.code === "P2002") {
            return res.status(409).json({ erro: "Login e/ou email já cadastrado" });
        }
        if (erro.code === "P2025"){
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }
        next(erro);
    }
}

// DELETE /user/:id - deleta um usuário
export async function deletarUsuario(req, res, next){
    try{
        const { id } = req.params;
        if (!Number.isInteger(Number(id)) || Number(id)<=0) {
            return res.status(400).json({ erro: 'ID inválido' });
        }
        await prisma.userAdmin.delete({
            where: { id: Number(id) }
        })
        res.status(204).end()
    }
    catch(erro){
        if (erro.code === "P2025"){
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }
        next(erro);
    }
}

// POST /user/login - autentica um usuário existente
export async function loginUsuario(req, res, next){
    try{
        const { login, senha } = req.body;
        if (!login || !senha) {
            return res.status(400).json({ erro: "Login e senha obrigatórios" });
        }
        const usuario = await prisma.userAdmin.findUnique({
            where: {
                login: login,
            }
        });
        if (!usuario) {
            return res.status(401).json({ erro: "Credenciais inválidas" });
        }
        if (!(await verificarSenha(senha, usuario.senhaHash))) {
            return res.status(401).json({ erro: "Credenciais inválidas" });
        }
        const token = gerarToken(usuario);
        res.json({ token });
    }
    catch(erro){
        next(erro);
    }
}