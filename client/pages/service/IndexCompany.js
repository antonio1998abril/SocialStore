import React, { useContext } from 'react'
import { GlobalState } from '../../component/GlobalState'
import Login from '../login';
import Add from '../../component/addItems/company'
import {Table} from 'react-bootstrap'; 

import Company from '../../component/AdminItem/Company'
import axios from 'axios';
import swal from 'sweetalert';

function IndexCompany() {
    const state = useContext(GlobalState);
    const [islogged] = state.User.isLogged
    const [companies] = state.CompanyAPI.company
    /* DELETE */
    const deleteCompany = async(id)=>{
    const deleteCompany=axios.delete(`/api/Companyde/${id}`)
        await deleteCompany
        swal({icon:"success",text:"GOOD!!",timer:"2000"}).then(function(){
            window.location.href="/service/IndexCompany";
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
                        <th>Name</th>
                        <th>ubication</th>
                        <th>Service</th>
                        <th>Email</th>
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
