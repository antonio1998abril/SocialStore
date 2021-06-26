import {useState,useEffect} from 'react'
import axios from 'axios'

function Company(token) {
    const [company,setCompany]=useState([])
    const [callback,setCallback] = useState(false)
    const [modalOnEdit,modalsetOnEdit] = useState(false);
    const [idCompany, setidCompany] = useState('');

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
    },[token,callback]) 

    return {
        company:[company,setCompany],
        callback:[callback,setCallback],
        modalOnEdit:[modalOnEdit,modalsetOnEdit],
        idCompany:[idCompany,setidCompany]
    }
}

export default Company
