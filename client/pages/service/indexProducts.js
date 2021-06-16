import React, { useContext } from 'react'
import { GlobalState } from '../../component/GlobalState';
import Login from '../login';
import {Table} from 'react-bootstrap'; 

import Add from '../../component/addItems/products'
import Products from '../../component/AdminItem/Products'
import axios from 'axios';
import swal from 'sweetalert';
function indexOption() {
    const state = useContext(GlobalState);
    const [islogged]= state.User.isLogged
    const [products] = state.ProductsAPI.byuser
    
        /* DELETE */
    const deleteProduct=async(id)=>{
            const deleteReview=axios.delete(`/api/deletePro/${id}`)
            await deleteReview
            swal({icon:"success",text:"GOOD!!",timer:"2000"}).then(function(){
                window.location.href="/service/indexProducts";
            },2000)
        }
    if(!islogged){
        return <Login/>
    }

    return (
        <>
        <Add/>
         <main className="content">
            {/* ***************************************** */}
            <div className="tablesize">
                <Table striped bordered hover variant="dark" responsive="sm">
                    <thead>
                        <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Content</th>
                        <th>Category</th>
                        <th>Port</th>
                        </tr>
                    </thead>
                    <tbody className="table-hover">
                        {
                        products.map(products =>{
                            return <Products key={products._id} products={products} deleteProduct={deleteProduct}/>
                            })
                        }
                    </tbody>
                </Table>
            </div>
            </main>
        </>
    )
}

export default indexOption
