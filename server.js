import express from 'express'
import todos from "./todos.js"
import cors from 'cors'

const app = express()
const port = 9090
app.use(cors())
app.use(express.json())


app.get('/',(req,res)=>{
    res.json('Server running')
})

app.get('/todos',async (req,res)=>{
    res.json(await todos.getAll())
})

app.post('/todos',async (req,res)=>{
    const todo = await todos.add(req.body.text)
    res.json(todo)
})

app.patch('/todos/:id',async (req,res)=>{
    const updated = await todos.update(
        parseInt(req.params.id),
        req.body.text)

    if(!updated){
        return res.status(404).json({message:"Id not found"})
    }
    res.json(updated)

})

app.delete('/todos/:id',async(req,res)=>{
    await todos.del(parseInt(req.params.id))
    res.json({message:"Deleted"})
})

app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})