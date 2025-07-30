import React from 'react'
import { BsChevronContract } from 'react-icons/bs'

import stateStore from '../../store/stateStore'
import Interactions from './Interactions'
// import Controlbar from './Controlbar'
import Utils from './Utils'
import Controlbar from '../../components/Controlbar'

const Footer = () => {
    return (
        <div className='absolute bottom-0 h-20 w-full flex items-center justify-center bg-gray-200'>
            <BsChevronContract className='text-2xl hover:text-green-300 ml-4' onClick={()=>stateStore.setShowPage2(false)} />
            <div className='flex-1 flex items-center justify-between gap-4 h-full'>
                <Interactions />
                {/* <Controlbar /> */}
                <Controlbar />
                <Utils />
            </div>
        </div>
    )
}

export default Footer