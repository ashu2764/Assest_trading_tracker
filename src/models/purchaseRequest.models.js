import mongoose, { Schema } from "mongoose";
import { type } from "os";

const paymentSchema = new Schema({
    asset:{
        type:Schema.Types.ObjectId,
        ref:"Assets"
    }
}, {timestamps:true})




export const Payment = new mongoose("Payment", paymentSchema)