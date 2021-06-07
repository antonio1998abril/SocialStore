import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose ,faAngleDoubleLeft} from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link'
import { SidebarData} from './Sidebar'
import {IconContext} from 'react-icons';

function Navbarside() {
    const [sidebar, setSidebar]=useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <IconContext.Provider value={{color:'#fff'}}>
       
          {/*       <Link href="#" >
                  <a>
                    <FontAwesomeIcon icon={faArrowAltCircleLeft } size = '2x' onClick={showSidebar} className="line arrow"/>
                  </a>
                </Link> */}
                <div className="toggle-bar">
                  <FontAwesomeIcon icon={faAngleDoubleLeft } size = '2x' onClick={showSidebar} className="icon-toggle" />
                </div>
           
              <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className="nav-menu-items" onClick={showSidebar}>
                  <li className='navbar-toggle'>
                    <Link href="#" >
                      <a className="insideButton "><FontAwesomeIcon icon={faWindowClose} size = '2x' /></a>
                     
                    </Link>
                  </li>
                  {SidebarData.map((item,index)=> {
                    return (
                      <li key={index} className={item.cName}>
                        <Link href={item.path}>
                          <a>
                            {item.icon}&nbsp;{item.title}
                          </a>
                        </Link>
                      </li>
                    )
                    }
                  )}
                </ul>
              </nav>   
            </IconContext.Provider>
        </>
    )
}

export default Navbarside
