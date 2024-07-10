import express from "express";
import {addFood, listFood, removeFood} from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router()


//image storage engine
const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, "uploads")
    },
    filename: function (req, file, cb){
        return cb(null, file.originalname)
       
        
    }
})

const upload = multer({ storage: storage })

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list",listFood);
foodRouter.post("/remove",removeFood)

export default foodRouter