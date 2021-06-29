import React, { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../../../component/GlobalState'
import { useRouter } from 'next/router'
function purchases() {
    const state =useContext(GlobalState)
    const [history] = state.User.historymy
    const [OrderDetails,setOrderDetails]= useState([])

    const router = useRouter()
    useEffect(()=>{
        if(router.query){
            history.forEach(item=>{
                if(item._id === router.query.purchases){
                    setOrderDetails (item)
                }
            })
        }
    },[router.query.purchases,history])
    
    if(OrderDetails.length ===0)return null;
    return (
    <main className="content">    
        <div className="history-page">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Postal Code</th>
                        <th>Country Code</th>
                
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{OrderDetails.name}</td>
                        <td>{OrderDetails.address.address_line_1 + " - " + OrderDetails.address.city}</td>
                        <td>{OrderDetails.address.postal_code}</td>
                        <td>{OrderDetails.address.country_code}</td>
                    </tr>
                </tbody>
            </table>

            <table style={{margin: "30px 0px"}}>
                <thead>
                    <tr>
                        <th>Products</th>
                        <th>Quantity</th>
                        <th>Price</th>
                
                    </tr>
                </thead>
                <tbody>
                    {
                        OrderDetails.cart.map(item=>(
                        <tr key={item._id}>
                    {/* <td><img src={item.images.url} alt=""></img></td> */}
                        <td>{item.title}</td>
                        <td>{item.quantity} X {item.price}</td>
                        <td>${item.price * item.quantity}</td>

                            </tr>
                        
                        ))
                    }
                </tbody>
            </table>
        </div>
    </main>    
       )
}

export default purchases
