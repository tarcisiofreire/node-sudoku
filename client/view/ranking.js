"use strict"

const tableRanking = document.querySelector("table.ranking tbody")
console.log(tableRanking)

fetch("http://localhost:3000/player").then(response => {
    if(response.ok){
        return response.json()
    } else {
        console.log("A resposta http não foi ok.")
    }
})
.then(data => {
    let html = ""
    data.forEach((element,i) => {
        // const line = '<tr><td class="pos">'+i+'</td><td>'+element.name+'</td><td class="score">1500</td></tr>'
        const line = `<tr><td class="pos">${i+1}</td><td>${element.name}</td><td class="score">1500</td></tr>`
        html += line
    });
    tableRanking.innerHTML = html;
})

