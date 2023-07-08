import React, { useEffect, useState } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { loadAllCategories } from '../services/category-service'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

function CategorySideMenu() {

    const [categories,setCategories]=useState([])

    useEffect(()=>{
        loadAllCategories().then(data=>{
            console.log("loading categories")
            console.log(data)
            setCategories([...data])
        }).catch(error=>{
            console.log(error);
            toast.error("Error in loading category")
        })
    },[])

  return (
    <div>
        <ListGroup>
            <ListGroupItem tag={Link} to="/" action={true}  className='border-0' style={{ background: "#8B008B", height: "100%" , color:"white"}} >
                <b>All blogs</b>
            </ListGroupItem>
            {categories && categories.map((cat,index)=>{
                return(
                    <ListGroupItem tag={Link} to={'/categories/'+cat.categoryId} className='border-0 shadow-0 mt-1' color='info' key={index} action={true} style={{background:"#FAE8F3",color:"#8B008B"}}>
                        <b>{cat.categoryTitle}</b>
                    </ListGroupItem>
                )
            })}
        </ListGroup>
    </div>
  )
}

export default CategorySideMenu