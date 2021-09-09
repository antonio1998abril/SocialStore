import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import {Modal,Button,Form, Col} from 'react-bootstrap'  
import swal from 'sweetalert';
import { GlobalState } from '../GlobalState';

const initialState = {
  companyName:'',
  ubication:'',
  companyService:'',
  companyEmail:'',
  port:'',
  tel:''
}

function company() {
  const state = useContext(GlobalState);
  const [company,setCompany] = useState(initialState);
  const [token] = state.token
  const [onEdit,setOnEdit] =useState(false);
  const [callback,setCallback]=state.CompanyAPI.callback
  const [idEditCompany,setidCompany] =  state.CompanyAPI.idCompany
  const [modalOnEdit,modalsetOnEdit] = state.CompanyAPI.modalOnEdit
  const [companies] = state.CompanyAPI.company
  const [ports] = state.PortAPI.port

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const handleClose=()=>{
    setOnEdit(false)
    setShow(false);
    setCompany(initialState)
    modalsetOnEdit(false)
    setidCompany('')
  }

  useEffect(()=>{
    if(idEditCompany){
        setOnEdit(true)
        companies.forEach(company=>{
            if(company._id === idEditCompany) {
                setCompany(company)
                setShow(true);
            }
        })
    }else{
        setOnEdit(false)
        setCompany(initialState)
    }
},[idEditCompany,companies])


  const handleChangeInput=e=>{
    const {name,value}=e.target
      setCompany({...company,[name]:value})
  }

    const handleSubmit=async e=>{
        e.preventDefault()
        try{
            if(onEdit){
              await axios.put(`/api/CompanyUp/${company._id}`,{...company},{
                  headers:{Authorization:token}
              }) 
              swal({icon:"success",text:`You have Updated ${company.companyName}`,timer:"2000",buttons: false});
            }else{
                await axios.post('/api/createCompany',{...company},{
                    headers:{Authorization:token}
                })
                swal({icon:"success",text:`You have Created ${company.companyName}`,timer:"2000",buttons: false});
            }
            setOnEdit(false)
            setShow(false);
            setCompany(initialState)
            modalsetOnEdit(false)
            setidCompany('')
            setCallback(!callback)
  
        }catch(err){
          swal({
            title:"¡Ups",
            text: err.response.data.msg,
            icon:"error",
            button:"OK"
          })
        }
    }

    return (
<>
        <div className="frame">
            <div className="hex-outer h1 shadow"></div>
            <div className="hex-outer h2 shadow"></div>
            <div className="hex-outer h3 shadow"></div>
            <div className="hex-inner h1 shadow"></div>
            <div className="hex-inner h2 shadow"></div>
            <div className="hex-inner h3 shadow"></div>
            <div className="label">
            <a onClick={handleShow} > +</a>
            </div>
        </div>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{onEdit ? `Update` : "Create"}</Modal.Title>
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

                    <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Telephone</Form.Label>
                    <Form.Control name="tel" type="tel" placeholder="Tel"
                         value={company.tel} onChange={handleChangeInput}
                    />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridPort">
                    <Form.Label>Port</Form.Label>
                    <Form.Control name="port" as="select" value={company.port} onChange={handleChangeInput} >
                        <option value="">Choose...</option>
                        {
                            ports.map(port =>(
                                <option value={port.portName} key={port._id}>
                                    {port.portName}
                                </option>
                            ))
                        }
                    </Form.Control>
                    </Form.Group>
                </Form.Row>

                <Button variant="primary" type="submit" >
                    {onEdit ? "Update" : "Create"}
                  </Button>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
        </>
    )
}

export default company
