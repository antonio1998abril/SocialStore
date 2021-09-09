import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons'

import { GlobalState } from '../GlobalState'
function Products({products,deleteProduct}) {
    const state = useContext(GlobalState);
    const [modalOnEdit,modalsetOnEdit] = state.ProductsAPI.modalOnEdit
    const [idProduct,setidProduct] = state.ProductsAPI.idProduct

    const changeState=()=>{
        modalsetOnEdit(true)
        setidProduct(products._id)
    }
    return (
        <>
        <tr >
            <td className="text-sm">
                <b>{products.title} </b>
            </td>
            <td>
                <small>{products.price}</small> 
            </td>
                
            <td>
                <small>{products.description}</small>
            </td>

            <td>
                <small>{products.content}</small>
            </td>
            <td>
                <small>{products.category}</small>
            </td>
            <td>
                <small>{products.port}</small>
            </td>
            <td>
                <small>{products.bycompany}</small>
            </td>

            <td className="project-actions text-fixed">
                <button  onClick={()=>deleteProduct(products._id,products.images.public_id)} className="btn btn-danger btn-flat "  >    
                    <i><FontAwesomeIcon icon={faTrash} /></i> 
                </button>
                &nbsp;
                <>
                <button onClick={changeState}  className="btn btn-warning btn-flat"  >    
                    <i><FontAwesomeIcon icon={faEdit} /></i>
                </button> 
                </>  
            </td>         
        </tr>
        </> 
    )
}

export default Products
