import React, { useContext,useEffect, useState } from 'react'
import {Form,Col,Button} from 'react-bootstrap' 
import 'bootstrap/dist/css/bootstrap.min.css';
import { GlobalState } from '../../component/GlobalState';
import Login from '../login';
import axios from 'axios';
import swal from 'sweetalert';


const create=() =>{
    const initialState = {
        title:'',
        price:0,
        description:'',
        content:'',
        category:'',
        port:'',
        bycompany:''
    }
    const state = useContext(GlobalState);
    const [islogged]= state.User.isLogged
    const [product,setProduct] = useState(initialState);
    const [token] = state.token
    const [onEdit,setOnEdit] =useState(false)

    const [categories] = state.CategoryAPI.category
    const [companies] = state.CompanyAPI.company
    const [ports] = state.PortAPI.port

/* SET DATA */
    const handleChangeInput=e=>{
        const {name,value}=e.target
        setProduct({...product,[name]:value})
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
                await axios.post('/api/createPro',{...product},{
                    headers:{Authorization:token}
                })
                swal({icon:"success",text:"GOOD!!",timer:"2000"}).then(function(){
                    window.location.href="/service/indexProducts";
                },2000)
            }

        }catch(err){
            alert(err.response.data.msg)

        }
    }
/* READ DATA FROM USERS */
if(!islogged){
    return <Login/>
}
    return (
       <>
        <main className="content">
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
                    <Form.Control  name="description" as="textarea" rows={3} placeholder="description" 
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
                    <Form.Group as={Col} controlId="formGridCategory">
                    <Form.Label>Company</Form.Label>
                    <Form.Control name="bycompany" as="select" value={companies.company} onChange={handleChangeInput} >
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
                    <Form.Group as={Col} controlId="formGridCategory">
                    <Form.Label>Port</Form.Label>
                    <Form.Control name="port" as="select" value={ports.port} onChange={handleChangeInput} >
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


                <Button variant="primary" type="submit">
                    Create a New Product
                </Button>
            </Form>
        </main>
       </>
    )
}

 

export default create;
