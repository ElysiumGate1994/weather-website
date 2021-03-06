const path    = require('path')
const express = require('express')
const app     = express()
const geocode = require('./utils/geocode')
const forcast = require('./utils/geocode')
const hbs     = require('hbs')

const port = process.env.PORT || 3000

// defining path for views
const publicDirectoryPath  = path.join( __dirname, '../public')
const viewDirectoryPath    = path.join( __dirname, '../templates/views')
const partialDirectoryPath = path.join( __dirname, '../templates/partials')

// setup handle bar and view location
app.set('view engine', 'hbs')
app.set('views', viewDirectoryPath)
hbs.registerPartials(partialDirectoryPath)

// setup static directory
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title : 'Website | Home'
    })
})

app.get('/about-us', (req, res) => {
    res.render('about', 
        {
            title : 'Website | About us',
            moto  : "When the sun rises, I wake up and chase my dreams. I won't regret when the sun sets    Cuz I live my life like I'm a Beast.",
            author: 'Shubham Thapa'
        },
    )
})

app.get('/help', (req, res) => {
    res.render('help', 
        {
            title : 'Website | Help',
            moto  : "I feel that if you are blessed, or lucky enough, to be doing well, you should help others.",
            author: 'Martin Luther King, Jr'
        },
    )
})

app.get('/home', (req, res) => {
    res.render('weather-search', {

    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
       return console.log('Provide search address!')
    } else {
        geocode.geocode(req.query.address, (error, { latitude, longitude } = {} ) => {
            if (error) {
                return res.send({ error })
            }

            forcast.forcast(latitude, longitude, (error, {temperature, weather_descriptions, place, region, country} = {} ) => {
                if (error) {
                    return res.send({ error })
                }

                res.send({
                    temperature,
                    place,
                    weather_descriptions,
                    region,
                    country,    
                    address : req.query.address
                })
            })
        })
    }
      
})


app.get('/help/*', (req, res) => {
    res.send(
        'Sorry :( Help page article not found!'
    )
})

app.get('*', (req, res) => {
    res.render('404', {
        title : 'Website | 404 error page not found!'
    })
})


app.listen(port, () => {
    console.log('Server start at Port : '+port)
})