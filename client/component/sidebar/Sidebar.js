import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome,faEdit,faGlobeAsia,faNewspaper,faCogs,faAddressBook,faList,faBuilding, faCartArrowDown,faShip } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';

export const SidebarData = [
    {
        title:'Search',
        path:'/',
        icon:<FontAwesomeIcon icon={faGlobeAsia} /> ,
        cName:'nav-text'
    },
    {
        title:'Home',
        path:'/home',
        icon:<FontAwesomeIcon icon={faHome} /> ,
        cName:'nav-text'
    },
    {
        title:'Products',
        path:'/service/indexProducts',
        icon:<FontAwesomeIcon icon={faEdit} />,
        cName:'nav-text'
    },
    {
        title:'Port',
        path:'/service/IndexPort',
        icon:<FontAwesomeIcon icon={faShip} />,
        cName:'nav-text'
    },
/*     {
        title:'News',
        path:'/service/News/NewsIndex',
        icon:<FontAwesomeIcon icon={faNewspaper} />,
        cName:'nav-text'
    }, */
    {
        title:'Categories',
        path:'/service/IndexCategories',
        icon:<FontAwesomeIcon icon={faList} />,
        cName:'nav-text'
    },{
        title:'Company',
        path:'/service/IndexCompany',
        icon:<FontAwesomeIcon icon={faBuilding} />,
        cName:'nav-text'
    },
/*     {
        title:'History',
        path:'service/history/history',
        icon:<FontAwesomeIcon icon={faCartArrowDown} />,
        cName:'nav-text'        
    }, */
/*     {
        title:'Following',
        path:'/service/following/followingIdex',
        icon:<FontAwesomeIcon icon={faAddressBook} />,
        cName:'nav-text'
    }, */
/*     {
        title:'My Perfil',
        path:'/service/perfil/configperfil',
        icon:<FontAwesomeIcon icon={faCogs} />,
        cName:'nav-text'
    } */
]
