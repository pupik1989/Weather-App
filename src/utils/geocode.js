const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +address+ '.json?access_token=pk.eyJ1Ijoia29kZXNoIiwiYSI6ImNqdGFiYzBvdDA0NmQzeW56N2liZ2NqdHkifQ.LBQlPgkOrTeQ7D5XeQC16g'
    request({url, json: true}, (err,{body}) => {
        if(err) {
            callback('Unable to connect to server.',undefined)
        }else if(body.message) {
            callback('Unable to show data')
        }else {
            callback(undefined,{
                lon:body.features[0].center[0],
                lan:body.features[0].center[1],
                location:body.features[0].place_name
            })
        }
    })
}


const forecast = (a, b, callback) => {
    const url = 'https://api.darksky.net/forecast/ea0792adeafa4289708eb474fc854a84/'+ a +','+ b +''
    request({url, json: true}, (err, {body}) => {
        if(err){
            callback('Unable connect to server',undefined)
        } else if(body.error){
            callback('Wrong parameters.',undefined)
        }else {
            callback(undefined, {
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability,
                daily: body.daily.data[0].summary
            })
        }
    })
}

module.exports = {
    geocode: geocode,
    forecast: forecast
}

