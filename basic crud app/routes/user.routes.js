const express=require("express");
const {UserModel}=require("../models/users.model");


const UserRouter=express.Router();
UserRouter.use(express.json());



//create a route
UserRouter.post("/create",async(req,res)=>{

     //taking the data entered by user in a variable
     const payload=req.body;

     //creating a new user data and storing it in a variable. and then we are saving it.
     const user=new UserModel(payload);
     user.save();
     res.send("The user data has been entered");
})


//update the user details
UserRouter.patch("/update/:id",async(req,res)=>{

    //taking the id in a variable.(using params)
    const id=req.params.id;


    //taking the whole data to change
    const payload=req.body;


    try {
        await UserModel.findByIdAndUpdate({_id:id},payload);
        res.send("The user data has been updated");
    } catch (error) {
        res.send(error.message);
    }
})


module.exports={
    UserRouter
}