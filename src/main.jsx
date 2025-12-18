import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Navbar from './components/Navbar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     {/* <div className="fixed top-0 left-0 z-50 w-full"><Navbar/></div> */}
    <App />
  </StrictMode>,
)
