import React from 'react'

type TabBtnProps = {
    text: string;
    isSelected?: boolean;
    onClick?: () => void;
};

const TabBtn = ({ text, isSelected, onClick }: TabBtnProps) => {
    return (
        <>
            <span className={`${isSelected ? 'text-green-500' : ''} cursor-pointer hover:text-green-500`} onClick={onClick}>{text}</span>
        </>
    );
};

export default TabBtn