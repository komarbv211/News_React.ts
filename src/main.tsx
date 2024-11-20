import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AccountProvider } from './contexts/AccountProvider.tsx'
createRoot(document.getElementById('root')!).render(
  <AccountProvider>
    <StrictMode>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </StrictMode>
  </AccountProvider>
)
