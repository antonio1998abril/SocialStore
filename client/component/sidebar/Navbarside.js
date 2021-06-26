import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose ,faAngleDoubleLeft,faHome,faClipboard,faShip,faList,faBuilding,faCogs,faAddressBook,faCartArrowDown,faNewspaper,faGlobeAsia} from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link'
import { SidebarData} from './Sidebar'

function Navbarside() {
    const [sidebar, setSidebar]=useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    return (
        <>
          {/*   <Link href="#" >
                  <a>
                    <FontAwesomeIcon icon={faArrowAltCircleLeft } size = '2x' onClick={showSidebar} className="line arrow"/>
                  </a>
                </Link> */}
          <div className="toggle-bar" >
            <div className="inconposition">
            <FontAwesomeIcon icon={faAngleDoubleLeft } size = '2x' onClick={showSidebar} className="icon-toggle" />
            <FontAwesomeIcon icon={faGlobeAsia }  style={{color: "3F3F3F"}} inverse transform="shrink-5" size = '2x' onClick={showSidebar} className="icon-toggle " />
            <FontAwesomeIcon icon={faHome }  style={{color: "3F3F3F"}} inverse transform="shrink-5" size = '2x' onClick={showSidebar} className="icon-toggle " />
            <FontAwesomeIcon icon={faClipboard }  style={{marginLeft:"5px", color: "3F3F3F"}} inverse transform="shrink-5" size = '2x' onClick={showSidebar} className="icon-toggle" />
            <FontAwesomeIcon icon={faShip } style={{color: "3F3F3F"}}  inverse transform="shrink-5" size = '2x' onClick={showSidebar} className="icon-toggle" />
            <FontAwesomeIcon icon={faNewspaper } style={{color: "3F3F3F"}} inverse transform="shrink-5" size = '2x' onClick={showSidebar} className="icon-toggle" />
            <FontAwesomeIcon icon={faList } style={{color: "3F3F3F"}} inverse transform="shrink-5" size = '2x' onClick={showSidebar} className="icon-toggle" />
            <FontAwesomeIcon icon={faBuilding } style={{color: "3F3F3F",marginLeft:"5px"}} inverse transform="shrink-5" size = '2x' onClick={showSidebar} className="icon-toggle" /> 
            <FontAwesomeIcon icon={faCartArrowDown } style={{color: "3F3F3F"}} inverse transform="shrink-5" size = '2x' onClick={showSidebar} className="icon-toggle" />   
            <FontAwesomeIcon icon={faAddressBook } style={{color: "3F3F3F",marginLeft:"6px"}}  inverse transform="shrink-5" size = '2x' onClick={showSidebar} className="icon-toggle" />
            <FontAwesomeIcon icon={faCogs } style={{color: "3F3F3F",marginLeft:"-1px"}} inverse transform="shrink-5" size = '2x' onClick={showSidebar} className="icon-toggle" />
            
            </div>
          </div>
           
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className="nav-menu-items" onClick={showSidebar}>
              <li className='navbar-toggle'>
                <Link href="#" >
                  <a className="insideButton "><FontAwesomeIcon icon={faWindowClose} size = '2x' /></a>
                </Link>
              </li>
                {SidebarData.map((item,index)=> { return (
              <li key={index} className={item.cName}>
                <Link href={item.path}>
                  <a>
                    {item.icon}&nbsp;&nbsp;{item.title}
                  </a>
                </Link>
              </li> ) }
                  )}
              </ul>
          </nav>   
        </>
    )
}

export default Navbarside
