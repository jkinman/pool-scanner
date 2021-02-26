import React from 'react'
import axios from 'axios'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

function App() {
  const classes = useStyles()
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
    <div className={classes.root}>
        {openSlots.map( slot =>
        <Paper elevation={2}><a href="https://ywcavancouver.mosoportal.com/bookings.aspx">{slot}</a></Paper>
        )}
      </div>
    </div>
  );
}

export default App;
