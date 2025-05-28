const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('🚀 RankML API está no ar!');
});

app.get('/top50', async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: 'Query obrigatória' });

  try {
    const results = Array.from({ length: 50 }).map((_, i) => ({
      posicao: i + 1,
      titulo: `${query} exemplo ${i + 1}`,
      preco: `R$ ${(Math.random() * 100).toFixed(2)}`,
      vendas: Math.floor(Math.random() * 500),
      tipo: i % 2 === 0 ? 'Premium' : 'Clássico',
      entrega: ['Full', 'Normal'][Math.floor(Math.random() * 2)],
      catalogo: Math.random() > 0.5 ? 'Sim' : 'Não',
      data: new Date(Date.now() - Math.random() * 1e10).toLocaleDateString('pt-BR'),
    }));
    res.json({ resultado: results });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar dados' });
  }
});

app.get('/posicao', async (req, res) => {
  const { query, anuncio } = req.query;
  if (!query || !anuncio) return res.status(400).json({ error: 'Parâmetros obrigatórios: query e anuncio' });

  const mockList = Array.from({ length: 100 }).map((_, i) => ({
    id: `MLB-${1000 + i}`,
    titulo: `Produto ${i + 1} relacionado a ${query}`,
  }));

  const index = mockList.findIndex(item => anuncio.includes(item.id));
  if (index >= 0) {
    res.json({ posicao: index + 1 });
  } else {
    res.json({ posicao: -1 });
  }
});

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});