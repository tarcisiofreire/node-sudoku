class Tables {
    init(connection){
        this.connection = connection
        this.createPlayer()
        this.createGame()
    }

    createPlayer(connection){
        const sql = 'CREATE TABLE IF NOT EXISTS Player (id int NOT NULL AUTO_INCREMENT, name varchar(200) NOT NULL, PRIMARY KEY (id))'
        this.connection.query(sql, erro => {
            if(erro){
                console.log('There is a problem to create the Player table')
            }else{
                console.log('Table Player created with success.')
            }
        });

    }

    createGame(connection){
        const sql = 'CREATE TABLE IF NOT EXISTS Game (id int NOT NULL AUTO_INCREMENT, id_player int NOT NULL, date datetime NOT NULL, points int NOT NULL, time_sec int NOT NULL, PRIMARY KEY (id), FOREIGN KEY (id_player) REFERENCES Player (id))'
        this.connection.query(sql, erro => {
            if (erro) {
                console.log(erro)
                console.log('There is a problem to create the Game table')
            } else {
                console.log('Table Game created')
            }
        })
    }

 }
 module.exports = new Tables