const bodyParser = require("body-parser");
const express = require("express");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2");
const cors = require("cors");
const crypto = require('crypto');

const { query } = require("./database"); // Importando a função query

//Puxar os componentes
const sendResetPasswordEmail = require("./resetMail"); // Chamada do ResetDeSenha
const sendWelcomeEmail = require("./sendMail")
const verifyToken = require("./verificarToken")

const app = express();
const port = 3000;

const SECRET_KEY = "a4fR&8qJ9@c5Zp^2wG1!kLm#6xYtUv$3jQe7RzWmZ2sQ4hT"; // Certifique-se de que a mesma chave está sendo usada em todas as partes

// Configuração da conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "beglass",
});

// Configuração do middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json());

// Rota simples para testar a conexão
app.get("/", (req, res) => {
  res.send("Página Inicial");
});


function gerarCodigoVerificacao() {
  return crypto.randomInt(100000, 999999).toString(); // Gera um número aleatório de 6 dígitos
}

// Middleware para autenticação JWT
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

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

// Rota para buscar o perfil do usuário usando callbacks
app.get("/perfil/:username", authenticateJWT, (req, res) => {
  const { username } = req.params;
  console.log(username);

  // Executa a consulta SQL diretamente
  const sql = "SELECT * FROM users WHERE username = ?";

  db.query(sql, [username], (error, results) => {
    if (error) {
      // Tratar o erro aqui
      console.error("Erro ao buscar o perfil do usuário:", error);
      return res.status(500).json({ message: "Erro ao buscar o perfil" });
    }

    // Verifica se o usuário foi encontrado
    if (results.length === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Retorna os dados do usuário encontrado
    res.status(200).json(results[0]);
    console.log(results);
  });
});

// Login
app.post("/login", async (req, res) => {
  const { email, username, password, rememberMe } = req.body; // Altere para usernameOrEmail
  console.log("Requisição recebida:", req.body);

  // Consulta SQL que verifica se o username ou email corresponde
  const sql =
    "SELECT * FROM users WHERE (email = ? OR username = ?) AND password = ?";
  try {
    console.log("Executando consulta SQL:", sql, [email, username, password]);
    const results = await query(sql, [email, username, password]);

    console.log("Resultado da consulta:", results);

    // Verifica se não houve resultado
    if (results.length === 0 || results[0].length === 0) {
      console.log("Usuário ou senha incorretos");
      return res.status(404).json({ message: "Usuário ou senha incorretos" });
    }

    // Acesso ao primeiro resultado corretamente
    const user = {
      id: results[0][0].userId,
      username: results[0][0].username,
      email: results[0][0].email, // Corrigido para acessar a primeira linha
    };

    console.log("Usuário no token:", user);

    const expiresIn = rememberMe ? "7d" : "1h";
    const token = jwt.sign(user, SECRET_KEY, { expiresIn });

    console.log("Token gerado:", token);
    return res.status(200).json({ token });
  } catch (err) {
    console.error("Erro ao executar a consulta SQL:", err.message);
    return res.status(500).json({ message: "Erro ao realizar login" });
  }
});

app.post("/reset-password", async (req, res) => {
  const { email } = req.body;
  const resetToken = jwt.sign({ email }, "seu-segredo", { expiresIn: "1h" });
  const resetLink = `http://localhost:3000/reset/${resetToken}`;

  try {
      await sendResetPasswordEmail(email, resetLink);
      res.status(200).send("E-mail de redefinição de senha enviado com sucesso.");
  } catch (error) {
      res.status(500).send("Erro ao enviar e-mail de redefinição de senha.");
  }
});


// Endpoint para "Esqueci a senha"
app.post("/esqueci-senha", async (req, res) => {
  const { email } = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";

  try {
    const [user] = await query(sql, [email]);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Gerar um token JWT com tempo de expiração
    const secret = SECRET_KEY + user.password;
    const token = jwt.sign({ email: user.email, id: user.id }, secret, {
      expiresIn: "15m",
    });

    // Link de redefinição de senha (ajuste conforme o endereço do seu site)
    const resetLink = `http://localhost:3000/reset-senha/${user.id}/${token}`;

    // Enviar e-mail com o link de redefinição
    await sendResetPasswordEmail(email, resetLink);

    res
      .status(200)
      .json({ message: "E-mail de redefinição enviado com sucesso!" });
  } catch (error) {
    console.error("Erro ao processar solicitação:", error);
    res.status(500).json({ message: "Erro ao processar solicitação" });
  }
});

// Endpoint para resetar a senha
app.post("/reset-senha/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { newPassword } = req.body;

  const sql = "SELECT * FROM users WHERE id = ?";

  try {
    const [user] = await query(sql, [id]);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const secret = SECRET_KEY + user.password;

    // Verificar o token
    try {
      jwt.verify(token, secret);

      // Atualizar a senha do usuário
      const updateSql = "UPDATE users SET password = ? WHERE id = ?";
      await query(updateSql, [newPassword, id]);

      res.status(200).json({ message: "Senha alterada com sucesso!" });
    } catch (err) {
      return res.status(400).json({ message: "Token inválido ou expirado" });
    }
  } catch (error) {
    console.error("Erro ao resetar senha:", error);
    res.status(500).json({ message: "Erro ao resetar senha" });
  }
});

