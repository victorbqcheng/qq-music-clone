import React from 'react'
import { Outlet } from 'react-router'
import Header from './Header/Header'
import Footer from './Footer/Footer'

const Right = () => {
    return (
        <div className=' relative flex flex-col p-2 bg-gray-100' style={{width: 'calc(100% - 250px)'}}>
            {/* drag region */}
            <div className=' absolute w-full h-16 top-0 left-0 my-drag'></div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Right