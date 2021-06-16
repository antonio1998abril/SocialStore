import axios from 'axios';
import React, { useContext, useState } from 'react'
import {Modal,Button,Form, Col} from 'react-bootstrap'  
import swal from 'sweetalert';
import { GlobalState } from '../GlobalState';

function company() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const initialState = {
      companyName:'',
      ubication:'',
      companyService:'',
      companyEmail:'',
    }

    const [onEdit,setOnEdit] =useState(false);
    const state = useContext(GlobalState);
    const [company,setCompany] = useState(initialState);
    const [token] = state.token


    const handleChangeInput=e=>{
      const {name,value}=e.target
        setCompany({...company,[name]:value})
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
                await axios.post('/api/createCompany',{...company},{
                    headers:{Authorization:token}
                })
                swal({icon:"success",text:"GOOD!!",timer:"2000"}).then(function(){
                  window.location.href="/service/IndexCompany";
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
          <Modal.Title>Create a New Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit}>
                <Form.Row>

                    <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="companyName" type="title" placeholder="Name"
                         value={company.companyName} onChange={handleChangeInput}
                    />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Ubication</Form.Label>
                    <Form.Control name="ubication" type="ubication" placeholder="Ubication"
                         value={company.ubication} onChange={handleChangeInput}
                    />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Service</Form.Label>
                    <Form.Control name="companyService" type="service" placeholder="Service"
                         value={company.companyService} onChange={handleChangeInput}
                    />
                    </Form.Group>


                    <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control name="companyEmail" type="email" placeholder="Email"
                         value={company.companyEmail} onChange={handleChangeInput}
                    />
                    </Form.Group>
                </Form.Row>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit} type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )
}

export default company
