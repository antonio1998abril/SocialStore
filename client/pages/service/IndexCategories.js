import React, { useContext } from 'react'
import { GlobalState } from '../../component/GlobalState'
import Login from '../login';
import Add from '../../component/addItems/category'
import {Table} from 'react-bootstrap'; 

import Categories from '../../component/AdminItem/Category'
import axios from 'axios';
import swal from 'sweetalert';
function IndexCategories() {
    const state = useContext(GlobalState);
    const [islogged] = state.User.isLogged
    const [categories] = state.CategoryAPI.category

        /* DELETE */
    const deleteCategory = async(id)=>{
        const deleteCategory=axios.delete(`/api/deleteCategory/${id}`)
        await deleteCategory
        swal({icon:"success",text:"GOOD!!",timer:"2000"}).then(function(){
            window.location.href="/service/IndexCategories";
        },2000)
    }

            
    if(!islogged){
        return <Login/>
    }

    return (
        <>
        <Add/>
        <main className="content">
            <div className="tablesize">
                <Table striped bordered hover variant="dark" responsive="sm">
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
