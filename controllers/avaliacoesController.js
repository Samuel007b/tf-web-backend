import prisma from '../prisma/client.js';

const selectAvaliacao = {
    id: true,
    descricao: true,
    quantEstrelas: true,
    midia: true,
    destaque: true,
    nomeCliente: true,
    fotoCliente: true,
    criadoEm: true,
    produto: {
      select: {
        id: true,
        nome: true,
        categoria: true
      },
    }
}

// GET /avaliacoes - lista todas as avaliações
export async function listarAvaliacoes(req, res, next) {
    try{
        const avaliacoes = await prisma.avaliacao.findMany({
            orderBy: { criadoEm: 'desc' },
            select: selectAvaliacao,
        });
        res.json(avaliacoes);
    }
    catch(erro){
        next(erro);
    }
}

// GET /avaliacoes/:id - busca uma avaliação pelo id
export async function buscarAvaliacao(req, res, next) {
    try{
        const { id } = req.params;
        if (!Number.isInteger(Number(id)) || Number(id)<=0) {
            return res.status(400).json({ erro: 'ID inválido' });
        }
        const avaliacao = await prisma.avaliacao.findUnique({
            where: { id: Number(id) },
            select: selectAvaliacao
        });
        if (!avaliacao) {
            return res.status(404).json({ erro: 'Avaliação não encontrada' });
        }
        res.json(avaliacao);
    }
    catch(erro){
        next(erro);
    }
}

// GET /avaliacoes/destaque - lista as avaliações em destaque
export async function listarAvaliacoesDestaques(req, res, next) {
    try{
        const avaliacoes = await prisma.avaliacao.findMany({
            where: { destaque: true },
            orderBy: { criadoEm: 'desc' },
            select: selectAvaliacao
        });
        res.json(avaliacoes);
    }
    catch(erro){
        next(erro);
    }
}

// POST /avaliacoes - cria uma nova avaliação
export async function criarAvaliacao(req, res, next) {
    try{
        const { descricao, quantEstrelas, midia, nomeCliente, fotoCliente, produtoId } = req.body;
        if (!descricao || quantEstrelas==null || !nomeCliente || produtoId==null){
            return res.status(400).json({ erro: "Faltam dados obrigatórios" });
        }
        if (!Number.isInteger(Number(produtoId)) || Number(produtoId)<=0) {
            return res.status(400).json({ erro: 'ID de produto inválido' });
        }
        if (!Number.isInteger(Number(quantEstrelas)) || Number(quantEstrelas) < 1 || Number(quantEstrelas) > 5) {
            return res.status(400).json({ erro: "Quantidade de estrelas inválida" });
        }
        const novaAvaliacao = await prisma.avaliacao.create({
            data: {
                descricao: descricao,
                quantEstrelas: Number(quantEstrelas),
                midia: midia,
                destaque: false,
                nomeCliente: nomeCliente,
                fotoCliente: fotoCliente,
                produtoId: Number(produtoId)
            },
            select: selectAvaliacao
        });
        res.status(201).json(novaAvaliacao);
    }
    catch(erro){
        if (erro.code === "P2003"){
            return res.status(404).json({ erro: 'Produto inexistente' });
        }
        next(erro);
    }
}

// PUT /avaliacoes/:id - atualiza uma avaliação pelo id
export async function atualizarAvaliacao(req, res, next) {
    try{
        const { id } = req.params;
        if (!Number.isInteger(Number(id)) || Number(id)<=0) {
            return res.status(400).json({ erro: 'ID inválido' });
        }
        const atual = await prisma.avaliacao.findUnique({
            where: { id: Number(id) },
            select: { destaque: true }
        });
        if (!atual) {
            return res.status(404).json({ erro: 'Avaliação não encontrada' });
        }
        const avaliacao = await prisma.avaliacao.update({
            where: { id: Number(id) },
            data: {
                destaque: !atual.destaque,
            },
            select: selectAvaliacao,
        });
        res.json(avaliacao);
    }
    catch(erro){
        if (erro.code === "P2025"){
            return res.status(404).json({ erro: 'Avaliação não encontrada' });
        }
        next(erro);
    }
}

// DELETE /avaliacoes/:id - deleta uma avaliação pelo id
export async function deletarAvaliacao(req, res, next) {
    try{
        const { id } = req.params;
        if (!Number.isInteger(Number(id)) || Number(id)<=0) {
            return res.status(400).json({ erro: 'ID inválido' });
        }
        await prisma.avaliacao.delete({
            where: { id: Number(id) },
        });
        res.status(204).end()
    }
    catch(erro){
        if (erro.code === "P2025"){
            return res.status(404).json({ erro: 'Avaliação não encontrada' });
        }
        next(erro);
    }
}