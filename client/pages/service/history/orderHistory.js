import {Button} from 'react-bootstrap' 
import Link from 'next/link'
import React, { useContext, useEffect} from 'react'
import { GlobalState } from '../../../component/GlobalState'
import Navbar from '../../../component/sidebar/Navbarside';
import Login from '../../login';
import axios from 'axios';


    const orderHistory = () =>{
    const state =useContext(GlobalState)
    const [islogged]= state.User.isLogged
    const [history,setHistory]=state.User.history
    const [historymy,setHistorymy]=state.User.historymy
    const [token]=state.token
    
  
    useEffect(()=>{
        if (token){
            const getHistory =async()=>{
                    const respaymnet= await axios.get('/api/payment',{
                        headers:{Authorization: token}
                    })
                    setHistory(respaymnet.data)

                    const reshistory= await axios.get('/api/history',{
                        headers:{Authorization: token}
                    })
                    setHistorymy(reshistory.data) 
         
            }
            getHistory()
        }
    },[token])


if(!islogged) {return <Login/>}
    return (
        
        <main className="content">
        {
            islogged && <Navbar/>
        }
        
            <Link  href="/service/history/orderPurchases">
                <Button variant="outline-danger"> See My Purchases </Button>
            </Link>
         <div className="tableshop">

            <h2 className="reveal-text">History</h2>

            <h5>{history.length} Orders completed successfully</h5>
            <div className="history-page">
                <table>
                    <thead>
                        <tr>
                            <th>Payment ID</th>
                            <th>Date of Purchased</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            history.map(items =>(
                                <tr key={items.identifier}>
                                    <td>{items.paymentID}</td>
                            <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                            <td><Link href="/service/history/orderDetails/[orderDetails]"  as={`/service/history/orderDetails/${items.idPayment}`}>View</Link></td> 
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>  
        </div>
    </main>
    )
}

export default orderHistory
