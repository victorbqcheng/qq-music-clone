import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { AudioFileInfo, PlayerState } from '../types';



type PlayerContextType = {
    state: PlayerState;
    audioRef: React.RefObject<HTMLAudioElement | null>;
    loadTrack: (track: AudioFileInfo) => void;
    play: () => void;
    pause: () => void;
    setVolume: (volume: number) => void;
    seekTo: (time: number) => void;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [state, setState] = useState<PlayerState>({
        currentTrack: null,
        isPlaying: false,
        volume: 0.7,
        duration: 0,
        currentTime: 0,
    });
    const loadTrack = (track: AudioFileInfo) => {
        setState(prevState => ({
            ...prevState,
            currentTrack: track,
        }));
        if (audioRef.current) {
            audioRef.current.src = track.filePath;
            audioRef.current.load();
        }
    };
    const play = () => {
        if (audioRef.current && state.currentTrack) {
            audioRef.current.play();
            setState(prevState => ({ ...prevState, isPlaying: true }));
        }
    };
    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setState(prevState => ({ ...prevState, isPlaying: false }));
        }
    };
    const setVolume = (volume: number) => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
            setState(prevState => ({ ...prevState, volume }));
        }
    };
    const seekTo = (time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setState(prevState => ({ ...prevState, currentTime: time }));
        }
    };

    useEffect(()=>{
        const audio = audioRef.current;
        if (!audio) return;
        const updateCurrentTime = () => {
            if (audioRef.current) {
                setState(prevState => ({ ...prevState, currentTime: audioRef.current.currentTime }));
            }
        };
        const durationChange = () =>{
            if (audioRef.current) {
                setState(prevState => ({ ...prevState, duration: audioRef.current.duration }));
            }
        };
        const onPlaying = () => {
            setState(prevState => ({ ...prevState, isPlaying: true }));
        };
        const onPause = () => {
            setState(prevState => ({ ...prevState, isPlaying: false }));
        };
        audio.addEventListener('timeupdate', updateCurrentTime);
        audio.addEventListener('durationchange', durationChange);
        audio.addEventListener('playing', onPlaying);
        audio.addEventListener('pause', onPause);
        audio.volume = state.volume; // Set initial volume
        return () => {
            audio.removeEventListener('timeupdate', updateCurrentTime);
            audio.removeEventListener('durationchange', durationChange);
            audio.removeEventListener('playing', onPlaying);
            audio.removeEventListener('pause', onPause);
        };
    }, []);

    return (
        <PlayerContext.Provider value={{
            state,
            audioRef,
            loadTrack,
            play,
            pause,
            setVolume,
            seekTo
        }}>
            {children}
            <audio ref={audioRef} autoPlay />
        </PlayerContext.Provider>
    )
};

export const usePlayer = () => {
    const context = useContext(PlayerContext);
    if (context === undefined) {
        throw new Error('usePlayer must be used within a PlayerProvider');
    }
    return context;
};