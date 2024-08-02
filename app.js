const bodyParser = require('body-parser');
const express = require('express');
const mysql = require('mysql');


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

// Rota para coletar e analisar a nota de um produto com base no ID
app.get('/produto/:id', async (req, res) => {
  try {
      const { id } = req.params;

      // Consulta ao banco de dados para buscar o produto pelo ID
      const sql = 'SELECT nota FROM reviews WHERE id = ?';
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


  // Cadastrar Usuário
  app.post('/usuarios', (req, res) => {
    const { nome, email } = req.body;
    const sql = 'INSERT INTO usuarios (nome, email) VALUES (?, ?)';
    db.query(sql, [nome, email], (err, result) => {
      if (err) {
        return res.status(500).send('Erro ao cadastrar usuário');
      }
      res.status(201).send('Usuário cadastrado com sucesso');
    });
  });
// Coletar dados Usuário específico
  app.get('/usuarios/nome/:nome', (req, res) => {
    const { nome } = req.params;
    const sql = 'SELECT * FROM usuarios WHERE nome = ?';
    db.query(sql, [nome], (err, result) => {
      if (err) {
        return res.status(500).send('Erro ao buscar usuário');
      }
      if (result.length === 0) {
        return res.status(404).send('Usuário não encontrado');
      }
      res.json(result);
    });
  });
  
//Coletar dados bebidas
app.get('/bebidas', (req, res) => {
    const sql = 'SELECT * FROM drinks';
    db.query(sql, (err, results) => {
      if (err) {
        return res.status(500).send('Erro ao buscar as bebidas');
      }
      res.json(results);
    });
  });


//Cadastrar Bebida
app.post('/bebidas', (req, res) => {
  const { nome, tipo, receita } = req.body;
  const sqlChecagem = 'SELECT COUNT(*) AS count FROM drinks WHERE nome = ?';
  db.query(sqlChecagem, [nome], (err, result) => {
      if (err) {
          return res.status(500).send('Erro ao verificar a bebida');
      }
      const count = result[0].count;
      if (count > 0) {
          return res.status(400).send('Bebida já cadastrada');
      }
      const sqlInsercao = 'INSERT INTO drinks (nome, tipo, receita) VALUES (?, ?, ?)';
      db.query(sqlInsercao, [nome, tipo, receita], (err, result) => {
          if (err) {
              return res.status(500).send('Erro ao cadastrar a bebida');
          }
          res.status(201).send(`Bebida Cadastrada com Sucesso 😁 ${nome}, Que bebida interessante!`);
      });
  });
});


// Específico pelo ID
app.get('/bebidas/pesquisar/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM drinks WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).send('Erro ao buscar bebida');
    }
    if (result.length === 0) {
      return res.status(404).send('Bebida não encontrada');
    }
    res.json(result);
  });
});

// Específico pelo Nome
app.get('/bebidas/pesquisar/:nome', (req, res) => {
  const { nome } = req.params;
  const sql = 'SELECT * FROM drinks WHERE nome = ?';
  db.query(sql, [nome], (err, result) => {
    if (err) {
      return res.status(500).send('Erro ao buscar bebida');
    }
    if (result.length === 0) {
      return res.status(404).send('Bebida não encontrada');
    }
    res.json(result);
  });
});

  // Iniciando o servidor
  app.listen(port, () => {
    console.log(`Servidor Ativo: http://localhost:${port}`);
  });