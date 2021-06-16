import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons'

import Link from 'next/link'
import {Modal,Button} from 'react-bootstrap'  
function Category({categories,deleteCategory}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
                <tr >
            <td className="text-sm">
                <b>{categories.categoryName} </b>
            </td>

            <td className="project-actions text-fixed">
                <button  onClick={()=>deleteCategory(categories._id)}  className="btn btn-danger btn-flat "  >    
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

export default Category
