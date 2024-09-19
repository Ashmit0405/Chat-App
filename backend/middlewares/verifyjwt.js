import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";
import User from "../models/user.model.js";

const verifyJwt=async(req,res,next)=>{
    try {
        const token=req.cookies.jwt_token;
        if(!token){
            throw new ApiError(500,"Token not found");
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            throw new ApiError(500,"Token not valid");
        }
        const user=await User.findById(decoded.userid).select("-password");
        if(!user){
            throw new ApiError(500,"User not found");
        }
        req.user=user
        next();
    } catch (error) {
        res.status(500).json({error: "Token error"})
    }
}
export default verifyJwt;