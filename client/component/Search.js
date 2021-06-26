import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { GlobalState } from './GlobalState';
import Link from 'next/link'

function Search() {
  const state = useContext(GlobalState);
  const [SearchG, setSearchG] = state.GeneralSearchAPI.SearchG
 
    return (
      <>
    <div className="container h-100">
      <div className="d-flex justify-content-center h-100">
        <div className="searchbar">
          <input className="search_input"  value={SearchG}
            type="text" name="" 
            placeholder="Search..."
            onChange={e=>setSearchG(e.target.value.toLowerCase())}
          ></input>
            {/*   <a href="/SearchResult" className="search_icon">
                 <FontAwesomeIcon icon={faSearch} type="submit" onChange={handlesubmit} />
              </a> */}
          <Link href="/SearchResult" >
            <button  className="search_icon">
              <FontAwesomeIcon icon={faSearch} type="submit"  />
            </button>
          </Link>
        </div>
      </div>
    </div>
    </>
    )
}

export default Search
