import React, { useEffect, useRef, useState } from 'react'
import LyricsDisplay from './LyricsDisplay';
import album1 from '../../assets/album1.jpg';
import defaultCover from '../../assets/default-cover.png';
import Cover from './Cover';
import { usePlayer } from '../../context/PlayerContext';

// 示例歌词数据
    const lyrics = [
        { time: 0.0, text: "这是第一句歌词" },
        { time: 5.0, text: "这是第二句歌词" },
        { time: 10.0, text: "这是第三句歌词" },
        { time: 15.0, text: "这是第四句歌词" },
        { time: 20.0, text: "这是第五句歌词" },
        { time: 25.0, text: "这是第六句歌词" },
        { time: 30.0, text: "这是第七句歌词" },
        { time: 35.0, text: "这是第八句歌词" },
        { time: 40.0, text: "这是第九句歌词" },
        { time: 45.0, text: "这是第十句歌词" },
        { time: 50.0, text: "这是第十一句歌词" },
        { time: 55.0, text: "这是第十二句歌词" },
        { time: 60.0, text: "这是第十三句歌词" },
        { time: 65.0, text: "这是第十四句歌词" },
        { time: 70.0, text: "这是第十五句歌词" },
        { time: 75.0, text: "这是第十六句歌词" },
        { time: 80.0, text: "这是第十七句歌词" },
        
        // 更多歌词...
    ];

const Main = () => {
    const [currentTime, setCurrentTime] = useState(0);
    const rotateDivRef = useRef<HTMLDivElement>(null);
    const {state:{isPlaying, currentTrack}} = usePlayer();
    useEffect(()=>{
        if(rotateDivRef.current){
            rotateDivRef.current.style.animationPlayState = isPlaying ? 'running' : 'paused';
        }
    }, [isPlaying]);
    
    return (
        <div className='flex-1 w-full overflow-y-auto flex flex-row bg-[#808080]'>
            <div className='flex-1 flex items-center justify-center'>
                <div ref={rotateDivRef} className='w-96 h-96' style={{animation: 'rotate 10s linear infinite'}}>
                    <Cover imageUrl={currentTrack?.img || defaultCover} />
                </div>
            </div>
            <div className='flex-1 flex flex-col items-center justify-center'>
                <div className='flex flex-col h-2/3 w-4/5  overflow-y-auto'>
                    <LyricsDisplay lyrics={lyrics} currentTime={currentTime} />
                    <button onClick={() => setCurrentTime(currentTime + 5)}>向下滚动</button>
                </div>
            </div>
        </div>
    )
}

export default Main