// Cadastrar Usuário
app.post("/usuarios", async (req, res) => {
  const { username, email, password } = req.body;

  console.log("Recebendo dados de cadastro:", { username, email, password });

  const isValidPassword = password.length >= 8;
  const isValidEmail = (email) => {
    // Expressão regular para verificar se o e-mail é válido
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|gmx\.[a-z]{2,3})$/;
    return emailPattern.test(email);
  };

  if (!username || !email || !password) {
    console.log("Erro: Todos os campos são obrigatórios.");
    return res.status(400).send("Todos os campos são obrigatórios.");
  }

  // Verifica se o e-mail é válido
  if (!isValidEmail(email)) {
    console.log("Erro: O email não é válido.", { email });
    return res.status(400).send("O email deve ser um gmail.com, hotmail.com ou gmx.com.");
  }

  if (!isValidPassword) {
    console.log("Erro: A senha é muito curta.", {
      passwordLength: password.length,
    });
    return res.status(400).send("A senha deve ter no mínimo 8 caracteres.");
  }

  // Consulta SQL para inserir os dados do usuário na tabela 'users'
  const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;

  db.query(sql, [username, email, password], async (error, results) => {
    if (error) {
      console.log("Erro ao inserir usuário:", error);
      return res
        .status(500)
        .send("Erro ao cadastrar o usuário. Tente novamente.");
    }

    console.log("Usuário cadastrado com sucesso:", results);
    
    // Chama a função para enviar o e-mail de boas-vindas
    await sendWelcomeEmail(email);

    return res.status(200).send("Usuário cadastrado com sucesso.");
  });
});


// Envio de reviews
app.post("/reviews", (req, res) => {
  const { autor, produto, comentario, nota } = req.body;

  const sql =
    "INSERT INTO reviews (autor, produto, comentario, nota) VALUES (?, ?, ?, ?)";
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
  const { username, email, password } = req.body;
  const sql = "INSERT INTO admin (username, email, password) VALUES (?, ?, ?)";
  db.query(sql, [username, email, password], (err) => {
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
  console.log("Dados recebidos:", { userId, productId });
  // Verifica se o favorito já existe
  const checkQuery =
    "SELECT * FROM favorites WHERE user_id = ? AND product_id = ?";
  db.query(checkQuery, [userId, productId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length > 0) {
      return res.status(409).json({ message: "Produto já favoritado" });
    }

    // Insere o favorito
    const insertQuery =
      "INSERT INTO favorites (user_id, product_id) VALUES (?, ?)";
    db.query(insertQuery, [userId, productId], (err) => {
      if (err) {
        console.log("Erro ao inserir favorito:", err);
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: "Produto favoritado com sucesso" });
    });
  });
});

//Verificar se está favoritado
app.get("/favorites/:userId/:productId", async (req, res) => {
  const { userId, productId } = req.params;

  // Consulta SQL para verificar se o produto está favoritado
  const sql = "SELECT * FROM favorites WHERE user_id = ? AND product_id = ?";
  console.log("Realizando consulta ", sql);

  try {
    const results = await query(sql, [userId, productId]); // Retorna um array de resultados
    console.log("Informações da consulta: ", results);
    console.log("Resultados da consulta:", results[0].length); // Para debug

    // Verifica se existem resultados
    if (results[0].length > 0) {
      console.log("Produto está favoritado.");
      return res.status(200).json({ isFavorite: true });
    } else {
      console.log("Produto não está favoritado.");
      return res.status(200).json({ isFavorite: false });
    }
  } catch (err) {
    console.error("Erro ao verificar favoritos:", err.message);
    return res.status(500).json({ message: "Erro ao verificar favoritos" });
  }
});

//Listar Favoritos do usuário
app.get("/favorites/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const sql = `SELECT * FROM favorites WHERE user_id = ?`; 
    db.query(sql, [userId], (error, results) => {
      if (error) {
        console.error("Erro ao buscar favoritos:", error);
        return res.status(500).send("Erro ao buscar favoritos.");
      }
      console.log("Dados Recebidos com sucesso.", results)
      res.status(200).json(results);
    });
  } catch (error) {
    console.error("Erro interno:", error);
    res.status(500).send("Erro interno do servidor.");
  }
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
    res
      .status(200)
      .json({ message: "Produto removido dos favoritos com sucesso" });
  });
});

// Rota para buscar reviews por autor
app.get("/procurarReviews", (req, res) => {
  const { autor } = req.query; // Pega o autor do query string

  if (!autor) {
    return res.status(400).send("Autor é necessário.");
  }

  // SQL para buscar reviews do autor
  const sql = "SELECT * FROM reviews WHERE autor = ?"; // Ajuste a tabela e os campos conforme sua estrutura

  db.query(sql, [autor], (error, results) => {
    if (error) {
      console.error("Erro ao buscar reviews:", error);
      return res.status(500).send("Erro ao buscar reviews.");
    }

    if (results.length === 0) {
      return res.status(404).send("Nenhuma review encontrada para este autor.");
    }

    res.status(200).json(results); // Retorna as reviews encontradas
  });
});

//Endpoint para receber as notas de algum produto
app.get("/notas/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT AVG(nota) as mediaNota FROM reviews WHERE produto = ?"; // Calcula a média das notas

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Erro ao buscar notas:", err);
      return res.status(500).json({ error: "Erro ao buscar notas" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Nenhuma review encontrada" });
    } else {
      res.json({ mediaNota: result[0].mediaNota }); // Retorna a média das notas
    }
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
