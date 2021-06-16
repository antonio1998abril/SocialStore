import React, {createContext,useState,useEffect} from 'react'
import Axios from 'axios'
import User from '../pages/api/User'
import Products from "../pages/api/Product"
import GeneralSearch from "../pages/api/GeneralSearch"
import Company from "../pages/api/Company"
import Port from "../pages/api/Port"
import Category from "../pages/api/Category"

export const  GlobalState = createContext()

export const DataProvider = ({children}) => {
    const [token,setToken]=useState(false)

    useEffect(()=>{
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin){
            const refreshToken=async()=>{
                const res=await Axios.get('/api/refresh_token')      
                setToken(res.data.accesstoken)
    
                setTimeout(()=>{
                    refreshToken()
                },10 * 60 * 1000)
            }
            refreshToken()
        }
    },[])

    const state={
        token:[token,setToken],
        User:User(token),
        ProductsAPI:Products(token),
        GeneralSearchAPI:GeneralSearch(),
        CompanyAPI:Company(token),
        PortAPI:Port(token),
        CategoryAPI:Category(token)
    }
    return (
        <GlobalState.Provider value={state}>
        {children}
        </GlobalState.Provider>
        )
}


  


