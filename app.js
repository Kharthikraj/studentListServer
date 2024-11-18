const express = require('express')
const {Client} = require('pg')
const fs = require('fs')

const port = 3000

const app = express()
app.use(express.json()) 
app.use(express.static('./src'))

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'test',
    password: 'skyfall',
    port: 5432
})

client.connect().then(()=> console.log('connected to test database...')).catch((err)=> console.error('failed to connect to database', err))

app.get('/', (req, res) =>{
    fs.readFile('./index.html', 'utf8', (err, data) =>{
        if(err) throw console.error()
        res.send(data)
    })
})

app.get('/studentList', async (req, res) =>{
    const names = await client.query('SELECT name FROM students')
    const data = names.rows
    res.send(JSON.stringify(data))
})

app.get('/studentInfo', async (req, res) =>{
    const name = req.query.name
    const infolist = await client.query(`SELECT name, gender, country, TO_CHAR(dob, 'DD-MM-YYYY') as date FROM students WHERE name='${name}'`)
    const reslist = infolist.rows
    res.send(JSON.stringify(reslist[0]))
})

app.listen(port, ()=>{
    console.log(`listening on port http://localhost:${port}`)
})