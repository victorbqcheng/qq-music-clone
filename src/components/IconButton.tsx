import React from 'react'
import { IoPlaySharp } from "react-icons/io5";

type IconButtonProps = {
    label?: string;
    icon?: React.ReactNode;
    className?: string;
    onClick?: () => void;
};

const IconButton = ({label, icon, className, onClick}:IconButtonProps) => {
    return (
        <div className='flex flex-row items-center justify-center gap-1 bg-gray-300 px-3 py-1 rounded-full cursor-pointer'>
            {icon}
            <div className={`text-sm ${className}`} onClick={onClick}>
                {label}
            </div>
        </div>
    )
}

export default IconButton