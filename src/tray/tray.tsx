import { StrictMode, useEffect } from 'react'
import '../index.css'
import '@ant-design/v5-patch-for-react-19';
import { observer } from 'mobx-react-lite';
import { BsPlayCircle,BsPauseCircle } from "react-icons/bs";
import { CgPlayTrackPrevO, CgPlayTrackNextO } from "react-icons/cg";
import { CiHeart } from "react-icons/ci";
import { LiaRandomSolid } from "react-icons/lia";
import { PiSpeakerLowLight } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import '../index.css';

import React from 'react'
import { Slider } from 'antd';
import { PlayerState } from '../types';


const Tray = observer(() => {
  const [state, setState] = React.useState<PlayerState>({
    currentTrack: null,
    isPlaying: false,
    volume: 0.5,
    duration: 0,
    currentTime: 0,
  });
  useEffect(() => {
    const channel = new BroadcastChannel('request_state');
    channel.postMessage({type: 'get_state'});
    channel.onmessage = (event) => {
      if (event.data.type === 'set_state') {
        // setState(JSON.parse(event.data.state));  // option 1
        setState(event.data.state); // option 2
      }
    }

    const unsubscribeTrayShow = window.NativeAPI?.onTrayShow(()=>{
      channel.postMessage({type: 'get_state'});
      channel.onmessage = (event) => {
        if (event.data.type === 'set_state') {
          setState(event.data.state);
        }
      };
    });

    return ()=>{
      channel.close();
      unsubscribeTrayShow?.();
    };
  }, []);

  const handlePlayPause = () => {
    const channel = new BroadcastChannel('player_control');
    if (state.isPlaying) {
            channel.postMessage({ type: 'pause' });
            setState(prevState => ({ ...prevState, isPlaying: false }));
        } else {
            channel.postMessage({ type: 'play' });
            setState(prevState => ({ ...prevState, isPlaying: true }));
        }
  }
  const handleSetVolume = (value: number) => {
    setState(prevState => ({ ...prevState, volume: value }));
    const channel = new BroadcastChannel('player_control');
    channel.postMessage({ type: 'set_volume', volume: value });
  }
  const handlePlayNext = () => {
    const channel = new BroadcastChannel('player_control');
    channel.postMessage({ type: 'next' });
  }
  const handlePlayPrev = () => {
    const channel = new BroadcastChannel('player_control');
    channel.postMessage({ type: 'prev' });
  }
  
  const PlayOrPauseIcon = ()=>{
    if(state?.isPlaying) {
      return <BsPauseCircle className='text-4xl cursor-pointer hover:text-black' onClick={handlePlayPause} />
    }else{
      return <BsPlayCircle className='text-4xl cursor-pointer hover:text-black' onClick={handlePlayPause} />
    }
  };

  return (
    <div className='h-screen w-screen overflow-hidden select-none glass-effect'>
      <div className='flex items-center justify-center gap-4 text-gray-500 w-full py-4'>
        <CgPlayTrackPrevO className='text-3xl cursor-pointer hover:text-black'
            onClick={handlePlayPrev} />
        {
          PlayOrPauseIcon()
        }
        <CgPlayTrackNextO className='text-3xl cursor-pointer hover:text-black'
            onClick={handlePlayNext} />
      </div>
      <div className='flex items-center justify-center w-full gap-1'>
        <CiHeart className='text-xl' />
        <span className='w-2/3 text-center text-sm overflow-hidden text-ellipsis whitespace-nowrap'>{state?.currentTrack?.title || '听我想听的歌'}</span>
        <LiaRandomSolid className='text-lg' />
      </div>

      {/* 分割线 */}
      <div className='border-t border-1 border-gray-300 my-2'></div>

      <div className='flex items-center justify-center w-full text-gray-500'>
        <PiSpeakerLowLight className='w-12 h-6 text-2xl' />
        <div className='w-3/4'>
          <Slider className='w-4/5' value={state.volume} max={1} step={0.01} tooltip={{ open: false }} onChange={handleSetVolume} />
        </div>
      </div>
      <MenuItem label='显示桌面歌词' />
      <MenuItem label='动态桌面' />
      <MenuItem label='TME Studio' />

      <div className='border-t border-1 border-gray-300 my-2'></div>
      <MenuItem label='设置' icon={<IoSettingsOutline className='w-5 h-5' />} />
      <div className='border-t border-1 border-gray-300 my-2'></div>
      <MenuItem label='切换账号' />
      <MenuItem label='退出' onClick={() => { window.NativeAPI.quit() }} />
    </div>
  )
})

type MenuItemProps = {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
};

const MenuItem = ({ label, icon, onClick }: MenuItemProps) => {
  return (
    <div className='flex items-center justify-center w-full text-gray-600 text-sm cursor-pointer hover:bg-gray-200'
      onClick={onClick}>
      <div className='w-12 h-8 flex items-center justify-center'>{icon}</div>
      <div className='flex-1'>{label}</div>
    </div>
  );
};

export default Tray