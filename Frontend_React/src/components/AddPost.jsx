import {Button, Card, CardBody, Container, Form, Input, Label } from "reactstrap"
import { loadAllCategories } from "../services/category-service"
import { useEffect, useRef, useState } from "react"
import JoditEditor from "jodit-react"
import { createPost as doCreatePost, uploadPostImage } from "../services/post-service"
import { getCurrentUserDetail } from "../auth"
import axios from "axios"
import { toast } from "react-toastify"

const AddPost=()=>{

    const editor=useRef(null)
    //const [content,setContent]= useState('')

    const[categories,setCategories]=useState([])
    const [user,setUser] =useState(undefined)

    const [post, setPost]= useState({
        title:'',
        content:'',
        categoryId:-1
    })

    const [image,setImage]=useState(null)

   // const config={
   //     placeholder:"Start typing..."
   // }

    useEffect(()=>{
        setUser(getCurrentUserDetail())
        loadAllCategories().then((data)=>{
            console.log(data)
            setCategories(data)
        }).catch(error=>{
            console.log(error)
        })
   
    },[]
    )

    //field changed function
    const fieldChanged=(event)=>{
        //console.log(event)
        setPost({...post,[event.target.name]:event.target.value})
    }

    const contentFieldChanged=(data)=>{
        setPost({...post,'content':data})
    }

    //create post function
    const createPost=(event)=>{
        
        event.preventDefault();
        
        //console.log(post)
        if(post.title.trim()===''){
            toast.error("post title is required !!")
            return;
        }
        if(post.content.trim()===''){
            toast.error("Post content is required")
            return;
        }
        if(post.categoryId===-1){
            toast.error("Select some category")
            return;
        }

        //submit the form on server
        post['userId']=user.id
        doCreatePost(post).then(data=>{

            uploadPostImage(image,data.postId).then(data=>{
                toast.success("Image uploaded!!")
            }).catch(error=>{
                toast.error("Error in uploading image")
                console.log(error)
            })

            toast.success("Post created")
            //console.log(post)
            setPost({
                title:'',
                content:'',
                categoryId:''
            })
        }).catch((error)=>{
            toast.error("Post not created due to some error")
            //console.log(error)
        })
    }

    //handling file change event
    const handleFileChange=(event)=>{
        console.log(event.target.files[0])
        setImage(event.target.files[0])
    }

    return (
        <div className="wrapper">

            <Card className="shadow-sm border-0 mt-2">
                <CardBody>
                    {/*JSON.stringify(post)*/}
                    <h3>What's going in your mind?</h3>
                    <Form onSubmit={createPost}>
                        <div className="my-3">
                            <label for="title">Post title</label>
                            <Input 
                                type="text"
                                id="title"
                                placeholder="Enter here"
                                className="rounded-0"
                                name="title"
                                onChange={fieldChanged}
                            />
                        </div>

                        <div className="my-3">
                            <label for="content">Post Content</label>
                            {/*<Input 
                                type="textarea"
                                id="content"
                                placeholder="Enter here"
                                className="rounded-0"
                                style={{height:'300px'}}
    /                       >*/}   
                            <JoditEditor
                                ref={editor}
                                value={post.content}
                               
                                onChange={contentFieldChanged}
                            />
                        </div>

                        {/*file field*/}
                        <div className="mt-3">
                            <Label for="image">Select Post Banner</Label>
                            <Input id="image" type="file" onChange={handleFileChange}/>
                        </div>

                        <div className="my-3">
                            <label for="category">Post category</label>
                            <Input 
                                type="select"
                                id="category"
                                placeholder="Enter here"
                                name="categoryId"
                                onChange={fieldChanged}
                                defaultValue={-1}
                            >
                                <option disabled value={-1}>---Select Category---</option>
                                {
                                    categories.map((category)=>(
                                        <option value={category.categoryId} key={category.categoryId}>
                                            {category.categoryTitle}
                                        </option>
                                    ))    
                                }
                            </Input>
                        </div>

                        <Container className="text-center">
                            <Button type="submit" color="primary">Create Post</Button>
                            <Button className="ms-3" color="danger">Reset Content</Button>
                        </Container>
                    </Form>
                    
                </CardBody>
            </Card>
        </div>
    )
}

export default AddPost