import {Navbar,Nav,NavDropdown,Form,FormControl,Button} from 'react-bootstrap' 
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image'
import {useRouter} from 'next/router'
import { GlobalState } from '../GlobalState';
import  React,{ useContext } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

function Header() {
  const router = useRouter()
  const showHeader = router.pathname === '/' ? true : false;

  const state = useContext(GlobalState);
     const [islogged]= state.User.isLogged

const logoutUser = async()=>{
    await axios.get('/api/logout')
      localStorage.removeItem('firstLogin')
      swal({icon:"success",text:"Bye",timer:"2000"}).then(function(){
        window.location.href="/";
    },2000)
}

  const userLogged = () => {
    return (
      <>
        <NavDropdown title="Options" id="basic-nav-dropdown">
        <NavDropdown.Item href="/SearchResult">HOME</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={logoutUser} >Log Out</NavDropdown.Item>
        </NavDropdown>
      </>
    )
  }

    return (
      <>
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">   
     {/*        <Navbar.Brand href="/">MaGo NetStore</Navbar.Brand> */}
            <Navbar.Brand href="/"> <Image src="/logo.png" alt="Mago SocialNet" width={60} height={60} className="MagNet"/></Navbar.Brand>
            <Navbar.Brand >MaGo NetStore</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    { 
                      islogged ? userLogged():
                      (
                        <React.Fragment>
                        <Nav.Link href="/login">Login</Nav.Link>,
                        <Nav.Link href="/register">Register</Nav.Link>
                        </React.Fragment>
                      )  
                    }
                    </Nav>
                    {
                      !showHeader &&  <Form inline>
                      <FormControl type="text" placeholder="Search" className="mr-sm-2" /><br></br> &nbsp;
                      <Button variant="outline-info">Search</Button>
                  </Form>
                    }
            </Navbar.Collapse>
          </Navbar>
        
        </>
    )
}

export default Header
