const express=require("express");
const todoRouter=express.Router();
const jwt=require("jsonwebtoken");
const {TodoModel}=require("../models/todo.model");
const {authenticate}=require("../middlewares/authenticate");

todoRouter.use(authenticate);

// create a todo route(when we are not using the authentication middleware and we are doing the authentication here itself)
// todoRouter.post("/create",async(req,res)=>{

//     // here the query is coming from the token
//     // let token=req.query.token;

//     // token is coming from the headers
//     let token=req.headers.authorization;
//     jwt.verify(token,"himanshu",async(err,decoded)=>{
//         if(decoded){

//             try{
//                 let payload=req.body;
        
//                 let todo=new TodoModel(payload);
//                 await todo.save();
//                 res.send("a new todo has been created");
//             }
//             catch(err){
//                 res.send(err.message);
//             }
//         }
//         else{
//             res.send("token could not be verified");
//         }
//     })
   
// })


// we have created the authentication middleware , we do not need the authentication

todoRouter.post("/create",async(req,res)=>{

    // here the query is coming from the token
    // let token=req.query.token;

    // token is coming from the headers
    
            try{
                let payload=req.body;
        
                let todo=new TodoModel(payload);
                await todo.save();
                res.send("a new todo has been created");
            }
            catch(err){
                res.send(err.message);
            }
})



// route to update the data

todoRouter.patch("/update/:id",async(req,res)=>{
    let payload=req.body;

    let id=req.params.id;

    let todo=await TodoModel.findByIdAndUpdate({_id:id},payload);
     
    res.send(todo);

})


// route to delete the todo

todoRouter.delete("/delete/:id",async(req,res)=>{
    let id=req.params.id;

    await TodoModel.findByIdAndDelete({_id:id});

    res.send("the data has been deleted");

   
})

// route to read all the data

todoRouter.get("/all",async(req,res)=>{
    try{
        let data= await TodoModel.find();
        res.send(data)
    }
    catch(err){
        res.send(err.message);
    }
})



module.exports={
    todoRouter
}




