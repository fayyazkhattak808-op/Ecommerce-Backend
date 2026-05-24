import mongoose from "mongoose";
const ConnectDb  =  async (req,res) =>{
    try {
     await mongoose.connect(process.env.MONGO_URL)
     console.log("mongodb connected",mongoose.connection.host);
    } catch (error) {
    console.log("mongodb connection fail", error)
    process.exit(1)
    }
}

export default ConnectDb;
