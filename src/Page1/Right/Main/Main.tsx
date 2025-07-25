import React from 'react'
import { Outlet } from 'react-router'

const Main = () => {
    return (
        <div className='flex-1 overflow-y-auto bg-yellow-100 custom-scrollbar'>            
            <Outlet />
        </div>

    )
}

export default Main