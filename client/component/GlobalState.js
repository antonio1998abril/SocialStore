import React, {createContext,useState,useEffect} from 'react'
import Axios from 'axios'
import User from '../pages/api/User'

export const  GlobalState = createContext()

export const DataProvider = ({children}) => {
    const [token,setToken]=useState(false)

    useEffect(()=>{
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin){
            const refreshToken=async()=>{
                const ver=await Axios.get('/api/refresh_token')      
                setToken(ver.data.accesstoken)
    
                setTimeout(()=>{
                    refreshToken()
                },15000)
            
            }
            refreshToken()
        }
    },[])

    const state={
        token:[token,setToken],
        User:User(token),
    }
    return (
        <GlobalState.Provider value={state}>
        {children}
        </GlobalState.Provider>
        )
}


  


