import { useEffect, useState } from "react";
import axios from 'axios';
import swal from 'sweetalert'

function GeneralSearch() {
    const [Generalproducts, setGeneralProducts] = useState([])
    const [result, setResult] = useState(0)
    const [SearchG,setSearchG]= useState('')

    useEffect (()=>{
        const  getAnything = async() =>{
            try{
            const res = await axios.get(`/api/getanything?SearchG=${SearchG}`)
            setGeneralProducts(res.data.post)
            setResult(res.data.post)
            }catch(err){
                 swal({
                    title:"ERROR",
                    text: err.response.data.msg,
                    icon:"error",
                    button:"OK"
                }).then(function(){
                    window.location.href="/";
                })
            }
        }
        getAnything()   
    },[SearchG])

    return {
        Generalproducts:[Generalproducts, setGeneralProducts],
        result: [result, setResult],
        SearchG:[SearchG,setSearchG]
    }
}

export default GeneralSearch