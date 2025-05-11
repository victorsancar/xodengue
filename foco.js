// foco.js
// Este arquivo contém o código JavaScript para a página de exibição de focos registrados.
document.addEventListener('DOMContentLoaded', () => {
    const focosList = document.getElementById('focos-list');
    const nenhumFocoMensagem = document.getElementById('nenhum-foco');
    const mapaContainer = document.getElementById('mapa-container');
    const detalheFocoSection = document.getElementById('detalhe-foco'); // Obtenha a seção de detalhes
    const detalheDescricaoSpan = document.getElementById('detalhe-descricao'); // Obtenha os spans de detalhes
    const detalheDataSpan = document.getElementById('detalhe-data');
    const detalheCategoriaSpan = document.getElementById('detalhe-categoria');
    const detalheLatitudeSpan = document.getElementById('detalhe-latitude');
    const detalheLongitudeSpan = document.getElementById('detalhe-longitude');
    const detalheLocalizacaoDetalheSpan = document.getElementById('detalhe-detalhe-localizacao');

    const focosRegistrados = localStorage.getItem('focosRegistrados');
    const focos = focosRegistrados ? JSON.parse(focosRegistrados) : [];

    console.log('Focos carregados do localStorage:', focos); // Adicionado log

    if (focos.length > 0) {
        nenhumFocoMensagem.style.display = 'none';
        focos.forEach((foco, index) => {
            const listItem = document.createElement('li');
            const dataRegistroFormatada = new Date(foco.dataRegistro).toLocaleDateString();
            listItem.innerHTML = `<span>${foco.descricao}</span> <span class="data-registro">${dataRegistroFormatada}</span>`;
            listItem.dataset.id = index; // Adiciona o índice como data-id
            listItem.addEventListener('click', () => {
                console.log('Foco clicado:', foco); // Adicionado log
                exibirDetalheFoco(foco);
            });
            focosList.appendChild(listItem);

            if (foco.latitude && foco.longitude && mapaContainer) {
                const marcador = document.createElement('div');
                marcador.classList.add('marcador-foco');
                marcador.style.left = `${((parseFloat(foco.longitude) + 180) / 360) * mapaContainer.offsetWidth}px`;
                marcador.style.top = `${((90 - parseFloat(foco.latitude)) / 180) * mapaContainer.offsetHeight}px`;
                marcador.setAttribute('data-descricao', `${foco.descricao} (${dataRegistroFormatada})`);
                mapaContainer.appendChild(marcador);
            }
        });
    } else {
        nenhumFocoMensagem.style.display = 'block';
    }

    function exibirDetalheFoco(foco) {
        console.log('Exibindo detalhes para:', foco); // Adicionado log
        detalheDescricaoSpan.textContent = foco.descricao;
        detalheDataSpan.textContent = new Date(foco.dataRegistro).toLocaleString();
        detalheCategoriaSpan.textContent = foco.categoria || 'Não especificada'; // Exibe a categoria
        detalheLatitudeSpan.textContent = foco.latitude || 'Não disponível';
        detalheLongitudeSpan.textContent = foco.longitude || 'Não disponível';
        detalheLocalizacaoDetalheSpan.textContent = foco.detalheLocalizacao || 'Não disponível';
        detalheFocoSection.style.display = 'block';
    }
});