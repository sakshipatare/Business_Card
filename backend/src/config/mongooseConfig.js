import mongoose from "mongoose";

const url = "mongodb://localhost:27017/busnessCard";
export const connectUsingMongoose = async () => {
    try{
        await mongoose.connect(url, {
            useNewUrlParser: true, //Url
            useUnifiedTopology: true //Server
        });
        console.log("Connect to MongoDB");
    }catch(err){
        console.log("Error connecting to MongoDB");
        console.log(err);
    }
}