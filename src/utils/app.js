const chalk   = require('chalk')
const geocode = require('./geocode')
const forcast = require('./geocode')


// using with destructuring method
const address = process.argv[2]
    if (!address) {
        console.log('Provide your search address!')
    } else {
        geocode.geocode(address, (error, { latitude, longitude } ) => {
            if (error) {
                return console.log(error)
            }
                console.log(chalk.red `Connecting to weather data center...`)
                console.log(chalk.green `Retrieving data...\n`)
                forcast.forcast(latitude, longitude, (error, {Temperature, Place, Region, Country} = {} ) => {
                    if (error) {
                        return console.log(error)
                    }
                        console.log(chalk.blue `Temperature  : ${Temperature}`)
                        console.log(chalk.blue `Place  : ${Place}`)
                        console.log(chalk.blue `Region : ${Region}`)
                        console.log(chalk.cyan `Country : ${Country}`)
                })
        })
    }


/* 
geocode.geocode('nawada dehrdaun', (error, data) => {
    if (error) {
        return console.log(error)
    }
        console.log(chalk.red `Connecting to weather data center...`)
        console.log(chalk.green `Retrieving data...\n`)
        forcast.forcast(data.latitude, data.longitude, (error, forcasteData) => {
            if (error) {
                return console.log(error)
            }
                console.log(chalk.blue `Latitute : ${forcasteData.Lat}`)
                console.log(chalk.blue `Longitude: ${forcasteData.Lon}`)
                console.log(chalk.cyan `Temperature: ${forcasteData.Temperature}`)
                console.log(chalk.yellow `Weather  : ${forcasteData.Current_weather}`)
                console.log(chalk.green `Place : ${data.location}`)
        })
})

 */
// geolocation
/* forcast(30.32443, 78.03392, (error, data) => {
    const json = JSON.stringify(data)
    const d = JSON.parse(json)
    error? console.log('Error : ' + error) : console.log('\nRetreving data...\n')
    console.log(`Temp\t: ${d.Temperature} \nWeather\t: ${d.Current_weather} \nLatitue\t: ${d.Lat} \nLongitude: ${d.Lon} \nPlace\t: ${d.Place} \nRegion\t: ${d.Region} \nCountry\t: ${d.Country}`)
    // console.log('Error : ' + data)
}) */


// geocode
/* geocode('nawada dehrdaun', (error, data) => {
    console.log('Error : ' + error)
    console.log('Data : ' + JSON.stringify(data))
}) */

