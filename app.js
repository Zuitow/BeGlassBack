const bodyParser = require("body-parser");
const express = require("express");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2/promise");
const cors = require("cors");
const { query } = require('./database'); // Importando a função query
const userModel = require('./userModel'); // Importando o userModel

const app = express();
const port = 3000;

const SECRET_KEY = "ziguiriguidum"; // Certifique-se de que a mesma chave está sendo usada em todas as partes

// Configuração da conexão com o banco de dados MySQL
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "beglass",
});

// Configuração do middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

// Rota simples para testar a conexão
app.get("/", (req, res) => {
  res.send("Página Inicial");
});

// Middleware para autenticação JWT
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(403).json({ message: "Token não fornecido" });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      console.error("Erro ao verificar token:", err);
      return res.status(403).json({ message: "Token inválido" });
    }
    req.user = user;
    next();
  });
};

// Rota para buscar o perfil do usuário
app.get('/perfil/:username', authenticateJWT, async (req, res) => {
  const { username } = req.params;
console.log(username)
  try {
    // Executa a consulta SQL diretamente
    const sql = "SELECT * FROM users WHERE username = ?";
    const [results] = await db.query(sql, [username]); // Executando a query com o pool de conexão

    // Verifica se o usuário foi encontrado
    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Retorna os dados do usuário encontrado
    res.status(200).json(results[0]);
  } catch (error) {
    console.error('Erro ao buscar o perfil do usuário:', error);
    res.status(500).json({ message: 'Erro ao buscar o perfil' });
  }
});


// Login
app.post("/login", async (req, res) => {
  const { username, passcode, rememberMe } = req.body;
  console.log('Requisição recebida:', req.body);

  const sql = "SELECT * FROM users WHERE username = ? AND passcode = ?";
  
  try {
    console.log('Executando consulta SQL:', sql, [username, passcode]);
    const results = await query(sql, [username, passcode]);
    console.log("Resultado da consulta:", results);

    if (results.length === 0) {
      console.log("Usuário ou senha incorretos");
      return res.status(404).json({ message: "Usuário ou senha incorretos" });
    }

    // Extrair as informações do usuário retornado do banco de dados
   const user = {
  id: results[0][0].userId,      // Acessando o primeiro array interno
  username: results[0][0].username,
  email: results[0][0].email,
};

	
	console.log("Usuário no token:", user); // Verifique se contém id, username e email


    // Definir o tempo de expiração do token
    const expiresIn = rememberMe ? "7d" : "1h";

    // Criar o token com as informações do usuário
    const token = jwt.sign(user, SECRET_KEY, { expiresIn });

    console.log("Token gerado:", token);
    return res.status(200).json({ token });
  } catch (err) {
    console.error("Erro ao executar a consulta SQL:", err.message);
    return res.status(500).json({ message: "Erro ao realizar login" });
  }
});


// Cadastrar Usuário
app.post("/usuarios", (req, res) => {
  const { username, email, passcode } = req.body;
  if (!username || !email || !passcode) {
    return res.status(400).send("Todos os campos são obrigatórios");
  }

  const sql = "INSERT INTO users (username, email, passcode) VALUES (?, ?, ?)";
  db.query(sql, [username, email, passcode], (err) => {
    if (err) {
      return res.status(500).send("Erro ao cadastrar usuário");
    }
    res.status(201).send("Usuário cadastrado com sucesso");
  });
});

// Envio de reviews
app.post("/reviews", (req, res) => {
  const { autor, produto, comentario, nota } = req.body;

  const sql = "INSERT INTO reviews (autor, produto, comentario, nota) VALUES (?, ?, ?, ?)";
  db.query(sql, [autor, produto, comentario, nota], (err) => {
    if (err) {
      return res.status(500).send("Erro ao enviar Review");
    }
    res.status(201).send("Review enviada com sucesso");
  });
});

// Endpoint para obter reviews de um produto específico pelo ID do produto
app.get("/reviews/:id", async (req, res) => {
  const sql = "SELECT * FROM reviews WHERE produto = ?";
  try {
    const results = await query(sql, [req.params.id]);
    res.status(200).json(results);
  } catch (err) {
    return res.status(500).send("Erro ao buscar reviews");
  }
});

// Cadastrar Administrador
app.post("/admins", (req, res) => {
  const { username, email, passcode } = req.body;
  const sql = "INSERT INTO admin (username, email, passcode) VALUES (?, ?, ?)";
  db.query(sql, [username, email, passcode], (err) => {
    if (err) {
      return res.status(500).send("Erro ao cadastrar administrador");
    }
    res.status(201).send("Administrador cadastrado com sucesso");
  });
});

// Coletar dados Usuário específico
app.get("/usuarios/:username", async (req, res) => {
  const sql = "SELECT * FROM users WHERE username = ?";
  try {
    const result = await query(sql, [req.params.username]);
    if (result.length === 0) {
      return res.status(404).send("Usuário não encontrado");
    }
    res.json(result[0]);
  } catch (err) {
    return res.status(500).send("Erro ao buscar usuário");
  }
});

// Coletar dados bebidas
app.get("/produtos", (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send("Erro ao buscar os produtos");
    }
    res.json(results);
  });
});

// Sistema de Favoritar
app.post("/favorites", (req, res) => {
  const { userId, productId } = req.body;
  const query = "INSERT INTO favorites (user_id, product_id) VALUES (?, ?)";
  db.query(query, [userId, productId], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Produto favoritado com sucesso" });
  });
});

// Endpoint para listar favoritos de um usuário
app.get("/favorites/:userId", (req, res) => {
  const query = `
      SELECT p.id, p.name, p.description
      FROM products p
      JOIN favorites f ON p.id = f.product_id
      WHERE f.user_id = ?
  `;
  db.query(query, [req.params.userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
});

// Deletar Favoritos
app.delete("/favorites", (req, res) => {
  const { userId, productId } = req.body;
  const query = "DELETE FROM favorites WHERE user_id = ? AND product_id = ?";
  db.query(query, [userId, productId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Favorito não encontrado" });
    }
    res.status(200).json({ message: "Produto removido dos favoritos com sucesso" });
  });
});

// Endpoint para obter um produto específico pelo ID
app.get("/produtos/:id", (req, res) => {
  const sql = "SELECT * FROM products WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      return res.status(500).send("Erro ao buscar produto");
    }
    if (result.length === 0) {
      return res.status(404).send("Produto não encontrado");
    }
    res.json(result[0]);
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});