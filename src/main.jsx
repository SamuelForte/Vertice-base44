import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import App from './App.jsx'
import { queryClient } from './lib/query-client.js'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </HashRouter>
  </React.StrictMode>,
)
