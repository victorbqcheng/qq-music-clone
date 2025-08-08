import React from 'react'

type Theme = {
    name: string;
    background: string;
    backgroundHover: string;
    text: string;
    accent: string;
    accentHover: string;
};

export const themes: Theme[] = [
    {
        name: 'Default',
        background: '#f3f4f6',
        backgroundHover: '#d1d5dc',
        text: '#111827',
        accent: '#3b82f6',
        accentHover: '#60a5fa'
    },
    {
        name: 'Warm Sunset',
        background: '#ff4d4f',
        backgroundHover: '#ff7875',
        text: '#fffbe6',
        accent: '#faad14',
        accentHover: '#ffc53d'
    },
    {
        name: 'Fresh Green',
        background: '#52c41a',
        backgroundHover: '#73d13d',
        text: '#f6ffed',
        accent: '#13c2c2',
        accentHover: '#36cfc9'
    },
    {
        name: 'Soft Pink',
        background: '#fff0f6',
        backgroundHover: '#ffd6e7',
        text: '#c41d7f',
        accent: '#ff85c0',
        accentHover: '#ffadd2'
    }
];

const changeTheme = (name ='Default') => {
    const theme = themes.find(t => t.name === name);
    if (theme) {
        document.documentElement.style.setProperty('--color-background', theme.background);
        document.documentElement.style.setProperty('--color-background-hover', theme.backgroundHover);
        document.documentElement.style.setProperty('--color-text', theme.text);
        document.documentElement.style.setProperty('--color-accent', theme.accent);
        document.documentElement.style.setProperty('--color-accent-hover', theme.accentHover);
    }
}

export default changeTheme;


// background: bg-gray-100 #f3f4f6;
// background-hover: bg-gray-300   #d1d5dc;
