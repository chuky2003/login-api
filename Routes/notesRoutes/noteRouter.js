import express from "express"
import notesModel from "../../schemas/notes-schema.js"
import mongoose from "mongoose"
const router=express.Router()

// */ CREAR UNA NOTA
router.post('/',async(req,res)=>{
  try{
  const {title, note, UserREF}=req.body
  const newNota= new notesModel({title,note,UserREF})
  await newNota.save()
  return res.json(newNota)
}catch(error){
  return res.send(error)
}
})
// */MUESTRA UNA NOTA
router.get('/find/:_id', async(req,res)=>{/*
  let id=req.params._id
  let arrId=[];
  arrId=id.split(',')
  console.log(arrId)
  console.log(arrId.length)
  let nota=[];
  for (let i = 0; i < arrId.length; i++) {
    let _id=arrId[i]
    nota.push(await notesModel.findById(_id).exec())
  }
  console.log(nota)
  res.send(nota)
  */
  try{
  const _id=req.params._id
  const nota=await notesModel.findById(_id).exec()
  res.json(nota)}
  catch(error){
    return res.send({error:"the note ingresed not exists"})
  }
})
async function juan(mar){
  for (let i = 0; i < 9; i++) {
    mar.push('hola')
  
  return mar
  }
}
// */MUESTRA TODAS LAS NOTAS
router.get('/all',async(req,res)=>{
    const savedNotes= await notesModel.find().exec()
    res.json(savedNotes)
})

export default router