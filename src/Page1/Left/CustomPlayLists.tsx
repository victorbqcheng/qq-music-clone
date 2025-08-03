import React, { useEffect, useState } from 'react'
import { message } from 'antd';
import { BsFileMusic } from "react-icons/bs";
import { MdOutlineCollections } from "react-icons/md";
import customPlayListsStore from '../../store/customPlayListsStore';
import PlayListItem from '../../components/PlayListItem';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router';


const CustomPlayLists = observer(() => {
    const [isCreateintNewItem, setIsCreatingNewItem] = useState(false);

    // 获取路由参数
    const params = useParams();
    const id = params.id;
    const selected = (playListId: string) => {
        return playListId === id;
    };

    const handleCreateNewItem = () => {
        setIsCreatingNewItem(true);
    };
    const handleBlur = (name: string) => {
        setIsCreatingNewItem(false);
        if (name.trim() === '') {
            message.info('歌单名称不能为空');
            const defaultName = customPlayListsStore.getNextDefaultPlayListName();
            customPlayListsStore.addPlayList(defaultName, []);
        } else {
            // 检查是否已存在同名歌单
            const existingPlayList = customPlayListsStore.isPlayListNameExists(name);
            // 如果存在同名歌单，则提示用户并使用默认名称
            if (existingPlayList) {
                message.info(`歌单 "${name}" 已存在，建议修改歌单名称`);
                // 如果存在同名歌单，则使用默认名称
                name = customPlayListsStore.getNextDefaultPlayListName();
            }
            customPlayListsStore.addPlayList(name, []);
        }
    }

    return (
        <div className='flex flex-col gap-2'>
            <div className='flex flex-row gap-2 justify-start items-center'>
                <div className='text-[14px] font-light'>自建歌单</div> |
                <div className='text-[14px] text-gray-400 font-light'>收藏歌单</div>
                <div className=' ml-auto text-gray-500 font-light hover:text-gray-900 p-2 cursor-pointer'
                    onClick={handleCreateNewItem}>+</div>
            </div>
            {isCreateintNewItem && <CreateNewItem onBlur={handleBlur} name={customPlayListsStore.getNextDefaultPlayListName()} />}
            
            {
                Array.from(customPlayListsStore.getAllPlayLists().entries()).reverse().map(([playListId, playList]) => (
                    <PlayListItem key={playListId} playListId={playListId} link={`/custome-playlist/${playListId}`} name={playList.name} selected={selected(playListId)} icon={<BsFileMusic className='w-6 h-6' />} />
                ))

            }
            <PlayListItem link='/custome-playlist/1' name='默认列表' icon={<BsFileMusic className='w-6 h-6' />} />
            <PlayListItem link='/custome-playlist/2' name='默认收藏' icon={<MdOutlineCollections className='w-6 h-6' />} />

        </div>
    )
})

type CreateNewItemProps = {
    name?: string;
    onBlur?: (name: string) => void;
};

const CreateNewItem = ({ name, onBlur }: CreateNewItemProps) => {
    const [inputValue, setInputValue] = React.useState(name);
    const inputRef = React.useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);
    const handleInputFocus = () => {
        if (inputRef.current) {
            inputRef.current.select();
        }
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    return (
        <>
            <div className={`flex flex-row items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer`}>
                {null}
                <input className='text-sm text-gray-700'
                    ref={inputRef}
                    value={inputValue}
                    type='text'
                    aria-label=''
                    placeholder='请输入歌单名称'
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={() => onBlur(inputValue)} />
            </div>
        </>
    );
};

export default CustomPlayLists