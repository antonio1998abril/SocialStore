import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons'  
import { GlobalState } from '../GlobalState';

function Ports({ports,deletePort}) {
    const state = useContext(GlobalState);
    const [modalOnEdit,modalsetOnEdit] = state.PortAPI.modalOnEdit
    const [idPort,setidPort] = state.PortAPI.idPort

    const changeState=()=>{
      modalsetOnEdit(true)
      setidPort(ports._id)
    }
    return (
        <>
        <tr >
            <td className="text-sm">
                <b>{ports.portName} </b>
            </td>
            <td className="text-sm">
                <b>{ports.description} </b>
            </td>
            <td className="text-sm">
                <b>{ports.ubication} </b>
            </td>

            <td className="project-actions text-fixed">
                <button onClick={()=>deletePort(ports._id,ports.images.public_id)} className="btn btn-danger btn-flat "  >    
                    <i><FontAwesomeIcon icon={faTrash} /></i> 
                </button>
                &nbsp;
                <>
                <button  onClick={changeState}  className="btn btn-warning btn-flat "  >    
                  <i><FontAwesomeIcon icon={faEdit} /></i>
                </button> 
                </>  
            </td>         
        </tr>
        </>
    )
}

export default Ports
