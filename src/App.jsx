// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'


function App() {
  // const [count, setCount] = useState(0)

  return (
    <main>
      <Navbar />
      {/* <footer className='app-footer'>Made with love and coffee by&nbsp;<a href="https://www.linkedin.com/in/carlos-duran-avila-45a13a183/" target='_blank'>Carlos</a></footer> */}
      <Footer />
    </main>
  )
}

export default App
