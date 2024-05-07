import Router from './pages'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className='app'>
        <Router />
      </div>
    </LocalizationProvider>
  )
}

export default App
