const mysql = require('mysql')

const connection = mysql.createConnection({
    host:'localhost',
    port: 3306,
    user: 'root',
    password: '12345678',
    database: 'sudoku_nodejs_game'
})

module.exports = connection