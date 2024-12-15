import { useState } from 'react'
import NavigationBar from './components/ui/NavigationBar'
import CalendarView from './components/ui/CalendarView'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='min-h-screen bg-[#d9d9d95f] inter-regular'>
      <NavigationBar />
      <CalendarView />
    </div>
  )
}

export default App
