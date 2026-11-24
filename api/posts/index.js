const { listarPosts } = require('../../server/logica');

module.exports = (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ erro: 'Metodo nao permitido' });
  }
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
  return res.status(200).json(listarPosts(req.query.limite));
};