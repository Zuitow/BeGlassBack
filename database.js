const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "beglass",
});

const query = (sql, params) => {
  return pool.query(sql, params); // O pool lida com a promessa automaticamente
};

module.exports = { query };
