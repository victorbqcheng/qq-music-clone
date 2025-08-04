import { CiCircleMore } from "react-icons/ci";
import { MdOutlineAddBox } from "react-icons/md";
import { formatFileSize, formatTime } from "../lib/utils";
import { IoPlaySharp } from "react-icons/io5";
import { AudioFileInfo } from "../types";
import defaultCover from '../assets/default-cover.png';
import { usePlayer } from "../context/PlayerContext";

type SongItemProps = {
    index: number;
    file?: AudioFileInfo;
};

const SongItem = ({ index, file }: SongItemProps) => {
    const { play, pause, state:{currentTime, volume, duration}, loadTrack, setVolume, seekTo } = usePlayer();
    const isEven = index % 2 === 0;
    const handleDoubleClick = () => {
        loadTrack(file);
        // play();
    };
    return (
        <div className={`group flex flex-row items-center justify-between py-2 hover:bg-gray-200 ${isEven ? 'bg-gray-200' : 'bg-gray-100'}`}
             onDoubleClick={handleDoubleClick}>
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
            <div className='w-25 flex flex-row items-center justify-center gap-2 opacity-0 group-hover:opacity-100'>
                <MdOutlineAddBox className='text-gray-500 cursor-pointer' />
                <CiCircleMore className='text-gray-500 cursor-pointer' />
            </div>
            {/* 专辑 */}
            <div className='text-xs font-light flex-1'>{file?.album || '未知专辑'}</div>
            
            <div className='text-xs font-light w-10'>{formatTime(file?.duration)}</div>
            <div className='text-xs font-light w-16'>{formatFileSize(file?.fileSize)}</div>
        </div>
    );
};

export default SongItem;