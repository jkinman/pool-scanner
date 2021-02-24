const https = require('https');
const axios = require('axios')
const moment = require('moment')

const startDate = moment().subtract(0, 'day').toISOString()
const endDate = moment().add(2, 'days').toISOString()

// const data = {'clubId': 3,'typeId':0,'resourceDetailId':149, 'sessionId':'91e696f7-79b0-4ebf-be54-6f24686014eb', 'startDate':'2021-02-24T00:00:00.000Z', 'endDate':'2021-02-25T00:00:00.000Z' }
const data = {'clubId': 3,'typeId':0,'resourceDetailId':149, 'sessionId':'91e696f7-79b0-4ebf-be54-6f24686014eb', startDate, endDate }


exports.handler = async (event, context) => {

axios.post( 'https://ywcavancouver.mosoportal.com/FunctionalTemplates/Views/OnlineSchedulerFunctions.asmx/GetAvailability', data )
.then(res => {
    console.log(`statusCode: ${res.statusCode}`)
    const openSlots = res.data.d.filter( spot => ! spot.title.includes('4/4'))
    openSlots.sort((a, b) => {
        return a.start > b.start ?  1 : -1
    } )
    return {
        statusCode: 200,
        body: openSlots
        }
    
    openSlots.map(data => 
        {
            if(! data.title.includes('4/4')){
                console.log( {time:data.StartDateTime} )
                // console.log( data )
            }
        }
            )
  })
  .catch(error => {
      console.error(error)
    return {
        statusCode: 500,
        body: error
        }
  })

  return {
    statusCode: 200,
    body: "no data available"
    }
}
