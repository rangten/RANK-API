async function buscarDados() {
  const query = document.getElementById('search-input').value;
  const erro = document.getElementById('erro');
  const resultados = document.getElementById('resultados');
  resultados.innerHTML = '';
  erro.classList.add('hidden');

  try {
    const res = await fetch('https://rank-api-d1on.onrender.com/api/rank?q=' + encodeURIComponent(query));
    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      erro.textContent = "Nenhum resultado encontrado.";
      erro.classList.remove('hidden');
      return;
    }

    data.forEach(produto => {
      const card = document.createElement('div');
      card.className = 'bg-white shadow p-4 rounded';
      card.innerHTML = `
        <img src="${produto.thumbnail}" alt="${produto.title}" class="w-full h-40 object-contain mb-2">
        <h2 class="text-md font-semibold">${produto.title}</h2>
        <p class="text-sm text-gray-600">Vendas: ${produto.sold_quantity || 0}</p>
        <p class="text-sm text-gray-600">Preço: R$ ${(produto.price || 0).toFixed(2)}</p>
        <a href="${produto.permalink}" target="_blank" class="text-blue-600 text-sm mt-2 inline-block">Ver anúncio</a>
      `;
      resultados.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    erro.textContent = "Erro ao buscar dados.";
    erro.classList.remove('hidden');
  }
}