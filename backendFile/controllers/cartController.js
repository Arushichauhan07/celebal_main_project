import userModel from "../models/userModel.js";

//add item to the cart
const addToCart = async(req, res) =>{
    try {
        let userData = await userModel.findOne({_id:req.body.userId});
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1
        }else{
            cartData[req.body.itemId] += 1
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({
            success:true,
            message:"Added to Cart"
        })
    } catch (error) {
        console.log("error",error);
        res.json({
            success:false,
            message:error.message
        })
    }
}

//remove item to the cart
const removeFromCart = async(req, res)=>{
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({
            success:true,
            message:"Removed from cart"
        })
    } catch(error) {
        console.log("error",error);
        res.json({
            success:false,
            message:error.message
        })
    }
}

//fetch userCart data
const getCart = async(req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({
            success:true,
            cartData
        })
    } catch (error) {
        console.log("error",error);
        res.json({
            success:false,
            message:error.message
        })
    }
}

export {addToCart, removeFromCart, getCart}