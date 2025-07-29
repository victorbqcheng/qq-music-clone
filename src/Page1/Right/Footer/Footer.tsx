import React, { type MouseEvent } from 'react'
import Interactions from './Interactions'
import Controlbar from './Controlbar'
import Utils from './Utils'
import stateStore from '../../../store/stateStore'
import { observer } from 'mobx-react-lite'

const Footer = observer(() => {

    const handleClick = (e:MouseEvent<HTMLDivElement>)=>{
        if(e.target !== e.currentTarget) return;
        stateStore.setShowPage2(true);
        stateStore.setMountPage2(true);
    };

    return (
        <div className='mt-auto h-20 bg-gray-100 w-full flex flex-row justify-between items-center'
            onClick={handleClick}>
            <Interactions />
            <Controlbar />
            <Utils />
        </div>
    )
});

export default Footer