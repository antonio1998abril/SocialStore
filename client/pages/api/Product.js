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
    /* set user products */
    const [byproducts,setByProducts]=useState([])
    /* call use effect when user create delte or update something with products */
    const [callback,setCallback]=useState(false)
    /* EDIT */
    const [modalOnEdit,modalsetOnEdit] =useState(false)
    const [idProduct,setidProduct] = useState('')
    /* EDIT */
    useEffect (()=>{
        const  getProducts = async() =>{
            const res = await axios.get(`/api/getPro?limit=${page*6}&${sort}description[regex]=${search}&title[regex]=${search}`)
            setProducts(res.data.products)
            setResult(res.data.result)
        }
        getProducts()
    },[callback,sort,search,page])

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
    },[token,callback])
     
    return {
        products:[products,setProducts],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult],

        byuser:[byproducts,setByProducts],
        callback:[callback,setCallback],
        /* EDIT */
        modalOnEdit:[modalOnEdit,modalsetOnEdit],
        idProduct:[idProduct,setidProduct]
    }
}

export default Products






