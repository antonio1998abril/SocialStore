import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons'
import { GlobalState } from '../GlobalState';

function Company({companies,deleteCompany}) {
    const state = useContext(GlobalState);
    const [modalOnEdit,modalsetOnEdit] = state.CompanyAPI.modalOnEdit
    const [idCompany,setidCompany] = state.CompanyAPI.idCompany
    
    const changeState=()=>{
        modalsetOnEdit(true)
        setidCompany(companies._id)
      }
    return (
    <>
        <tr >
            <td className="text-sm">
                <b>{companies.companyName} </b>
            </td>
            <td>
                <small>{companies.ubication}</small> 
            </td>
            <td>
                <small>{companies.companyService}</small>
            </td>
            <td>
                <small>{companies.port}</small>
            </td>
            <td>
                <small>{companies.companyEmail}</small>
            </td>
            <td>
                <small>{companies.tel}</small>
            </td>
            
            <td className="project-actions text-fixed">
                <button onClick={()=>deleteCompany(companies._id)} className="btn btn-danger btn-flat "  >    
                    <i><FontAwesomeIcon icon={faTrash} /></i> 
                </button>
                &nbsp;
                <>
                <button onClick={changeState}  className="btn btn-warning btn-flat "  >    
                    <i><FontAwesomeIcon icon={faEdit} /></i>
                </button> 
                </>  
            </td>         
        </tr>
    </> 
    )
}

export default Company
