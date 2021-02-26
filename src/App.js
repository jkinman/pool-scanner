import React from 'react'
import './App.css';
import axios from 'axios'

function App() {

  const [openSlots, setOpenSlots] = React.useState([])

  React.useEffect(() => {
    axios.get('https://swim-scan.netlify.app/.netlify/functions/times')
    .then( res => {
      console.log('res', res)
      setOpenSlots(res.data)
    })
    .catch( err => {
      console.log('error', err)
    })
  }, [])

  return (
    <div>
    <h1>YWCA Swim Scanner</h1>
    <h5>open swimming slots in the next 3 days (joel.kinman@gmail.com)</h5>
      <ul>
        {openSlots.map( slot =>
        <li><a href="https://ywcavancouver.mosoportal.com/bookings.aspx">{slot}</a></li>
        )}
      </ul>
    </div>
  );
}

export default App;
