"use strict"

//Inicia jogo
const start = () => {
    const inputName = document.querySelector('.form input')

    if (inputName.value != "") {
        fetch("http://localhost:3000/player", {
            method: "POST",
            body: JSON.stringify({name : inputName.value}),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json())
            .then(json => {
                mountGame(json.id)
                show('start_entry')
            })
            .catch (err => console.log(err))
    }
}

const mountGame = (playerId) => {
    //recupera um novo jogo
    //insere os valores na grid HTML
    let linesGrid = document.querySelectorAll('.matrix table tr')

    fetch("http://localhost:3000/game").then(response => {
        if (response.ok) {
            return response.json()
        } else {
            console.log("A resposta http não foi ok.")
        }
    })
    .then(data => {
        //Insert PlayerId in the localStorage
        data.id = playerId
        //Salva no localStorage as informações do jogo
        localStorage.setItem("jogo", JSON.stringify(data))

        //Cria os elementos iniciais no jogo
        linesGrid.forEach((elm, ielm) => {
            let cells = elm.querySelectorAll('td div.value span')
            cells.forEach((cell, icell) => {
                let value = data.initValues[ielm + 1][icell]

                if (value != 0) {
                    cell.innerHTML = value
                }
            })
        })
        //Start the timer
        let display = document.querySelector('#timer');
        startTimer(display);

    })
    .catch(error => {
        console.log("Erro: " + error.message)
    })
}

function startTimer(display) {
    var timer = 1, minutes, seconds;

    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        ++timer
    }, 1000);
}

const show = (id) => {
    let el = document.getElementById(id)
    el.classList.toggle('hidden')
    if (id == 'start_entry'){
        let main = document.querySelector('main').classList.remove('blur')
    }
}