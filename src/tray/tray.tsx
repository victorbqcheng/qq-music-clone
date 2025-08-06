import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import '../index.css'
import '@ant-design/v5-patch-for-react-19';
import { observer } from 'mobx-react-lite';
import { BsPlayCircle,  } from "react-icons/bs";
import { CgPlayTrackPrevO, CgPlayTrackNextO } from "react-icons/cg";
import { CiHeart } from "react-icons/ci";
import { LiaRandomSolid } from "react-icons/lia";
import { PiSpeakerLowLight } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import '../index.css';



import React from 'react'
import { Slider } from 'antd';
import localAudioStore from '../store/localAudioStore';

const Tray = observer(() => {
  return (
    <div className='h-screen w-screen overflow-hidden select-none glass-effect'>
      <div className='flex items-center justify-center gap-4 text-gray-500 w-full py-4'>
        <CgPlayTrackPrevO className='text-3xl cursor-pointer hover:text-black' />
        <BsPlayCircle className='text-4xl cursor-pointer hover:text-black'/>
        <CgPlayTrackNextO className='text-3xl cursor-pointer hover:text-black'/>
      </div>
      <div className='flex items-center justify-center w-full gap-1'>
        <CiHeart className='text-xl'/>
        <span className='w-2/3 text-center text-sm overflow-hidden text-ellipsis whitespace-nowrap'>Price TagTag TagTag</span>
        <LiaRandomSolid className='text-lg' />
      </div>

      {/* 分割线 */}
      <div className='border-t border-1 border-gray-300 my-2'></div>

      <div className='flex items-center justify-center w-full text-gray-500'>
        <PiSpeakerLowLight className='w-12 h-6 text-2xl' />
        <div className='w-3/4'><Slider className='w-4/5' /></div>
      </div>
      <MenuItem label='显示桌面歌词' />
      <MenuItem label='动态桌面' />
      <MenuItem label='TME Studio' />
      
      <div className='border-t border-1 border-gray-300 my-2'></div>
      <MenuItem label='设置' icon={<IoSettingsOutline className='w-5 h-5' />} />
      <div className='border-t border-1 border-gray-300 my-2'></div>
      <MenuItem label='切换账号' />
      <MenuItem label='退出' onClick={()=>{window.NativeAPI.quit()}} />
    </div>
  )
})

type MenuItemProps = {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
};

const MenuItem = ({label, icon, onClick}:MenuItemProps)=>{
  return (
    <div className='flex items-center justify-center w-full text-gray-600 text-sm cursor-pointer hover:bg-gray-200'
         onClick={onClick}>
        <div className='w-12 h-8 flex items-center justify-center'>{icon}</div>
        <div className='flex-1'>{label}</div>
      </div>
  );
};

export default Tray