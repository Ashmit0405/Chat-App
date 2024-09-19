import User from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js";

export const getusers=async(req,res)=>{
    try {
        const loginuserid=req.user._id;
        const filtered_users=await User.find({_id:{$ne:loginuserid}}).select("-password");
        res.status(200).json(new ApiResponse(200,filtered_users));
    } catch (error) {
        throw new ApiError(404,"Cannot get users");
    }
}