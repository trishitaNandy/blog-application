import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardText } from 'reactstrap'
import { getCurrentUserDetail, isLoggedIn } from '../auth'
import userContext from '../context/userContext'
import { useContext } from 'react'
import "../App.css"


function Post({post={ id:-1, title:"This is default post title",content:"This is default post content"},deletePost}) {
  
  const userContextData= useContext(userContext)
  const [user, setUser]=useState(null)
  const [login, setLogin]=useState(null)
  useEffect(()=>{
    setUser(getCurrentUserDetail())
    setLogin(isLoggedIn())
  },[])
  return (
    <Card className='border-0 shadow-sm mt-3 ' >
        <CardBody>
            <h1>{post.title}</h1>
            <CardText dangerouslySetInnerHTML={{__html:post.content.substring(0,30)+"..."}}>
                
            </CardText>

            <div>
                <Link className='btn btn-secondary border-0' to={'/post/'+post.postId} style={{background:"#8B008B"}}>Read More</Link>

                {userContextData.user.login && (user && user.id===post.user.id ?<Button onClick={()=>deletePost(post)} color='danger' className='ms-2'>Delete</Button>:'')}
                {userContextData.user.login && (user && user.id===post.user.id ?<Button tag={Link} to={`/user/update-blog/${post.postId}`} color='warning' className='ms-2'>Update</Button>:'')}
                

            </div>
        </CardBody>
    </Card>
  )
}

export default Post