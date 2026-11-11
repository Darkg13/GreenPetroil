/**
 * API de back-end da GreenPetroil (sem dependências: usa apenas módulos nativos do Node).
 *
 * Rotas:
 *   GET /api/posts?limite=3   -> posts mais recentes primeiro (sem o texto completo)
 *   GET /api/posts/:id        -> um post completo
 *   GET /api/projetos-sociais -> lista de projetos sociais
 *
 * Uso: node server/server.js   (porta 3000, ou a definida em PORT)
 */
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const PORT = process.env.PORT || 3000;
const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));

function enviarJson(res, status, corpo) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(JSON.stringify(corpo));
}

function postsOrdenados() {
  return [...db.posts].sort((a, b) => b.data.localeCompare(a.data) || b.id - a.id);
}

function semConteudo({ conteudo, ...resumo }) {
  return resumo;
}

const servidor = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    return res.end();
  }
  if (req.method !== 'GET') {
    return enviarJson(res, 405, { erro: 'Método não permitido' });
  }

  let url;
  try {
    url = new URL(req.url, 'http://localhost');
  } catch {
    return enviarJson(res, 400, { erro: 'Endereço inválido' });
  }
  const partes = url.pathname.replace(/\/+$/, '').split('/').filter(Boolean); // ["api", "posts", "5"]

  if (partes[0] !== 'api') {
    return enviarJson(res, 404, { erro: 'Rota não encontrada' });
  }

  if (partes[1] === 'posts' && partes.length === 2) {
    const limite = Number.parseInt(url.searchParams.get('limite') ?? '', 10);
    let lista = postsOrdenados().map(semConteudo);
    if (Number.isInteger(limite) && limite > 0) {
      lista = lista.slice(0, limite);
    }
    return enviarJson(res, 200, lista);
  }

  if (partes[1] === 'posts' && partes.length === 3) {
    const post = db.posts.find((p) => String(p.id) === partes[2]);
    return post
      ? enviarJson(res, 200, post)
      : enviarJson(res, 404, { erro: 'Post não encontrado' });
  }

  if (partes[1] === 'projetos-sociais' && partes.length === 2) {
    return enviarJson(res, 200, db.projetosSociais);
  }

  return enviarJson(res, 404, { erro: 'Rota não encontrada' });
});

servidor.on('error', (erro) => {
  if (erro.code === 'EADDRINUSE') {
    console.error(
      `\nA porta ${PORT} já está em uso. Feche o programa que usa essa porta ou rode com outra:\n` +
        `  PORT=3001 node server/server.js   (e troque a porta em proxy.conf.json)\n`,
    );
  } else {
    console.error(erro);
  }
  process.exit(1);
});

// 127.0.0.1 (IPv4) combina com o proxy.conf.json e evita problemas de "localhost" resolvendo para IPv6.
servidor.listen(PORT, '127.0.0.1', () => {
  console.log(`API da GreenPetroil rodando em http://127.0.0.1:${PORT}/api`);
});
