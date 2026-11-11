# GreenPetroil – Site corporativo (Angular)

Trabalho semestral de **Front-end Frameworks** (Aula 7 – SPA, SSR e CSR).
Site fictício para a empresa **GreenPetroil**, feito em Angular (standalone components, signals e novo control flow `@if/@for/@switch`), com dados vindos de uma API de back-end.

## Como rodar

Requisitos: Node.js 20.19+ (ou 22) e npm.

```bash
npm install
npm run dev      # sobe a API (porta 3000) e o Angular (porta 4200) juntos
```

Abra http://localhost:4200.

Também dá para rodar separado, em dois terminais:

```bash
npm run api      # API em http://localhost:3000/api
npm start        # Angular com proxy de /api para a API
```

## Se o localhost não abrir

1. Confira o Node: `node -v` precisa ser 20.19 ou mais novo (ou 22.12+). Se for mais antigo, instale o Node LTS em nodejs.org.
2. Rode `npm install` dentro da pasta `greenpetroil` (a que tem o `package.json`) e espere terminar antes do `npm run dev`.
3. Use `npm run dev` e abra **http://localhost:4200** (não a porta 3000, que é só a API). Aguarde aparecer "Local: http://localhost:4200/" no terminal.
4. Se a página abrir mas as notícias derem erro, a API não subiu: teste http://127.0.0.1:3000/api/posts no navegador. Se a porta 3000 estiver ocupada, o terminal avisa.
5. Se o `npm install` der erro de versão, use o plano B abaixo.

> Plano B: `npx @angular/cli new greenpetroil-web --routing --style=css` e copie para o projeto novo as pastas `src/`, `public/` e `server/` e o arquivo `proxy.conf.json`.

## API (server/server.js)

Servidor Node sem dependências externas.

| Rota | Descrição |
| --- | --- |
| `GET /api/posts?limite=3` | Posts mais recentes primeiro (sem o texto completo) |
| `GET /api/posts/:id` | Post completo |
| `GET /api/projetos-sociais` | Projetos sociais mantidos pela empresa |

Os dados ficam em `server/data.json`.

## Páginas

| Rota | Conteúdo |
| --- | --- |
| `/` | Hero, **feed com os 3 últimos posts** (com link para o post completo) e projetos sociais em destaque |
| `/noticias/:id` | **Post completo**, com "Leia também" |
| `/sobre` | História, **missão, visão e valores** e o compromisso ambiental |
| `/projetos-sociais` | **Projetos sociais** da empresa |
| `**` | Página 404 |

## Mapa dos requisitos do trabalho

| Requisito | Onde está |
| --- | --- |
| Framework Angular | Todo o projeto |
| HTML semântico e acessível | `header`, `nav`, `main`, `section`, `article`, `footer`, `address`, `time`, `dl`; link "Pular para o conteúdo"; foco movido para o `main` a cada troca de rota; `aria-current`, `aria-expanded`, `role="status"/"alert"`; foco visível; respeita `prefers-reduced-motion` |
| Layout responsivo | `src/styles.css` (grid com `auto-fit`, menu recolhível abaixo de 768px, `clamp()` nos tamanhos) |
| Pelo menos 3 páginas | Início, Quem somos, Projetos sociais (+ post e 404) |
| Cabeçalho, menu e rodapé | `src/app/shared/header`, `menu`, `footer` |
| Pelo menos 3 componentes compartilhados | `page-hero`, `post-card`, `projeto-card`, `state-message`, `cta-banner` (em `src/app/shared`) |
| Dados do feed e dos projetos vindos de uma API | `ApiService` (`src/app/services/api.service.ts`) consome a API do `server/` |

## Renderização: CSR

O projeto usa **CSR** (Client-Side Rendering): o navegador baixa o JavaScript e o Angular monta as páginas. Para discutir **SSR** na apresentação, é possível ativá-lo depois com `ng add @angular/ssr`.

## Integrantes

- (preencher)
