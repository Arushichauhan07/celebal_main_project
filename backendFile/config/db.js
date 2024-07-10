import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://chauhanarushi0709:Shvj0JA3nQHTRKAa@cluster0.bxwtwwd.mongodb.net/shipment-del').then(()=>{
        console.log("database connected");
    })
}