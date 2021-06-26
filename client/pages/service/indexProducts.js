import React, { useContext } from 'react'
import { GlobalState } from '../../component/GlobalState';
import Login from '../login';
import {Table} from 'react-bootstrap'; 

import Add from '../../component/addItems/products'
import Products from '../../component/AdminItem/Products'
import axios from 'axios';
import swal from 'sweetalert';

import Navbar from '../../component/sidebar/Navbarside';

function indexOption() {
    const state = useContext(GlobalState);
    const [token] =state.token
    const [islogged]= state.User.isLogged
    const [products] = state.ProductsAPI.byuser
    const [callback,setCallback]=state.ProductsAPI.callback

        /* DELETE */
    const deleteProduct=async(id,public_id)=>{
        try {
            const destroyImg =axios.post('/api/destroy',{public_id},{
                headers:{Authorization: token}
            })
            
            const deleteReview=axios.delete(`/api/deletePro/${id}`)
            await deleteReview
            await destroyImg

            swal({icon:"success",text:"Product Deleted",timer:"2000", buttons: false}).then(function(){
                setCallback(!callback)
            },1000)
        }catch(err){
            swal({
                title:"¡Ups",
                text: err.response.data.msg,
                icon:"error",
                button:"OK"
                })
            }
        }
        if(!islogged){
                return  <Login/>
        }

    return (
        <>
        <Add/>
         <main className="content">
                {
                    islogged && <Navbar/>
                }
            <div className="tablesize">
            <h1 className="reveal-text"><b>Products:</b></h1>
                <Table className="text-center table-inverse  table-borderless shadow-lg  rounded" variant="dark"   hover  size="sm" responsive="sm">
                    <thead >
                        <tr>
                        <th >Title</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Content</th>
                        <th>Category</th>
                        <th>Port</th>
                        <th>Company</th>
                        <th>Options</th>
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
