const db = require('./database'); // Importe seu módulo de conexão com o banco de dados

// Função para buscar o usuário pelo ID
const getUserById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]); // Substitua 'users' pelo nome da sua tabela de usuários

    if (rows.length === 0) {
      return null; // Retorna null se o usuário não for encontrado
    }

    return rows[0]; // Retorna o primeiro usuário encontrado
  } catch (error) {
    console.error('Erro ao buscar o usuário:', error);
    throw error; // Lança o erro para que possa ser tratado na rota
  }
};

module.exports = {
  getUserById,
};
