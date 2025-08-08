import { observer } from "mobx-react-lite"
import Page1 from "./Page1/Page1"
import Page2 from "./Page2/Page2"
import stateStore from "./store/stateStore"
import React, { useEffect, useRef, useState } from "react";
import { usePlayer } from "./context/PlayerContext";
import { Slider } from "antd";
import CurrentPlayList from "./CurrentPlayList/CurrentPlayList";
import changeTheme from "./themes/themes";


const App2 = observer(() => {
    const { play, pause, state:{currentTime, volume, duration}, loadTrack, setVolume, seekTo } = usePlayer();

    const [thisCurrentTime, setThisCurrentTime] = useState(currentTime);
    const [sliderChangeStart, setSliderChangeStart] = useState(false);

    useEffect(()=>{
        if (sliderChangeStart) return; // 如果滑块正在被拖动，则不用player的currentTime更新 thisCurrentTime
        // // 如果滑块没有被拖动，则用player的currentTime更新 thisCurrentTime
        setThisCurrentTime(currentTime);
    }, [currentTime, sliderChangeStart]);

    const handlePlayPause = () => {
        // loadTrack("D:\\音频\\音乐\\歌曲\\万事如意.mp3");
        play();
    };

    const handleLoad = () => {
        
    };
    const handleOnSliderChange = (value: number) => {
        setSliderChangeStart(true);
        setThisCurrentTime(value);
    };

    const handleOnSliderChangeComplete = (value: number)=>{
        seekTo(value);
        setSliderChangeStart(false);
    };

    return (
        <div>
            <div className="">
                <div>上一首</div>
                <div onClick={handlePlayPause}>播放/暂停</div>
                <div >下一首</div>
                <div onClick={handleLoad}>加载</div>
                <div>currentTime: {currentTime}</div>
                <div>thisCurrentTime: {thisCurrentTime}</div>
                <div>音量: <Slider value={volume} max={1} step={0.01} onChange={setVolume} /></div>
                <div onClick={() => setVolume(Math.min(volume + 0.1, 1))}>增加音量</div>
                <div onClick={() => setVolume(Math.max(volume - 0.1, 0))}>减少音量</div>
                <div onClick={() => seekTo(currentTime + 5)}>前进5秒</div>
                {/* <Slider value={currentTime} max={duration} onChange={handleOnSliderChange} onChangeComplete={handleOnSliderChangeComplete} /> */}
                <Slider value={thisCurrentTime} max={duration} onChange={handleOnSliderChange} onChangeComplete={handleOnSliderChangeComplete} />
                
            </div>
        </div>
    );
});

const App = observer(() => {
    useEffect(()=>{
        changeTheme('Default');
    }, []);
    return (
        <div className="overflow-hidden relative">
            <Page1 />
            {stateStore.mountPage2 && <Page2 />}     {/*防止程序启动时Page2渐隐*/}
            <CurrentPlayList />
        </div>
    )
});

export default App