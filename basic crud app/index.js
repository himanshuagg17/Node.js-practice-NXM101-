//creating a basic todo application
const express=require("express");

const {connection}=require("./configs/db");

const {UserRouter}=require("./routes/user.routes");

const app=express();
require("dotenv").config();

app.use(express.json());

app.use("/user",UserRouter);


app.listen(process.env.port,async()=>{
    await connection;
    console.log("the server is connected at port 1700");
})