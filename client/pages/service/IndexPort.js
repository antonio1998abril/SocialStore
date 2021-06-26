import React, { useContext } from 'react'
import { GlobalState } from '../../component/GlobalState';
import Login from '../login';
import Add from '../../component/addItems/port'
import {Table} from 'react-bootstrap'; 
import Ports from '../../component/AdminItem/Ports'
import axios from 'axios';
import swal from 'sweetalert';
import Navbar from '../../component/sidebar/Navbarside';

function IndexPort() {
    const state = useContext(GlobalState);
    const [islogged]= state.User.isLogged
    const [ports] = state.PortAPI.port
    const [callback,setCallback] = state.PortAPI.callback
    const [token] =state.token
            /* DELETE and delete image from cloudinary*/
    const deletePort=async(id,public_id)=>{
        try{
            const destroyImg =axios.post('/api/destroy',{public_id},{
                headers:{Authorization: token}
            })

            const deletePort=axios.delete(`/api/deletePort/${id}`)
            await deletePort
            await destroyImg

            swal({icon:"success",text:"Port Deleted",timer:"2000", buttons: false}).then(function(){
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
            <h1 className="reveal-text"><b>Ports:</b></h1>
                <Table className="text-center table-inverse  table-borderless shadow-lg  rounded" variant="dark"   hover  size="sm" responsive="sm">
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
