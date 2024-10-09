import { useState } from 'react'
import './App.css'
import Translator from './components/Translator'

function App() {
  const [count, setCount] = useState(0)
    return(
    <> 
    <Translator/>
    </>
  )
}

export default App
