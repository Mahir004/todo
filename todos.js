const fs = require("fs")
const path = require("path")
let id = 1

const filePath = path.join(__dirname,"data.json")

if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]")
}

function readData(){
    try{
        const data = fs.readFileSync(filePath)
        return JSON.parse(data)
    }
    catch(error){
        return []
    }
}

function writeData(data){
    fs.writeFileSync(filePath,JSON.stringify(data,null,2))
}

function getAll() {
    return readData()
}

function add(text){
    const data = readData()

    const todo = {
        id : id++,
        text
    }
    data.push(todo)
    writeData(data)

    return todo
}

function update(updateId, text){

    const data = readData()

    const todo = data.find(x => x.id === updateId)

    if(!todo){
        return null
    }

    todo.text = text
    writeData(data)

    return todo

}

function del(delId){
    let data = readData()
    
    data = data.filter(x => x.id !== delId)

    writeData(data)
}

module.exports = { getAll, add, del, update };