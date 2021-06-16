import axios from 'axios';
import React, { useContext, useState } from 'react'
import {Modal,Button,Form,Col} from 'react-bootstrap'  
import swal from 'sweetalert';
import { GlobalState } from '../GlobalState';

const initialState = {
  portName:'',
  description:'',
  ubication:''
}

const port=() => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [onEdit,setOnEdit] =useState(false);
    const state = useContext(GlobalState);
    const [port,setPort] = useState(initialState);
    const [token] = state.token

    const handleChangeInput=e=>{
    const {name,value}=e.target
      setPort({...port,[name]:value})
    }
    const handleSubmit=async e=>{
      e.preventDefault()
      try{
  /*             if (!images) return alert("No image Upload") */

          if(onEdit){
  /*                 await axios.put(`/api/products/${product._id}`,{...product,images},{
                  headers:{Authorization:token}
              }) */
          }else{
              await axios.post('/api/createPort',{...port},{
                  headers:{Authorization:token}
              })
              swal({icon:"success",text:"GOOD!!",timer:"2000"}).then(function(){
                window.location.href="/service/IndexPort";
            },2000)
          }

      }catch(err){
        alert(err.response.data.msg)
      }
  }
    return (
        <>
        <div className="frame">
            <div className="hex-outer h1"></div>
            <div className="hex-outer h2"></div>
            <div className="hex-outer h3"></div>
            <div className="hex-inner h1"></div>
            <div className="hex-inner h2"></div>
            <div className="hex-inner h3"></div>
            <div className="label">
            <a onClick={handleShow} > +</a>
            </div>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title>Create a New Port</Modal.Title>
          </Modal.Header>

            <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Row>

                    <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Port Name</Form.Label>
                    <Form.Control name="portName" type="title" placeholder="Port name"
                         value={port.portName} onChange={handleChangeInput}
                    />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Description</Form.Label>
                    <Form.Control name="description" type="text" placeholder="Description" 
                         value={port.description} onChange={handleChangeInput}
                    />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Ubication</Form.Label>
                    <Form.Control name="ubication" type="text" placeholder="Ubication"
                         value={port.postName} onChange={handleChangeInput}
                    />
                    </Form.Group>

                </Form.Row>
            </Form>
            </Modal.Body>

          <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Save Changes
              </Button>
          </Modal.Footer>
        </Modal>
        </>
    )
}

export default port
