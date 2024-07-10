import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const placeOrder = async(req, res) => {

    const frontend_Url ="http://localhost:3000"
    try {

        const previousOrder = await orderModel.findOne({userId:req.body.userId}).sort({_id:-1})
        if(previousOrder){
            previousOrder.order_status = "closed";
            await previousOrder.save()
        }
        
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
        })
        await newOrder.save();

        

        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        const line_item = req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100*80

            },
            quantity:item.quantity
        }))

        line_item.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100*80
            },
            quantity:1
        })

        const session = await stripe.checkout.sessions.create({
            line_items:line_item,
            mode:'payment',
            success_url:`${frontend_Url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_Url}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.json({
            success:true,
            session_url:session.url
        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}

const verifyOrder = async(req, res)=>{
    const {orderId, success} = req.body;
    try {
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({
                success:true,
                message:"Paid"
            })
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({
                success:false,
                message:"Not Paid"
            })
        }
    } catch (error) {
        console.log("error",error);
        res.json({
            success:false,
            message:ErrorEvent.message
        })
    }
}
//user order for frontend
const userOrders = async(req, res)=>{
    try {
        const orders = await orderModel.find({userId:req.body.userId,order_status:"open"})
        
        res.json({
            success:true,
            data:orders
        })
    } catch (error) {
        console.log("error",error);
        res.json({
            success:false,
            message:ErrorEvent.message
        })
    }
}

const listOrders  = async (req, res) =>{
    try {
        const orders = await orderModel.find({});
        const allOrderItem = [];
        for (let index = 0; index < orders.length; index++) {
            const element = orders[index];
            if(element.order_status == "open"){
                allOrderItem.push(element);
            }
        }
        res.json({
            success:true,
            data:allOrderItem
        })
    } catch (error) {
        console.log("error",error);
        res.json({
            success:false,
            message:ErrorEvent.message
        })
    }
}

//updating the order status
const updateStatus = async(req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{$push:{status:req.body.status}});
       
        res.json({
            success:true,
            message:"Status Updated"
        })
    } catch (error) {
        console.log("error",error);
        res.json({
            success:false,
            message:ErrorEvent.message
        })
    }
    
}

export {placeOrder, verifyOrder, userOrders, listOrders, updateStatus}