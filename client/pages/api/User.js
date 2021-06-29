import React,{useState, useEffect} from 'react'
import Axios from 'axios'
import swal from 'sweetalert'

function User(token) {
    const [isLogged,setIsLogged] = useState(false)
    /* To identify an user i can use ID or email both are unique in this case, i'll use email
    as identifier */
/*     const [userId,setUserId]=useState('') */
    const [userIdEmail, setUserIdEmail] = useState('')
    const [perfilInfo, setPerfilInfo] = useState([])
    /* CART */
    const [cart,setCart]=useState([])
    const [history,setHistory] =useState([])
    const [historymy,setHistorymy] =useState([])

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
                    setCart(res.data.cart)
                } catch (err) {
                    alert(err.response.data.msg)
                }
            }
            getUser()
        }
    },[token]);
    /* CART */
    const addCart = async (product) => {
        if(!isLogged) return alert("Please login to continue")
            const check=cart.every(item=>{
                return item._id !==product._id
            })

            if(check){
                setCart([...cart,{...product,quantity:1}])
                await Axios.patch('/api/addcart',{cart:[...cart,{...product,quantity:1}]},{
                    headers:{Authorization:token}
                })
                 
            }else{
                swal({
                    title:"ERROR",
                    text: "This product already has been added to cart",
                    icon:"error",
                    button:"OK"
                })
            }   
        }
        /* GET HISTOYRY AND PAYMENTS */
        useEffect(()=>{
            if (token){
                const getHistory =async()=>{
                        const respaymnet= await Axios.get('/api/payment',{
                            headers:{Authorization: token}
                        })
                        setHistory(respaymnet.data)

                        const reshistory= await Axios.get('/api/history',{
                            headers:{Authorization: token}
                        })
                        setHistorymy(reshistory.data) 
             
                }
                getHistory()
            }
        },[token])
        /* GET HISTOYRY AND PAYMENTS */

    return {
        isLogged:[isLogged,setIsLogged],
        /* userid:[userId,setUserId], */
        perfilInfo:[perfilInfo,setPerfilInfo],
        userIdEmail:[userIdEmail,setUserIdEmail],
        /* CART */
        cart: [cart, setCart],
        history:[history,setHistory],
        historymy:[historymy,setHistorymy],
        addCart: addCart
    }
}

export default User
