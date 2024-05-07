import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'wookiee-style-sass/dist/index.css'
import '@/styles/main.scss'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { Toaster } from 'sonner'
import { Suspense } from 'react'
import Preloader from '@/shared/components/Preloader/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Suspense fallback={<Preloader />}>
        <BrowserRouter>
          <Toaster
            className='toaster'
            style={{ padding: '10px' }}
            richColors
            position='top-left'
            expand={false}
          />
          <App />
        </BrowserRouter>
      </Suspense>
    </PersistGate>
  </Provider>
)
