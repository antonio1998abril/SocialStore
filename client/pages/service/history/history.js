import axios from 'axios'
import React, { useContext,useEffect,useState } from 'react'
import { GlobalState } from '../../../component/GlobalState'
import { PayPalButton } from "react-paypal-button-v2";

import {Card,Button} from 'react-bootstrap' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons' 
import swal from 'sweetalert'

import Navbar from '../../../component/sidebar/Navbarside';
import Login from '../../login';
import Link from 'next/link';



function history() {
    const state= useContext(GlobalState)
    const [cart,setCart]=state.User.cart
    const [total,setTotal] =useState(0)
  
    const [token]=state.token
    const [islogged]= state.User.isLogged
    

    
    useEffect(()=>{
    
        const getTotal =()=>{
            const total= cart.reduce((prev,item)=>{
                 return prev + (item.price * item.quantity)
            },0)
                setTotal(total)
            }
            getTotal()
        },[cart])
    
        const addToCart = async(cart)=>{
            await axios.patch('/api/addcart',{cart},{
                headers:{Authorization: token}
            })
        }
    
        const increment =(id)=>{
            cart.forEach(item =>{
                if(item._id === id){
                    item.quantity += 1
                }
            })
            setCart([...cart])
            addToCart(cart)
        }
        const decrement =(id)=>{
            cart.forEach(item =>{
                if(item._id === id){
                    item.quantity === 1 ? item.quantity = 1: item.quantity -= 1
                }
            })
            setCart([...cart])
            addToCart(cart)
        }
    
        const  removeProduct= id=>{
            swal({
                title:"Delete Porduct",
                text: "Do you want to delete this product?",
                icon:"warning",
                buttons:["No","Yes"]
            }).then(res=>{
                if(res){
                    cart.forEach((item,index)=>{
                        if(item._id === id){
                            cart.splice(index,1)
                        }
                    })
                    setCart([...cart])
                    addToCart(cart)
                }
            })
        }
        

/*         const tranSuccess = async(payment) => {
            const {paymentID, address} = payment;
    
            await axios.post('/api/paymentdone', {cart, paymentID, address}, {
                headers: {Authorization: token}
            })
    
            setCart([])
            addToCart([])
            alert("You have successfully placed an order.")
           
        } */

        
        if(!islogged){return  <Login/>}
    return (
        <main className="content">
        {islogged && <Navbar/>}
            <Link  href="/service/history/orderHistory">
             <Button variant="outline-danger"> See My Sales  </Button>
            </Link>
            
        {       cart.map(product=>(
                    <Card  key={product._id} className="cardI"  >
                    <Card.Img variant="top"  src={product.images.url}  />
                    <Card.Body>
                      <Card.Title>{product.title}</Card.Title>
                      <Card.Subtitle>${product.price * product.quantity}</Card.Subtitle>
                      <Card.Text>
                        {product.description}
                        {product.content}
                      </Card.Text>
                      <div className="amount">
                                <button className="btn" onClick={()=>decrement(product._id)}>-</button>
                                    <span>{product.quantity}</span>
                                <button className="btn" onClick={()=>increment(product._id)}>+</button>    
                            </div>
                     <Button onClick={()=> removeProduct(product._id)}  className="btn btn-danger btn-flat delete">
                        <FontAwesomeIcon 
                            icon={faTimes } 
                            style={{color: "white"}} 
                            inverse transform="shrink-2" 
                            size = '1x' 
                            
                        > 
                        
                        </FontAwesomeIcon> 
                     </Button>
                    </Card.Body>
               </Card>      
                ))
            }
  
                <div className="total">
                <h3>Total: ${total}</h3>
        <PayPalButton

        createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  currency_code: "USD",
                  value:total,
                }
              }],

            });
          }}
        onSuccess={async(details, data) => {
/*             alert("Transaction completed by " + details.payer.name.given_name); */
            swal({icon:"success",text:`Transaction completed by ${details.payer.name.given_name}`,timer:"2000",buttons: false});
            // OPTIONAL: Call your server to save the transaction
/*             return fetch("/api/paymentdone", {
              method: "POST",
              body: JSON.stringify({
                paymentID: data.orderID,
                address:details.payer.address,
                cart: cart
              })
            }); */


         
            const paymentID = data.orderID;
            const address=details.payer.address;
            const val = cart
           
            await axios.post('/api/paymentdone', {val, paymentID, address}, {
                headers: {Authorization: token}
            })
            setCart([])
            addToCart([])

            /* reload info purchases and sales */
          }}
      />

            </div>
            
        </main>
    )
}

export default history
