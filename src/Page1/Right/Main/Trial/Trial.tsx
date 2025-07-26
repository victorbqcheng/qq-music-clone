import React from 'react'
import { Button } from 'antd';
import MusicCD from '../../../../assets/music-cd.webp'

const Trial = () => {
    return (
        <div className='flex flex-col items-center justify-center min-h-full bg-orange-200'>
            <img src={MusicCD} alt="Music CD" className='w-32 h-32' />
            没有试听记录
            <Button>去音乐馆逛逛</Button>
        </div>
    )
}

export default Trial