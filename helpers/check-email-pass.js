import {users} from '../bbdd.js'
import userModel from "../schemas/user-schema.js";

const checkEmailPass=async(ema,password,res)=>{
    const user=await userModel.findOne({email:ema}).exec()
    if(!user){
        res.status(401).send({error:"el email ingresado no existe"})
    }
    if(user){
        if(user.pass!=password){
            res.status(401).send({error:"contraseña incorrecta"})
        }
        if(user.pass===password){
            return user._id
        }
    }
}
export default checkEmailPass;