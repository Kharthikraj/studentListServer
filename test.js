const fs = require('fs');
fsp = fs.promises

let buffer = fs.readFileSync('./students.json', 'utf8')
const data = JSON.parse(buffer)

Object.keys(data.students).forEach(element => {
    console.log(data.students[element])
})

