import React, { useContext } from 'react'
import { GlobalState } from '../../component/GlobalState';
import Login from '../login';
import Add from '../../component/addItems/port'
import {Table} from 'react-bootstrap'; 
import Ports from '../../component/AdminItem/Ports'
import axios from 'axios';
import swal from 'sweetalert';

function IndexPort() {
    const state = useContext(GlobalState);
    const [islogged]= state.User.isLogged
    const [ports] = state.PortAPI.port
            /* DELETE */
    const deletePort=async(id)=>{
    const deletePort=axios.delete(`/api/deletePort/${id}`)
        await deletePort
        swal({icon:"success",text:"GOOD!!",timer:"2000"}).then(function(){
            window.location.href="/service/IndexPort";
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
                        <th>Name of Port</th>
                        <th>Description</th>
                        <th>Ubication</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody className="table-hover">
                        {
                        ports.map(ports =>{
                            return <Ports key={ports._id} ports={ports} deletePort={deletePort}/>
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </main>
        </>
    )
}

export default IndexPort
