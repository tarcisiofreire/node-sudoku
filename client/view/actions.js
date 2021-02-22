//Add the click event and a key to each item 
//The selected element will be activated until the next on..
//The numerical inputs will be inserted from the keyboard
//Check the local storage
//and send the return

const cells = document.querySelectorAll(".matrix td")

cells.forEach(e => {
    e.addEventListener('mousedown', (element) => {
        let el = element.currentTarget
        hilightElements(el)
    }, false)
})

document.addEventListener('keydown', (event) => {
    const keyLabel = event.key;
    let hint = document.querySelector("#hint").dataset.active
    if (['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(keyLabel)) {
        if (hint == "true") {
            setHint(keyLabel)
        } else {
            validInput(keyLabel)
        }
    } else if (['Backspace', 'Delete'].includes(keyLabel)) {
        clear(keyLabel)
    } else if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(keyLabel)) {
        ctrlArrows(keyLabel, cells)
    }
    else {
        console.log("Pressinone uma tecla de um a nove.")
    }
});

//Controla as entradas com o mouse
document.querySelectorAll("#numbers > div")
    .forEach(e => {
        e.addEventListener('mousedown', (input) => {
            const number = input.currentTarget.innerText
            let hint = document.querySelector("#hint").dataset.active

            if (hint == "true") {
                setHint(number)
            } else {
                validInput(number)
            }
        })
    })

//Control panel  
document.querySelector("#clear").addEventListener('mousedown', () => {
    clear()
})

//Hint button
document.querySelector("#hint").addEventListener('mousedown', (input) => {
    const el = input.currentTarget
    if (el.dataset.active == "false") {
        el.dataset.active = true
    } else {
        el.dataset.active = false
    }
})

const setHint = (number) => {
    const cellInput = document.querySelector("td.input")

    if(cellInput){
        const value = cellInput.children[0]
        const hint = cellInput.children[1]
    
        value.classList.add("display-none")
        hint.classList.remove("display-none")
        hint.querySelector(".c"+number).classList.toggle('visible')
    } else {
        console.log("Selecione uma célula válida do Sudoku para inserir o seu palpite.")
    }
    
}

const clear = () => {
    const cellInput = document.querySelector("td.input")
    if (cellInput != null && cellInput.classList.contains('error') ) {
        cellInput.children[0].children[0].innerText = ""
        cellInput.classList.remove('error')
    } else {
        console.log("Selecione uma célula válida do Sudoku para inserir o seu palpite.")
    }
}

const hilightElements = (el) => {
    const activatedElements = document.querySelectorAll(".active")

    if (activatedElements.length){
        activatedElements.forEach((e) => {
            e.classList.remove('active', 'input')
        })
    }

    let val = el.querySelector(".value > span").innerHTML

    let parent = el.parentNode
    let elColumn = el.dataset.column
    let group = returnGroup(el.id)
    let groupString = "#" + group.join(" ,#")
    let equals = returnEqualElements(el)

    //highlight the equals elements
    equals.forEach(item => item.classList.add('active'))

    //highlight the same column and 9's group
    document.querySelectorAll("td[data-column='" + elColumn + "'] ," + groupString).forEach(td => td.classList.add('active'))
    //highlight the same row
    parent.querySelectorAll("td").forEach(td => td.classList.add('active'))
    el.classList.add('input')
    //el.classList.toggle('active')

}

