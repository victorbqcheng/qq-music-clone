import React, { useState, useEffect, useRef } from 'react';
import './LyricsDisplay.css';

// 歌词数据结构示例:
// lyrics = [
//   { time: 0.0, text: "第一句歌词" },
//   { time: 5.3, text: "第二句歌词" },
//   ...
// ]

type LyricsDisplayProps = {
    lyrics: { time: number; text: string }[]; // 歌词数据
    currentTime: number; // 当前播放时间
};

const LyricsDisplay = ({ lyrics, currentTime }: LyricsDisplayProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const getActiveIndex = () => {
        let newIndex = 0;
        for (let i = 0; i < lyrics.length; i++) {
            if (lyrics[i].time <= currentTime) {
                newIndex = i;
            } else {
                break;
            }
        }
        return newIndex;
    };
    const activeIndex = getActiveIndex();

    useEffect(() => {
        // 滚动到当前活跃的歌词行
        if (containerRef.current) {
            const container = containerRef.current;
            const activeLine = container.children[activeIndex] as HTMLDivElement;

            // 计算滚动位置，使当前行垂直居中
            const containerHeight = container.clientHeight;
            const lineHeight = activeLine.clientHeight;
            const lineTop = activeLine.offsetTop;

            container.scrollTo({
                top: lineTop - (containerHeight / 2) + (lineHeight / 2),
                behavior: 'smooth'
            });
        }
    }, [activeIndex]);

    return (
        <div className="lyrics-container select-none">
            {/* 顶部渐变遮罩 */}
            <div className="mask top-mask"></div>

            {/* 歌词内容区域 */}
            <div className="lyrics-content" ref={containerRef}>
                {
                    lyrics.length === 0 && <div className='lyric-line active'>暂无歌词</div>
                }
                {
                    lyrics.length > 0 && lyrics.map((line, index) => (
                        <div
                            key={index}
                            className={`lyric-line ${index === activeIndex ? 'active' : ''}`}
                        >
                            {line.text}
                        </div>
                    ))
                }
            </div>

            {/* 底部渐变遮罩 */}
            <div className="mask bottom-mask"></div>
        </div>
    );
};

export default LyricsDisplay;