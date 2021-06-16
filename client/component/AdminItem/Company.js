import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons'
import {Modal,Button} from 'react-bootstrap'  

function Company({companies,deleteCompany}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
 <>
        <tr >
            <td className="text-sm">
                <b>{companies.companyName} </b>
            </td>
            <td>
                <small>{companies.ubication}</small> 
            </td>
                
            <td>
                <small>{companies.companyService}</small>
            </td>

            <td>
                <small>{companies.companyEmail}</small>
            </td>


            <td className="project-actions text-fixed">
                <button onClick={()=>deleteCompany(companies._id)} className="btn btn-danger btn-flat "  >    
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
            <Modal.Body>Woohoo, you're reading this text in a modal {companies.companyName}!</Modal.Body>
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

export default Company
