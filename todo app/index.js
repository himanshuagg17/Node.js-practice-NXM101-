const express=require("express");

const {connection}=require("./configs/db");

const {UserRouter}=require("./routes/user.route");
const {todoRouter}=require("./routes/todo.route");
require("dotenv").config();

const app=express();
app.use(express.json());



app.use("/user",UserRouter);
app.use("/todo",todoRouter);



app.listen(process.env.port,async()=>{
    await connection;
    console.log(`the server is running at ${process.env.port}`)
})