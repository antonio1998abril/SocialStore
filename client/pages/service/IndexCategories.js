import React, { useContext } from 'react'
import { GlobalState } from '../../component/GlobalState'
import Login from '../login';
import Add from '../../component/addItems/category'
import {Table} from 'react-bootstrap'; 
import Categories from '../../component/AdminItem/Category'
import axios from 'axios';
import swal from 'sweetalert';
import Navbar from '../../component/sidebar/Navbarside';

function IndexCategories() {
    const state = useContext(GlobalState);
    const [islogged] = state.User.isLogged
    const [categories] = state.CategoryAPI.category
    const [callback,setCallback] = state.CategoryAPI.callback

        /* DELETE */
    const deleteCategory = async(id)=>{
        try{
            const deleteCategory=axios.delete(`/api/deleteCategory/${id}`)
            await deleteCategory
            swal({icon:"success",text:"Category Deleted",timer:"2000", buttons: false}).then(function(){
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
        return <Login/>
    }

    return (
        <>
        <Add/>
        <main className="content">
            {
                islogged && <Navbar/>
            }
            <div className="tablesize">
            <h1 className="reveal-text"><b>Categories:</b></h1>
            <Table className="text-center table-inverse  table-borderless shadow-lg  rounded" variant="dark"   hover  size="sm" responsive="sm">
                    <thead>
                        <tr>
                        <th>Name of Category</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody className="table-hover">
                        {
                        categories.map(categories =>{
                            return <Categories key={categories._id} categories={categories} deleteCategory={deleteCategory}/>
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </main>
        </>
    )
}

export default IndexCategories
