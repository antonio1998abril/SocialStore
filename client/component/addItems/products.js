import React, { useContext,useEffect, useState } from 'react'
import {Form,Col,Button,Modal} from 'react-bootstrap' 
import 'bootstrap/dist/css/bootstrap.min.css';
import { GlobalState } from '../../component/GlobalState';
import axios from 'axios';
import swal from 'sweetalert';
import Loader from '../../component/Loader/Loader'

function addoption() {
    const initialState = {
        title:'',
        price:0,
        description:'',
        content:'',
        category:'',
        port:'',
        bycompany:''
    }
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    const state = useContext(GlobalState);
    const [islogged]= state.User.isLogged
    const [product,setProduct] = useState(initialState);
    const [token] = state.token
    /* Image */
    const [loading,setLoading] = useState(false)
    const [images,setImages]=useState(false)

    const [onEdit,setOnEdit] =useState(false)

    const [categories] = state.CategoryAPI.category
    const [companies] = state.CompanyAPI.company
    const [ports] = state.PortAPI.port
    const [callback,setCallback]=state.ProductsAPI.callback
    const [products] = state.ProductsAPI.products
    
    /* EIDT */
    const [idEditProduct,setidProduct] = state.ProductsAPI.idProduct
    const [modalOnEdit,modalsetOnEdit] = state.ProductsAPI.modalOnEdit
    const handleClose=()=>{
         setOnEdit(false)
         setShow(false);
         setProduct(initialState)
         setImages('')
         modalsetOnEdit(false)
         setidProduct('')
     }

    useEffect(()=>{
        if(idEditProduct){
            setOnEdit(true)
            products.forEach(product=>{
                if(product._id === idEditProduct) {
                    setProduct(product)
                    setImages(product.images)
                    setShow(true);
                }
            })
        }else{
            setOnEdit(false)
            setProduct(initialState)
            setImages(false)
        }
    },[idEditProduct,products])
    /* ^*** */
    
    /* SET DATA */
    const handleChangeInput=e=>{
        const {name,value}=e.target
        setProduct({...product,[name]:value})
    }

    /* POST AND PUT */
    const handleSubmit=async e=>{
        e.preventDefault()
        try{
            if (!images) return swal({title:"¡Ups",text: "No image Upload", icon:"error", button:"OK"})

            if(onEdit){
                await axios.put(`/api/updatePro/${product._id}`,{...product,images},{
                headers:{Authorization:token}
            })
            swal({icon:"success",text:`You have Updated ${product.title}`,timer:"2000",buttons: false}); 
            }else{
                await axios.post('/api/createPro',{...product,images},{
                    headers:{Authorization:token}
                })
                swal({icon:"success",text:`You have crated a new Product called ${product.title}`,timer:"2000",buttons: false});
/*              swal({icon:"success",text:`You have crated a new Product called ${product.title}`,timer:"2000",buttons: false}).then(function(){setShow(false)setCallback(!callback)},2000);} */
            }
            setOnEdit(false)
            setShow(false);
            setProduct(initialState)
            setImages('')
            modalsetOnEdit(false)
            setidProduct('')
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
        {/* MODAL TO ADD ELEMENTS*/}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title>{onEdit ? `Update` : "Create"}</Modal.Title>
          </Modal.Header>
            <Modal.Body>
                {/* Send a image */}
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
                    <Form.Label>Title</Form.Label>
                    <Form.Control name="title" type="title" placeholder="Title"
                         value={product.title} onChange={handleChangeInput}
                    />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Price</Form.Label>
                    <Form.Control name="price" type="number" placeholder="0" 
                         value={product.price} onChange={handleChangeInput}
                    />
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control  name="description" as="textarea" rows={3} placeholder="Description" 
                         value={product.description} onChange={handleChangeInput}
                    />
                </Form.Group>

                <Form.Group controlId="formGridAddress2">
                    <Form.Label>Content</Form.Label>
                    <Form.Control name="content" as="textarea" rows={3} placeholder="Content" 
                     value={product.content} onChange={handleChangeInput}
                    />
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control name="category" as="select" value={product.category} onChange={handleChangeInput} >
                        <option value="">Choose...</option>
                        {
                            categories.map(category =>(
                                <option value={category.categoryName} key={category._id}>
                                    {category.categoryName}
                                </option>
                            ))
                        }
                    </Form.Control>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridCompany">
                    <Form.Label>Company</Form.Label>
                    <Form.Control name="bycompany" as="select" value={product.bycompany} onChange={handleChangeInput} >
                        <option value="">Choose...</option>
                        {
                            companies.map(company =>(
                                <option value={company.companyName} key={company._id}>
                                    {company.companyName}
                                </option>
                            ))
                        }
                    </Form.Control>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridPort">
                    <Form.Label>Port</Form.Label>
                    <Form.Control name="port" as="select" value={product.port} onChange={handleChangeInput} >
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

export default addoption


