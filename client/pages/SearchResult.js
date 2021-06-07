import React,{ useContext } from 'react'
import { GlobalState } from '../component/GlobalState';
import ProductItem from '../component/ProductItem/ProductItem'
import Navbar from '../component/sidebar/Navbarside';

function SearchResult() {
    const state = useContext(GlobalState);
    const [islogged]= state.User.isLogged
    return (
        <div>
            <main className="content">
                {
                    islogged && <Navbar/>
                }
          
                <div className="items">     
                    <ProductItem />
                </div>  
            </main>
        </div>
    )
}

export default SearchResult
