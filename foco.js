// foco.js
// Este arquivo contém o código JavaScript para a página de exibição de focos registrados usando Leaflet.
document.addEventListener('DOMContentLoaded', () => {
    const focosList = document.getElementById('focos-list');
    const nenhumFocoMensagem = document.getElementById('nenhum-foco');
    const mapaContainer = document.getElementById('mapa-container');

    let meuMapa;
    let focosRegistrados = localStorage.getItem('focosRegistrados');
    let focos = focosRegistrados ? JSON.parse(focosRegistrados) : [];

   function inicializarMapa() {
    if (mapaContainer) {
        meuMapa = L.map('mapa-container', {
            minZoom: 5,
            maxZoom: 18,
            zoomControl: true,
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
            iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(meuMapa);

        let latitudes = [];
        let longitudes = [];

        focos.forEach(foco => {
            if (foco.latitude && foco.longitude) {
                latitudes.push(parseFloat(foco.latitude));
                longitudes.push(parseFloat(foco.longitude));
                L.marker([parseFloat(foco.latitude), parseFloat(foco.longitude)])
                    .addTo(meuMapa)
                    .bindPopup(`<strong>Foco Registrado</strong><br>Categoria: ${foco.categoria || 'Não especificada'}${foco.descricao ? `<br>Descrição: ${foco.descricao}` : ''}${foco.detalheLocalizacao ? `<br>Detalhe: ${foco.detalheLocalizacao}` : ''}`);
            }
        });

        if (latitudes.length > 0) {
            const latMedia = latitudes.reduce((sum, lat) => sum + lat, 0) / latitudes.length;
            const lonMedia = longitudes.reduce((sum, lon) => sum + lon, 0) / longitudes.length;
            meuMapa.setView([latMedia, lonMedia], 13); // Nível de zoom inicial, ajuste conforme necessário
        } else {
            meuMapa.setView([-23.5505, -46.6333], 10); // Define um centro padrão se não houver focos
        }

        meuMapa.invalidateSize();
    } else {
        console.error('Container do mapa não encontrado.');
    }
}

// Remove o setTimeout, pois agora centralizamos dinamicamente
inicializarMapa();

    // Adiciona um pequeno atraso antes de inicializar o mapa
    setTimeout(inicializarMapa, 100); // 100 milissegundos de atraso

    function exibirFocosNoMapa(listaDeFocos) {
        if (meuMapa) {
            meuMapa.eachLayer(layer => {
                if (layer instanceof L.Marker) {
                    meuMapa.removeLayer(layer);
                }
            });
            listaDeFocos.forEach(foco => {
                if (foco.latitude && foco.longitude) {
                    L.marker([parseFloat(foco.latitude), parseFloat(foco.longitude)])
                        .addTo(meuMapa)
                        .bindPopup(`<strong>Foco Registrado</strong><br>Categoria: ${foco.categoria || 'Não especificada'}${foco.descricao ? `<br>Descrição: ${foco.descricao}` : ''}${foco.detalheLocalizacao ? `<br>Detalhe: ${foco.detalheLocalizacao}` : ''}`);
                }
            });
        }
    }

    function exibirFocosNaLista(listaDeFocos) {
        focosList.innerHTML = '';
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
            });
        } else {
            nenhumFocoMensagem.style.display = 'block';
        }
    }

    exibirFocosNaLista(focos); // Exibe a lista de focos inicialmente

    const filtroCategoriaSelect = document.getElementById('filtro-categoria');
    filtroCategoriaSelect.addEventListener('change', () => {
        const categoriaSelecionada = filtroCategoriaSelect.value;
        const focosFiltrados = focos.filter(foco => {
            return categoriaSelecionada === '' || foco.categoria === categoriaSelecionada;
        });
        exibirFocosNoMapa(focosFiltrados);
        exibirFocosNaLista(focosFiltrados);
    });

    const compartilharDadosBotao = document.getElementById('compartilhar-dados');
    compartilharDadosBotao.addEventListener('click', () => {
        const dadosParaCompartilhar = localStorage.getItem('focosRegistrados');
        alert('Dados dos focos registrados:\n\n' + dadosParaCompartilhar);
    });

    function exibirDetalheFoco(foco) {
        const detalheDescricaoSpan = document.getElementById('detalhe-descricao');
        const detalheDataSpan = document.getElementById('detalhe-data');
        const detalheCategoriaSpan = document.getElementById('detalhe-categoria');
        const detalheLatitudeSpan = document.getElementById('detalhe-latitude');
        const detalheLongitudeSpan = document.getElementById('detalhe-longitude');
        const detalheLocalizacaoDetalheSpan = document.getElementById('detalhe-detalhe-localizacao');

        detalheDescricaoSpan.textContent = foco.descricao;
        detalheDataSpan.textContent = new Date(foco.dataRegistro).toLocaleString();
        detalheCategoriaSpan.textContent = foco.categoria || 'Não especificada';
        detalheLatitudeSpan.textContent = foco.latitude || 'Não disponível';
        detalheLongitudeSpan.textContent = foco.longitude || 'Não disponível';
        detalheLocalizacaoDetalheSpan.textContent = foco.detalheLocalizacao || 'Não disponível';
        const detalheFocoSection = document.getElementById('detalhe-foco');
        if (detalheFocoSection) {
            detalheFocoSection.style.display = 'block';
        }
    }
});

