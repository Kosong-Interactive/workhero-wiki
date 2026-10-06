import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import App from './App'
import { LangProvider } from './i18n'
import './index.css'

// Old links looked like /#/mechanics; keep them working by turning them into /mechanics.
if (window.location.hash.startsWith('#/')) {
  window.history.replaceState(null, '', window.location.hash.slice(1))
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LangProvider>
      <BrowserRouter>
        <App />
        <Analytics />
      </BrowserRouter>
    </LangProvider>
  </React.StrictMode>,
)
