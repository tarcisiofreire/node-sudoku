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

const hilightElements = (el) => {
    cells.forEach((e) => {e.classList.remove('active')})
    
    let parent = el.parentNode
    let parentClass = parent.classList.value
    let elClass = el.classList.value
    let idClass = parentClass + elClass
    let group = returnGroup(idClass)
    let groupString = "#"+group.join(" ,#")

    document.querySelectorAll("td."+elClass+" ,"+ groupString).forEach(td => td.classList.add('active'))
 
    parent.querySelectorAll("td").forEach(td => td.classList.add('active'))
 
    el.classList.toggle('active')
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

