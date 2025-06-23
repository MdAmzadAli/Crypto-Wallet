import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './state/store.ts'
import './index.css'
import App from './App.tsx'
import { Buffer } from 'buffer'
if (!window.Buffer) {
  window.Buffer = Buffer
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    
    <App />

    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
