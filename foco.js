// foco.js
// Este arquivo contém o código JavaScript para a página de exibição de focos registrados.
document.addEventListener('DOMContentLoaded', () => {
    const focosList = document.getElementById('focos-list');
    const nenhumFocoMensagem = document.getElementById('nenhum-foco');
    const mapaContainer = document.getElementById('mapa-container');
    const detalheFocoSection = document.getElementById('detalhe-foco');
    const detalheDescricaoSpan = document.getElementById('detalhe-descricao');
    const detalheDataSpan = document.getElementById('detalhe-data');
    const detalheCategoriaSpan = document.getElementById('detalhe-categoria');
    const detalheLatitudeSpan = document.getElementById('detalhe-latitude');
    const detalheLongitudeSpan = document.getElementById('detalhe-longitude');
    const detalheLocalizacaoDetalheSpan = document.getElementById('detalhe-detalhe-localizacao');
    const filtroCategoriaSelect = document.getElementById('filtro-categoria'); // Obtenha o select de filtro
    const compartilharDadosBotao = document.getElementById('compartilhar-dados'); // Obtenha o botão de compartilhar

    let focosRegistrados = localStorage.getItem('focosRegistrados');
    let focos = focosRegistrados ? JSON.parse(focosRegistrados) : [];
    exibirFocos(focos); // Exibe todos os focos inicialmente

    filtroCategoriaSelect.addEventListener('change', () => {
        const categoriaSelecionada = filtroCategoriaSelect.value;
        const focosFiltrados = focos.filter(foco => {
            return categoriaSelecionada === '' || foco.categoria === categoriaSelecionada;
        });
        exibirFocos(focosFiltrados); // Exibe os focos filtrados
    });

    compartilharDadosBotao.addEventListener('click', () => {
        const dadosParaCompartilhar = localStorage.getItem('focosRegistrados');
        alert('Dados dos focos registrados:\n\n' + dadosParaCompartilhar);
        // No mundo real, aqui você enviaria esses dados para um servidor.
    });

    function exibirFocos(listaDeFocos) {
        focosList.innerHTML = '';
        mapaContainer.innerHTML = '<img src="img/mapasaopaulo.jpg" alt="Mapa de São Paulo" style="width: 100%; border: 1px solid #ccc; border-radius: 8px;">'; // Limpa os marcadores antigos
        if (listaDeFocos.length > 0) {
            nenhumFocoMensagem.style.display = 'none';
            listaDeFocos.forEach((foco, index) => {
                const listItem = document.createElement('li');
                const dataRegistroFormatada = new Date(foco.dataRegistro).toLocaleDateString();
                listItem.innerHTML = `<span>${foco.descricao}</span> <span class="data-registro">${dataRegistroFormatada}</span>`;
                listItem.dataset.id = index;
                listItem.addEventListener('click', () => {
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
    }

    function exibirDetalheFoco(foco) {
        detalheDescricaoSpan.textContent = foco.descricao;
        detalheDataSpan.textContent = new Date(foco.dataRegistro).toLocaleString();
        detalheCategoriaSpan.textContent = foco.categoria || 'Não especificada';
        detalheLatitudeSpan.textContent = foco.latitude || 'Não disponível';
        detalheLongitudeSpan.textContent = foco.longitude || 'Não disponível';
        detalheLocalizacaoDetalheSpan.textContent = foco.detalheLocalizacao || 'Não disponível';
        detalheFocoSection.style.display = 'block';
    }
});