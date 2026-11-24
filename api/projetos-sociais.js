const { listarProjetosSociais } = require('../server/logica');

module.exports = (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ erro: 'Metodo nao permitido' });
  }
  return res.status(200).json(listarProjetosSociais());
};