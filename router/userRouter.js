import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import User from '../models/usermodels.js'
const router =express.Router()

router.post("/signup",async (req,res)=>{
 try{
  const {fullName,email,password}=req.body
  const user=await User.findOne({email})
  if(user)
  return res.status(400).json({message:'user alerady exists'})
  const hashedpassword=await bcrypt.hash(password,10)

  const createdUser=await User.create({
    fullName,
    email,
    password:hashedpassword,
  })

  return res.status(201).json(createdUser)
 }
 catch(err){
   console.log(err)
   return res.json({message:'created user failed'})
 }
})



router.post("/signin",async (req,res)=>{
    try{
     const {email,password}=req.body
     const user=await User.findOne({email})
     if(!user)
     return res.status(400).json({message:'user does not exist'})
     const correctpasword= await bcrypt.compare(password,user.password)
   if(!correctpasword)
     return res.status(400).json({message:'wrong password'})

     return res.status(200).json({user,message:'Authentification succesful'})
    }
    catch(err){
      return res.status(400).json({message:err.message})
    }
   })

export default router