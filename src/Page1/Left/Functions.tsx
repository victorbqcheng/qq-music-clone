import React from 'react'
import { SlHome } from "react-icons/sl";
import { PiCompass } from "react-icons/pi";

const Functions = () => {

    return (
        <>
            <div className='grid grid-cols-2 gap-2'>
                <FunctionItem icon={<SlHome />} selected={true} />
                <FunctionItem icon={<PiCompass className='w-5 h-5' />} />
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
        <div className={`h-12 flex flex-col items-center justify-center p-2 ${selected ? 'bg-gray-300' : 'bg-gray-100'} rounded-lg hover:bg-gray-200 cursor-pointer`}>
            {icon}
        </div>
    );
};


export default Functions