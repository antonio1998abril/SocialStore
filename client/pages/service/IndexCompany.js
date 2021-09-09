import React, { useContext } from 'react'
import { GlobalState } from '../../component/GlobalState'
import Login from '../login';
import Add from '../../component/addItems/company'
import {Table} from 'react-bootstrap'; 
import Company from '../../component/AdminItem/Company'
import axios from 'axios';
import swal from 'sweetalert';
import Navbar from '../../component/sidebar/Navbarside';


function IndexCompany() {
    const state = useContext(GlobalState);
    const [islogged] = state.User.isLogged
    const [companies] = state.CompanyAPI.company
    const [callback,setCallback] = state.CompanyAPI.callback

    /* DELETE */
    const deleteCompany = async(id)=>{
        try{
            const deleteCompany=axios.delete(`/api/Companyde/${id}`)
            await deleteCompany
            swal({icon:"success",text:"Company Deleted",timer:"2000", buttons: false}).then(function(){
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
            <h1 className="reveal-text"><b>Companies:</b></h1>
            <Table className="text-center table-inverse  table-borderless shadow-lg  rounded" variant="dark"   hover  size="sm" responsive="sm">
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>ubication</th>
                        <th>Service</th>
                        <th>Port</th>
                        <th>Email</th>
                        <th>Tel</th>
                        </tr>
                    </thead>
                    <tbody className="table-hover">
                        {
                        companies.map( companies =>{
                            return <Company key={companies._id}  companies={companies} deleteCompany={deleteCompany}/>
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </main>
        </>
    )
}

export default IndexCompany
