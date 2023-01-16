import express from "express";
import {users} from '../bbdd.js'
import notesModel from "../schemas/notes-schema.js"
import userModel from "../schemas/user-schema.js";
import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

// */ OBTENER DETALLLES DE UNA CUENTA APARTIR DE _id
const accountRouter= express.Router();

accountRouter.use((req,res, next)=>{
    next()
})
// */MUESTRA EL TOTAL DE LAS CUENTAS
accountRouter.get('/total', async(req,res)=>{
    const user=await userModel.find({}).exec()
    res.send(user)
})

// */MUESTRA lA CUENTA
accountRouter.get('/:_id', async(req,res)=>{
    const {_id}=req.params
    const user=await userModel.findById(_id).exec()
    if(!user) res.status(404).send()
   
    res.send(user.notesREF)
   })
   
// */ PUSH NOTA AL USUARIO
accountRouter.post('/push/:id', async(req,res)=>{
    const id=req.params.id // */ ID DEL USUARIO
    
    const {title, note, UserREF}=req.body
    const newNota= new notesModel({title,note,UserREF:id})
    await newNota.save()
    const user=await userModel.findOne({_id:id}).exec()
    const pusheo=user.notesREF.push(newNota._id)
    user.save()
    res.send()
})

// */ CREAR UNA NUEVA CUENTA
accountRouter.post('/', async (req,res)=>{
    try{
       const pass=req.body.pass
       const ema=req.body.email
       const notesREF=req.body.notesREF
        let newID=uuidv4()
       if(!ema, !pass) return res.status(400).send()
       const user=await userModel.findOne({email:ema}).exec()
       if(user) 
        return res.status(409).send("el usuario ya se encuentra registrado")
       const newUser= new userModel({_id:newID, email:ema, pass, notesREF})
       await newUser.save()
       return res.send('usuario registrado correctamente');}
       catch(error){
        res.status(400).send('ingrese los siguentes campos: email, pass, notesREF')
       }
   })
   
   // */ ACTUALIZAR EL NOMBRE DE UNA CUENTA
accountRouter.patch('/:_id', async(req,res)=>{
       const {_id}=req.params
       const {name}=req.body
   
       if(!name) return res.status(400).send()
   
       const user=await userModel.findById(_id).exec()
      
       if(!user) res.status(404).send()
   
       user.name=name;
       
       await user.save()
   
       return res.send();
   })
   
   // */ ELIMINAR UNA CUENTA
accountRouter.delete('/:_id', async(req,res)=>{
    try{
       const {_id}=req.params
       const userIndex= await userModel.findByIdAndDelete({_id}).exec()
       if(userIndex){res.send('cuenta eliminada correctamente')}
       if(!userIndex){res.status(400).send('La ID ingresado no existe')}
    }catch(error){
        res.status(400).send('error externo')
    }
   })
export default accountRouter