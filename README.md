README.md


# Xô Dengue

Um aplicativo web simples para registrar e visualizar focos do mosquito Aedes aegypti e receber lembretes de prevenção.

## Funcionalidades Principais

* Registro de focos com captura de localização, descrição, detalhes e categoria.
* Visualização dos focos registrados em lista e mapa interativo (Leaflet).
* Filtragem de focos por categoria e exibição de detalhes.
* Sistema de lembretes personalizáveis com local, frequência e hora, com notificações.
* Página com informações sobre a Dengue, Zika e Chikungunya.

## Tecnologias Utilizadas

* HTML
* CSS (`style.css` para estilos gerais, `foco.css` para estilos da página de focos)
* JavaScript (`script.js` para registro e lembretes, `foco.js` para visualização do mapa)
* Leaflet (para mapas interativos, carregado via CDN)
* localStorage (para armazenamento local dos dados)
* API de Notificações do navegador

## Estrutura de Arquivos

xodengue/
├── index.html        (Página de registro de focos e lembretes)
├── focos.html        (Página de visualização dos focos)
├── orientacoes.html  (Página de orientações sobre a Dengue)
├── script.js         (Lógica para index.html)
├── foco.js           (Lógica para focos.html)
├── style.css         (Estilos gerais)
└── foco.css          (Estilos específicos para focos.html)
└── README.md         (Este arquivo)
└── DOCUMENTACAO.md   (Documentação detalhada)

## Como Usar

1.  Clone ou baixe os arquivos do projeto.
2.  Abra os arquivos `.html` (por exemplo, `index.html`, `focos.html`, `orientacoes.html`) diretamente no seu navegador web.

## Notas

* Os dados dos focos e lembretes são armazenados localmente no navegador. A perda de dados pode ocorrer se o cache do navegador for limpo.
* A precisão da geolocalização depende do dispositivo e das permissões concedidas.
* As notificações de lembretes requerem a permissão do usuário no navegador.
* A funcionalidade de tirar fotos para o registro de focos não está implementada nesta versão.

## Próximos Passos (Sugestões)

* Implementar a funcionalidade de tirar e exibir fotos dos focos.
* Adicionar opções para editar e excluir focos e lembretes.
* Explorar a possibilidade de persistência de dados em um backend para sincronização entre dispositivos.
* Melhorar a interface do usuário e a experiência geral.
* Adicionar mais informações e recursos educativos sobre as doenças transmitidas pelo Aedes aegypti.

