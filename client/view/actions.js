//Add the click event and a key to each item 
//The selected element will be activated until the next on..
//The numerical inputs will be inserted from the keyboard
//Check the local storage
//and send the return

const cells = document.querySelectorAll(".matrix td")

cells.forEach(e =>{
    e.addEventListener('mousedown', (element) => {
        let el = element.currentTarget
        hilightElements(el)
    },false)
})

document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    if (['1','2','3','4','5','6','7','8','9'].includes(keyName)){
        validInput(keyName)
    } else {
        console.log("Pressinone uma tecla de um a nove.")
    }
});

const hilightElements = (el) => {
    cells.forEach((e) => {
        e.classList.remove('active','input')
        e.children[0].classList.remove('active')
    })

    let val = el.querySelector(".value > span").innerHTML

    let parent = el.parentNode
    let elColumn = el.dataset.column
    let group = returnGroup(el.id)
    let groupString = "#"+group.join(" ,#")
    let equals = returnEqualElements(el)
    
    //highlight the equals elements
    equals.forEach(item => item.classList.add('active'))
    
    //highlight the same column and 9's group
    document.querySelectorAll("td[data-column='"+elColumn+"'] ,"+ groupString).forEach(td => td.classList.add('active'))
    //highlight the same row
    parent.querySelectorAll("td").forEach(td => td.classList.add('active'))
    el.classList.add('input')
    //el.classList.toggle('active')

}

const returnGroup = (identifier) => {
    const groups = [
        ['l1c1','l1c2','l1c3','l2c1','l2c2','l2c3','l3c1','l3c2','l3c3'],
        ['l1c4','l1c5','l1c6','l2c4','l2c5','l2c6','l3c4','l3c5','l3c6'],
        ['l1c7','l1c8','l1c9','l2c7','l2c8','l2c9','l3c7','l3c8','l3c9'],
        ['l4c1','l4c2','l4c3','l5c1','l5c2','l5c3','l6c1','l6c2','l6c3'],
        ['l4c4','l4c5','l4c6','l5c4','l5c5','l5c6','l6c4','l6c5','l6c6'],
        ['l4c7','l4c8','l4c9','l5c7','l5c8','l5c9','l6c7','l6c8','l6c9'],
        ['l7c1','l7c2','l7c3','l8c1','l8c2','l8c3','l9c1','l9c2','l9c3'],
        ['l7c4','l7c5','l7c6','l8c4','l8c5','l8c6','l9c4','l9c5','l9c6'],
        ['l7c7','l7c8','l7c9','l8c7','l8c8','l8c9','l9c7','l9c8','l9c9']
    ]
    
    let group = []
    
    groups.every(selectedGroup => {
        if (selectedGroup.includes(identifier)){
            group = selectedGroup
            return false
        }
        return true
    })
    return group
}

const returnEqualElements = (el) => {
    const allValues = document.querySelectorAll(".matrix td .value")
    const numbers = [...allValues].filter(n => {
        return n.innerText !== "" && n.innerText == el.querySelector("span").innerText
    })
    return numbers
}

const validInput = (keyString) => {
    const cellInput = document.querySelector("td.input")
    if(
        (cellInput != null && cellInput.children[0].innerText == "") ||
        cellInput.classList.contains('erro')
      )
    {
        //checa com os valores do jogo
        //imprime com o destaque de correto - azul
        //alerta de incorreto - vermelho
        if(keyString != getValue(cellInput)){
           cellInput.classList.add("erro")
        } else {
            cellInput.classList.remove("erro")
        }
        cellInput.children[0].children[0].innerText = keyString
    } else {
        console.log("Selecione uma célula válida do Sudoku para inserir o seu palpite.")
    }
}

const getValue = (cell) => {
    const result = JSON.parse(localStorage.getItem("jogo"))
    const id = cell.id
    const row = id.substring(1,2)
    const column = id.substring(3,4)

    return result.values[row][column-1]
}
