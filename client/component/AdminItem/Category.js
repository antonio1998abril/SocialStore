import React, { useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons' 
import { GlobalState } from '../GlobalState'
function Category({categories,deleteCategory}) {
    const state = useContext(GlobalState);
    const [modalOnEdit,modalsetOnEdit] = state.CategoryAPI.modalOnEdit
    const [idCategory,setidCategory] = state.CategoryAPI.idCategory

    const changeState=()=>{
      modalsetOnEdit(true)
      setidCategory(categories._id)
    }
    return (
        <>
          <tr >
            <td className="text-sm">
                <b>{categories.categoryName} </b>
            </td>
            <td className="project-actions text-fixed">
                <button  onClick={()=>deleteCategory(categories._id)}  className="btn btn-danger btn-flat "  >    
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

export default Category
