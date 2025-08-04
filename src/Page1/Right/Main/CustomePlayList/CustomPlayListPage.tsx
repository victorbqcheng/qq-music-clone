import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router'
import singer1 from '../../../../assets/singer1.jpg'
import IconButton from '../../../../components/IconButton';
import { IoPlaySharp } from "react-icons/io5";
import { BiSolidCloudDownload } from "react-icons/bi";
import { PiListChecksLight } from "react-icons/pi";
import { RiShareCircleLine } from "react-icons/ri";
import customPlayListsStore, { CustomPlayList } from '../../../../store/customPlayListsStore';
import { observer } from 'mobx-react-lite';
import PlayListItem from '../../../../components/PlayListItem';
import SongItem from '../../../../components/SongItem';

const CustomPlayListPage = observer(() => {
    // const location = useLocation();
    // console.log('Current location:', location);
    const params = useParams();
    const id = params.id;
    const [showStickyHeader, setShowStickyHeader] = React.useState(false);
    const playList = customPlayListsStore.getPlayListById(id)
    

    const height140: React.CSSProperties = {
        height: '140px'
    };
    const height112: React.CSSProperties = {
        height: '112px'
    };

    return (
        <div className='bg-green-200 h-full min-h-full flex flex-col overflow-y-auto custom-scrollbar'
            onScroll={(e) => {
                setShowStickyHeader(e.currentTarget.scrollTop > 112);
            }}>

            {
                <div className={`flex flex-row shrink-0 w-full  bg-gray-100`}
                    style={showStickyHeader ? height112 : height140}>
                    <img src={singer1} className='w-35 h-35' />
                    <div className='flex flex-col justify-between px-4'>
                        <h1 className='text-2xl font-bold'>{playList?.name}</h1>
                        <div className='font-light text-xs'>添加标签</div>
                        <div className='font-light text-xs'>精心完善歌单信息有机会获得推荐，让更多用户看到你的大作</div>
                        <div className='flex flex-row gap-4'>
                            <IconButton label='播放' icon={<IoPlaySharp />} />
                            <IconButton label='下载' icon={<BiSolidCloudDownload />} />
                            <IconButton label='批量' icon={<PiListChecksLight />} />
                            <IconButton label='分享' icon={<RiShareCircleLine />} />
                        </div>
                    </div>
                </div>
            }

            {
                showStickyHeader && (
                    <div className='flex flex-row gap-4 sticky top-0 bg-gray-100'>
                        <IconButton label='播放' icon={<IoPlaySharp />} />
                        <IconButton label='下载' icon={<BiSolidCloudDownload />} />
                        <IconButton label='批量' icon={<PiListChecksLight />} />
                        <IconButton label='分享' icon={<RiShareCircleLine />} />
                    </div>
                )
            }
            
            <div className='flex-1 flex flex-col items-center justify-center bg-orange-200'>
                {
                    playList?.files.length === 0 && (
                        <div className='text-2xl font-bold'>暂无歌曲</div>
                    )
                }
                {
                    playList?.files.map((file, index) => (
                        <SongItem key={index} index={index} file={file} />
                    ))
                }
                
            </div>
        </div>
    )
});

export default CustomPlayListPage