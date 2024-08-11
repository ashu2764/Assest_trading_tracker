import mongoose from "mongoose";


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}}`
        );
        console.log(
            `\n MongoDB connect !! DB HOST : ${connectionInstance.connection.host}`
        );
        // console.log(connectionInstance)
    } catch (error) {
        console.log("MonoDB connection error", error);
        process.exit(1);
    }
};

export default connectDB;
