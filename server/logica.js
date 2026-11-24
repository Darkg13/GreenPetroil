const db = require('./data.json');

function postsOrdenados() {
  return [...db.posts].sort((a, b) => b.data.localeCompare(a.data) || b.id - a.id);
}

function semConteudo({ conteudo, ...resumo }) {
  return resumo;
}

function listarPosts(limite) {
  let lista = postsOrdenados().map(semConteudo);
  const n = Number.parseInt(limite ?? '', 10);
  if (Number.isInteger(n) && n > 0) {
    lista = lista.slice(0, n);
  }
  return lista;
}

function obterPost(id) {
  return db.posts.find((p) => String(p.id) === String(id)) ?? null;
}

function listarProjetosSociais() {
  return db.projetosSociais;
}

module.exports = { listarPosts, obterPost, listarProjetosSociais };