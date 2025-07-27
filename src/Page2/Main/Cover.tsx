import React from 'react'
import cover from '../../assets/cover.png'

type CoverProps = {
    imageUrl?: string;
};

const Cover = ({ imageUrl }: CoverProps) => {
    return (
        <div className='w-full h-full relative flex items-center justify-center overflow-hidden rounded-full'>
            <img src={imageUrl} alt="Album Cover" className='object-cover w-2/3 h-2/3 rounded-full' />
            <div className='absolute top-0 left-0 right-0 bottom-0'
                 style={{
                    backgroundImage: `url(${cover})`,
                    backgroundSize: 'cover'
                 }} />
        </div>
    )
}

export default Cover