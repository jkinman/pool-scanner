import React from 'react'
import './App.css';
import axios from 'axios'

function App() {

  const [openSlots, setOpenSlots] = React.useState([])

  React.useEffect(() => {
    axios.get('https://swim-scan.netlify.app/.netlify/functions/index')
    .then( res => {
      console.log('res', res)
      setOpenSlots(res.data)
    })
    .catch( err => {
      console.log('error', err)
    })
  }, [])
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <ul>
        {openSlots.map( slot => 
        <li>{slot}</li>
        )}
      </ul>
    </div>
  );
}

export default App;
