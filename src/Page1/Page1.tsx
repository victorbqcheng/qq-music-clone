import React from 'react'
import Left from './Left/Left'
import Right from './Right/Right'

const Page1 = () => {
    return (
        <div className='flex h-screen w-screen min-w-[870px] min-h-[690px] bg-gray-100 select-none overflow-hidden'>
            <Left />
            <Right />
        </div>
    )
}

export default Page1