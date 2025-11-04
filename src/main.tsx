import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/tailwind.css'
import App from './App'
import './i18n'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)