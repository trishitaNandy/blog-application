import { useState, useEffect } from "react";
import { Link, NavLink as ReactLink, useNavigate } from "react-router-dom";
import {Navbar,NavbarBrand,NavbarToggler,Collapse,Nav,NavLink, NavItem,UncontrolledDropdown,DropdownToggle,DropdownMenu,DropdownItem,NavbarText, Container} from "reactstrap";
import { doLogout, getCurrentUserDetail, isLoggedIn } from "../auth";
import userContext from "../context/userContext";
import { useContext } from "react";
const CustomNavbar=()=>{
    const userContextData= useContext(userContext)
    const navigate= useNavigate()

    const [isOpen, setIsOpen] =useState(false)

    const [login,setLogin]=useState(false)
    const [user,setUser]= useState(undefined)

    useEffect(()=>{
      setLogin(isLoggedIn());
      setUser(getCurrentUserDetail());
    },[login]);

    const logout=()=>{
      doLogout(()=>{
        //logged out
        setLogin(false)
        userContextData.setUser({
          data: null,
          login: false
        });
        navigate("/")
      })
    }

    return (
  
    <div>
      <Navbar 
            style={{ background: "#8B008B", height: "100%" }}
            
            dark
            expand="md"
            fixed=""
            className="px-5 "
            
            
      >
       
        <NavbarBrand tag={ReactLink} to="/" >MyBlogs</NavbarBrand>
        <NavbarToggler onClick={()=>setIsOpen(!isOpen)}  />
        <Collapse isOpen={isOpen}  navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={ReactLink} to="/" >News Feed</NavLink>
            </NavItem>
            
            <NavItem>
              <NavLink tag={ReactLink} to="/about" >About</NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={ReactLink} to="/services" >Services</NavLink>
            </NavItem>
            
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Contact us</DropdownItem>
                <DropdownItem divider />
                <DropdownItem><Link tag={ReactLink} to="https://www.facebook.com/" color="black">FaceBook</Link></DropdownItem>
                <DropdownItem><Link tag={ReactLink} to="https://youtube.com/channel/UCo2L8uvEwGXwlG3Vryj0TXw" color="black">YouTube</Link></DropdownItem>
                <DropdownItem><Link tag={ReactLink} to="https://www.instagram.com/trishita.nandy.10" color="black">Instagram</Link></DropdownItem>
                <DropdownItem><Link tag={ReactLink} to="https://www.linkedin.com/in/trishita-nandy-5b8713231/" color="black">LinkedIn</Link></DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav navbar>
            {
                login && (
                  <>
                    <NavItem>
                      <NavLink tag={ReactLink} to={`/user/profile-info/${user.id}`}>
                        Profile Info
                      </NavLink>
                    </NavItem>
                    
                  <NavItem>
                    <NavLink tag={ReactLink} to="/user/dashboard">
                      {user.email}
                    </NavLink>
                  </NavItem>

                  <NavItem>
                      <NavLink onClick={logout}>
                        Logout
                      </NavLink>
                    </NavItem>
                  </>
                )   
            }
            
            
             {
              !login && (
                <>
                <NavItem>
                    <NavLink tag={ReactLink} to="/login">
                      Login
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={ReactLink} to="/signup">
                      Signup
                    </NavLink>
                </NavItem>
              </>
              )
             }
                
          </Nav>


          
        </Collapse>
        
      </Navbar>
    </div>
  );
}

    
export default CustomNavbar;