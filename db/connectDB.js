import mongoose from "mongoose"

export const connectDB = async (url) => {
    if(!url){
        console.log('Please provide mongodb connection str!')
        process.exit(1)
    }
    try{
        await mongoose.connect(url)
        console.log('Database connection established!')
    }
    catch(error){
        console.error(`Database Connection Failed: ${error.message || "An Unknown Error Occurred!"}`);
        process.exit(1)
    }
}