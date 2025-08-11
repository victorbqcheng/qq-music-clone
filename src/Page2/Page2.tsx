import React, { useRef } from 'react'
import stateStore from '../store/stateStore';
import { observer } from 'mobx-react-lite';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Main from './Main/Main';


const show: React.CSSProperties = {
    display: 'flex',
    animation: 'fadeIn 0.5s ease-in-out forwards',
    zIndex: 50,
    
};
const hide: React.CSSProperties = {
    animation: 'fadeOut 0.5s ease-in-out forwards',
    pointerEvents: 'none',
};

const Page2 = observer(() => {

    const divRef = useRef<HTMLDivElement>(null);
    const handleFullscreen = () => {
        // if (fullscreenRef.current) {
        //     fullscreenRef.current.requestFullscreen()
        //     .then(() => {
        //         // stateStore.setShowPage2(true);
        //     })
        //     .catch(err => {
        //         console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        //     });
        // }
    };


    return (
        <div className={`absolute top-0 left-0 w-screen h-screen min-w-[870px] min-h-[690px] bg-gray-300 flex flex-col items-center justify-center text-gray-500 z-50 fadeIn select-none`}
            style={stateStore.showPage2 ? show : hide}
            ref={divRef}
            onAnimationEnd={(e) => {
                if (e.animationName === 'fadeOut') {
                    divRef.current.style.zIndex = '-1';         // 必须设置-1， 否则antd slider会影响Page1页面的元素
                }
            }}>
            <Header onFullscreen={handleFullscreen} />

            <Main />

            <Footer />

        </div>
    )
});

export default Page2