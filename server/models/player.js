const repositorio = require("../../repositorio/player")

class Player {

    add(player){
        if (!player.name.trim()) {
            return new Promise((resolve, reject) =>{
                reject({erro:'Please, insert a name'})
            })
        } else {
            return repositorio.add(player)
            .then(resultados => {
                const id = resultados.insertId
                return {player, id}
            })
        }
    }
    get(name){
        return repositorio.get(name)
    }
    
    list(){
        return repositorio.list()
    }
}

module.exports = new Player


