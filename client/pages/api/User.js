import React,{useState, useEffect} from 'react'
import Axios from 'axios'

function User(token) {
    const [isLogged,setIsLogged] = useState(false)
    /* To identify an user i can use ID or email both are unique in this case, i'll use email
    as identifier */
/*     const [userId,setUserId]=useState('') */
    const [userIdEmail, setUserIdEmail] = useState('')
    const [perfilInfo, setPerfilInfo] = useState([])

    useEffect(() => {
        if(token){
            const getUser = async () => {
                try{
                    const res = await Axios.get('/api/info',{
                        headers: {Authorization: token}
                    })
                    setIsLogged(true)
                    /* setUserId(res.data._id) */
                    setUserIdEmail(res.data.email)
                    setPerfilInfo(res.data)
                } catch (err) {
                    alert(err.response.data.msg)
                }
            }
            getUser()
        }
    },[token])
    return {
        isLogged:[isLogged,setIsLogged],
        /* userid:[userId,setUserId], */
        perfilInfo:[perfilInfo,setPerfilInfo],
        userIdEmail:[userIdEmail,setUserIdEmail]
    }
}

export default User
