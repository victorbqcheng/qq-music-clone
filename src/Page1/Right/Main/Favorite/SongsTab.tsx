import React from 'react'

import { Button } from 'antd';
import MusicCD from '../../../../assets/music-cd.webp'

const SongsTab = () => {
    return (
        <div className='flex-1 flex flex-col '>
            {/* 没有喜欢的歌曲时的提示 */}
            <div className='flex-1 flex flex-col items-center justify-center h-full'>
                <img src={MusicCD} alt="Music CD" className='w-32 h-32' />
                没有收藏的歌曲
                <Button >去音乐馆逛逛</Button>
                
            </div>
        </div>
    )
}

export default SongsTab