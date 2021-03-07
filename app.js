const customExpress = require("./config/customExpress")
const connection = require("./infra/database/connection")
const Tables = require("./infra/database/tables")

connection.connect( erro => {
    if (erro) {
        console.log(erro)
        console.log("Mysql: Database unavailable")
    } else {
        console.log('Connection success');
        
        Tables.init(connection)
        const app = customExpress()
        app.listen(3000, () => console.log('The game is running'));
    }
})