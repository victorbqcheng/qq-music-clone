import React, { useEffect, useRef, useState } from 'react'
import { IoChevronDown } from "react-icons/io5";

import { LuFullscreen } from "react-icons/lu";
import { VscChromeClose, VscChromeMaximize, VscChromeMinimize, VscChromeRestore } from 'react-icons/vsc';
import stateStore from '../../store/stateStore';

type HeaderProps = {
    onFullscreen?: () => void;
}


const Header = ({ onFullscreen }: HeaderProps) => {
    const [isWindowMaximized, setIsWindowMaximized] = useState(false);
    const handleMinimize = () => {
        window.NativeAPI.minimizeWindow();
    }
    const handleMaximize = () => {
        window.NativeAPI.maximizeWindow();
    }
    const handleClose = () => {
        window.NativeAPI.closeWindow();
    }

    useEffect(() => {
        window.NativeAPI.onMaximized(() => {
            setIsWindowMaximized(true);
        });
        window.NativeAPI.onUnmaximized(() => {
            setIsWindowMaximized(false);
        });
    }, []);

    return (
        <div className={`h-18 w-full flex items-center justify-between ${stateStore.showPage2 ? 'my-drag' : ''} bg-gray-200 border-b border-gray-400`}>
            <IoChevronDown className='text-lg hover:text-green-300 my-no-drag' onClick={() => stateStore.setShowPage2(false)} />
            <div className='flex items-center gap-2 pr-2'>
                <LuFullscreen className='text-lg hover:text-green-300 my-no-drag' onClick={onFullscreen} />
                <VscChromeMinimize className='text-lg hover:text-green-300 my-no-drag' onClick={handleMinimize} />
                {
                    isWindowMaximized ?
                        <VscChromeRestore className='text-lg hover:text-green-300 my-no-drag' onClick={handleMaximize} /> :
                        <VscChromeMaximize className='text-lg hover:text-green-300 my-no-drag' onClick={handleMaximize} />
                }
                <VscChromeClose className='text-lg hover:text-green-300 my-no-drag' onClick={handleClose} />

            </div>
        </div>
    )
}

export default Header