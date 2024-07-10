import { error } from "console";
import foodModel from "../models/foodModel.js";

import fs from "fs";

// add food item

const addFood = async (req, res) => {

    let image_filename = `${req.file.filename}`

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        size:req.body.size,
        image:image_filename
    })
    try{
        await food.save();
        res.status(200).json({
            success:true,
            message:"Food Added"
        })
    }catch(error){
        console.log("error",error );
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

//all food list

const listFood = async(req, res)=>{
    try{
        const foods = await foodModel.find({})
           res.status(200).json({
            success:true,
            foods
           })
        
    }catch{
        console.log("error",error);
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

const removeFood = async(req, res)=>{
    try {
        const food =  await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})
        
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({
            success:true,
            message:"food removed"
        })
        
    } catch (error) {
        console.log("error", error);
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

export {addFood, listFood,removeFood};

