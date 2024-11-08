const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key"; // Substitua com sua chave secreta

// Middleware para verificar se o token é válido
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Pega o token do header Authorization

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  // Verifica se o token é válido
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      // Caso o token tenha expirado
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expirado" });
      }
      // Caso o token seja inválido
      return res.status(401).json({ message: "Token inválido" });
    }

    // Se o token for válido, armazena os dados decodificados no request para uso posterior
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;