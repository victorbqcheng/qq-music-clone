import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import '../index.css'

import '@ant-design/v5-patch-for-react-19';


// const root = createRoot(document.body);
// root.render(<h2>Hello from React!</h2>);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div>tray</div>
  </StrictMode>
)