import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { setupListeners } from '@reduxjs/toolkit/query'

import App from './App.jsx'
import SkeletonProvider from './components/loading/SkeletonProvider'
import { store } from './store'

import './index.css'
import 'react-loading-skeleton/dist/skeleton.css'

async function enableMocking() {
  // MSW is dev-only and can be toggled off when you want to hit a real backend.
  const mswEnabled = import.meta.env.DEV && import.meta.env.VITE_ENABLE_MSW !== 'false'

  if (!mswEnabled) {
    return
  }

  const { worker } = await import('./mocks/browser')

  await worker.start({
    // Don’t crash the app if we forgot to mock an endpoint.
    onUnhandledRequest: 'bypass',
  })
}

enableMocking().then(() => {
  // Run after mocking is set up so early fetches don’t slip through.
  setupListeners(store.dispatch)
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Provider store={store}>
        <SkeletonProvider>
          <App />
        </SkeletonProvider>
      </Provider>
    </StrictMode>
  )
})
