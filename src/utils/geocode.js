const request = require('request')

const forcast = (late, long, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=e47c2bb66768365b2239b50b3ddca750&query='+ encodeURIComponent(late)+','+encodeURIComponent(long)+''

    request({ url : url, json : true }, (error, response ) => {
        if (error) {
            callback('Unable to connect to the weather services!', undefined)
        } else if (response.body.location.length === 0) {
            callback('Unable to find the location, please search another location!', undefined)
        } else {
            callback(undefined, {
                Temperature : response.body.current.temperature + '°C',
                Current_weather : response.body.current.weather_descriptions,
                Lat : response.body.location.lat,
                Lon : response.body.location.lon,
                Place  : response.body.location.name,
                Region : response.body.location.region,
                Country: response.body.location.country,
            })
        }
    })
}

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoicml5YW5tZ3IiLCJhIjoiY2tydXRwcnliMDA2aDJwcHNhbndxcG5odSJ9.UhSG6SK34Gfj-sUm25_alQ'

    request({ url:url, json: true }, (error, response ) => {
        if (error) {
            callback('Unable to connect to the weather service!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find the search location, please try another search!', undefined)
        } else {
            callback(undefined, {
                    latitude : response.body.features[0].center[1], 
                    longitude: response.body.features[0].center[0],
                    location : response.body.features[0].place_name 
            })
        }
    })
}

module.exports = {forcast, geocode}



/* 
const cURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/dehradun.json?access_token=pk.eyJ1Ijoicml5YW5tZ3IiLCJhIjoiY2tydXRwcnliMDA2aDJwcHNhbndxcG5odSJ9.UhSG6SK34Gfj-sUm25_alQ'

request({ url : cURL, json : true }, (error, response) => {
    if (error) {
        console.log(`Unable to connect to the ${error.hostname} weather service!`)
    } else if (response.body.features.length === 0) {
        console.log('Unable to find location, try to search another location!')
    } else {
        const latitude  = response.body.features[0].center[1]
        const longitude = response.body.features[0].center[0]
        console.log(`Latitude : ${latitude} \nLongitude : ${longitude}`)
    }
})

 */
/* 
const url = 'http://api.weatherstack.com/current?access_key=e47c2bb66768365b2239b50b3ddca750&query=30.32443,78.03392'

request({ url : url, json : true }, (error, response) => {
    if (error) {
        console.log(`Unable to connect to the ${error.hostname} weatherstack service!`)
    } else if (response.body.error) {
        console.log('Unable to find location!')
    } else {
        const data = response.body
        console.log('The live weather reporting...\n')
        console.log(`Current location : ${data.location.name}`)
        console.log(`Current country : ${data.location.country}`)
        console.log(`Current region : ${data.location.region}`)
        console.log(`Current temperature : ${data.current.temperature}`)
        console.log(`weather description : ${data.current.weather_descriptions}`)
    }   
})
 */