import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import "./List.css"

const List = ({url}) => {

  
  const [list,setList] = useState([]);

  const fetchList = async ()=>{
    const response = await axios.get(`${url}/api/food/list`)
    console.log("response", response);
    if(response.data.success){
     setList(response.data.foods)
    }else{
      toast.error("Data not found")
    }
  }
  // console.log("list", list);

  const removeFood = async(foodId)=>{
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId})
    await fetchList()
    if(response.data.success){
      toast.success(response.data.message)
    }else{
      toast.error("Error")
    }
  }

  useEffect(()=>{
    fetchList()
  },[])


  return (
    <>
     <div className='list add flex-col'>
      <p>All food List</p>
      <div className='list-table'>
        <div className='list-table-format title'>
          <b>Image</b>
          <b>Name</b>
          <b>category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index)=>{
          return(
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/` + item.image} alt=''/>
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={()=>removeFood(item._id)} className='cursor'>x</p>
            </div>
          )
        })}
       {/* {console.log("list",list)} */}
      </div>
      
    </div>
    
    
    </>
   
    
  )
}

export default List
