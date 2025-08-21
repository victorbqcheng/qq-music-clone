import React, { useCallback, useEffect, useState } from 'react'
import { Dropdown, MenuProps, Popover, Slider } from "antd";
import { TfiLoop } from "react-icons/tfi";
import { AiOutlineStepForward, AiOutlineStepBackward } from "react-icons/ai";
import { IoPlaySharp, IoPauseSharp } from "react-icons/io5";
import { RxSpeakerModerate } from "react-icons/rx";
import { usePlayer } from '../context/PlayerContext';
import { formatTime } from '../lib/utils';
import currentPlayListStore from '../store/currentPlayListStore';
import { observer } from 'mobx-react-lite';
import { LyricLine } from '../types';

const style: React.CSSProperties = {
    display: 'inline-block',
    height: 100,
};



const Controlbar = observer(() => {

    const { play, pause, state: { currentTime, volume, duration, isPlaying, currentTrack }, loadTrack, setVolume, seekTo } = usePlayer();

    const [thisCurrentTime, setThisCurrentTime] = useState(currentTime);
    const [sliderChangeStart, setSliderChangeStart] = useState(false);

    useEffect(() => {
        if (sliderChangeStart) return; // 如果滑块正在被拖动，则不用player的currentTime更新 thisCurrentTime
        // // 如果滑块没有被拖动，则用player的currentTime更新 thisCurrentTime
        setThisCurrentTime(currentTime);
    }, [currentTime, sliderChangeStart]);

    useEffect(() => {
        const channel = new BroadcastChannel('request_state');
        const handleMessage = (event: MessageEvent) => {
            if (event.data.type === 'get_state') {
                // channel.postMessage({ type: 'set_state', state:JSON.stringify(state) }); // option 1
                const s = {
                    volume,
                    isPlaying,
                    currentTrack: { ...currentTrack },
                };
                channel.postMessage({ type: 'set_state', state: s });   // option 2
            }
        };
        channel.addEventListener('message', handleMessage);
        return () => {
            channel.removeEventListener('message', handleMessage);
            channel.close();
        };
    }, [isPlaying, currentTrack, volume]);

    useEffect(() => {
        const channel = new BroadcastChannel('update_current_time');
        channel.postMessage({ type: 'update_current_time', currentTime: currentTime });
        return () => {
            channel.close();
        }
    }, [currentTime]);
    useEffect(()=>{
        let channel = new BroadcastChannel('update_lyrics');
        const getLyric = async () => {
            let lyrics:LyricLine[] = [];
            if (currentTrack) {
                lyrics = await window.NativeAPI.getLyric(currentTrack.filePath, currentTrack.title);
                if(channel){
                    channel.postMessage({ type: 'update_lyrics', lyrics });
                }
            }
        }
        getLyric();
        return () => {
            channel.close();
            channel = null;
        }
    }, [currentTrack]);

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
    const handlePlayPre = useCallback(() => {
        currentPlayListStore.getAudioFiles().findIndex((f, index) => {
            if (f.filePath === currentTrack?.filePath) {
                const preIndex = index - 1;
                if (preIndex >= 0) {
                    loadTrack(currentPlayListStore.getAudioFiles()[preIndex]);
                } else {
                    // 如果没有上一首，则不做任何操作
                }
                return true; // 找到当前播放的文件，停止查找
            }
            return false; // 继续查找
        });
    }, [currentTrack, loadTrack]);

    const handlePlayNext = useCallback(() => {
        currentPlayListStore.getAudioFiles().findIndex((f, index) => {
            if (f.filePath === currentTrack?.filePath) {
                const nextIndex = index + 1;
                if (nextIndex < currentPlayListStore.getAudioFiles().length) {
                    loadTrack(currentPlayListStore.getAudioFiles()[nextIndex]);
                } else {
                    // 如果没有下一首，则不做任何操作
                }
                return true; // 找到当前播放的文件，停止查找
            }
            return false; // 继续查找
        });
    }, [currentTrack, loadTrack]);
    
    useEffect(() => {
        const channel = new BroadcastChannel('player_control');
        const handleControlMessage = (event: MessageEvent) => {
            if (event.data.type === 'play') {
                play();
            }
            if (event.data.type === 'pause') {
                pause();
            }
            if (event.data.type === 'set_volume') {
                setVolume(event.data.volume);
            }
            if (event.data.type === 'next') {
                handlePlayNext();
            }
            if (event.data.type === 'prev') {
                handlePlayPre();
            }
        }
        channel.addEventListener('message', handleControlMessage);
        return () => {
            channel.removeEventListener('message', handleControlMessage);
            channel.close();
        };
    }, [play, pause, setVolume, handlePlayNext, handlePlayPre]);
    // volume control content
    const content = (
        <div className='h-40 flex flex-col items-center justify-between w-8'>
            <Slider style={style} value={volume} max={1} step={0.01} tooltip={{ open: false }} vertical onChange={setVolume} />
            <div>{Math.round(volume * 100)}%</div>
            <div className=' absolute w-full bottom-8 border-1 border-gray-300'></div>
            <RxSpeakerModerate className='' />
        </div>
    );

    return (
        <div className='flex flex-col items-center justify-center w-1/3 pointer-events-none'>
            <div className='flex flex-row items-center justify-around w-full'>
                <div className='cursor-pointer hover:text-green-400 pointer-events-auto'><TfiLoop /></div>
                <div className='cursor-pointer hover:text-green-400 pointer-events-auto'
                    onClick={handlePlayPre}>
                    <AiOutlineStepBackward />
                </div>
                <div className='cursor-pointer bg-green-400 p-2 rounded-2xl w-10 flex flex-row items-center justify-center pointer-events-auto'
                    onClick={togglePlayPause}>
                    {
                        isPlaying ? <IoPauseSharp /> : <IoPlaySharp />
                    }
                </div>
                <div className='cursor-pointer hover:text-green-400 pointer-events-auto'
                    onClick={handlePlayNext}>
                    <AiOutlineStepForward />
                </div>
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
})

export default Controlbar