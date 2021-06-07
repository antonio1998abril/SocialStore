import React,{useState, useEffect} from 'react'
import Axios from 'axios'


function User(token) {
    const [isLogged,setIsLogged] = useState(false)
    const [isAdmin,setIsAdmin]=useState(false)

    useEffect(() => {
        if(token){
            const getUser = async () => {
                try{
                    const res = await Axios.get('/api/info',{
                        headers: {Authorization: token}
                    })
                    setIsLogged(true)
                     res.data.role === 1 ? setIsAdmin(true) :setIsAdmin(false)  
                } catch (err) {
                    alert(err.response.data.msg)
                }
            }
            getUser()
        }
    },[token])

    return {
        isLogged:[isLogged,setIsLogged],
        isAdmin:[isAdmin,setIsAdmin],
    }
}

export default User
