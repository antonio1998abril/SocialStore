import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons'
import {Modal,Button} from 'react-bootstrap'  

function Ports({ports,deletePort}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
                <button onClick={()=>deletePort(ports._id)} className="btn btn-danger btn-flat "  >    
                    <i><FontAwesomeIcon icon={faTrash} /></i> 
                </button>
                &nbsp;
                <>
{/*                 <button onClick={handleShow}  className="btn btn-warning btn-flat "  >    
                <i><FontAwesomeIcon icon={faEdit} /></i>
                </button> */}
                </>  
            </td>         
        </tr>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal !</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )
}

export default Ports
