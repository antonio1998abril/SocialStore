import React,{ useContext, useEffect, useState } from 'react';
import { GlobalState } from '../component/GlobalState';
import ProductItem from '../component/ProductItem/ProductItem';
import Login from './login';
import Navbar from '../component/sidebar/Navbarside';


function home() {
    const state = useContext(GlobalState);
    const [islogged]= state.User.isLogged
    const [products] = state.ProductsAPI.products


    if(!islogged) {return <Login/>}
    
    return (
        <div>
            <main className="content">
                {
                    islogged && <Navbar/>
                }
          
                <div className="items"> 
                {
                    products.map(product => {
                        return <ProductItem key={product._id} product={product} />
                    })
                }    
               
                </div>  
            </main>
        </div>
    )
}

export default home
