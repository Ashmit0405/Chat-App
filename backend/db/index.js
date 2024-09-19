import mongoose from "mongoose";

const connecttodb=async()=>{
    try {
        const res=await mongoose.connect(process.env.MONGO_DB_URI);
        console.log(res.connection.host);
    } catch (error) {
        console.log(error);
    }
}

export default connecttodb;