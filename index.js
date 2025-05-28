
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('🚀 RankML API está no ar!');
});

app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});
