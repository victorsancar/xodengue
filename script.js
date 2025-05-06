document.addEventListener('DOMContentLoaded', () => {
    const obterLocalizacaoBotao = document.getElementById('obter-localizacao');
    const latitudeSpan = document.getElementById('latitude');
    const longitudeSpan = document.getElementById('longitude');

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

    const tirarFotoBotao = document.getElementById('tirar-foto');
    const inputFileFoto = document.getElementById('foto');

    tirarFotoBotao.addEventListener('click', () => {
        inputFileFoto.click(); // Simula o clique no input de arquivo
    });

    inputFileFoto.addEventListener('change', (event) => {
        if (event.target.files && event.target.files[0]) {
            console.log('Foto selecionada:', event.target.files[0]);
            // Aqui você poderia adicionar lógica para exibir uma prévia da imagem, se desejar.
        }
    });

    const enviarFocoBotao = document.getElementById('enviar-foco');
    const descricaoInput = document.getElementById('descricao');
    const detalheLocalizacaoInput = document.getElementById('detalhe-localizacao');

    enviarFocoBotao.addEventListener('click', () => {
        const latitude = latitudeSpan.textContent;
        const longitude = longitudeSpan.textContent;
        const descricao = descricaoInput.value;
        const detalheLocalizacao = detalheLocalizacaoInput.value;
        const foto = inputFileFoto.files[0];

        console.log('Dados do Foco:');
        console.log('Latitude:', latitude);
        console.log('Longitude:', longitude);
        console.log('Descrição:', descricao);
        console.log('Detalhe da Localização:', detalheLocalizacao);
        console.log('Foto:', foto);

        alert('Foco registrado (dados simulados no console)!');

        // Aqui, em um aplicativo real, você enviaria esses dados para um servidor.
        // Como estamos focando no front-end e no seu aprendizado de React,
        // por enquanto, apenas exibimos os dados no console e um alerta.

        // Opcionalmente, podemos limpar os campos após o "envio".
        descricaoInput.value = '';
        detalheLocalizacaoInput.value = '';
        inputFileFoto.value = ''; // Limpa o arquivo selecionado
        latitudeSpan.textContent = '';
        longitudeSpan.textContent = '';
    });
});