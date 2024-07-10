import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import "./Add.css";
import axios from "axios";
import { toast } from 'react-toastify';

const Add = ({url}) => {
    
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name:"",
        description:"",
        price:"",
        size:"",
        category:"Salad"
    });

    const onChangeHandler = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }
    
    const onSubmitHandler = async(event) => {
        event.preventDefault();
        const formData = new FormData();
    
        formData.append("name",data.name);
        formData.append("description",data.description)
        formData.append("price",Number(data.price))
        formData.append("category",data.category)
        formData.append("image",image)
        formData.append("size",data.size)
        
        console.log(formData);
        const response = await axios.post(`${url}/api/food/add`,formData);
        if(response.data.success){
            setData({
                name:"",
                description:"",
                price:"",
                size:"",
                category:"Salad"
            })
            setImage(false)
            toast.success(response.data.message)
        }else{
            toast.error(response.data.message)
        }
        // console.log("response",response);
        
    }
  return (
    <div>
      <div className='add'>
        <form className="flex-col" onSubmit={onSubmitHandler}>
            <div className='add-img-upload flex-col'>
                <p>Upload Image</p>
                <label htmlFor='image'>
                    <img src={image?URL.createObjectURL(image):assets.upload_area}></img>
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
            </div>
            <div className='add-product-name flex-col'>
                <p>Product name</p>
                <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
            </div>
            <div className='add-product-description flex-col'>
                <textarea onChange={onChangeHandler} value={data.description} name='description' rows='6' placeholder='Write content here'></textarea>
            </div>
            <div className='add-product-description flex-col'>
                <input onChange={onChangeHandler} value={data.size} name='size' placeholder='Write the size of the parcel'></input>
            </div>
            <div className='add-category-price'>
                
                <p>Product Category</p>
                <select onChange={onChangeHandler} value={data.category} name='category'>
                    <option value="Salad">Salad</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Deserts">Deserts</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Cake">Cake</option>
                    <option value="Pure Veg">Pure Veg</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Noodles">Noodles</option>
                </select>
                
               
                <p>Product Price</p>
                <input onChange={onChangeHandler} value={data.price} type='Number' name='price' placeholder='$20'/>
            </div>
           
            
            <button type='submit' className='add-btn'>
                Add
            </button>
        </form>
      </div>
    </div>
  )
}

export default Add
