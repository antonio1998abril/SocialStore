import axios from 'axios'
import { useEffect, useState } from 'react'

function Category(token) {
    const [categories,setCategories] = useState([])

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
    },[token])

    return {
        category:[categories,setCategories]
    } 
}

export default Category
