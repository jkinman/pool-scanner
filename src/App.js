import React from 'react'
import './App.css';
import axios from 'axios'

function App() {

  const [openSlots, setOpenSlots] = React.useState([])
  React.useEffect(() => {
    axios.get('https://swim-scan.netlify.app/.netlify/functions/index')
    .then( res => {
      console.log(res)
      setOpenSlots(res.data)
    })
    .error( err => {
      console.log(err)
    })
  
  }, [])
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
