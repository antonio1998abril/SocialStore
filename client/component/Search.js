import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function Search() {
    return (
      <>
    <div className="container h-100">
      <div className="d-flex justify-content-center h-100">
        <div className="searchbar">
          <input className="search_input" type="text" name="" placeholder="Search..."/>
          <a href="/SearchResult" className="search_icon"><FontAwesomeIcon icon={faSearch} /></a>
        </div>
      </div>
    </div>
    </>
    )
}

export default Search
