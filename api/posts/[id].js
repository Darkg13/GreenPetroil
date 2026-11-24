const { obterPost } = require('../../server/logica');

module.exports = (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ erro: 'Metodo nao permitido' });
  }
  const post = obterPost(req.query.id);
  if (!post) {
    return res.status(404).json({ erro: 'Post nao encontrado' });
  }
  return res.status(200).json(post);
};