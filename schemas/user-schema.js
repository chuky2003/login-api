import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    _id: {type:String, _id:false},
    email: {type:String,required:true},
    pass:{type:String, required:true},
    notesREF:{
        type: Array,
        ref: 'notes'}
})

const userModel=mongoose.model('User', userSchema);

export default userModel;