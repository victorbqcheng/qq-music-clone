import React from 'react'
import stateStore from '../store/stateStore';
import { observer } from 'mobx-react-lite';


const show: React.CSSProperties = {
    display: 'flex',
    animation: 'fadeIn 0.5s ease-in-out forwards',
};
const hide: React.CSSProperties = {
    display: 'none',
};

const Page2 = observer(() => {

    return (
        <div className={`absolute top-0 left-0 w-screen h-screen min-w-[870px] min-h-[690px] bg-gray-300 flex flex-col items-center justify-center fadeIn`}
             style={stateStore.showPage2 ? show : hide}>
            Page2
            
        </div>
    )
});

export default Page2