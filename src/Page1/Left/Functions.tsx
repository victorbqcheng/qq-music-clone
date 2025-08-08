import React from 'react'
import { SlHome } from "react-icons/sl";
import { PiCompass } from "react-icons/pi";
import { Link, useLocation } from 'react-router';

const Functions = () => {
    const location = useLocation();
    const select = (path: string):boolean => {
        return location.pathname === path;
    };
    return (
        <>
            <div className='grid grid-cols-2 gap-2'>
                <Link to="/"><FunctionItem icon={<SlHome />} selected={select("/")} /></Link>
                <Link to="/explore"><FunctionItem icon={<PiCompass className='w-5 h-5' />} selected={select("/explore")} /></Link>
            </div>
            {/* spacer */}
            <div className='h-4' />
            <div className='flex flex-row justify-center text-gray-500 border-dashed border-gray-500 border-1 rounded-lg hover:text-gray-400 hover:border-gray-400'>
                +
            </div>
        </>
    )
}

type FunctionItemProps = {
    icon: React.ReactNode;
    selected?: boolean;
}

const FunctionItem = ({ icon, selected }: FunctionItemProps) => {
    return (
        <div className={`h-12 flex flex-col items-center justify-center p-2 ${selected ? 'bg-background-hover' : ''} rounded-lg hover:bg-background-hover cursor-pointer`}>
            {icon}
        </div>
    );
};


export default Functions