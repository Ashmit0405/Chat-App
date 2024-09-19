import jwt from "jsonwebtoken";

const gentoken=(userid,res)=>{
    const token=jwt.sign({userid},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRY})
    const days=process.env.JWT_EXPIRY.substring(0,process.env.JWT_EXPIRY.lastIndexOf('d'));
    res.cookie("jwt_token",token,{
        maxAge: days*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict"
    })
}

export default gentoken