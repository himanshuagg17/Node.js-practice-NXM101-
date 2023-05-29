const express=require("express");
const {UserModel}=require("../models/user.model")

// bcrypt is used to hash the password
const bcrypt=require("bcrypt");

const jwt =require("jsonwebtoken");

const UserRouter=express.Router();
UserRouter.use(express.json());


// register a new user
UserRouter.post("/register",(req,res)=>{

    // take name, email and password
    let {name,email,password}=req.body;

    try{
        bcrypt.hash(password,5, async (err,hashedPassword)=>{
            if(err) res.send(err.message);
            else{
                const user= new UserModel({name,email,password:hashedPassword});
                await user.save();
                res.send("the user has been registered");
            }
        } )
    }
    catch(err){
        res.send(err.message);
    }
})


// login the user

UserRouter.post("/login",async (req,res)=>{
    let {email,password}= req.body;

    try{
        const user=await UserModel.find({email});
       

        bcrypt.compare(password,user[0].password,(err,data)=>{
           if(data){

            let token= jwt.sign({userId:user[0]._id},"himanshu");

            res.send({"msg":"use logged in","token":token});
           }
           else{
            res.send("the user could not be logged in");
           }
        })
    }
    catch(err){
        console.log(err.message);
    }
})




// //the login router
// //here we will use the hashed password to login to the application (the hashed password is decrypted here)
// UserRouter.post("/login",async(req,res)=>{
//     //getting the email and password
//     const {email,password}=req.body;
//     try{
//         //check if user is registred(with plain password)
//        // const user=await UserModel.find({$and:[{email:email},{password:password}]});

//         //check if user is registered (with hashed password)
//         const user=await UserModel.find({email});
//         res.send(user);
//         if(user.length>0){

//             //we are comparing if the 
//             bcrypt.compare(password,user[0].password,(err,result)=>{
//                 if(result){
//                //generating the token

//                //in this random payload,we are passing the userID from the data of the user to establish relation between the users and notes
//                 const token= jwt.sign({userID:user[0]._id},"masai");
//                 res.send({"msg":"the login was successful","token":token})
//                 }
//                 else{
//                     res.send("something went wrong");
//                 }
//             }) 
//         }
//         else{
//             res.send({"msg":"user not found"});
//         }
//     }
//     catch(err){
//           res.send("please signup first");
//     }
// })





// to add a new user

// UserRouter.post("/add",async(req,res)=>{

//     try{
//         const payload= req.body;

//         const user= new UserModel(payload);
//         await user.save();
//         res.send("the new user has been created");
//     }
//     catch(err){
//         res.send(err.message);
//     }
   
// })

// to get all the users

UserRouter.get("/",async (req,res)=>{
    let users=await UserModel.find();
    res.send(users);
})




module.exports={
    UserRouter
}