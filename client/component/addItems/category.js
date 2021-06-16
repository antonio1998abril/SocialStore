import axios from 'axios';
import React, { useContext, useState } from 'react'
import {Modal,Button,Form,Col} from 'react-bootstrap'  
import swal from 'sweetalert';
import { GlobalState } from '../GlobalState';

const initialState = {
  categoryName:''
}


function category() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [onEdit,setOnEdit] =useState(false);
    const state = useContext(GlobalState);
    const [category,setCategory] = useState(initialState);
    const [token] = state.token

    const handleChangeInput=e=>{
      const {name,value}=e.target
        setCategory({...category,[name]:value})
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
                await axios.post('/api/createCategory',{...category},{
                    headers:{Authorization:token}
                })
                swal({icon:"success",text:"GOOD!!",timer:"2000"}).then(function(){
                  window.location.href="/service/indexCategories";
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
          <Modal.Title>Create a new Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Category</Form.Label>
                    <Form.Control name="categoryName" type="category" placeholder="Category"
                         value={category.categoryName} onChange={handleChangeInput}
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

export default category
