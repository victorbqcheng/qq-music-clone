import React, { use, useEffect, useState } from 'react'
import '../index.css'
import bgimg from '../assets/slightly_lighter_transparent_image.png'
import { AiOutlineStepForward, AiOutlineStepBackward } from "react-icons/ai";
import { IoPlaySharp, IoPauseSharp } from "react-icons/io5";
import Logo from '../assets/logo.svg?react';
import { LyricLine } from '../types';


// const lyrics = [
//     { time: 0.0, text: "这是第一句歌词" },
//     { time: 5.0, text: "这是第二句歌词" },
//     { time: 10.0, text: "这是第三句歌词" },
//     { time: 15.0, text: "这是第四句歌词" },
//     { time: 20.0, text: "这是第五句歌词" },
//     { time: 25.0, text: "这是第六句歌词" },
//     { time: 30.0, text: "这是第七句歌词" },
//     { time: 35.0, text: "这是第八句歌词" },
//     { time: 40.0, text: "这是第九句歌词" },
//     { time: 45.0, text: "这是第十句歌词" },
//     { time: 50.0, text: "这是第十一句歌词" },
//     { time: 55.0, text: "这是第十二句歌词" },
//     { time: 60.0, text: "这是第十三句歌词" },
//     { time: 65.0, text: "这是第十四句歌词" },
//     { time: 70.0, text: "这是第十五句歌词" },
//     { time: 75.0, text: "这是第十六句歌词" },
//     { time: 80.0, text: "这是第十七句歌词" },

//     // 更多歌词...
// ];

const bg_img: React.CSSProperties = {
    backgroundImage: `url(${bgimg})`,
};

const DesktopLyric = () => {
    
    const [currentTime, setCurrentTime] = useState(30);
    const [lyrics, setLyrics] = useState<LyricLine[]>([]);
    const [showBackgroundAndHeader, setShowBackgroundAndHeader] = useState(false);
    const dpiScale = window.devicePixelRatio;

    useEffect(() => {
        const channel = new BroadcastChannel('update_current_time');
        const handleUpdateCurrentTime = (event: MessageEvent) => {
            if (event.data.type === 'update_current_time') {
                setCurrentTime(event.data.currentTime);
            }
        };
        channel.addEventListener('message', handleUpdateCurrentTime);
        return () => {
            channel.removeEventListener('message', handleUpdateCurrentTime);
            channel.close();
        }
    }, []);
    useEffect(() => {
        const channel = new BroadcastChannel('update_lyrics');
        const handleUpdateLyrics = (event: MessageEvent) => {
            if (event.data.type === 'update_lyrics') {
                setLyrics(event.data.lyrics);
            }
        };
        channel.addEventListener('message', handleUpdateLyrics);
        return () => {
            channel.removeEventListener('message', handleUpdateLyrics);
            channel.close();
        }
    }, []);
    const getActiveIndex = ()=>{
        let newIndex = 0;
        for (let i = 0; i < lyrics.length; i++) {
            if (lyrics[i].time <= currentTime) {
                newIndex = i;
            } else {
                break;
            }
        }
        return newIndex;
    };
    const activeIndex = getActiveIndex();

    useEffect(()=>{
        let isDragging = false;
        let startX = 0;
        let startY = 0;
        let winStartX = 0;
        let winStartY = 0;
        const handleMouseDown = (e: MouseEvent) => {
            isDragging = true;
            startX = e.screenX;
            startY = e.screenY;
            [winStartX, winStartY] = window.NativeAPI.getWindowPos();
            console.log('winStartPos:', winStartX, winStartY);

        };
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                const deltaX = (e.screenX - startX) * dpiScale;
                const deltaY = (e.screenY - startY) * dpiScale;
                window.NativeAPI.setWindowPos(winStartX * dpiScale + deltaX, winStartY * dpiScale + deltaY);
            }
        };
        const handleMouseUp = () => {
            isDragging = false;
        }
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [dpiScale]);


    const onMouseEnter = (e: React.MouseEvent) => {
        console.log('mouse enter', e.clientX, e.clientY);
        setShowBackgroundAndHeader(true);
    }
    const onMouseLeave = (e: React.MouseEvent) => {
        console.log('mouse leave', e.clientX, e.clientY);
        setShowBackgroundAndHeader(false);
    }

    const Content1 = () => {
        return (
            <div className='h-screen w-screen relative p-[10px] bg-gray-100'>
                <div className='relative h-full w-full' onMouseLeave={onMouseLeave} >
                    {showBackgroundAndHeader && <img src={bgimg} className='h-full w-full' />}

                    {showBackgroundAndHeader && <div className='bg-blue-300 absolute top-0 left-0 h-8 right-0'>header</div>}

                    <div className=' absolute top-8 left-0 bottom-0 right-0 flex flex-col items-center justify-center' >
                        <div className='text-white bg-green-300 text-4xl font-bold text-center select-none'
                            onMouseEnter={onMouseEnter}>
                            <div>{lyrics[activeIndex].text}</div>
                        </div>

                    </div>
                </div>
            </div>
        )
    };

    const DisplayLyric = ()=>{
        // return <div className={`w-1/2 h-10 ${showBackgroundAndHeader ? 'bg-gray-500/0' : 'bg-gray-500/60'}`}></div>
        if(lyrics.length > 0){
            if(lyrics[activeIndex].text === ''){
                return <div className={`w-1/2 h-10 ${showBackgroundAndHeader ? 'bg-gray-500/0' : 'bg-gray-500/60'}`}></div>
            }
            return <div>{lyrics[activeIndex].text}</div>
        }
        return <div>暂无歌词</div>
    };

    const Content2 = () => {
        return (
            <div className='h-screen w-screen relative p-[10px] bg-gray-100/0 select-none'>
                <div className={`w-full  flex flex-col items-center ${showBackgroundAndHeader ? 'bg-gray-500/60' : 'bg-gray-500/0'}`}
                    onMouseLeave={onMouseLeave}>

                    <Header show={showBackgroundAndHeader} />

                    <div className='bg-yellow-300/0 min-h-20 w-full flex flex-col items-center py-8'>
                        <div className='bg-red-300/0 w-full flex flex-row justify-center text-center text-4xl font-bold grid-cols-1 gap-2'
                            onMouseEnter={onMouseEnter}>
                            {
                                DisplayLyric()
                            }
                        </div>
                    </div>

                    {/* <div>footer</div> */}

                </div>
            </div>
        );
    };

    return Content2();
}

type HeaderProps = {
    show: boolean;
};

const Header = ({show}:HeaderProps)=>{
    return (
        <div className={`bg-blue-300/0 w-full h-10 flex flex-row items-center justify-center ${show ? 'opacity-100' : 'opacity-0'}`}>
            {/* left */}
            <div className='flex items-center justify-start text-gray-400 text-xl'>
                {/* <img src={logoSvg} className='cursor-pointer h-4 w-4 mr-2' /> */}
                <Logo style={{width:'15px', height:'15px', }} className='cursor-pointer hover:text-gray-200' />
                
                <AiOutlineStepBackward className='cursor-pointer hover:text-gray-200' />
                <IoPlaySharp className='cursor-pointer hover:text-gray-200' />
                <AiOutlineStepForward className='cursor-pointer hover:text-gray-200' />
            </div>
        </div>
    );
};

export default DesktopLyric