import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
    path: "./env",
});

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is runnig at Port: ${process.env.PORT}`);
        });
        app.on("ERROR", (error) => {
            console.log("Error while starting the server", error);
            throw error;
        });
    })
    .catch((err) => {
        console.log("MongoDb Connection failed !!!", err);
    });
