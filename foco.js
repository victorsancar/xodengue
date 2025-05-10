// document.addEventListener('DOMContentLoaded', () => {
//     const focosList = document.getElementById('focos-list');
//     const nenhumFocoMensagem = document.getElementById('nenhum-foco');
//     const mapaContainer = document.getElementById('mapa-container');

//     const focosRegistrados = localStorage.getItem('focosRegistrados');
//     const focos = focosRegistrados ? JSON.parse(focos) : [];

//     if (focos.length > 0) {
//         nenhumFocoMensagem.style.display = 'none';
//         focos.forEach(foco => {
//             const listItem = document.createElement('li');
//             const dataRegistroFormatada = new Date(foco.dataRegistro).toLocaleDateString();
//             listItem.innerHTML = `<span>${foco.descricao}</span> <span class="data-registro">${dataRegistroFormatada}</span>`;
//             focosList.appendChild(listItem);

//             if (foco.latitude && foco.longitude && mapaContainer) {
//                 const marcador = document.createElement('div');
//                 marcador.classList.add('marcador-foco');
//                 marcador.style.left = `${((parseFloat(foco.longitude) + 180) / 360) * mapaContainer.offsetWidth}px`;
//                 marcador.style.top = `${((90 - parseFloat(foco.latitude)) / 180) * mapaContainer.offsetHeight}px`;
//                 marcador.setAttribute('data-descricao', `${foco.descricao} (${dataRegistroFormatada})`);
//                 mapaContainer.appendChild(marcador);
//             }
//         });
//     } else {
//         nenhumFocoMensagem.style.display = 'block';
//     }
// });


document.addEventListener('DOMContentLoaded', () => {
    const focosList = document.getElementById('focos-list');
    const nenhumFocoMensagem = document.getElementById('nenhum-foco');
    const mapaContainer = document.getElementById('mapa-container');

    const focosRegistrados = localStorage.getItem('focosRegistrados');
    const focos = focosRegistrados ? JSON.parse(focosRegistrados) : [];

    if (focos.length > 0) {
        nenhumFocoMensagem.style.display = 'none';
        focos.forEach(foco => {
            const listItem = document.createElement('li');
            const dataRegistroFormatada = new Date(foco.dataRegistro).toLocaleDateString();
            listItem.innerHTML = `<span>${foco.descricao}</span> <span class="data-registro">${dataRegistroFormatada}</span>`;
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
});