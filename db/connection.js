const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mycompany_db'
  },
  console.log(`Connected to the mycompany_db.`)
);

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to the mycompany_db.")
});

module.exports = connection;