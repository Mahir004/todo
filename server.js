const express = require('express')
const app = express()
const port = 9090
const cors = require("cors")


app.use(cors())
app.use(express.json())


const todos = require("./todos")

app.get('/todos',(req,res)=>{
    res.json(todos.getAll())
})

app.post('/todos',(req,res)=>{
    const todo = todos.add(req.body.text)
    res.json(todo)
})

app.patch('/todos/:id',(req,res)=>{
    const updated = todos.update(
        parseInt(req.params.id),
        req.body.text)

    if(!updated){
        return res.status(404).json({message:"Id not found"})
    }
    res.json(updated)

})

app.delete('/todos/:id',(req,res)=>{
    todos.del(parseInt(req.params.id))
    res.json({message:"Deleted"})
})

app.listen(port,()=>{})