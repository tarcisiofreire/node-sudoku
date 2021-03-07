const connection = require("./connection")

const executaQuery = (query, params = '') => {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (erros, resultados, campos) => {
            if (erros) {
                reject(erros)
            } else {
                resolve(resultados)
            }
        })
    })
}

module.exports = executaQuery