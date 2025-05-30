const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/api/rank', async (req, res) => {
  const q = req.query.q;
  if (!q) return res.status(400).json({ error: 'Missing query' });

  try {
    const response = await fetch(\`https://api.mercadolibre.com/sites/MLB/search?q=\${encodeURIComponent(q)}&limit=12\`);
    const json = await response.json();
    const produtos = json.results.map(produto => ({
      id: produto.id,
      title: produto.title,
      price: produto.price,
      permalink: produto.permalink,
      thumbnail: produto.thumbnail,
      sold_quantity: produto.sold_quantity || 0
    }));
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

app.listen(PORT, () => console.log("Rodando na porta " + PORT));