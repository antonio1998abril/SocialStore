import axios from 'axios'
import React, { useContext,useEffect,useState } from 'react'
import { GlobalState } from '../../../component/GlobalState'
import PaypalButton from '../../api/PaypalButton'
import {Card,Button,ListGroup,Form} from 'react-bootstrap'  

function history() {
    const state= useContext(GlobalState)
    const [cart,setCart]=state.User.cart
    const [total,setTotal] =useState(0)
  
    const [token]=state.token
console.log(cart)
    
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
            if(window.confirm("Do you want to delete this product?")){
                cart.forEach((item,index)=>{
                    if(item._id === id){
                        cart.splice(index,1)
                    }
                })
                setCart([...cart])
                addToCart(cart)
            }
        }
        
        const tranSuccess = async(payment) => {
            const {paymentID, address} = payment;
    
            await axios.post('/api/payment', {cart, paymentID, address}, {
                headers: {Authorization: token}
            })
    
            setCart([])
            addToCart([])
            alert("You have successfully placed an order.")
           
        }

    return (
        <main className="content">
            <Card style={{ width: '100%' }} className="product_card">
{/*             <Card.Body>
                <Card.Title >
               ss
                </Card.Title>
                <Card.Text>
              ss
                </Card.Text>
           
            </Card.Body> */}
                        {
                cart.map(product=>(
               
                    <div className="detail cart" key={product._id}>
                        {/*       <img src={detailproduct.images.url} alt="" className="img_container"></img> */}
                        <div className="box-detail">
                            <h2>{product.title}</h2>
                            <span>${product.price * product.quantity}</span>
                            <p>{product.description}</p>
                            <p>{product.content}</p>

                            <div className="amount">
                                <button onClick={()=>decrement(product._id)}>-</button>
                                    <span>{product.quantity}</span>
                                <button onClick={()=>increment(product._id)}>+</button>    
                            </div>

                            <div className="delete" onClick={()=> removeProduct(product._id)}>
                                    X
                                    </div>
                            </div>
                        </div>
                    
                ))
            }
                        <div className="total">
                <h3>Total: ${total}</h3>
                
                <PaypalButton
                total={total}
                tranSuccess={tranSuccess}
                />

            </div>
            </Card>
        </main>
    )
}

export default history
