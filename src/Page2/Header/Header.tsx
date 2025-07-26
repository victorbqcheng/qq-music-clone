import React from 'react'
import { IoChevronDown } from "react-icons/io5";

import { LuFullscreen } from "react-icons/lu";
import { VscChromeClose, VscChromeMaximize, VscChromeMinimize } from 'react-icons/vsc';
import stateStore from '../../store/stateStore';

const Header = () => {
    return (
        <div className={`h-18 w-full flex items-center justify-between ${stateStore.showPage2? 'my-drag' : ''} bg-gray-200 border-b border-gray-400`}>
            <IoChevronDown className='text-lg hover:text-green-300 my-no-drag' onClick={() => stateStore.setShowPage2(false)} />
            <div className='flex items-center gap-2 pr-2'>
                <LuFullscreen className='text-lg hover:text-green-300 my-no-drag' />
                <VscChromeMinimize className='text-lg hover:text-green-300 my-no-drag' />
                <VscChromeMaximize className='text-lg hover:text-green-300 my-no-drag' />
                <VscChromeClose className='text-lg hover:text-green-300 my-no-drag' />

            </div>
        </div>
    )
}

export default Header