import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//login user
const loginUser = async(req, res)=>{
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});

        if(!user){
            res.json({
                success:false,
                message:"user doesn't exist"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.json({
                success:false,
                message:"Invalid credentials"
            })
        }

        const token = createToken(user._id);

        res.json({
            success:true,
            token
        })
    } catch (error) {
        console.log("error", error);
        res.json({
            success:false,
            message:error.message
        })
    }
}

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register user
const registerUser = async(req, res)=>{
    const {name, password, email} = req.body;
    try {
        const exist = await userModel.findOne({email});
        if(exist){
            return res.json({
                success:false,
                message:"user already exist"
            })
        }

        //validating email and password
        if(!validator.isEmail(email)){
            return res.json({
                success:false,
                message:"Please enter valid email"
            })
        }

        if(password.length<8){
            return res.json({
                success:false,
                message:"Please enter strong password"
            })
        }

        //hashing user password 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        await newUser.save()

        const user = await newUser.save()
        const token = createToken(user._id)

        res.json({
            success:true,
            token
        })
    } catch (error) {
        console.log("error",error);
        res.json({
            success:false,
            message:error.message
        })
    }
}
export {loginUser, registerUser}
