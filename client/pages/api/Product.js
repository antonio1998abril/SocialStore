import { useEffect, useState } from "react";
import axios from 'axios';

function Products(token) {
    const [products, setProducts] = useState([])
/*     const [userPorducts,setuserProducts] = useState([]) */
    /* funtions to search something */
    const [sort,setSort] = useState('')
    const [search,setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)
    /* find by description */
    const [byproducts,setByProducts]=useState([])
    
    useEffect (()=>{
        const  getProducts = async() =>{
            const res = await axios.get(`/api/getPro?limit=${page*6}&${sort}description[regex]=${search}&title[regex]=${search}`)
            setProducts(res.data.products)
            setResult(res.data.result)
        }
        getProducts()
    },[sort,search,page])

    useEffect(()=>{
        if(token){
        const getAdminP =async()=>{
             const res= await axios.get("/api/adminProducts",{
                headers: {Authorization: token}
             })
             setByProducts(res.data)
        }
        getAdminP()
    }
    },[token]) 
    return {
        products:[products,setProducts],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult],

        byuser:[byproducts,setByProducts]
    }
}

export default Products






