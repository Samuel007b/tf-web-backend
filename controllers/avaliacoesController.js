import prisma from '../prisma/client.js';

export async function listarAvaliacoes(req, res, next) {
  try {
      const avaliacoes = await prisma.avaliacao.findMany({
            include: { produto: { select: { id: true, nome: true } } },
                  orderBy: { criadoEm: 'desc' },
                      });

                          return res.status(200).json(avaliacoes);
                            } catch (erro) {
                                next(erro);
                                  }
                                  }

                                  export async function buscarAvaliacaoPorId(req, res, next) {
                                    try {
                                        const id = Number(req.params.id);

                                            const avaliacao = await prisma.avaliacao.findUnique({
                                                  where: { id },
                                                        include: { produto: { select: { id: true, nome: true } } },
                                                            });

                                                                if (!avaliacao) {
                                                                      return res.status(404).json({ erro: 'Avaliação não encontrada' });
                                                                          }

                                                                              return res.status(200).json(avaliacao);
                                                                                } catch (erro) {
                                                                                    next(erro);
                                                                                      }
                                                                                      }

                                                                                      export async function criarAvaliacao(req, res, next) {
                                                                                        try {
                                                                                            const { descricao, quantEstrelas, midia, destaque, nomeCliente, fotoCliente, produtoId } = req.body;

                                                                                                if (!descricao || quantEstrelas === undefined || !nomeCliente || !produtoId) {
                                                                                                      return res.status(400).json({ erro: 'Campos obrigatórios: descricao, quantEstrelas, nomeCliente, produtoId' });
                                                                                                          }

                                                                                                              const avaliacao = await prisma.avaliacao.create({
                                                                                                                    data: {
                                                                                                                            descricao,
                                                                                                                                    quantEstrelas,
                                                                                                                                            midia,
                                                                                                                                                    destaque: destaque ?? false,
                                                                                                                                                            nomeCliente,
                                                                                                                                                                    fotoCliente,
                                                                                                                                                                            produtoId,
                                                                                                                                                                                  },
                                                                                                                                                                                      });

                                                                                                                                                                                          return res.status(201).json(avaliacao);
                                                                                                                                                                                            } catch (erro) {
                                                                                                                                                                                                next(erro);
                                                                                                                                                                                                  }
                                                                                                                                                                                                  }

                                                                                                                                                                                                  export async function atualizarAvaliacao(req, res, next) {
                                                                                                                                                                                                    try {
                                                                                                                                                                                                        const id = Number(req.params.id);
                                                                                                                                                                                                            const { descricao, quantEstrelas, midia, destaque, nomeCliente, fotoCliente, produtoId } = req.body;

                                                                                                                                                                                                                const avaliacaoExistente = await prisma.avaliacao.findUnique({ where: { id } });
                                                                                                                                                                                                                    if (!avaliacaoExistente) {
                                                                                                                                                                                                                          return res.status(404).json({ erro: 'Avaliação não encontrada' });
                                                                                                                                                                                                                              }

                                                                                                                                                                                                                                  const avaliacao = await prisma.avaliacao.update({
                                                                                                                                                                                                                                        where: { id },
                                                                                                                                                                                                                                              data: { descricao, quantEstrelas, midia, destaque, nomeCliente, fotoCliente, produtoId },
                                                                                                                                                                                                                                                  });

                                                                                                                                                                                                                                                      return res.status(200).json(avaliacao);
                                                                                                                                                                                                                                                        } catch (erro) {
                                                                                                                                                                                                                                                            next(erro);
                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                              }

                                                                                                                                                                                                                                                              export async function deletarAvaliacao(req, res, next) {
                                                                                                                                                                                                                                                                try {
                                                                                                                                                                                                                                                                    const id = Number(req.params.id);

                                                                                                                                                                                                                                                                        const avaliacaoExistente = await prisma.avaliacao.findUnique({ where: { id } });
                                                                                                                                                                                                                                                                            if (!avaliacaoExistente)