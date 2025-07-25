import React from 'react'
import type { MenuProps } from 'antd';
import { Dropdown, Space, Button } from 'antd';
import { MdOutlineAddBox } from "react-icons/md";
import MusicCD from '../../../../assets/music-cd.webp'
import singer1 from '../../../../assets/singer1.jpg'
import { IoPlaySharp } from "react-icons/io5";

const LocalTab = () => {

    const items: MenuProps['items'] = [
        {
            label: (
                <div onClick={() => alert('添加歌曲')}>
                    添加歌曲
                </div>
            ),
            key: '0',
        },
        {
            label: (
                <div>
                    添加文件夹
                </div>
            ),
            key: '1',
        },
    ];

    

    return (
        <div className='flex-1 bg-blue-200 flex flex-col localtab'>
            {/* 没有本地歌曲时的提示 */}
            {/* <div className='flex-1 flex flex-col items-center justify-center h-full bg-orange-200'>
                <img src={MusicCD} alt="Music CD" className='w-32 h-32' />
                没有本地歌曲
                <Dropdown menu={{ items }} trigger={['click']}>
                    <Button icon={<MdOutlineAddBox />} >添加</Button>
                </Dropdown>
            </div> */}
            {/* 本地歌曲列表 */}
            <div className='sticky top-10 bg-gray-100 z-50'>
                <div className='mb-4'>
                    <span>播放</span>
                    <span>添加</span>
                    <span>批量操作</span>
                    <span>清空</span>
                </div>
                <div className='flex flex-row items-center justify-between text-xs font-light'>
                    <div className='flex-1'>歌名/歌手</div>
                    <div className='flex-1'>专辑名</div>
                    <div className='w-10'>时长</div>
                    <div className='w-10'>大小</div>
                </div>
            </div>

            <div className='flex flex-col '>
                {
                    Array.from({ length: 20 }, (_, index) => (
                        <SongItem key={index} index={index} />
                    ))
                }
            </div>
        </div>
    )
}

type SongItemProps = {
    index: number;
};

const SongItem = ({ index }: SongItemProps) => {

    const isEven = index % 2 === 0;

    return (
        <div className={`flex flex-row items-center justify-between py-2 hover:bg-gray-200 ${isEven ? 'bg-gray-200' : 'bg-gray-100'}`}>
            {/* 歌名/歌手 */}
            <div className='flex flex-row items-center justify-start flex-1'>
                <div className='relative'>
                    <img src={singer1} alt="Song Cover" className='w-10 h-10 mr-2' />
                    <div className='text-green-400 opacity-0 absolute top-0 left-0 h-full w-full flex justify-center items-center'>
                        <IoPlaySharp className='text-xl'  />
                    </div>
                </div>
                <div className=''>
                    <div className='text-sm font-light'>世界上最伤心的人: {index}</div>
                    <div className='text-xs font-light'>常艾非</div>
                </div>
            </div>
            {/* 专辑 */}
            <div className='text-xs font-light flex-1'>专辑名</div>
            <div className='text-xs font-light w-10'>时长</div>
            <div className='text-xs font-light w-10'>大小</div>
        </div>
    );
};

export default LocalTab