import React, { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../../../component/GlobalState'
import { useRouter } from 'next/router'

function orderDtails() {
    const state =useContext(GlobalState)
    const [history] = state.User.history
    const [OrderDetails,setOrderDetails]= useState([])

    const router = useRouter()
    useEffect(()=>{
        if(router.query){
            history.forEach(item=>{
                if(item.idPayment === router.query.orderDetails){
                    setOrderDetails (item)
                }
            })
        }
    },[router.query.orderDetails,history])

    
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
                        <td>{OrderDetails.sendedto}</td>
                        <td>{OrderDetails.address.address_line_1 + " - " + OrderDetails.address.admin_area_1}</td>
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
                    <tr>
                    <td>{OrderDetails.title}</td>
                    <td>{OrderDetails.quantity} X {OrderDetails.price}</td>
                    <td>{OrderDetails.price}</td>
                    </tr>
                   
                </tbody>
            </table>
            
        </div>
        </main>
    )
}

export default orderDtails
