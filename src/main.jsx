import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

/* Este archivo hace de puente entre el componente App.jsx y el navegador web.
  Ademas reune la Biblioteca de React para hablar con los navegadores web (React DOM) */
