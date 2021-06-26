import axios from 'axios'
import { useEffect, useState } from 'react'

function Category(token) {
    const [categories,setCategories] = useState([])
    const [callback,setCallback] = useState(false);
    const [modalOnEdit,modalsetOnEdit] = useState(false);
    const [idCategory,setidCategory] = useState('');

    useEffect(()=>{
        if (token){
        const getCategories = async() => {
            const res = await axios.get("/api/getCategory",{
                headers: {Authorization: token}
                })
                setCategories(res.data)
            }
            getCategories()
        }
    },[token,callback])

    return {
        category:[categories,setCategories],
        callback:[callback,setCallback],
        modalOnEdit:[modalOnEdit,modalsetOnEdit],
        idCategory:[idCategory,setidCategory]
    } 
}

export default Category
