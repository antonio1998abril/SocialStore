import React,{ useContext, useState } from 'react'
import { GlobalState } from '../component/GlobalState';
import Navbar from '../component/sidebar/Navbarside';
import GlobalItem from '../component/searchItem/searchItem'
/* import Loader from '../component/Loader/Loader'
import Router from 'next/router'; */

function SearchResult() {
    const state = useContext(GlobalState);
    const [islogged]= state.User.isLogged
        /* get search about anything products */
    const [anything] = state.GeneralSearchAPI.Generalproducts
/*     const [loading,setLoading]=useState(false) */
  
/*  Router.onRouteChangeComplete = (url) => {
      // Some page has finished loading
      setLoading(true)
      };
    
    Router.routeChangeStart = (url) => {
        // Some page has finished loading
        setLoading(true)
      };
      
    Router.routeChangeError = (url) => {
        // Some page has finished loading
        setLoading(true)
      };

    if(!loading) return <Loader/> */
    return (
        <div>
            <main className="content">
                {
                    islogged && <Navbar/>
                }
              
                {
                  anything.map(service => {
                    return <GlobalItem key={service._id} service={service}/>
                  })
                }
            </main>
        </div>
    )
}

export default SearchResult
