import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {assets} from '../../assets/assets';
import "./Orders.css"

const Orders = ({url}) => {
  const[orders, setOrders] = useState([]);
  const fetchAllOrders = async()=>{
    const response = await axios.get(url+"/api/order/list")
    if(response.data.success){
      setOrders(response.data.data)
      console.log(response.data.data);
    }else{
      toast.error("Error")
    }
  }

  const statusHandler = async(event, orderId)=>{
      
      const response = await axios.post(url+"/api/order/status",{
        orderId,
       
        status:event.target.value
      })
      if(response.data.success){
        await fetchAllOrders();
      }
  }
  useEffect(()=>{
    fetchAllOrders()
  },[])
  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className='order-list'>
        {orders.map((order, index)=>{
          return(
             <div key={index} className='order-item'>
            <img src={assets.parcel_icon}/>
            <div>
              <p className='order-item-food'>{order.items.map((item, index)=>{
                if(index === order.items.length-1){
                  return item.name + " x " + item.quantity
                }else{
                  return item.name + " x " + item.quantity + ","
                }
              })}
              </p>
              <p className='order-item-name'>{order.address.firstName+ " " + order.address.lastName}</p>
              <div className='order-item-address'>
              <p>{order.address.street+ ","}</p>
              <p>{order.address.city+ "," + order.address.state+ "," + order.address.country+","+order.address.zipCode}</p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <p>Item:{order.items.length}</p>
            <p>{order.address.amount}</p>
            <select onChange={(event)=>statusHandler(event, order._id)} value={order.status}>
              <option value="order Received">order Received</option>
              <option value="Preparing Your order">Preparing Your order</option>
              <option value="Rider assigned">Rider assigned</option>
              <option value="Your order is prepared">Your order is prepared</option>
              <option value="Rider is out for delivery">Rider is out for delivery</option>
              <option value="Reaching in 15 minutes....">Reaching in 15 minutes....</option>
              <option value="Reaching in 2 minutes....">Reaching in 2 minutes....</option>
              <option value="Entered in you area">Entered in you area</option>
              <option value="Arrived at your location">Arrived at your location</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
          )
         

        })}
      </div>
    </div>
  )
}

export default Orders
