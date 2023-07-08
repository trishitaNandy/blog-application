import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../components/Base";
import { useEffect, useState } from "react";
import { signUp } from "../services/user-service";
import {toast} from 'react-toastify'

const  Signup=()=>{
   const [data,setData]= useState({
        name:'',
        email:'',
        password:'',
        about:'',
        
    });

    const [isNameInvalid, setIsNameInvalid] = useState(false); // New state variable
    const [isEmailInvalid, setIsEmailInvalid] = useState(false);
    const [isEmailBlank, setIsEmailBlank] = useState(false);
    const [isPasswordBlank, setIsPasswordBlank] = useState(false);


    const [error,setError]= useState({
        errors:{},
        isError:false
    })
    /*useEffect(()=>{
        console.log(data);
    },[data])*/

    //handle change
    const handleChange=(event,property)=>{
        //console.log("name changed")

        //dynamic setting the values
        setData({...data,[property]:event.target.value});

        if (property === 'name') {
            if (event.target.value.length < 4) {
              setIsNameInvalid(true);
            } else {
              setIsNameInvalid(false);
            }
          }
          if (property === 'email') {
            if (event.target.value.length < 1) {
              setIsEmailInvalid(true);
            } else {
              setIsEmailInvalid(false);
            }
          }
          if (property === 'email') {
            if (event.target.value.length < 1) {
              setIsEmailBlank(true);
            } else {
              setIsEmailBlank(false);
            }
          }
          if (property === 'password') {
            if (event.target.value.length < 1) {
              setIsPasswordBlank(true);
            } else {
              setIsPasswordBlank(false);
            }
          }
    
    };
//reseting the form
    const resetData=()=>{
        setData({
            name:'',
            email:'',
            password:'',
            about:'',
        })
    }

    //submitting the form
    const submitForm=(event)=>{
        event.preventDefault();

        if(error.isError){
            toast.error("Form data is invalid, correct all details then submit")
            return;
        }
        
        console.log(data);
        //data validate


        //call server api for sending data
        signUp(data).then((resp)=>{
            console.log(resp)
            if(resp>0){
                setIsNameInvalid(false);
                console.log("success log")
                toast.success("User is registered successfully!! user id "+resp);
                setData({
                    name:'',
                    email:'',
                    password:'',
                    about:'',
                });
                
            }
            else if(resp===-1){
                setIsNameInvalid(true);
                toast.error("Name must be min of 4 characters");
            }
            else if(resp===-2){
                setIsEmailBlank(true);
                toast.error("Email cannot be blank");
            }
            else if(resp===-3){
                setIsEmailInvalid(true);
                toast.error("Email is already registered");
            }
            else if(resp===-4){
                setIsPasswordBlank(true);
                toast.error("Password cannot be blank");
            }
            
           
            
        }).catch((error)=>{
            console.log(error);
            console.log("Error log");

            //handle errors in proper way
            setError({
                errors:error,
                isError:true
            })
        });
    }

    //{JSON.stringify(data)}
    return(
        <Base>
            <Container>
                <Row className="mt-4">   

                    
                    <Col sm={{size:6,offset:3}} >
                        <Card  color="dark" inverse>
                            <CardHeader >
                                <h3>Fill Information to Register !!</h3>
                            </CardHeader>
                            <CardBody>
                                {/*creating form*/}
                                <Form onSubmit={submitForm}>
                                
                                    {/*Name field*/}
                                    <FormGroup>
                                        <Label for="name">Enter Name</Label>
                                        <Input
                                        type="text"
                                        placeholder="Enter here"
                                        id="name"
                                        onChange={(e)=>handleChange(e,'name')}
                                        value={data.name}
                                        invalid={isNameInvalid}
                                        />
                                        <FormFeedback>Name must be min of 4 characters</FormFeedback>
                                    </FormGroup>
                                    
                                    
                                    {/*Email field*/}
                                    <FormGroup>
                                        <Label for="email">Enter email</Label>
                                        <Input
                                        type="email"
                                        placeholder="Enter here"
                                        id="email"
                                        onChange={(e)=>handleChange(e,'email')}
                                        value={data.email}
                                        invalid={isEmailInvalid || isEmailBlank}
                                        />
                                        <FormFeedback>Invalid Email</FormFeedback>
                                        
                                    </FormGroup>
                                    
                                    
                                    {/*Password field*/}
                                    <FormGroup>
                                        <Label for="password">Enter password</Label>
                                        <Input
                                        type="password"
                                        placeholder="Enter here"
                                        id="password"
                                        onChange={(e)=>handleChange(e,'password')}
                                        value={data.password}
                                        invalid={isPasswordBlank}
                                       
                                        />
                                        <FormFeedback>Password cannot be blank</FormFeedback>
                                    </FormGroup>

                                    {/*about field*/}
                                    <FormGroup>
                                        <Label for="about">
                                            Text Area
                                        </Label>
                                        <Input
                                            type="textarea"
                                            placeholder="Enter here"
                                            id="about"
                                            style={{height:"250px"}}
                                            onChange={(e)=>handleChange(e,'about')}
                                            value={data.about}
                                            
                                        />

                                    </FormGroup>
                                    <Container className="text-center">
                                        <Button color="light" outline>Register</Button>
                                        <Button onClick={resetData} color="secondary" type="reset" className="ms-2">Reset</Button>
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
export default Signup;