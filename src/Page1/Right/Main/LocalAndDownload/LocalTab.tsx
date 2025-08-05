import React from 'react'
import type { MenuProps } from 'antd';
import { Dropdown, Button } from 'antd';
import { MdOutlineAddBox } from "react-icons/md";
import MusicCD from '../../../../assets/music-cd.webp'
import { observer } from 'mobx-react-lite';
import localAudioStore from '../../../../store/localAudioStore';
import SongItem from '../../../../components/SongItem';
import { usePlayer } from '../../../../context/PlayerContext';
import { AudioFileInfo } from '../../../../types';
import currentPlayListStore from '../../../../store/currentPlayListStore';

const LocalTab = observer(() => {
    return (
        <div className='flex-1 bg-blue-200 flex flex-col localtab'>
            {
                localAudioStore.getLocalAudioFileCount() > 0 ? (
                    <LocalSongsList />
                ) : (
                    <NoLocalSongs />
                )
            }
        </div>
    )
});

const NoLocalSongs = observer(() => {
    const handleAddFiles = async () => {
        const files = await window.NativeAPI.addFiles();
        // console.log('添加的文件:', files);
        if (files && files.length > 0) {
            localAudioStore.addLocalAudioFiles(files);
        }
        
    };
    const items: MenuProps['items'] = [
        {
            label: (
                <div onClick={() => handleAddFiles()}>
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
        <div className='flex-1 flex flex-col items-center justify-center h-full bg-orange-200'>
            <img src={MusicCD} alt="Music CD" className='w-32 h-32' />
            没有本地歌曲
            <Dropdown menu={{ items }} trigger={['click']}>
                <Button icon={<MdOutlineAddBox />} >添加</Button>
            </Dropdown>
        </div>
    );
});

const LocalSongsList = observer(() => {
    const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
    const {play, pause, state: { currentTime, volume, duration, isPlaying }, loadTrack, setVolume, seekTo} = usePlayer();
    const handleAddFiles = async () => {
        const files = await window.NativeAPI.addFiles();
        // console.log('添加的文件:', files);
        if (files && files.length > 0) {
            localAudioStore.addLocalAudioFiles(files);
        }
    };

    const handleClearFiles = ()=>{
        localAudioStore.clearLocalAudioFiles();
    };

    const handlePlay = (file: AudioFileInfo) => {
        loadTrack(file);
        currentPlayListStore.setPlayListID(localAudioStore.localPlayListID);
        currentPlayListStore.setAudioFiles(localAudioStore.getLocalAudioFiles());
    }

    return (
        <>
            <div className='sticky top-10 bg-gray-100 z-50'>
                <div className='mb-4 flex flex-row gap-2'>
                    <span>播放</span>
                    <span className='cursor-pointer' onClick={handleAddFiles}>添加</span>
                    <span>批量操作</span>
                    <span className='cursor-pointer' onClick={handleClearFiles}>清空</span>
                </div>
                <div className='flex flex-row items-center justify-between text-xs font-light'>
                    <div className='flex-1'>歌名/歌手</div>
                    <div className='w-25'></div>    {/*操作图标*/}
                    <div className='flex-1'>专辑名</div>
                    <div className='w-10'>时长</div>
                    <div className='w-16'>大小</div>
                </div>
            </div>
            <div className='flex flex-col '>
                {
                    // Array.from({ length: 20 }, (_, index) => (
                    //     <SongItem key={index} index={index} />
                    // ))
                    localAudioStore.localAudioFiles.map((file, index) => (
                        <SongItem key={index} index={index} file={file} selected={index===selectedIndex}
                                  onClick={()=>setSelectedIndex(index)}
                                  onDelete={()=>{/*TODO:*/}}
                                  onPlay={()=>handlePlay(file)} />
                    ))
                }
            </div>
        </>
    );
});



export default LocalTab