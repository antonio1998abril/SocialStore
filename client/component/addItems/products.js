import React from 'react'
import Link from 'next/link'
function addoption() {
    return (
        <>
        <div className="frame">
        
            <div className="hex-outer h1"></div>
            <div className="hex-outer h2"></div>
            <div className="hex-outer h3"></div>
            <div className="hex-inner h1"></div>
            <div className="hex-inner h2"></div>
            <div className="hex-inner h3"></div>
            <div className="label">
              <Link href="/service/createProduct">
                <a  style={{"textDecoration": "none","color":"white"}}>+</a>
            </Link> 
            </div>
        </div>

        </>
    )
}

export default addoption
