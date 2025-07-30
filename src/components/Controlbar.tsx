import React, { useEffect, useState } from 'react'
import { Dropdown, MenuProps, Popover, Slider } from "antd";
import { TfiLoop } from "react-icons/tfi";
import { AiOutlineStepForward, AiOutlineStepBackward } from "react-icons/ai";
import { IoPlaySharp, IoPauseSharp } from "react-icons/io5";
import { RxSpeakerModerate } from "react-icons/rx";
import { usePlayer } from '../context/PlayerContext';
import { formatTime } from '../lib/utils';

const style: React.CSSProperties = {
    display: 'inline-block',
    height: 100,
};



const Controlbar = () => {

    const { play, pause, state: { currentTime, volume, duration, isPlaying }, loadTrack, setVolume, seekTo } = usePlayer();

    // volume control content
    const content = (
        <div className='h-40 flex flex-col items-center justify-between w-8'>
            <Slider style={style} defaultValue={volume} max={1} step={0.01} tooltip={{ open: false }} vertical onChange={setVolume} />
            <div>{Math.round(volume * 100)}%</div>
            <div className=' absolute w-full bottom-8 border-1 border-gray-300'></div>
            <RxSpeakerModerate className='' />
        </div>
    );

    const [thisCurrentTime, setThisCurrentTime] = useState(currentTime);
    const [sliderChangeStart, setSliderChangeStart] = useState(false);

    useEffect(() => {
        if (sliderChangeStart) return; // 如果滑块正在被拖动，则不用player的currentTime更新 thisCurrentTime
        // // 如果滑块没有被拖动，则用player的currentTime更新 thisCurrentTime
        setThisCurrentTime(currentTime);
    }, [currentTime, sliderChangeStart]);
    const handleOnSliderChange = (value: number) => {
        setSliderChangeStart(true);
        setThisCurrentTime(value);
    };

    const handleOnSliderChangeComplete = (value: number) => {
        seekTo(value);
        setSliderChangeStart(false);
    };

    const togglePlayPause = () => {
        if (isPlaying) {
            pause();
        } else {
            play();
        }
    };
    return (
        <div className='flex flex-col items-center justify-center w-1/3 pointer-events-none'>
            <div className='flex flex-row items-center justify-around w-full'>
                <div className='cursor-pointer hover:text-green-400 pointer-events-auto'><TfiLoop /></div>
                <div className='cursor-pointer hover:text-green-400 pointer-events-auto'><AiOutlineStepBackward /> </div>
                <div className='cursor-pointer bg-green-400 p-2 rounded-2xl w-10 flex flex-row items-center justify-center pointer-events-auto'
                     onClick={togglePlayPause}>
                    {
                        isPlaying? <IoPauseSharp />:<IoPlaySharp /> 
                    }
                </div>
                <div className='cursor-pointer hover:text-green-400 pointer-events-auto'><AiOutlineStepForward /></div>
                <div className='cursor-pointer hover:text-green-400 pointer-events-auto'>
                    <Popover content={content} placement="top" title={null} trigger="click">
                        <RxSpeakerModerate />
                    </Popover>
                </div>
            </div>
            <div className='flex flex-row items-center justify-between w-full gap-2'>
                <div className='text-sm text-gray-600 pointer-events-auto'>{formatTime(thisCurrentTime)}</div>
                <div className='flex-1 pointer-events-auto'>
                    <Slider className='w-full'
                            value={thisCurrentTime} max={duration}
                            onChange={handleOnSliderChange}
                            onChangeComplete={handleOnSliderChangeComplete} />
                </div>
                <div className='text-sm text-gray-600 ml-2 pointer-events-auto'>{formatTime(duration)}</div>
            </div>
        </div>
    )
}

export default Controlbar