import Base from "../components/Base"
import userContext from "../context/userContext";
const Services=()=>{
    return(
        <userContext.Consumer>
            {
                (user)=>(
                    <Base>
                        <h1 style={{color:"#660066", padding:"5px",textAlign:"center",margin:"10px"}}>Welcome {user.user.login && user.user.data.name}</h1>
                        <div style={{color:"#660066", padding:"5px",margin:"60px",textAlign:"center"}}>
                            <h4>Sorry, currently we are not providing any paid services</h4>
                        </div>
                    </Base>
                )
            }
        </userContext.Consumer>
    )
}
export default Services;