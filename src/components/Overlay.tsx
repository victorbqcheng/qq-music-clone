import React from 'react'

type OverlayProps = {
    onClick?: () => void;
}

const Overlay = ({onClick}:OverlayProps) => {
    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-black opacity-10 z-999'
             onClick={onClick}></div>
    )
}

export default Overlay