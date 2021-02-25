const express = require('express')
const serverless = require('serverless-http')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const https = require('https');
const axios = require('axios')
const moment = require('moment')

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// build the data
const startDate = moment().subtract(0, 'day').toISOString()
const endDate = moment().add(3, 'days').toISOString()
const data = {'clubId': 3,'typeId':0,'resourceDetailId':149, 'sessionId':'91e696f7-79b0-4ebf-be54-6f24686014eb', startDate, endDate }

app.get('/times', (req, res) => {

return axios.post( 'https://ywcavancouver.mosoportal.com/FunctionalTemplates/Views/OnlineSchedulerFunctions.asmx/GetAvailability', 
data )
.then(res => {
    console.log(`statusCode: ${res.statusCode}`)
    const openSlots = res.data.d.filter( spot => ! spot.title.includes('4/4'))
    openSlots.sort((a, b) => {
        return a.start > b.start ?  1 : -1
    } )
    openSlots.map(data => 
        {
            if(! data.title.includes('4/4')){
                // console.log( {time:data.StartDateTime} )
                console.log( data )
            }
        }
            )
    return {
        statusCode: 200,
        body: JSON.stringify(openSlots.map(slot => slot.StartDateTime))
    }
    
  })
  .catch(error => {
      console.error(error)
    return {
        statusCode: 500,
        body: error
        }
  })
}
  
module.exports.handler = serverless(app)