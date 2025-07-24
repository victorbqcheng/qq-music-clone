import React from 'react'
import UserInfo from './UserInfo'
import VipAd from './VipAd'
import Functions from './Functions'
import PredefinedPlayLists from './PredefinedPlayLists'
import CustomPlayLists from './CustomPlayLists'

import { CiCircleChevLeft } from "react-icons/ci";
import { IoSettingsOutline, IoShirtOutline } from "react-icons/io5";
import { PiGameControllerThin } from "react-icons/pi";

const Left = () => {
    return (
        <div className='my-left w-[250px] min-w-[250px] bg-white shadow-md p-4 flex flex-col justify-start gap-2'>
            <UserInfo />
            <VipAd />
            {/* spacer */}
            <div className='h-4' />

            <div className='overflow-y-auto custom-scrollbar'>
                <Functions />
                {/* spacer */}
                <div className='h-4' />
                <PredefinedPlayLists />
                {/* spacer */}
                <div className='h-4' />
                <CustomPlayLists />
            </div>

            <div className='mt-auto flex flex-row flex-start gap-4'>
                <div><CiCircleChevLeft className='w-6 h-6 hover:text-green-500' /></div>
                <div><IoSettingsOutline className='w-6 h-6 hover:text-green-500' /> </div>
                <div><IoShirtOutline className='w-6 h-6 hover:text-green-500' /> </div>
                <div><PiGameControllerThin className='w-6 h-6 hover:text-green-500' /> </div>

            </div>
        </div>
    )
}

export default Left