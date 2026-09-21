import prisma from '../prisma/client.js';


export const listarProdutos = async (req, res, next) => {
  try {
    const produtos = await prisma.produto.findMany();
    return res.status(200).json(produtos);
  } catch (error) {
    next(error); 
  }
};


export const obterProdutoPorId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const produto = await prisma.produto.findUnique({
      where: { id: Number(id) } // Altere para String(id) se seu ID no schema for UUID
    });

    if (!produto) {
      return res.status(404).json({ erro: 'Produto não encontrado.' });
    }

    return res.status(200).json(produto);
  } catch (error) {
    next(error);
  }
};


export const criarProduto = async (req, res, next) => {
  try {
    const { nome, descricao, preco, categoria } = req.body;

    
    if (!nome || preco === undefined) {
      return res.status(400).json({ erro: 'Campos "nome" e "preco" são obrigatórios.' });
    }

    const novoProduto = await prisma.produto.create({
      data: {
        nome,
        descricao,
        preco: Number(preco),
        categoria
      }
    });

    return res.status(201).json(novoProduto);
  } catch (error) {
    next(error);
  }
};


export const atualizarProduto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nome, descricao, preco, categoria } = req.body;

    
    const produtoExistente = await prisma.produto.findUnique({
      where: { id: Number(id) }
    });

    if (!produtoExistente) {
      return res.status(404).json({ erro: 'Produto não encontrado.' });
    }

    const produtoAtualizado = await prisma.produto.update({
      where: { id: Number(id) },
      data: {
        nome,
        descricao,
        preco: preco !== undefined ? Number(preco) : undefined,
        categoria
      }
    });

    return res.status(200).json(produtoAtualizado);
  } catch (error) {
    next(error);
  }
};


export const deletarProduto = async (req, res, next) => {
  try {
    const { id } = req.params;

    const produtoExistente = await prisma.produto.findUnique({
      where: { id: Number(id) }
    });

    if (!produtoExistente) {
      return res.status(404).json({ erro: 'Produto não encontrado.' });
    }

    await prisma.produto.delete({
      where: { id: Number(id) }
    });

    return res.status(204).send(); 
  } catch (error) {
    next(error);
  }
};