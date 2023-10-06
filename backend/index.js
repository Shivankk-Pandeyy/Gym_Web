const express=require('express');
const app=express();
const cors=require('cors');
const dotenv=require('dotenv').config();
const port=process.env.PORT;
//MONGODB 
const Connection=require('./Connection/Connection');
Connection();
//SCHEMA OF USER
const User=require('./Connection/UserSchema');
//SCHEMA OF USER
const Suggestion=require('./Connection/Suggestion');
//MIDDLEWARE
app.use(cors());
app.use(express.json());
//RESTFULL APIs
//REGISTER APIs
//SUGGESTION
app.post("/Suggest",async(req,res)=>{
    const {name,suggestion}=req.body;
    const suggest=await new Suggestion({
        name,
        suggestion,
    })
    await suggest.save();
    res.status(200).json({message:"OK SUGGESTION"})
})
//POST
app.post('/Register',async(req,res)=>{
    const {name,number,email,password}=req.body;
    const dummy=await User.findOne({email});
    if(dummy){
        return res.status(400).json({message:"ALREADY"})
    }
    else{
        console.log(req.body);
        const user=await new User({
        name,
        number,
        email,
        password,
    })
    await user.save();
    res.status(200).json({message:"OK DONE"})
    }
})
//LOGIN
//POST
app.post('/Login',async(req,res)=>{
    const {email,password}=req.body;
    const e=await User.findOne({email});
    const p=await User.findOne({password});
    if(!e){
        return res.status(400).json({message:"EMAIL"});
    }
    else if(!p){
        return res.status(400).json({message:"PASSWORD"})
    }
    else if(!p && ! e){
        return res.status(400).json({message:"CRED"})
    }
    else{
        return res.status(200).json({message:"LOGIN"})
    }
})
//Server Start
app.listen(port,()=>{
    console.log(`Server Running At ${port}`);
})