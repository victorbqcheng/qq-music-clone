import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import defaultCover from '../../../../assets/default-cover.png'
import IconButton from '../../../../components/IconButton';
import { IoPlaySharp } from "react-icons/io5";
import { BiSolidCloudDownload } from "react-icons/bi";
import { PiListChecksLight } from "react-icons/pi";
import { RiShareCircleLine } from "react-icons/ri";
import customPlayListsStore, { CustomPlayList } from '../../../../store/customPlayListsStore';
import { observer } from 'mobx-react-lite';
import SongItem from '../../../../components/SongItem';
import { AudioFileInfo } from '../../../../types';
import { usePlayer } from '../../../../context/PlayerContext';
import currentPlayListStore from '../../../../store/currentPlayListStore';

const CustomPlayListPage = observer(() => {
    const params = useParams();
    const id = params.id;
    const [showStickyHeader, setShowStickyHeader] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
    const {play, pause, state: { currentTime, volume, duration, isPlaying, currentTrack }, loadTrack} = usePlayer();

    const playList = customPlayListsStore.getPlayListById(id)


    const height140: React.CSSProperties = {
        height: '140px'
    };
    const height112: React.CSSProperties = {
        height: '92px'
    };

    const handleDeleteFile = (f: AudioFileInfo) => {
        if (!playList) return;
        customPlayListsStore.removeFileFromPlayList(id, f.filePath);
        if(currentPlayListStore.currentPlayListID === id) {
            currentPlayListStore.removeAudioFile(f.filePath);
            // 如果删除的文件是当前播放的文件，则播放下一首
            if (currentTrack?.filePath === f.filePath) {
                // TODO:
            }
        }
    };
    const handlePlay = (file:AudioFileInfo)=>{
        loadTrack(file);
        currentPlayListStore.setPlayListID(id);
        currentPlayListStore.setAudioFiles(playList?.files || []);
    };

    return (
        <div className='h-full min-h-full flex flex-col overflow-y-auto custom-scrollbar'
            onScroll={(e) => {
                setShowStickyHeader(e.currentTarget.scrollTop > 92);
            }}>

            {
                <div className={`flex flex-row shrink-0 w-full`}
                    style={showStickyHeader ? height112 : height140}>
                    <img src={defaultCover} className='w-35 h-35' title='defaultcover' />
                    <div className='flex flex-col justify-between px-4'>
                        <h1 className='text-2xl font-bold'>{playList?.name}</h1>
                        <div className='font-light text-xs'>添加标签</div>
                        <div className='font-light text-xs'>精心完善歌单信息有机会获得推荐，让更多用户看到你的大作</div>
                        <Interactions />
                    </div>
                </div>
            }

            {
                showStickyHeader && (
                    <div className='h-12 shrink-0 flex flex-row items-center gap-4 sticky top-0 bg-gray-100 z-1'>
                        <img src={defaultCover} className='w-10 h-10' title='defaultcover' />
                        <Interactions />
                    </div>
                )
            }

            <div className='flex-1'>
                {
                    playList?.files.length === 0 && (
                        <div className='flex flex-col items-center justify-center h-full'>
                            <div className='text-2xl font-bold'>暂无歌曲</div>
                        </div>
                    )
                }
                {
                    playList?.files.map((file, index) => (
                        <div key={index} className='w-full'>
                            <SongItem key={index} index={index} file={file} selected={index === selectedIndex}
                                onClick={() => setSelectedIndex(index)}
                                onDelete={() => handleDeleteFile(file)}
                                onPlay={()=>handlePlay(file)} />
                        </div>
                    ))
                }
            </div>

        </div>
    )
});

const Interactions = () => {
    return (
        <div className='flex flex-row gap-4'>
            <IconButton label='播放' icon={<IoPlaySharp />} />
            <IconButton label='下载' icon={<BiSolidCloudDownload />} />
            <IconButton label='批量' icon={<PiListChecksLight />} />
            <IconButton label='分享' icon={<RiShareCircleLine />} />
        </div>
    );
};

export default CustomPlayListPage