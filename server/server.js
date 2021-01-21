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
        console.log(todos)
        res.status(200).json({
            status:"success",
            results:todos.rows.length,
            data: {
                todos: todos.rows
            }
        })
        
    }catch (err) {
        console.log(err)
    }
})

// Get a single todo
app.get("/api/v1/todos", async (req, res))


// Create a todo


// Update todos


// Delete todos


const port = process.env.PORT || 3008

app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`)
})