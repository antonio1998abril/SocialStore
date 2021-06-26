import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import {Modal,Button,Form,Col} from 'react-bootstrap'  
import swal from 'sweetalert';
import { GlobalState } from '../GlobalState';
import Loader from '../../component/Loader/Loader'

const initialState = {
  portName:'',
  description:'',
  ubication:''
}

const port=() => {
    const state = useContext(GlobalState);
    const [islogged]= state.User.isLogged
    const [port,setPort] = useState(initialState);
    const [token] = state.token
    const [onEdit,setOnEdit] =useState(false)
    const [loading,setLoading] = useState(false)
    const [images,setImages]=useState(false)
    
    const [callback,setCallback]=state.PortAPI.callback
    const [idEditPort,setidPort] =  state.PortAPI.idPort
    const [modalOnEdit,modalsetOnEdit] = state.PortAPI.modalOnEdit
    const [ports] = state.PortAPI.port

    
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose=()=>{
      setOnEdit(false)
      setShow(false);
      setPort(initialState)
      setImages('')
      modalsetOnEdit(false)
      setidPort('')
  }

    useEffect(()=>{
        if(idEditPort){
            setOnEdit(true)
            ports.forEach(port=>{
                if(port._id === idEditPort) {
                    setPort(port)
                    setImages(port.images)
                    setShow(true);
                }
            })
        }else{
            setOnEdit(false)
            setPort(initialState)
            setImages(false)
        }
    },[idEditPort,ports])

    const handleChangeInput=e=>{
    const {name,value}=e.target
      setPort({...port,[name]:value})
    }
    const handleSubmit=async e=>{
      e.preventDefault()
      try{
        if (!images) return swal({title:"¡Ups",text: "No image Upload", icon:"error", button:"OK"})

        if(onEdit){
            await axios.put(`/api/updatePort/${port._id}`,{...port,images},{
            headers:{Authorization:token}
          }) 
          swal({icon:"success",text:`You have Updated ${port.portName}`,timer:"2000",buttons: false});
        }else{
            await axios.post('/api/createPort',{...port,images},{
                headers:{Authorization:token}
            })
            swal({icon:"success",text:`You have crated a new Port called ${port.portName}`,timer:"2000",buttons: false});
          }
          setOnEdit(false)
          setShow(false);
          setPort(initialState)
          setImages('')
          modalsetOnEdit(false)
          setidPort('')
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
        /* Imgage */
        const styleUpload={
          display:images ? "block" :"none"
      }
  
      const handleDestroy=async()=>{
          try{
              if(!islogged) return alert("you are not an logged")
              setLoading(true)
              await axios.post('/api/destroy',{public_id: images.public_id},{
                  headers:{Authorization:token}
              })
              setLoading(false)
              setImages(false)
  
          }catch(err){
              alert(err.response.data.msg)
          }
      }
      const handleUpload =async e=>{
          e.preventDefault()
          try{
              if(!islogged)
              return alert("you are not Admin")
              const file=e.target.files[0]
  
              if(!file) return alert("file not exist")
  
              if(file.size >1024 *1024)
              return alert("File not exist")
  
              if(file.type !== 'image/jpeg' && file.type !== 'image/png')
              return alert("File format is incorrect")
  
              let formData = new FormData()
              formData.append('file',file)
  
              setLoading(true)
              const res= await axios.post('/api/upload',formData,{
                  headers:{'content-type':'multipart/form-data',Authorization:token}
              }) 
              setLoading(false)
              setImages(res.data)
              console.log(res.data.url)
          }catch(err){
              alert(err.response.data.msg)
          }
      }
      /* Iamge */
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
                <div className="upload">
                    <input type="file" name="file" id="file_up" onChange={handleUpload}></input>
                    {
                        loading ? <div id="file_img"><Loader/></div>
                    :<div id="file_img" style={styleUpload}>
                        <img src={images ? images.url:''} alt=""></img>
                        <span onClick={handleDestroy}>X</span>
                    </div>
                    }
                </div>
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
                         value={port.ubication} onChange={handleChangeInput}
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

export default port
