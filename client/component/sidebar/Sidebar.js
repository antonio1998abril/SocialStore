import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome,faEdit } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';

export const SidebarData = [
    {
        title:'Home',
        path:'/',
        icon:<FontAwesomeIcon icon={faHome} /> ,
        cName:'nav-text'
    },
    {
        title:'Create',
        path:'/create',
        icon:<FontAwesomeIcon icon={faEdit} />,
        cName:'nav-text'
    }
]
