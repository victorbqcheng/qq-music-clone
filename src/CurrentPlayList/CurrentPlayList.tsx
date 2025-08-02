import React, { useEffect, useRef } from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiListChecks, PiLinkSimple } from "react-icons/pi";
import { CiHeart, CiCircleMore } from "react-icons/ci";
import stateStore from '../store/stateStore';
import { observer } from 'mobx-react-lite';
import { AudioFileInfo } from '../types';
import defaultCover from '../assets/default-cover.png';
import { IoPlaySharp } from 'react-icons/io5';
import localAudioStore from '../store/localAudioStore';
import { usePlayer } from '../context/PlayerContext';
import { Dropdown, MenuProps } from 'antd';

// https://claude.ai/chat/e253ec18-4a6e-48a8-acc6-f9ca0d649fa6

const CurrentPlayList = observer(() => {
    const noOfTracks = 20; // 假设有10首曲目
    const divRef = useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // 这种判断不准确， 比如当点击弹出菜单的内容时会误判， 因为antd的Dropdown并不是直接在divRef内
            // if (divRef.current && !divRef.current.contains(event.target as Node)) {
            //     stateStore.setOpenCurrentPlayList(false);
            // }
            // 通过鼠标位置判断是否在div内
            if (!divRef.current) return;
            const rect = divRef.current.getBoundingClientRect();
            const isOutside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
            if (isOutside) {
                stateStore.setOpenCurrentPlayList(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <div className={`absolute top-3 ${stateStore.openCurrentPlayList ? 'right-0' : '-right-120'} w-115 h-[calc(100%-110px)] flex flex-col bg-gray-200 p-2 border-1 border-black select-none z-50 my-no-drag`}
            ref={divRef}
            tabIndex={1} autoFocus
        >
            <div className='flex flex-row items-center justify-between h-16'>
                <div>播放队列</div>
                <div className='flex flex-row gap-4'>
                    <PiListChecks className='text-2xl' />
                    <RiDeleteBin6Line className='text-2xl' />
                </div>
            </div>
            <div className='text-xs font-light h-10'>共{noOfTracks}首歌曲</div>

            <div className='overflow-y-auto custom-scrollbar w-full'>
                {
                    localAudioStore.localAudioFiles.map((file, index) => (
                        <ListItem key={index} index={index} file={file} selected={index === selectedIndex} onClick={() => setSelectedIndex(index)} />
                    ))
                }
            </div>
        </div>
    )
});

type ListItemProps = {
    index: number;
    file?: AudioFileInfo;
    onClick?: (index: number) => void;
    selected?: boolean;
};

const ListItem1 = ({ index, file }: ListItemProps) => {
    const isEven = index % 2 === 0;
    return (
        <div className={`group flex flex-row w-full items-center justify-between py-2 hover:bg-gray-200 ${isEven ? 'bg-gray-200' : 'bg-gray-100'}`}>
            <div className='bg-red-400 w-100 py-2 flex whitespace-nowrap overflow-hidden text-ellipsis '>     {/*whitespace-nowrap overflow-hidden text-ellipsis或者group-hover:w-[calc(100%-320px)]*/}
                <div className='w-10 min-w-10 h-10 mr-2'>img</div>
                <div className='flex-1 min-w-0 whitespace-nowrap overflow-hidden text-ellipsis'>left1left2left3left4leftleft1left2left3left4leftleft1left2left3left4left</div>
                <div className='w-10 min-w-10 h-10'>end</div>
            </div>
            <div className='bg-blue-400 w-0 whitespace-nowrap overflow-hidden text-ellipsis group-hover:min-w-80'>right</div>
        </div>
    );
};

const ListItem = ({ index, file, selected, onClick }: ListItemProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = React.useState(false);
    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    const handleMouseLeave = () => {
        setIsHovered(false);
    }
    const { loadTrack } = usePlayer();
    const isEven = index % 2 === 0;

    const handleDoubleClick = () => {
        loadTrack(file);
        // play();
    };
    return (
        <div className={`group flex flex-row items-center justify-between py-2 hover:bg-gray-200 ${isEven ? 'bg-gray-200' : 'bg-gray-100'}`}
            ref={containerRef}
            onDoubleClick={handleDoubleClick}
            onClick={() => onClick && onClick(index)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            {/* 歌名/歌手 */}
            <div className='flex flex-row items-center justify-start whitespace-nowrap overflow-hidden text-ellipsis w-full'>
                <div className='relative'>
                    <img src={file.img || defaultCover} alt="Song Cover" className='w-10 min-w-10 h-10 mr-2' />
                    <div className='absolute top-0 left-0 h-full w-full flex justify-center items-center opacity-0 group-hover:opacity-100 text-white hover:text-green-400'>
                        <IoPlaySharp className='text-xl' />
                    </div>
                </div>
                <div className='whitespace-nowrap overflow-hidden text-ellipsis'>
                    <div className='text-sm font-light whitespace-nowrap overflow-hidden text-ellipsis'>{file?.title || '未知歌曲'}: {index}</div>
                    <div className='text-xs font-light whitespace-nowrap overflow-hidden text-ellipsis'>{file?.artist || '未知艺术家'}</div>
                </div>
                {/* <div className='w-10 min-w-10 h-10'>end</div> */}
            </div>
            {
                selected || isHovered ? <Interactions /> : <></>
            }
        </div>
    );
};



const Interactions = () => {


    const items: MenuProps['items'] = [

        {
            label: (
                <div className='w-24'>播放</div>
            ),
            key: '0',
        },
        {
            label: (
                <div>分享</div>
            ),
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: (
                <div>删除</div>
            ),
            key: '2',
        },
        {
            label: (
                <div>添加到播放列表</div>
            ),
            key: '3',
        },
        {
            label: (<div>添加到收藏</div>
            ),
            key: '4',
        }

    ];
    return (
        <div className='w-0 overflow-hidden flex flex-row items-center justify-around min-w-30'>
            <CiHeart className='text-2xl hover:text-red-400 cursor-pointer' />
            <PiLinkSimple className='text-2xl hover:text-blue-400 cursor-pointer' />
            <Dropdown menu={{ items }} trigger={['click']} >
                <CiCircleMore className='text-2xl hover:text-blue-400 cursor-pointer' />
            </Dropdown>

        </div>
    );
};

export default CurrentPlayList