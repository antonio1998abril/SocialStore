import React, { useContext} from 'react'
import { GlobalState } from '../../../component/GlobalState'
import Navbar from '../../../component/sidebar/Navbarside';
import Login from '../../login';
import Link from 'next/link'
import {Button} from 'react-bootstrap' 

function orderPurchases() {
    const state =useContext(GlobalState)
    const [islogged]= state.User.isLogged
    const [historymy,setHistorymy]=state.User.historymy
    
if(!islogged) {return <Login/>}
    return (
        <main className="content">
        {
            islogged && <Navbar/>
        }
            <Link  href="/service/history/orderHistory">
                <Button variant="outline-danger"> ComeBack to my Sales </Button>
            </Link>
        <div className="tableshop">

            <h2 className="reveal-text">Purchases</h2>

            <h5>{historymy.length} Purchases completed successfully</h5>
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
                            historymy.map(items =>(
                                <tr key={items._id}>
                                    <td>{items.paymentID}</td>
                            <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                            <td><Link href="/service/history/myPurchases/[purchases]"  as={`/service/history/myPurchases/${items._id}`}>View</Link></td> 
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

export default orderPurchases
