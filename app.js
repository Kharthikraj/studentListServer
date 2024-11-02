const express = require('express')
const fs = require('fs')
const { buffer } = require('stream/consumers')
const port = 3000

const app = express()

app.use(express.json())
app.use(express.static('./src'))

app.get('/', (req, res) =>{
    fs.readFile('./index.html', 'utf8', (err, data) => {
        if (err) throw console.error
        res.send(data)
    })
})

app.get('/studentList', (req, res) => {
    fs.readFile('./students.json', 'utf8', (err, data) => {
        if(err) throw console.error()
        const jdata = JSON.parse(data)
        const ret = []
        Object.keys(jdata.students).forEach(element => {
            ret.push(jdata.students[element].name)
        })
        res.send(JSON.stringify(ret))
    })
})

app.get('/studentInfo', (req, res) =>{
    const id = req.query.id
    fs.readFile('./students.json', 'utf8', (err, data) => {
        const jdata = JSON.parse(data)
        const ret = jdata.students[id]
        res.send(ret)
    })
})

app.listen(port, ()=>{
    console.log(`listening on http://localhost:${port}`)
})