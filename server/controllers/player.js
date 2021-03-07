const Player = require('../models/player')

module.exports = app => {
    app.post('/player', (request, response) => {
        const player = request.body
        return Player.add(player)
            .then( player => {response.status(201).json(player)})
            .catch( erros => (response.status(400).json(erros)))
    })

    app.get('/player', (request, response) => {
        Player.list()
            .then(resultados => response.json(resultados))
            .catch(erros => response.status(400).json(erros))
    })
}