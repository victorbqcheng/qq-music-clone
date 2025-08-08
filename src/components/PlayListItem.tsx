import { Dropdown, MenuProps, message } from 'antd';
import React from 'react'
import { Link } from 'react-router';
import customPlayListsStore from '../store/customPlayListsStore';

type PlayListItemProps = {
    playListId?: string;
    name: string;
    icon?: React.ReactNode;
    selected?: boolean;
    link?: string;
    showContextMenu?: boolean;
};

const PlayListItem = ({playListId, name, icon, selected, link, showContextMenu }: PlayListItemProps) => {
    const [isRenaming, setIsRenaming] = React.useState(false);
    const [inputValue, setInputValue] = React.useState(name);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const items: MenuProps['items'] = [
        {
            label: '播放',
            key: '1',
        },
        {
            label: (
                <div onClick={()=>customPlayListsStore.removePlayList(name)}>删除</div>
            ),
            key: '2',
        },
        {
            label: (
                <div onClick={()=>{setIsRenaming(true)}}>重命名</div>
            ),
            key: '3',
        },
    ];
    const handleFocus = ()=>{
        console.log('handleFocus');
        if(inputRef.current) {
            inputRef.current.select();
        }
    };

    const handleRef = (node:HTMLInputElement)=>{
        console.log('handleRef');
        if(node) {
            console.log('set inputRef');
            inputRef.current = node;
            inputRef.current?.focus();
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsRenaming(false);
        const newName = e.target.value?.trim() || '';
        if(newName === name) {
            return;
        }
        if (newName === '') {
            message.info('歌单名称不能为空');
            setInputValue(name);
            return;
        }
        // 检查是否已存在同名歌单
        const existingPlayList = customPlayListsStore.isPlayListNameExists(newName);
        if (existingPlayList) {
            message.info(`歌单 "${newName}" 已存在，建议修改歌单名称`);
            setInputValue(name);
            return;
        }
        customPlayListsStore.renamePlayList(playListId, name, newName);
    };
    // Enter 键重命名
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleBlur(e as unknown as React.FocusEvent<HTMLInputElement>);
        }
    };
    return (
        <Link to={link}>
            <Dropdown key={name} menu={{ items }} open={showContextMenu} trigger={['contextMenu']}>
                <div className={`flex flex-row items-center gap-2 p-2 hover:bg-background-hover rounded-lg cursor-pointer ${selected ? 'bg-background-hover' : ''}`}>
                    {icon}
                    {
                        isRenaming ? (
                            <input ref={handleRef} type="text" className='text-sm text-gray-700 border-1'
                                   placeholder='请输入歌单名称'
                                   value={inputValue}
                                   onChange={(e) => setInputValue(e.target.value)}
                                   onFocus={handleFocus}
                                   onBlur={handleBlur}
                                   onKeyDown={handleKeyDown}/>
                        ) : (
                            <div className='text-sm text-gray-700'>{name}</div>
                        )
                    }
                </div>
            </Dropdown>
        </Link>
    )
}

export default PlayListItem