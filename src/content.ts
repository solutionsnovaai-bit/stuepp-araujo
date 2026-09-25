export type Swatch = { name: string; hex: string; use: string }

export const baseColors: Swatch[] = [
  { name: 'Algodão', hex: '#EDE8E1', use: 'Fundo da versão dia, papelaria e documentos.' },
  { name: 'Linho', hex: '#D5CEC6', use: 'Sombras do papel, bordas e divisórias no dia.' },
  { name: 'Carvão', hex: '#1C1917', use: 'Texto na versão dia e superfícies da noite.' },
  { name: 'Ônix', hex: '#0E0D0C', use: 'Fundo da versão noite, placa e redes sociais.' },
]

export const goldRamp: Swatch[] = [
  { name: 'Bronze profundo', hex: '#6C4316', use: 'Sombra do metal.' },
  { name: 'Bronze', hex: '#936428', use: 'Meio-tom escuro do foil.' },
  { name: 'Ouro', hex: '#AA7A35', use: 'Cor principal da marca.' },
  { name: 'Ouro claro', hex: '#C09146', use: 'Ouro sobre fundos escuros.' },
  { name: 'Champanhe', hex: '#E1B866', use: 'Luz refletida no foil.' },
  { name: 'Brilho', hex: '#F4D484', use: 'Só nas quinas que pegam luz.' },
]

export const foilGradient = 'linear-gradient(115deg, #6C4316 0%, #936428 18%, #AA7A35 38%, #C09146 58%, #E1B866 80%, #F4D484 100%)'

export const proportions = {
  dia: [
    { name: 'Algodão', hex: '#EDE8E1', share: 70 },
    { name: 'Carvão', hex: '#1C1917', share: 20 },
    { name: 'Ouro', hex: '#AA7A35', share: 10 },
  ],
  noite: [
    { name: 'Ônix', hex: '#0E0D0C', share: 70 },
    { name: 'Algodão', hex: '#EDE8E1', share: 20 },
    { name: 'Ouro', hex: '#C09146', share: 10 },
  ],
}

export const stationery = [
  { image: 'timbrado', title: 'Papel timbrado', text: 'Papel algodão com a assinatura em hot stamping ouro no topo. O texto corre em Carvão, com margens largas.', spec: 'Algodão 120 g  |  Hot stamping ouro' },
  { image: 'cartoes', title: 'Cartões de visita', text: 'Frente com a assinatura completa, verso só com o monograma. A borda pintada em ouro aparece quando o cartão sai da carteira.', spec: 'Algodão 600 g  |  Borda pintada' },
  { image: 'lacre', title: 'Lacre e anel de sinete', text: 'Cera dourada com o monograma, para as correspondências que pedem cerimônia.', spec: 'Cera dourada  |  Sinete gravado' },
  { image: 'placa', title: 'Placa de fachada', text: 'Latão escovado com a assinatura gravada, fixado em pedra. É a primeira coisa que o cliente vê.', spec: 'Latão escovado  |  Gravação em baixo-relevo' },
  { image: 'pasta', title: 'Pasta de couro', text: 'Costura aparente e o monograma no canto, discreto. Leva o processo para a audiência.', spec: 'Couro legítimo  |  Hot stamping ouro' },
  { image: 'relevo', title: 'Relevo seco', text: 'O monograma em alto-relevo, sem tinta, na capa de contratos e procurações.', spec: 'Algodão 300 g  |  Relevo seco' },
]

export type Area = 'Trabalhista' | 'Previdenciário' | 'Cível' | 'Institucional'
export const areas: Area[] = ['Trabalhista', 'Previdenciário', 'Cível', 'Institucional']

export const photos: { image: string; area: Area; caption: string; alt: string }[] = [
  { image: 'ctps', area: 'Trabalhista', caption: 'Uma vida inteira de trabalho cabe em uma carteira.', alt: 'Carteira de trabalho antiga sobre bancada de madeira, ao lado de luvas de couro' },
  { image: 'capacete', area: 'Trabalhista', caption: 'As mãos que construíram merecem ser ouvidas.', alt: 'Mãos calejadas de um trabalhador segurando um capacete de obra' },
  { image: 'demissao', area: 'Trabalhista', caption: 'O dia em que tudo muda.', alt: 'Mulher de costas saindo de um prédio comercial com uma caixa nas mãos, ao entardecer' },
  { image: 'maos', area: 'Previdenciário', caption: 'Tempo de contribuição tem rosto.', alt: 'Mãos de uma pessoa idosa repousando sobre uma pasta de documentos' },
  { image: 'cafe', area: 'Previdenciário', caption: 'O que vem depois também é direito.', alt: 'Mãos de um casal idoso sobre a mesa da cozinha, com duas xícaras de café' },
  { image: 'caneta', area: 'Cível', caption: 'Toda assinatura tem consequência.', alt: 'Caneta tinteiro terminando uma assinatura em papel algodão' },
  { image: 'acordo', area: 'Cível', caption: 'Um bom acordo começa com confiança.', alt: 'Aperto de mão entre duas pessoas' },
  { image: 'justica', area: 'Institucional', caption: 'A Justiça, de Alfredo Ceschiatti, diante do STF.', alt: 'Escultura A Justiça em frente ao Supremo Tribunal Federal, em Brasília, ao anoitecer' },
]

export const principles = [
  { title: 'Luz de janela', text: 'Quente, lateral e com sombra desenhada. Nada de flash, nada de branco estourado.' },
  { title: 'Crop fechado', text: 'Mãos, objetos e gestos. As pessoas aparecem sem rosto reconhecível.' },
  { title: 'Objetos com história', text: 'A carteira gasta, a caneta, a pasta. Coisas que carregam um direito.' },
  { title: 'Brasil real', text: 'Cenas daqui, sem banco de imagem genérico e sem ostentação.' },
]

export const words = ['Tradição', 'Precisão', 'Discrição', 'Presença', 'Confiança', 'Permanência']
