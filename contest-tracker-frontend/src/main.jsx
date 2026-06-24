// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// ── Global Styles (order matters) ──
import './styles/globals.css'
import './styles/components.css'
import './styles/navbar.css'
import './styles/pages.css'

// Remove any leftover default styles
// import './App.css'  // not needed — replaced by design system
// import './index.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)