import {useState,useEffect} from 'react'
import axios from 'axios'

function Company(token) {
    const [company,setCompany]=useState([])

     useEffect(()=>{
        if(token){
        const getCompanies =async()=>{
             const res= await axios.get("/api/getCompany",{
                headers: {Authorization: token}
             })
             setCompany(res.data)
        }
        getCompanies()
    }
    },[token]) 
    return {
        company:[company,setCompany]
    }
}

export default Company
