import { CiCircleMore } from "react-icons/ci";
import { MdOutlineAddBox } from "react-icons/md";
import { formatFileSize, formatTime } from "../lib/utils";
import { IoPlaySharp } from "react-icons/io5";
import { AudioFileInfo } from "../types";
import defaultCover from '../assets/default-cover.png';
import { usePlayer } from "../context/PlayerContext";
import { Dropdown, MenuProps } from "antd";
import customPlayListsStore from "../store/customPlayListsStore";
import { observer } from "mobx-react-lite";
import { ItemType } from "antd/es/menu/interface";
import { useState } from "react";
import Overlay from "./Overlay";

type SongItemProps = {
    index: number;
    file?: AudioFileInfo;
    selected?: boolean;
    onClick?: (index: number) => void;
};

const SongItem = observer(({ index, file, selected, onClick }: SongItemProps) => {
    const { play, pause, state: { currentTime, volume, duration }, loadTrack, setVolume, seekTo } = usePlayer();
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const isEven = index % 2 === 0;

    const addItems: MenuProps['items'] = [
    ];
    customPlayListsStore.getAllPlayLists().forEach((playList, id) => {
        // 判断歌单中是否已经有了此歌曲
        let isInPlayList = false;
        if (playList.files.some(f => f.filePath === file.filePath)) {
            isInPlayList = true;    // 如果歌单中已经有了此歌曲，则不允许再次添加, 禁止菜单项
        }
        let menuItem: ItemType = {
            label: (
                <div className="select-none"
                    onClick={(e) => { !isInPlayList && customPlayListsStore.addFileToPlayList(id, file) }}
                    onDoubleClick={(e) => { e.stopPropagation() }}>
                    {playList.name}
                </div>
            ),
            disabled: isInPlayList,
            key: id,
        };
        addItems.unshift(menuItem);
    })

    const handleDoubleClick = () => {
        loadTrack(file);
        // play();
    };
    return (
        <>
            {overlayVisible && <Overlay onClick={() => setOverlayVisible(false)} />}
            <div className={`group flex flex-row items-center justify-between py-2 ${isEven||selected||isHovered ? 'bg-gray-200' : 'bg-gray-100'}`}
                onDoubleClick={handleDoubleClick}
                onClick={() => onClick && onClick(index)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
                {/* 歌名/歌手 */}
                <div className='flex flex-row items-center justify-start flex-1'>
                    <div className='relative'>
                        <img src={file.img || defaultCover} alt="Song Cover" className='w-10 h-10 mr-2' />
                        <div className='absolute top-0 left-0 h-full w-full flex justify-center items-center opacity-0 group-hover:opacity-100 text-white hover:text-green-400'>
                            <IoPlaySharp className='text-xl' />
                        </div>
                    </div>
                    <div className=''>
                        <div className='text-sm font-light'>{file?.title || '未知歌曲'}: {index}</div>
                        <div className='text-xs font-light'>{file?.artist || '未知艺术家'}</div>
                    </div>
                </div>

                {/*操作图标*/}
                {
                    (selected || isHovered) ?
                    <div className='w-25 flex flex-row items-center justify-center gap-2 opacity-100'>
                        <Dropdown menu={{ items: addItems }} trigger={['click']}
                            onOpenChange={(open) => setOverlayVisible(open)}>
                            <MdOutlineAddBox className='text-gray-500 cursor-pointer' />
                        </Dropdown>
                        <CiCircleMore className='text-gray-500 cursor-pointer' />
                    </div>
                    :
                    (<div className="w-25 h-1"></div>)
                }

                {/* 专辑 */}
                <div className='text-xs font-light flex-1'>{file?.album || '未知专辑'}</div>

                <div className='text-xs font-light w-10'>{formatTime(file?.duration)}</div>
                <div className='text-xs font-light w-16'>{formatFileSize(file?.fileSize)}</div>
            </div>
        </>
    );
});

export default SongItem;