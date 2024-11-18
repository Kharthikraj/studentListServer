const port = 3000
const url = `http://localhost:${port}`


const selectelement = document.querySelector('#selectStudent')

const addlist = fetch(url+'/studentList').then(response => response.json()).then(data =>{
    Array.from(data).forEach(element =>{
        console.log(element)
        const optionele = document.createElement('option')
        optionele.value = element.name
        optionele.innerText = element.name
        selectelement.append(optionele)
    })
})

selectelement.addEventListener('change', ()=>{
    const selval = selectelement.value
    const spanlist = document.querySelectorAll('.details > div > span')
    const requrl = url + `/studentInfo?name=${selval}`
    fetch(requrl).then(response => response.json()).then(data => {
        spanlist[0].innerText = data.name
        spanlist[1].innerText = data.gender
        spanlist[2].innerText = data.country
        spanlist[3].innerText = data.date
    })
})