const express = require("express")
const mongoose = require("mongoose")

const app = express()
app.use(express.json())

const db = "mongodb://localhost:27017"
const PORT = 5001


mongoose.connect(db).then(()=> {
    app.listen(PORT, () => {
        console.log(`Listening on port ` + PORT);
    })
}).catch((e) => {console.log(e)})


const todoSchema = new mongoose.Schema({
    title:String
})

const Todo =  mongoose.model('/todos', todoSchema);


app.get("/todos",(req,res)=>{
    Todo.find().then(todo=>res.json(todo));
})

app.post("/todos",(req,res)=>{
    const newTodo = new Todo({
        title:req.body.title
    })
    newTodo.save().then(todo=>res.json(todo))
})


app.listen(5000,()=>{
    console.log(" server running at port 5000")
});
//findByIdAndUpdate(req.params.id)  !(this.props.todo)
// var callback = function (err, data) {
//     if (err) { return console.error(err); }
//     else { console.log(data); }
//   }
  

// app.put("/todos/:id",(req,res)=>{
// var value = req.body.complete
// let approve = value === "true" ? false : true   
//     Todo.findByIdAndUpdate(
//         { _id: req.params.id},
//         {$set:{complete:approve}}
//         , callback )
// })

app.delete("/todos/:id",(req,res)=>{
    Todo.findByIdAndDelete({_id:req.params.id})
    .then(()=>res.json({remove:true}))
})