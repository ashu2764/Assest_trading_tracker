import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import {Assests} from "../models/assests.models.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";




 
 /*
   const avatarLocalPath =  req.files?.avatat[0]?.path;

   if(!avtarLocalpath){
   throw new ApiError(400, "All files are required")

   import uploadon clourdianry form utills

 const avatar =   await uploadOncloudinary(avatrLocalPath)
if(!avatar){
 throw new ApiError(400, "avatar required")

 avatar:avatar.url
}
   }

    */