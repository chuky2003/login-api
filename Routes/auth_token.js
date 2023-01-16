
import {Router} from "express";
import authByEmailPwd from '../helpers/check-email-pass.js'
import {SignJWT, jwtVerify} from "jose";

const authTokenRouter=Router()

authTokenRouter.post("/login", async(req,res)=>{

    const {email, password}=req.body

    if(!email || !password) return res.sendStatus(400)
    
    try{
        const user= authByEmailPwd(email, password,res);
        const id= await user
        if(id!==undefined){
        // !GENERAR TOKEN Y DEVOLVERLO
        const jwtConstructor= new SignJWT({ id });
        const encoder=new TextEncoder();
        const jwt=await jwtConstructor
        .setProtectedHeader({alg:"HS256", typ:"JWT"})
        .setIssuedAt()
        .setExpirationTime("1h")
        .sign(encoder.encode(process.env.JWT_PRIVATE_KEY))
        res.cookie("name" , 'value', {expire : new Date() + 9999});
        return res.send({ jwt });
        }
        
    } catch (error) {
        return res.sendStatus(401)

    }

})
authTokenRouter.get("/profile", async(req,res)=>{
    const {authorization}= req.headers;

    if(!authorization) return res.sendStatus(401)

    try {
        const encoder=new TextEncoder();
        const jwtData=await jwtVerify(authorization, encoder.encode(process.env.JWT_PRIVATE_KEY))
        const jwt=(jwtData.payload)
        res.send({jwt})
    } catch (error) {
        return res.sendStatus(401)
    }/*
    const user= users.find(user =>user.guid === userSession.guid)

    if(!user) return res.sendStatus(401)

    delete user.password;*/
})

export default authTokenRouter;