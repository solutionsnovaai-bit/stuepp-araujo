# Stuepp & Araújo Advocacia — Manual de identidade visual

Apresentação editorial da nova identidade, com versão dia e versão noite. Mesma base do projeto Rezende: React 19, TypeScript, Vite, Tailwind 4, Motion e Lenis, com fontes locais e imagens em WebP.

## Rodar

Requisito: Node.js 22 ou superior.

```bash
npm ci
npm run dev      # http://localhost:4173
npm run build    # gera a pasta dist/
```

## Publicar na Vercel

Suba a pasta no GitHub e importe na Vercel. Framework: Vite. Build: `npm run build`. Saída: `dist`. O `vercel.json` já deixa imagens, fontes e scripts em cache longo.

Se o endereço final não for `stuepp-araujo-identidade.vercel.app`, copie `.env.example` para `.env`, ajuste `VITE_SITE_URL` e rode o build de novo (isso corrige o link de compartilhamento). A página está com `noindex`, por ser apresentação e não o site oficial.

## Estrutura

```text
src/
  App.tsx                 Ordem das seções
  content.ts              Textos, cores, papelaria e fotos
  brand/glyphs.ts         Logo vetorizado, letra por letra
  components/Intro.tsx    Abertura (traço, assinatura e corte)
  components/*.tsx        Uma seção por arquivo
  hooks/useTheme.tsx      Dia e noite (sempre abre no dia)
  hooks/useFoilLight.ts   Brilho do ouro seguindo o cursor
  styles.css / motion.css Visual, responsivo e animações
public/
  images/                 WebP em 640, 960 e tamanho cheio
  brand/                  monograma.svg, logo.svg e favicon.svg
  fonts/                  Cinzel e Instrument Sans (WOFF2)
```

## Desempenho

- Só `transform`, `opacity` e `clip-path` animam; nada de animação que recalcula layout.
- Faixas e carrosséis param sozinhos quando saem da tela ou quando a aba fica em segundo plano.
- A rolagem suave (Lenis) só liga com mouse; no celular a rolagem é nativa.
- Imagens com `srcset`, tamanho declarado e carregamento sob demanda. O hero da versão dia é pré-carregado.
- Respeita "reduzir movimento" do sistema e tem o botão "Pausar movimento" no rodapé.

## Observações

- Os stills da CTPS, capacete, mãos com a pasta, caneta e da estátua da Justiça vieram de print em baixa (≈640 px). Foram ampliados com super-resolução por IA (EDSR 2×), com nitidez e grão fino, e aparecem em cards de até 600 px, onde ficam nítidos.
- O logo foi vetorizado a partir da versão texturizada em alta. Para impressão, o ideal continua sendo o vetor original do escritório.
- O aperto de mão foi mantido como pedido; é a única foto com terno e cara de banco de imagem.
