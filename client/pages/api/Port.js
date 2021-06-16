import axios from 'axios'
import { useEffect, useState } from 'react'

function Port(token) {
    const [port,setPort]=useState([])

    useEffect(()=>{
        if(token){
        const getPorts =async()=>{
             const res= await axios.get("/api/getPorts",{
                headers: {Authorization: token}
             })
             setPort(res.data)
        }
        getPorts()
    }
    },[token]) 

    return {
        port:[port,setPort]
    }
}

export default Port
