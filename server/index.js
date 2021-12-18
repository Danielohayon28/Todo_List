const express = require("express");
const app = express();
const pool = require("./db");
const cors = require("cors");



app.use(cors());
app.use(express.json()); // req.body

//routes// 


//create todo
app.post('/todos',async(req,res) => {
    try {
        const { description } = req.body;
        const newTodo =await pool.query
        (" INSERT INTO todo (description) VALUES($1) RETURNING *" , 
        [description]);
        res.json(newTodo.rows[0]); 
    } catch (err) {
        console.error(err.message);
    }

} )


//get all todo
app.get("/todos" ,async(req,res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo ORDER BY todo_id;");
        res.json(allTodos.rows)
    } 
    catch (err) {
        console.error(err.message);
    }
})
// fet a todo

app.get("/todos/:id" ,async(req,res) => {
    try {
      const {id }= req.params;
      const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1 " , [id]);
      res.json(todo.rows[0]);
    } 
    catch (err) {
        console.error(err.message);
    }
})

// update

app.put("/todos/:id" ,async(req,res) => {
    try {
        const {id} = req.params;   
        const {description} = req.body;
        const updatedTodo =  pool.query ("UPDATE todo SET description = $1 WHERE todo_id = $2",[description,id] );
        res.json("Todo was updated ");
    } 
    catch (err) {
        console.error(err.message);
    }
})


// delete

app.delete("/todos/:id" ,async(req,res) => {
    try {
        const {id} = req.params;   
        const deletedTodo =  pool.query ("DELETE FROM todo WHERE todo_id =$1" ,[id] );
        res.json("Todo was deleted");
    } 
    catch (err) {
        console.error(err.message);
    }
})

app.listen(8080, ()=> {
    console.log("server hst started on port 8080");
})