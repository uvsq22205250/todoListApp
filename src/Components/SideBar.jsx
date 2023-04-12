import React from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

function SideBar({ children }){


    return(
        <Sidebar className='Sidebar'>
            {children}
        </Sidebar>
    )
}
export default SideBar;