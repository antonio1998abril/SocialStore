import {Navbar,Nav,NavDropdown,Form,FormControl,Button,InputGroup} from 'react-bootstrap' 
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image'
import {useRouter} from 'next/router'
import { GlobalState } from '../GlobalState';
import  React,{ useContext, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';


import Head from 'next/head'

function Header() {
  const router = useRouter()
  /* Verify what page we are, this works to block some configuration of Navbar */
  const showHeader = router.pathname === '/home' ? false : true;

  const state = useContext(GlobalState);
  const [islogged]= state.User.isLogged
  const [search, setSearch] = state.ProductsAPI.search
  const [category, setCategory] = useState({m:''})

  const handleCategory = e=>{
    setCategory(e.target.value)
    setSearch('')
  }

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
        <NavDropdown.Item href="/home">HOME</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={logoutUser} >Log Out</NavDropdown.Item>
        </NavDropdown>
      </>
    )
  }
    return (
      <>
        <Head>
          <title >MaGo SocialStore</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/logo.png" />
        </Head>

        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">   
     {/*        <Navbar.Brand href="/">MaGo NetStore</Navbar.Brand> */}
            <Navbar.Brand href="/"> <Image src="/logo.png" alt="Mago SocialNet" width={60} height={60} className="MagNet"/></Navbar.Brand>
            <Navbar.Brand style={{fontFamily:'Ubuntu'}}>MaGo NetStore</Navbar.Brand>
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
{/*                       <FormControl type="text" placeholder="Search" className="mr-sm-2" /><br></br> &nbsp; */}
                      <Form.Control  type="text" placeholder="Title or Description" value={search} className="mr-sm-2"  onChange={e=>setSearch(e.target.value.toLowerCase())} variant="outline-info"/>

                   {/*    <select name="category" value={category} onChange={handleCategory} >
                <option value=''>All Products</option>
                </select> */}
                  </Form>
                    }
            </Navbar.Collapse>
        </Navbar>
    </>
    )
}

export default Header