const returnGroup = (identifier) => {
    const groups = [
        ['l1c1', 'l1c2', 'l1c3', 'l2c1', 'l2c2', 'l2c3', 'l3c1', 'l3c2', 'l3c3'],
        ['l1c4', 'l1c5', 'l1c6', 'l2c4', 'l2c5', 'l2c6', 'l3c4', 'l3c5', 'l3c6'],
        ['l1c7', 'l1c8', 'l1c9', 'l2c7', 'l2c8', 'l2c9', 'l3c7', 'l3c8', 'l3c9'],
        ['l4c1', 'l4c2', 'l4c3', 'l5c1', 'l5c2', 'l5c3', 'l6c1', 'l6c2', 'l6c3'],
        ['l4c4', 'l4c5', 'l4c6', 'l5c4', 'l5c5', 'l5c6', 'l6c4', 'l6c5', 'l6c6'],
        ['l4c7', 'l4c8', 'l4c9', 'l5c7', 'l5c8', 'l5c9', 'l6c7', 'l6c8', 'l6c9'],
        ['l7c1', 'l7c2', 'l7c3', 'l8c1', 'l8c2', 'l8c3', 'l9c1', 'l9c2', 'l9c3'],
        ['l7c4', 'l7c5', 'l7c6', 'l8c4', 'l8c5', 'l8c6', 'l9c4', 'l9c5', 'l9c6'],
        ['l7c7', 'l7c8', 'l7c9', 'l8c7', 'l8c8', 'l8c9', 'l9c7', 'l9c8', 'l9c9']
    ]

    let group = []

    groups.every(selectedGroup => {
        if (selectedGroup.includes(identifier)) {
            group = selectedGroup
            return false
        }
        return true
    })
    return group
}

const returnEqualElements = (el) => {
    //Select natrix's cells and hints' values
    const allValues = document.querySelectorAll(".matrix td .value, .matrix td .hints .visible")
    const numbers = [...allValues].filter(n => {
        return n.innerText !== "" && n.innerText == el.querySelector("span").innerText
    })
    return numbers
}

const validInput = (keyString) => {
    //Get selected cell and set correct visibility
    const cellInput = document.querySelector("td.input")
    
    if ((cellInput != null && cellInput.children[0].innerText == "") ||
        (cellInput != null && cellInput.classList.contains('error'))
        ) {
        
        cellInput.children[0].classList.remove("display-none")
        cellInput.children[1].classList.add("display-none")
        
        //check values' game
        //Print the right value in blue
        //Print and show the wrong answer in red
        if (keyString != getCorrectValue(cellInput)) {
            cellInput.classList.add("error")
            if (isEndGame(countErro())) {
                console.log("Chama início do Jogo")
            }

        } else {
            cellInput.classList.remove("error")
        }
        cellInput.children[0].children[0].innerText = keyString
    } else {
        console.log("Selecione uma célula válida do Sudoku para inserir o seu palpite.")
    }
}

const getCorrectValue = (cell) => {
    const result = JSON.parse(localStorage.getItem("jogo"))
    const id = cell.id
    const row = id.substring(1, 2)
    const column = id.substring(3, 4)

    return result.values[row][column - 1]
}

const countErro = () => {
    let jogo = JSON.parse(localStorage.getItem("jogo"))
    let errors = 0

    if (!jogo.hasOwnProperty('errors')) {
        errors = 1
    } else {
        errors = parseInt(jogo.errors) + 1
    }
    document.getElementById('errors').innerHTML = errors
    jogo.errors = errors
    isEndGame(errors)
    localStorage.setItem("jogo", JSON.stringify(jogo))

    return errors
}

const isEndGame = (errors) => {
    return errors == 3
}

const saveState = () => {

}

const ctrlArrows = (arrow, cells) => {
    //check if there is cell active
    //get arrow direction
    //active respective cell from the arrow direction
    const cellInput = document.querySelector("td.input")

    if (cellInput != null){
        const id = cellInput.id
        let y = id.substring(1, 2)
        let x = id.substring(3, 4)
        console.log(id)
        switch (arrow) {
            case "ArrowUp":
                if(y == "1"){
                    y=9
                } else {
                    y--        
                }    
                break;
        
            case "ArrowDown":
                if(y == "9"){
                    y=1
                } else {
                    y++        
                } 
                break;
        
            case "ArrowLeft":
                if(x == "1"){
                    x=9
                } else {
                    x--        
                } 
                break;
        
            case "ArrowRight":
                if(x == "9"){
                    x=1
                } else {
                    x++        
                } 
                break;
        
        }
        console.log(x+y)
        cell = document.querySelector("#l"+y+"c"+x+"")
        hilightElements(cell)
    } else {
        hilightElements(cells[0])
    }

    
}