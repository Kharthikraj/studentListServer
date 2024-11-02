const port = 3000
const url = `http://localhost:${port}`
const selectElement = document.querySelector('#selectStudent')

const addList = fetch(url + '/studentList').then(response => response.json()).then(data => {
    let i = 0
    Array.from(data).forEach(element => {
        const optionElement = document.createElement('option')
        optionElement.value = ++i
        optionElement.innerText = element
        selectElement.append(optionElement)
    });
})

selectElement.addEventListener("change", ()=>{
    const spanlist = document.querySelectorAll('.details > div > span')
    const selval = selectElement.value
    console.log(selval)
    const sendUrl = url + `/studentInfo?id=${selval}`
    console.log(sendUrl)
    fetch(sendUrl).then(response => response.json()).then(data =>{
        spanlist[0].innerText = data.name
        spanlist[1].innerText = data.age
        spanlist[2].innerText = data.country
        spanlist[3].innerText = data.dob
    })
})
