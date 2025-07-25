import React from 'react'
import { IoPlaySharp } from "react-icons/io5";

import singer1 from '../../../../assets/singer1.jpg'
import singer2 from '../../../../assets/singer2.jpg'
import singer3 from '../../../../assets/singer3.jpg'
import singer4 from '../../../../assets/singer4.webp'
import singer5 from '../../../../assets/singer5.jpg'
import singer6 from '../../../../assets/singer6.webp'
import singer7 from '../../../../assets/singer7.jpg'

import { CiHeart, CiCircleMore } from "react-icons/ci";

const EveryoneListening = () => {
    return (
        <div>
            <h2 className='font-semibold mb-4 flex flex-row items-center gap-2'>
                大家都在听
                <div className='cursor-pointer bg-gray-200 p-2 rounded-2xl w-10 flex flex-row items-center justify-center hover:bg-green-100 hover:text-green-400'>
                    <IoPlaySharp />
                </div>
            </h2>


            <div className='flex flex-row bg-blue-200 items-center'>
                <div className='bg-red-500'> &lt; </div>
                <div className='w-1/3 overflow-hidden flex flex-col gap-2 h-46'>
                    <ListItem icon={singer1} title='怀念青春' singer='酒儿' />
                    <ListItem icon={singer2} title='风与叶子' singer='李维' />
                    <ListItem icon={singer3} title='不再回头' singer='广智' />
                </div>
                <div className='w-1/3 overflow-hidden flex flex-col gap-2 h-46'>
                    <ListItem icon={singer4} title='怀念青春' singer='酒儿' />
                    <ListItem icon={singer5} title='风与叶子' singer='李维' />
                    <ListItem icon={singer6} title='不再回头' singer='广智' />
                </div>
                <div className='w-1/3 overflow-hidden flex flex-col gap-2 h-46'>
                    <ListItem icon={singer7} title='怀念青春' singer='酒儿' />
                </div>
                <div> &gt; </div>
            </div>

        </div>
    )
}

type ListItemProps = {
    icon?: string;
    title?: string;
    singer?: string;
}

const ListItem = ({ icon, title, singer }: ListItemProps) => {

    return (
        <div className='group flex flex-row items-center gap-2 bg-gray-100 hover:bg-gray-200'>
            <img src={icon} className='w-14 h-14 rounded-md' />
            <div className='flex flex-col gap-2'>
                <div className='text-sm font-light'>{title}</div>
                <div className='text-xs font-light'>{singer}</div>
            </div>
            <div className='flex flex-row items-center gap-1 ml-auto mr-4 opacity-0 group-hover:opacity-100'>
                <CiHeart className='text-2xl' />
                <CiCircleMore className='text-2xl' />
            </div>
        </div>
    );
};

export default EveryoneListening