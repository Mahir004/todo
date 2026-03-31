import { drizzle } from "drizzle-orm/libsql";
import "dotenv/config";
import { tasks } from "./db/schema.js";
import { eq } from "drizzle-orm";

//initialization
const db = drizzle(process.env.DB_NAME);

// const fs = require("fs")
// const path = require("path")
// const filePath = path.join(__dirname,"data.json")
// let id = 1
// if (!fs.existsSync(filePath)) {
//     fs.writeFileSync(filePath, "[]")
// }
// function readData(){
//     try{
//         const data = fs.readFileSync(filePath)
//         return JSON.parse(data)
//     }
//     catch(error){
//         return []
//     }
// }
// function writeData(data){
//     fs.writeFileSync(filePath,JSON.stringify(data,null,2))
// }

async function getAll() {
  // return readData()
  try {
    const todoList = await db.select().from(tasks);
    return todoList;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function add(text) {
  // const data = readData()
  // const todo = {
  //     id : id++,
  //     text
  // }
  // data.push(todo)
  // writeData(data)

  // return todo

  if (text === null || text.trim() === "")
    throw new Error("proper text required...");

  try {
    const result = await db.insert(tasks).values({ text: text }).returning();

    return result[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function update(updId, text) {
  // const data = readData()
  // const todo = data.find(x => x.id === updateId)

  // if(!todo){
  //     return null
  // }

  // todo.text = text
  // writeData(data)

  // return todo

  if (text === null || text.trim() === "")
    throw new Error("proper text required...");

  try {
    const result = await db
      .update(tasks)
      .set({ text: text })
      .where(eq(tasks.id, updId))
      .returning();

    return result[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function del(delId) {
  // let data = readData()

  // data = data.filter(x => x.id !== delId)

  // writeData(data)
  try {
    await db.delete(tasks).where(eq(tasks.id, delId));
    return true;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default { getAll, add, del, update };
