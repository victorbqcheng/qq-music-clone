/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.ts` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import App from './app';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './Page1/Right/Main/Home/Home';
import Favorite from './Page1/Right/Main/Favorite/Favorite';


// const root = createRoot(document.body);
// root.render(<h2>Hello from React!</h2>);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Home />} />
                    <Route path="explore" element={<div>乐馆</div>} />
                    <Route path="favorite" element={<Favorite />} />
                    <Route path="recently-played" element={<div>最近播放</div>} />
                    <Route path="local-and-download" element={<div>本地和下载</div>} />
                    <Route path="trial" element={<div>试用</div>} />
                    <Route path="custome-playlist/:id" element={<div>自建歌单</div>} />

                    {/* Add a 404 route */}
                    <Route path="*" element={<div>404 Not Found</div>} />

                </Route>
            </Routes>
        </BrowserRouter>
  </StrictMode>
)

console.log('👋 This message is being logged by "renderer.ts", included via Vite');