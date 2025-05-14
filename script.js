document.addEventListener('DOMContentLoaded', () => {
    // Elementos para registrar foco
    const obterLocalizacaoBotao = document.getElementById('obter-localizacao');
    const latitudeSpan = document.getElementById('latitude');
    const longitudeSpan = document.getElementById('longitude');
    const tirarFotoBotao = document.getElementById('tirar-foto');
    const inputFileFoto = document.getElementById('foto');
    const enviarFocoBotao = document.getElementById('enviar-foco');
    const descricaoInput = document.getElementById('descricao');
    const detalheLocalizacaoInput = document.getElementById('detalhe-localizacao');
    const categoriaSelect = document.getElementById('categoria');
    const descricaoContainer = document.getElementById('descricao-container');

    // Elementos para lembretes
    const localLembreteInput = document.getElementById('local-lembrete');
    const frequenciaLembreteSelect = document.getElementById('frequencia-lembrete');
    const horaLembreteInput = document.getElementById('hora-lembrete');
    const adicionarLembreteBotao = document.getElementById('adicionar-lembrete');
    const listaLembretesUl = document.getElementById('lista-lembretes');

    let lembretes = localStorage.getItem('lembretes');
    lembretes = lembretes ? JSON.parse(lembretes) : [];
    exibirLembretes();
    agendarLembretes();

    categoriaSelect.addEventListener('change', () => {
        descricaoContainer.style.display = categoriaSelect.value === 'outro' ? 'block' : 'none';
    });

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
        const categoria = categoriaSelect.value;

        const focoData = {
            latitude: latitude,
            longitude: longitude,
            descricao: descricao,
            detalheLocalizacao: detalheLocalizacao,
            dataRegistro: new Date().toISOString(),
            temFoto: !!foto,
            categoria: categoria
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
        categoriaSelect.value = '';
        descricaoContainer.style.display = 'none';
    });

    adicionarLembreteBotao.addEventListener('click', () => {
        const local = localLembreteInput.value.trim();
        const frequencia = frequenciaLembreteSelect.value;
        const hora = horaLembreteInput.value;

        if (local && hora) {
            const novoLembrete = {
                local: local,
                frequencia: frequencia,
                hora: hora
            };
            lembretes.push(novoLembrete);
            localStorage.setItem('lembretes', JSON.stringify(lembretes));
            exibirLembretes();
            localLembreteInput.value = '';
            horaLembreteInput.value = '';
        } else {
            alert('Por favor, preencha o local e a hora do lembrete.');
        }
    });

    function exibirLembretes() {
        listaLembretesUl.innerHTML = '';
        lembretes.forEach((lembrete, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<span>Verificar <strong>${lembrete.local}</strong> (${lembrete.frequencia}, às ${lembrete.hora})</span> <button class="remover-lembrete" data-id="${index}">Remover</button>`;
            listaLembretesUl.appendChild(listItem);
        });

        const botoesRemover = document.querySelectorAll('.remover-lembrete');
        botoesRemover.forEach(botao => {
            botao.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                lembretes.splice(id, 1);
                localStorage.setItem('lembretes', JSON.stringify(lembretes));
                exibirLembretes();
            });
        });
    }

    function agendarLembretes() {
        setInterval(() => {
            const now = new Date();
            const horaAtual = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
            const diaSemana = now.getDay();

            lembretes.forEach(lembrete => {
                if (lembrete.hora === horaAtual) {
                    if (lembrete.frequencia === 'diario' || (lembrete.frequencia === 'semanal' && diaSemana === now.getDay())) {
                        if (Notification.permission === 'granted') {
                            new Notification('Xô Dengue!', {
                                body: `Lembrete para verificar: ${lembrete.local}`,
                                icon: 'icone-notificacao.png'
                            });
                        } else if (Notification.permission !== 'denied') {
                            Notification.requestPermission().then(permission => {
                                if (permission === 'granted') {
                                    new Notification('Xô Dengue!', {
                                        body: `Lembrete para verificar: ${lembrete.local}`,
                                        icon: 'icone-notificacao.png'
                                    });
                                }
                            });
                        }
                    }
                }
            });
        }, 60000);
    }

    agendarLembretes();
});