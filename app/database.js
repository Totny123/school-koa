const mysql = require("mysql2");

const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} = require("./config");

const connections = mysql.createPool({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
});

connections.getConnection((error, conn) => {
  if (error) {
    console.log("连接失败:", error);
  } else {
    conn.connect((err) => {
      if (err) {
        console.log("连接失败:", err);
      } else {
        console.log("数据库连接成功~");
      }
    });
  }
});

module.exports = connections.promise();
