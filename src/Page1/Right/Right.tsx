import React from 'react'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import Main from './Main/Main'

const Right = () => {
    return (
        <div className=' relative flex flex-col p-2' style={{width: 'calc(100% - 250px)'}}>
            {/* drag region */}
            {/* <div className=' absolute w-full h-16 top-0 left-0 my-drag bg-amber-300'></div> */}
            <Header />
            <Main />
            <Footer />
        </div>
    )
}

export default Right