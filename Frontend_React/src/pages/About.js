import Base from "../components/Base";
import userContext from "../context/userContext";

const About=()=>{
    return (
        <userContext.Consumer>
            {(object)=>(
                <Base>
                    {console.log(object)}
                    <h1 style={{color:"#660066", padding:"5px",textAlign:"center",margin:"10px"}}>Welcome {object.user.login && object.user.data.name} !!</h1>
                    <div style={{color:"#660066", padding:"5px",margin:"60px",marginLeft:"300px"}}>
                        <h5>This is the About page of this blog application. The main features of this application is:</h5>
                        <ul>
                            <li>Here user can write any blog and format it and upload an image with the blog</li>
                            <li>User can edit or delete a blog  </li>
                            <li>User can comment on any blog after login</li>
                            <li>Spring boot is used to create backend APIs and maintain database of the application</li>
                            <li>React is used to create UI of the application</li>
                        </ul>
                        <h6 style={{marginTop:"90px"}}>This Application is created by TRISHITA NANDY, JNU, New Delhi</h6>
                    </div>
                </Base>
            )}
        </userContext.Consumer>
            
        
    );
};

export default About;