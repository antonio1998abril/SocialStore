import axios from 'axios'
import { useEffect, useState } from 'react'

function Port(token) {
    const [port,setPort]=useState([])

    const [callback,setCallback] = useState(false);
    const [modalOnEdit,modalsetOnEdit] = useState(false);
    const [idPort,setidPort] = useState('');

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
    },[token,callback]) 

    return {
        port:[port,setPort],
        callback:[callback,setCallback],
        modalOnEdit:[modalOnEdit,modalsetOnEdit],
        idPort:[idPort,setidPort]
    }
}

export default Port
