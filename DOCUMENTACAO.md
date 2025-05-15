# Documentação Detalhada do Aplicativo Xô Dengue

## 1. Introdução

O aplicativo "Xô Dengue" visa capacitar os cidadãos a contribuir ativamente na identificação e prevenção de focos do mosquito Aedes aegypti, vetor de doenças como Dengue, Zika e Chikungunya. Através de funcionalidades intuitivas, o aplicativo permite o registro de focos, a visualização da sua distribuição em um mapa e o agendamento de lembretes para ações preventivas, além de oferecer informações relevantes sobre as doenças.

## 2. Funcionalidades Detalhadas

### 2.1. Registro de Focos (Página `index.html` e arquivo `script.js`)

* **Captura de Localização:** Ao clicar no botão "Obter Localização", o aplicativo utiliza a API de geolocalização do navegador para obter a latitude e longitude precisas do usuário (com a devida permissão). Essas coordenadas são exibidas na tela.
* **Descrição do Foco:** Um campo de texto permite ao usuário descrever o local ou a natureza do foco encontrado (ex: "Pneu abandonado no quintal", "Vaso de planta com água parada").
* **Detalhe da Localização:** Um campo adicional para fornecer detalhes mais específicos sobre a localização do foco (ex: "No canto da garagem, próximo ao muro").
* **Categoria do Foco:** Uma lista suspensa permite ao usuário classificar o tipo de foco (ex: Pneu, Vaso de Planta, Lixo Acumulado, Calha Entupida, Outro - com campo para especificação).
* **(Não Implementado)** **Foto do Foco:** Um botão para tirar uma foto usando a câmera do dispositivo ou selecionar uma imagem da galeria. Esta funcionalidade está planejada para futuras versões.
* **Registro:** Ao clicar no botão "Registrar Foco", os dados coletados (latitude, longitude, descrição, detalhe, categoria e, futuramente, foto) são armazenados localmente no navegador do usuário utilizando a API `localStorage` sob a chave `focosRegistrados` em formato JSON.

### 2.2. Visualização de Focos Registrados (Página `focos.html` e arquivo `foco.js`)

* **Lista de Focos:** Os focos registrados no `localStorage` são exibidos em uma lista textual, mostrando uma breve descrição e a data de registro. Cada item da lista é clicável para exibir detalhes adicionais na seção "#detalhe-foco".
* **Mapa Interativo:** Um mapa é renderizado utilizando a biblioteca Leaflet, com tiles do OpenStreetMap. Os focos registrados são exibidos como marcadores vermelhos no mapa, posicionados de acordo com suas coordenadas de latitude e longitude.
* **Popups nos Marcadores:** Ao clicar em um marcador no mapa, um popup exibe informações básicas sobre o foco (categoria, descrição e detalhe da localização).
* **Centralização do Mapa:** Inicialmente, o mapa tenta centralizar na área onde os focos foram registrados, calculando a latitude e longitude médias. Se não houver focos, ele é centralizado em uma localização padrão (São Paulo).
* **Controles de Zoom:** O mapa inclui controles de zoom padrão do Leaflet (+ e -).
* **Filtragem por Categoria:** Uma lista suspensa permite ao usuário filtrar os focos exibidos na lista e no mapa por categoria.
* **Botão "Compartilhar Dados":** Ao clicar, exibe um `alert` com os dados dos focos registrados em formato JSON, permitindo ao usuário copiar e compartilhar essas informações.
* **Botão "Registrar Novo Foco":** Redireciona o usuário de volta para a página `index.html` para registrar um novo foco.

### 2.3. Lembretes de Prevenção (Página `index.html` e arquivo `script.js`)

* **Adicionar Lembrete:** Uma seção permite ao usuário configurar um novo lembrete, especificando um local (ex: "Quintal", "Varanda"), frequência (Diário ou Semanal) e hora do dia.
* **Armazenamento de Lembretes:** Os lembretes configurados são armazenados localmente no `localStorage` sob a chave `lembretes` em formato JSON.
* **Exibição de Lembretes:** Uma lista exibe os lembretes agendados, mostrando o local, frequência e hora.
* **Remover Lembrete:** Cada item da lista de lembretes possui um botão "Remover" que permite ao usuário excluir um lembrete específico do `localStorage`.
* **Agendamento de Notificações:** O script verifica a cada minuto se algum lembrete corresponde à hora atual e ao dia da semana (para lembretes semanais). Se houver uma correspondência e a permissão de notificação tiver sido concedida, uma notificação é exibida ao usuário.

### 2.4. Página de Orientações (Página `orientacoes.html`)

* Esta página contém informações textuais sobre a Dengue, Zika e Chikungunya. As informações são estruturadas em seções (Ciclo de Vida do Mosquito, Sintomas, Prevenção) para facilitar a leitura e o entendimento. O conteúdo é estático e definido diretamente no arquivo HTML.

## 3. Estrutura de Arquivos e Tecnologias

(Detalhes já fornecidos no arquivo `README.md`)

## 4. Fluxo de Dados

1.  **Registro de Focos:** Dados inseridos pelo usuário na página `index.html` são convertidos para um objeto JavaScript e armazenados como uma string JSON no `localStorage` sob a chave `focosRegistrados`.
2.  **Visualização de Focos:** Ao carregar a página `focos.html`, o script `foco.js` lê os dados JSON da chave `focosRegistrados` do `localStorage`, converte-os de volta para objetos JavaScript e os utiliza para exibir a lista de focos e os marcadores no mapa.
3.  **Lembretes:** Dados dos lembretes inseridos na página `index.html` são armazenados como JSON no `localStorage` sob a chave `lembretes`. O script `script.js` lê esses dados para exibir a lista de lembretes e para agendar as notificações.
4.  **Comunicação com Leaflet:** O script `foco.js` interage com a biblioteca Leaflet para criar e manipular o mapa, adicionando tiles e marcadores com base nos dados dos focos.
5.  **Notificações:** O script `script.js` utiliza a API de Notificações do navegador para exibir alertas visuais ao usuário nos horários agendados para os lembretes.

## 5. Considerações de Desenvolvimento

* **Armazenamento Local:** A limitação do `localStorage` é que os dados são específicos para o navegador e dispositivo do usuário. Para sincronização entre dispositivos ou compartilhamento de dados com outros usuários, seria necessário implementar um backend com um banco de dados.
* **Permissões:** O uso de geolocalização e notificações requer a permissão explícita do usuário. O aplicativo deve lidar bem com casos em que a permissão é negada.
* **Interface do Usuário:** A interface atual é básica e pode ser aprimorada para uma melhor experiência do usuário.
* **Testes:** Testes em diferentes navegadores e dispositivos são importantes para garantir a compatibilidade e o funcionamento correto do aplicativo.

## 6. Próximos Passos (Expansão do Aplicativo)

(Detalhes já fornecidos no arquivo `README.md`)