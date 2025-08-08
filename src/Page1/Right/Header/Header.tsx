import React, { useEffect, useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { SlRefresh } from "react-icons/sl";
import { CiSearch } from "react-icons/ci";
import { VscChromeMinimize, VscChromeMaximize, VscChromeRestore, VscChromeClose } from "react-icons/vsc";
import { PiArrowsInSimpleFill } from "react-icons/pi";
import { useNavigate } from 'react-router';
import { observer } from 'mobx-react-lite';


const Header = observer(() => {
    const navigate = useNavigate();
    const placeHolderRef = useRef<HTMLDivElement>(null);
    const [isWindowMaximized, setIsWindowMaximized] = useState(false);

    const handleBack = () => {
        navigate(-1);
    };
    const handleForward = () => {
        navigate(1);
    };
    const handleInputFocus = () => {
        if (placeHolderRef.current) {
            placeHolderRef.current.style.display = 'none';
        }
    }
    const handleInputBlur = () => {
        if (placeHolderRef.current) {
            placeHolderRef.current.style.display = 'flex';
        }
    }
    const handleMinimize = () => {
        window.NativeAPI?.minimizeWindow();
    }
    const handleMaximize = () => {
        window.NativeAPI?.maximizeWindow();
    }
    const handleClose = () => {
        window.NativeAPI?.closeWindow();
    }
    useEffect(()=>{
        const unsubscribeMaximized = window.NativeAPI?.onMaximized(() => {
            setIsWindowMaximized(true);
        });
        const unsubscribeUnMaximized = window.NativeAPI?.onUnmaximized(() => {
            setIsWindowMaximized(false);
        });
        return () => {
            unsubscribeMaximized?.();
            unsubscribeUnMaximized?.();
        }
    }, []);

    return (
        <div className='h-14 flex items-center justify-start gap-4 overflow-hidden my-drag'>
            <FaChevronLeft className='my-no-drag cursor-pointer' onClick={handleBack} />
            <FaChevronRight className='my-no-drag cursor-pointer' onClick={handleForward} />
            <SlRefresh className='my-no-drag' />
            <div className='relative flex flex-row items-center bg-gray-400 rounded-md p-1 my-no-drag'>
                <div ref={placeHolderRef} className='absolute flex flex-row items-center gap-2 pointer-events-none'>
                    <CiSearch className='ml-1' />
                    <span className='text-sm text-gray-600'>Search</span>
                </div>

                <input type='text' className=' border-0 outline-0 px-2 text-[13px] w-60 font-semibold'
                 onFocus={handleInputFocus} onBlur={handleInputBlur} />
            </div>

            <div className='rounded-full border-1 border-gray-500 w-8 h-8 flex justify-center items-center text-sm text-green-500 hover:border-green-500 my-no-drag'>免</div>
            <div className='flex flex-row items-center gap-2 text-gray-500 ml-auto my-no-drag'>
                <PiArrowsInSimpleFill className='text-lg hover:text-gray-800' />
                <VscChromeMinimize className='text-lg hover:text-gray-800' onClick={handleMinimize} />
                {
                    isWindowMaximized ? 
                    <VscChromeRestore className='text-lg hover:text-gray-800' onClick={handleMaximize} /> : 
                    <VscChromeMaximize className='text-lg hover:text-gray-800' onClick={handleMaximize} />
                }
                <VscChromeClose className='text-lg hover:text-gray-800' onClick={handleClose} />
            </div>
        </div>
    )
});

export default Header