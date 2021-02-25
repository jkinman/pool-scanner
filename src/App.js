import React from 'react'
import './App.css';
import axios from 'axios'

function App() {

  const [openSlots, setOpenSlots] = React.useState([])
  axios.get('https://swim-scan.netlify.app/.netlify/functions/index')
  .then( res => {
    debugger
    setOpenSlots(res.data)
  })
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div>
        {openSlots.map( slot => JSON.stringify(slot))}
      </div>
    </div>
  );
}

export default App;
