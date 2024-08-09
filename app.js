const bodyParser = require('body-parser');
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

// Configuração da conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'beglass'
});

// Conectando ao banco de dados
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado ao banco de dados MySQL');
});

app.use(cors());
app.use(bodyParser.json());

// Rota simples para testar a conexão
app.get('/', (req, res) => {
    res.send('Página Inicial');
});
  
// Rota de exemplo
app.get('/sobre', (req, res) => {
    res.send('Página Sobre');
});
  
// Rota com parâmetro
app.get('/usuario/:nome', (req, res) => {
    res.send(`Olá, ${req.params.nome}!`);
});

// Login
app.post('/login', (req, res) => {
  const { email, passcode } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ? AND passcode = ?';
  db.query(sql, [email, passcode], (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao buscar usuário');
    }
    if (results.length === 0) {
      return res.status(404).send('Email ou senha incorretos');
    }

    res.status(200).send('Login bem-sucedido');
  });
});

// Cadastrar Usuário
app.post('/usuarios', (req, res) => {
  const { username, email, passcode } = req.body;

  // Log dos dados recebidos
  console.log("Dados recebidos:", { username, email, passcode });

  // Verifique se todos os campos estão preenchidos
  if (!username || !email || !passcode) {
    return res.status(400).send('Todos os campos são obrigatórios');
  }

  const sql = 'INSERT INTO users (username, email, passcode) VALUES (?, ?, ?)';
  db.query(sql, [username, email, passcode], (err, result) => {
    if (err) {
      // Log do erro
      console.error('Erro ao cadastrar usuário:', err);
      return res.status(500).send('Erro ao cadastrar usuário');
    }
    res.status(201).send('Usuário cadastrado com sucesso');
    console.log("Usuário Cadastrado com Sucesso! " + username);
  });
});

// Rota para logout (removida sessão)
// app.post('/logout', (req, res) => {
//   req.session.destroy(err => {
//     if (err) {
//       return res.status(500).send('Erro ao fazer logout');
//     }
//     res.status(200).send('Logout bem-sucedido');
//   });
// });

// Envio de reviews
app.post("/reviews", async (req, res) => {
  try {
      const { autor, produto, comentario, nota } = req.body;

      const sql = "INSERT INTO reviews (autor, produto, comentario, nota) VALUES (?, ?, ?, ?)";
      db.query(sql, [autor, produto, comentario, nota], (err, result) => {
          if (err) {
              console.error("Erro ao inserir a review:", err);
              return res.status(500).send("Erro ao enviar Review");
          }
          console.log("Review inserida com sucesso!");
          res.status(201).send("Review enviada com sucesso");
      });
  } catch (error) {
      console.error("Erro ao inserir a review:", error);
      res.status(500).json({ error: "Erro ao inserir a review" });
  }
});

// Coletar e analisar a nota de um produto com base no ID
app.get('/produto/:id', async (req, res) => {
  try {
      const { id } = req.params;

      // Consulta ao banco de dados para buscar o produto pelo ID
      const sql = 'SELECT * FROM reviews WHERE product_id = ?';
      db.query(sql, [id], (err, result) => {
          if (err) {
              console.error('Erro ao buscar o produto:', err);
              return res.status(500).send('Erro ao buscar o produto');
          }

          if (result.length === 0) {
              return res.status(404).send('Produto não encontrado');
          }

          const nota = result[0].nota;
          console.log(`Nota do produto com ID ${id}: ${nota}`);
          res.status(200).json({ nota });
      });
  } catch (error) {
      console.error('Erro ao buscar o produto:', error);
      res.status(500).json({ error: 'Erro ao buscar o produto' });
  }
});



// Cadastrar Administrador
app.post('/admins', (req, res) => {
  const { username, email, passcode } = req.body;
  const sql = 'INSERT INTO admin (username, email, passcode) VALUES (?, ?, ?)';
  db.query(sql, [username, email, passcode], (err, result) => {
    if (err) {
      return res.status(500).send('Erro ao cadastrar administrador');
    }
    res.status(201).send('Administrador cadastrado com sucesso');
    console.log("Administrador Cadastrado com Sucesso! " + username);
  });
});

// Coletar dados Usuário específico
app.get('/usuarios/pesquisar/:username', (req, res) => {
  const { username } = req.params;
  const sql = 'SELECT * FROM usuarios WHERE username = ?';
  db.query(sql, [username], (err, result) => {
    if (err) {
      return res.status(500).send('Erro ao buscar usuário');
    }
    if (result.length === 0) {
      return res.status(404).send('Usuário não encontrado');
    }
    res.json(result);
  });
});

// Coletar dados bebidas
app.get('/produtos', (req, res) => {
  const sql = 'SELECT * FROM products';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao buscar as produto');
    }
    res.json(results);
  });
});

// Sistema de Favoritar
app.post('/favorites', (req, res) => {
  const { userId, productId } = req.body;

  const query = 'INSERT INTO favorites (user_id, product_id) VALUES (?, ?)';
  db.query(query, [userId, productId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Produto favoritado com sucesso' });
    console.log("Produto favoritado com Sucesso!");
  });
});

// Endpoint para listar favoritos de um usuário
app.get('/favorites/:userId', (req, res) => {
  const userId = req.params.userId;

  const query = `
      SELECT p.id, p.name, p.description
      FROM products p
      JOIN favorites f ON p.id = f.product_id
      WHERE f.user_id = ?
  `;
  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
});

// Deletar Favoritos
app.delete('/favorites', (req, res) => {
  const { userId, productId } = req.body;

  const query = 'DELETE FROM favorites WHERE user_id = ? AND product_id = ?';
  db.query(query, [userId, productId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Favorito não encontrado' });
    }
    res.status(200).json({ message: 'Produto removido dos favoritos com sucesso' });
  });
});

// Cadastrar Bebida
app.post('/produtos', (req, res) => {
  const { name, description, ingredientes } = req.body;
  const sqlChecagem = 'SELECT COUNT(*) AS count FROM products WHERE name = ?';
  db.query(sqlChecagem, [name], (err, result) => {
    if (err) {
      return res.status(500).send('Erro ao verificar o produto');
    }
    const count = result[0].count;
    if (count > 0) {
      return res.status(400).send('Produto já cadastrado');
    }
    const sqlInsercao = 'INSERT INTO products (name, description, ingredientes) VALUES (?, ?, ?)';
    db.query(sqlInsercao, [name, description, ingredientes], (err, result) => {
      if (err) {
        return res.status(500).send('Erro ao cadastrar produto');
      }
      res.status(201).send(`Produto cadastrado com Sucesso 😁 ${name}, Que interessante!`);
    });
  });
});

// Específico pelo ID
app.get('/produtos/pesquisar/id/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM products WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).send('Erro ao buscar produto');
    }
    if (result.length === 0) {
      return res.status(404).send('Produto não encontrado');
    }
    res.json(result);
  });
});

// Específico pelo nome
app.get('/produtos/pesquisar/nome/:nome', (req, res) => {
  const { nome } = req.params;
  const sql = 'SELECT * FROM products WHERE name LIKE ?';
  db.query(sql, [`%${nome}%`], (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao buscar produto');
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
