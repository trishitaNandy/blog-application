import { useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../components/Base";
import {toast} from 'react-toastify'
import { loginUser } from "../services/user-service";
import { doLogin } from "../auth";
import { useNavigate } from "react-router-dom";
import userContext from "../context/userContext";
import { useContext } from "react";

const Login=()=>{

    const userContextData=useContext(userContext);
    
    const navigate=useNavigate()

    const [loginDetail,setLoginDetail]=useState({
        username:'',
        password:''
    })

    const handleChange=(event,field)=>{
        let actualValue=event.target.value
        setLoginDetail({
            ...loginDetail,
            [field]:actualValue
        })
    }

    const handleReset=()=>{
        setLoginDetail({
            username: "",
            password: "",
        });
    };

    const handleFormSubmit=(event)=>{
        event.preventDefault();
        console.log(loginDetail);
        //validation
        if(loginDetail.username.trim()==='' || loginDetail.password.trim()===''){
            toast.error("Username or password is required !!");
            return;
        }
        //submit the data to server to generate token
        loginUser(loginDetail).then((data)=>{
            console.log("user login: ")
            console.log(data)

            //save the data to local storage
            doLogin(data,()=>{
                console.log("login detail is saved to localstorage")

                //redirect to user dashboard page
                userContextData.setUser({
                    data: data.user,
                    login: true,
                })
                navigate("/user/dashboard")
            })

            toast.success("Login Success")
        }).catch(error=>{
            console.log(error)
            if(error.response.status==400 || error.response.status==404){
                toast.error(error.response.data.message)
            }
            else{
                toast.error("Something went wrong on server !!")
            }
            //toast.error("Something went wrong on server !!")
        })
    
    };

    

    return(
        <Base>
            <Container>
                <Row className="mt-4">
                    <Col sm={{size:6,offset:3}}>
                        <Card  inverse style={{ background: "#8B008B", height: "100%" }}>
                            <CardHeader>
                                <h3 className="text-center">Login Here !!</h3>
                            </CardHeader>
                            <CardBody>
                                {/*creating form*/}
                                <Form onSubmit={handleFormSubmit}>
                                    
                                    {/*Email field*/}
                                    <FormGroup>
                                        <Label for="email"><b>Enter email</b></Label>
                                        <Input
                                            type="text"
                                            placeholder="Enter here"
                                            id="email"
                                            value={loginDetail.username}
                                            onChange={(e)=> handleChange(e,'username')}
                                        />
                                        </FormGroup>
                                       
                                        {/*Password field*/}
                                        <FormGroup>
                                            <Label for="password"><b>Enter password</b></Label>
                                            <Input
                                                type="password"
                                                placeholder="Enter here"
                                                id="password"
                                                value={loginDetail.password}
                                                onChange={(e)=> handleChange(e,'password')}
                                            />
                                        </FormGroup>

                                        <Container className="text-center">
                                            <Button color="success" >Login</Button>
                                            <Button onClick={handleReset}  color="warning" className="ms-2" type="reset">Reset</Button>
                                        </Container>
                               
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Base>
    );
};
export default Login;