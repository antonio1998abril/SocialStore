import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import {Modal,Button,Form,Col} from 'react-bootstrap'  
import swal from 'sweetalert';
import { GlobalState } from '../GlobalState';

const initialState = {
  categoryName:''
}

function category() {
    const state = useContext(GlobalState);
    const [category,setCategory] = useState(initialState);
    const [token] = state.token;
    const [onEdit,setOnEdit] =useState(false);

    const [callback,setCallback]=state.CategoryAPI.callback
    const [idEditCategory,setidCategory] =  state.CategoryAPI.idCategory
    const [modalOnEdit,modalsetOnEdit] = state.CategoryAPI.modalOnEdit
    const [categories] = state.CategoryAPI.category

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose=()=>{
      setOnEdit(false)
      setShow(false);
      setCategory(initialState)
      modalsetOnEdit(false)
      setidCategory('')
    }

    useEffect(()=>{
      if(idEditCategory){
          setOnEdit(true)
          categories.forEach(category=>{
              if(category._id === idEditCategory) {
                  setCategory(category)
                  setShow(true);
              }
          })
      }else{
          setOnEdit(false)
          setCategory(initialState)
      }
  },[idEditCategory,categories])

    const handleChangeInput=e=>{
      const {name,value}=e.target
        setCategory({...category,[name]:value})
      }
    
      const handleSubmit=async e=>{
        e.preventDefault()
        try{
            if(onEdit){
                  await axios.put(`/api/updateCategory/${category._id}`,{...category},{
                  headers:{Authorization:token}
                })
                swal({icon:"success",text:`You have Updated ${category.categoryName}`,timer:"2000",buttons: false});  
            }else{
                await axios.post('/api/createCategory',{...category},{
                    headers:{Authorization:token}
                })
                swal({icon:"success",text:`You have Created ${category.categoryName}`,timer:"2000",buttons: false}); 
              }           
            setOnEdit(false)
            setShow(false);
            setCategory(initialState)
            modalsetOnEdit(false)
            setidCategory('')
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
                    <Form.Group as={Col} controlId="formGridCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control name="categoryName" type="text" placeholder="Category"
                         value={category.categoryName} onChange={handleChangeInput}
                    />
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

export default category
