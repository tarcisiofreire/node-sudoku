const Jogo = require('../models/jogo') 

module.exports = app => {
    app.get("/game", (request, response) => {
        //retorna um jogo novo para o front-end
        response.status(200).send(
            Jogo.getJogo()
        )
    })

    app.get("/ranking", (request, response) => {
        
    })
}