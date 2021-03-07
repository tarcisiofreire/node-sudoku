const query = require("../infra/database/queries")

class Player {
    add(player){
        const sql = "INSERT INTO Player SET ?"
        return query(sql, player)
    }
    list(){
        const sql = "SELECT * FROM Player"
        return query(sql)
    }
    get(playerName){
        const sql = `SELECT * FROM Player WHERE player = ${playerName}`
    }

}
module.exports = new Player