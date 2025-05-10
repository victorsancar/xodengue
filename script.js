document.addEventListener('DOMContentLoaded', () => {
    const obterLocalizacaoBotao = document.getElementById('obter-localizacao');
    const latitudeSpan = document.getElementById('latitude');
    const longitudeSpan = document.getElementById('longitude');
    const tirarFotoBotao = document.getElementById('tirar-foto');
    const inputFileFoto = document.getElementById('foto');
    const enviarFocoBotao = document.getElementById('enviar-foco');
    const descricaoInput = document.getElementById('descricao');
    const detalheLocalizacaoInput = document.getElementById('detalhe-localizacao');

    obterLocalizacaoBotao.addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (posicao) => {
                    latitudeSpan.textContent = posicao.coords.latitude.toFixed(6);
                    longitudeSpan.textContent = posicao.coords.longitude.toFixed(6);
                },
                (erro) => {
                    alert(`Erro ao obter a localização: ${erro.message}`);
                }
            );
        } else {
            alert('Seu navegador não suporta geolocalização.');
        }
    });

    tirarFotoBotao.addEventListener('click', () => {
        inputFileFoto.click();
    });

    inputFileFoto.addEventListener('change', (event) => {
        if (event.target.files && event.target.files[0]) {
            console.log('Foto selecionada:', event.target.files[0]);
        }
    });

    enviarFocoBotao.addEventListener('click', () => {
        const latitude = latitudeSpan.textContent;
        const longitude = longitudeSpan.textContent;
        const descricao = descricaoInput.value;
        const detalheLocalizacao = detalheLocalizacaoInput.value;
        const foto = inputFileFoto.files[0];

        const focoData = {
            latitude: latitude,
            longitude: longitude,
            descricao: descricao,
            detalheLocalizacao: detalheLocalizacao,
            dataRegistro: new Date().toISOString(),
            temFoto: !!foto
        };

        let focos = localStorage.getItem('focosRegistrados');
        focos = focos ? JSON.parse(focos) : [];
        focos.push(focoData);
        localStorage.setItem('focosRegistrados', JSON.stringify(focos));

        alert('Foco registrado localmente!');

        descricaoInput.value = '';
        detalheLocalizacaoInput.value = '';
        inputFileFoto.value = '';
        latitudeSpan.textContent = '';
        longitudeSpan.textContent = '';
    });
});