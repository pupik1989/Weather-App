const path = require('path')
const express = require('express')
const hbs = require('hbs')
const utils = require('./utils/geocode')

const app = express()

//Define path for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../src/templates/views')
const partialsPath = path.join(__dirname, './templates/partials')

//Setup hbs engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static dir to serve
app.use(express.static(publicDirPath))

app.get('',(req, res) => {
    res.render('index',{
        title:'Weather App',
        name:'Kodesh Pupik'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title:'About Page',
        name:'Kodesh Pupik'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'help me!!',
        title:'Help Page',
        name: 'Kodesh Pupik'

    })
})

app.get('/weather', (req, res)=> {
    if(!req.query.address) {
        res.send({
            error:'Must previde address term.'
        })
    } else {
        utils.geocode(req.query.address, (err, {lan,lon, location} = {}) => {
                if(err) {
                    return res.send({err})
                }else {
                    utils.forecast(lan,lon, (err, forcastData = {}) => {
                        if(err){
                            return res.send({err})
                        }else {
                            return res.send({
                                forcast: forcastData,
                                location,
                                address:req.query.address
                            })
                        }
                })
             }
        })
    }
})



app.get('/help/*', (req, res)=> {
    res.render('er404page', {
        address: 'help page not found.',
        title:'Help Page',
        name:'Kodesh Pupik'
    })
})

app.get('*', (req, res) => {
    res.render('er404page', {    
        address:'url not found',
        title:'Help Page',
        name:'Kodesh Pupik'

    })
})
app.listen(3000, ()=> {
    console.log('server is up on port 3000.')
})