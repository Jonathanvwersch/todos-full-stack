require("dotenv").config()
const express = require("express")
const cors = require("cors")
const db = require("./db")
const app = express()

app.use(cors())
app.use(express.json())

// Get all todos
app.get("/api/v1/todos", async (req, res) => {
    try {
        const todos = await db.query("select * from todos")
        res.status(200).json({
            status:"success",
            results: todos.rows.length,
            data: {
                todos: todos.rows
            }
        })
        
    }catch (err) {
        console.log(err)
    }
})

// Get a single todo
app.get("/api/v1/todos/:id", async (req, res) => {
    try {
        const todo = await db.query("select * from todos where id=$1", [req.params.id])
        res.status(200).json({
            status:"success", 
            data: {
                todo: todo.rows[0],
            }
        })

    } catch (err) {
        console.log(err)
    }
})

// Create a todo
app.post("/api/v1/todos", async (req, res) => {
    try {
        const results = await db.query(
            "INSERT INTO todos (todo) values ($1) returning *", [req.body.todo]
        )
        res.status(201).json({
            status: "success", 
            data: {
                todo: results.rows[0]
            }
        })

    } catch (err) {
        console.log(err)
    }
})


// Update todos
app.put("/api/v1/todos/:id", async (req, res) => {
    try {
        const results = await db.query(
            "UPDATE todos SET todo=$1 RETURNING *",
            [req.body.todo]
        )
        res.status(200).json({
            status:"success",
            data: {
                todos: results.rows[0]
            }
        })

    } catch(err) {
        console.log(err)
    }
})

// Delete todos
app.delete("/api/v1/todos/:id", async (req, res) => {
    try {
        const results = await db.query("DELETE FROM todos WHERE id=$1", [req.params.id])
        res.status(204).json({
            status:"success"
        })
    } catch(err) {
        console.log(err)
    }
})


const port = process.env.PORT || 3008

app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`)
})