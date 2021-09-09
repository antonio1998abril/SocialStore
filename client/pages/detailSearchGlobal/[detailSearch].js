import React, { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../component/GlobalState';
import {Card,Button,ListGroup,Form} from 'react-bootstrap'  
import axios from 'axios';
import Navbar from '../../component/sidebar/Navbarside'
import Loader from '../../component/Loader/Loader'
import swal from 'sweetalert';
import Login from '../login';

import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag, faPaperPlane} from '@fortawesome/free-solid-svg-icons'

const DetailItem = ( params ) =>{
    /* CART */
    const state = useContext(GlobalState);
    const [islogged]= state.User.isLogged;
    const addCart =state.User.addCart
    /* ROUTER id params*/
    const [info,setInfo]= useState([]); 
    const [idinfo,setid] = useState(params.params)    
 
/*          useEffect(async()=>{
      if(router.query){
          general.forEach(result=>{
              if(result._id === router.query.detailSearch) {
                  setInfo(result)
              }
          })
      }
  },[router.query.detailSearch])  */

useEffect(()=>{
    const  getdetail= (id)=>{
         axios.get(`/api/detail/${id}`).then(result =>{
            setInfo(result.data)
         }).catch(err =>{
            swal({icon:"error",text:err.response.data.msg,timer:"2000"}).then(function(){
                window.location.href="/";
            },2000)
         })
     }
     getdetail(idinfo)
 },[])


    const result = info.hasOwnProperty('images')
    const product = info.hasOwnProperty('sold')
    const port = info.hasOwnProperty('portName')
    const company = info.hasOwnProperty('companyName')
    const user = info.hasOwnProperty('name')


  const companyDetail = () =>{
      return (
    <React.Fragment>
        <ListGroup className="list-group-flush" variant="flush">
            <ListGroup.Item> <b>Email</b> :{info.companyEmail}</ListGroup.Item>
            <ListGroup.Item> <b>Company</b> :{info.companyName}</ListGroup.Item>
            <ListGroup.Item> <b>Service</b> :{info.companyService}</ListGroup.Item>
            <ListGroup.Item> <b>tel :</b> {info.tel}</ListGroup.Item>
        </ListGroup>
{/*         <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label><b>Send a message </b>:</Form.Label>
            <Form.Control  name="message" as="textarea" rows={3} 
            placeholder="type your message" />
        </Form.Group> */}

        <Button variant="warning" type="submit" className="optionItemButton">
            <i><FontAwesomeIcon icon={faPaperPlane } style={{color: "black"}} 
            inverse transform="shrink-5" size = '2x'  /></i>SEND
        </Button>
    </React.Fragment>
      )
}

    const productDetail =() =>{
        return(
        <React.Fragment>
            <ListGroup className="list-group-flush" >
                <ListGroup.Item> <b>Price</b>: {info.price}</ListGroup.Item>
                <ListGroup.Item>  <b>Content</b>: {info.content}</ListGroup.Item>
                <ListGroup.Item>  <b>Category</b>: {info.category}</ListGroup.Item>
                <ListGroup.Item>  <b>Port</b>: {info.port}</ListGroup.Item>
                <ListGroup.Item>  <b>Company</b>: {info.bycompany}</ListGroup.Item>
                <ListGroup.Item>  <b>Sold</b>: {info.sold}</ListGroup.Item>
                <ListGroup.Item>  <b>Descripcion</b>: {info.description}</ListGroup.Item>
                <ListGroup.Item>  <b>Ubicacion</b>: {info.ubication}</ListGroup.Item>
            </ListGroup>
            
             <Button variant="info" type="submit" className="optionItemButton" onClick={() => addCart(info)}>
                <i><FontAwesomeIcon icon={faShoppingBag } style={{color: "white"}} inverse transform="shrink-2" size = '2x'  /></i>
                BUY
            </Button> 
        </React.Fragment>
        )
    }

    const portDetail = () =>{
        return (
            <React.Fragment>
                <ListGroup className="list-group-flush" variant="flush">
                    <ListGroup.Item>  <b>Descripcion </b>: {info.description}</ListGroup.Item>
                    <ListGroup.Item>  <b>Ubicacion</b>: {info.ubication}</ListGroup.Item>
                </ListGroup>
            </React.Fragment>
        )
    }

  const userDetail = () =>{
    return (
        <React.Fragment>
            <ListGroup className="list-group-flush" variant="flush">
                <ListGroup.Item>  <b>Last name</b>: {info.lastname}</ListGroup.Item>
                <ListGroup.Item>  <b>Ocupation</b>: {info.ocupation}</ListGroup.Item>
                <ListGroup.Item>  <b>Service</b>: {info.service}</ListGroup.Item>
                <ListGroup.Item>  <b>Tel</b>: {info.tel}</ListGroup.Item>
                <ListGroup.Item>  <b>Company</b>: {info.company}</ListGroup.Item>
            </ListGroup>

{/*             <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label><b>Send a message :</b></Form.Label>
                <Form.Control  name="message" as="textarea" rows={3} 
                placeholder="type your message"/>
            </Form.Group> */}

{/*             <Button type="submit" variant="warning" className="optionItemButton">
                <i><FontAwesomeIcon icon={faPaperPlane } style={{color: "black"}} inverse transform="shrink-5" size = '2x'  /></i>
                SEND
            </Button> */}

        </React.Fragment>
      )
  }
 
  if(!islogged) {return <Login/>}
    return (
    <main className="content">
                {
                islogged && <Navbar/>
                }
        <div className="product_card"> 
            <Card style={{ width: '100%' }} >
                {
                    result ?  <Card.Img variant="top" src={info.images.url} /> : <></>
                }
            <Card.Body>
                <Card.Title >
                {
                    info.title ? info.title : info.portName ? info.portName : info.companyName ? 
                    info.companyName : info.name ? info.name : info.categoryName
                }
                </Card.Title>
                <Card.Text>
                {info.description ? info.description : info.companyService ? info.companyService 
                : info.email}
                </Card.Text>
            </Card.Body>
                    {
                        product ? productDetail() 
                        : company ? companyDetail() 
                        : port ? portDetail() 
                        : user ? userDetail() 
                        :<Loader/> 
                    }

            </Card>
        </div>
    </main>
    )
}
 DetailItem.getInitialProps = async (context) => {
    return {
        params: context.query.detailSearch
      }   
    };  
     
export default DetailItem