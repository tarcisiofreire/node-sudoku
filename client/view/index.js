"use strict"
//Inicia jogo
//recupera um novo jogo

//insere os valores na grid HTML

let linesGrid = document.querySelectorAll('.matrix table tr')

fetch("http://localhost:3000/game").then(response => {
    if(response.ok){
        return response.json()
    } else {
        console.log("A resposta http não foi ok.")
    }
})
.then(data => {
    console.log(data.values)
    linesGrid.forEach((elm,ielm) => {
        let cells = elm.querySelectorAll('td div.value span')
        cells.forEach((cell, icell) => {
            let value = data.initValues[ielm+1][icell]
            console.log(value)
            if(value != 0) {
                cell.innerHTML = value
            }
        })
    })

})
.catch(error => {
    console.log("Erro: " + error.message)
})

