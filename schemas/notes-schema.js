import mongoose from "mongoose";


const notesSchema=mongoose.Schema({
    title:{type:String},
    note:{type:String},
    UserREF:{
        type: Array,
        ref: 'users'
    }
})

const notesModel=mongoose.model('notes', notesSchema)

export default notesModel;