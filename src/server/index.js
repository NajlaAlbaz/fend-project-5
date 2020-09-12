const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const cors = require('cors');
const port = 8888;

const app = express();

//Middle-ware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false,
}));

app.use(express.static('dist'));

app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'))
})

app.listen(port, ()=>{
    console.log(`App listening on port ${port}`)
});

const dotenv = require('dotenv');
dotenv.config();

//function to get data
const getData = async (url="") => {
    let response = await fetch(url);

    try {
        let data = await response.json();
        console.log(data);
        return data;
    } catch(error){
        console.log("Error:", error);
    }
}
// Fetch from Geonames
const geo_url = "http://api.geonames.org/searchJSON?maxRows=1&operator=OR&";
const geo_user = process.env.GEO_USER;

app.post("/geonames", (req, res) => {
    console.log("Getting data from geonames...")
    let url = `${geo_url}&q=${req.body.city}&username=${geo_user}`;
    console.log(url);
    getData(url).then(response => {
        console.log(response);
        let data = response.geonames[0];
        res.send(data);
    }).catch(error =>{
        console.log(error);
        res.send(JSON.stringify({'error': error}));
    })
});

//Fetch from weatherbit
const weather_url = " http://api.weatherbit.io/v2.0/forecast/daily";
const weather_key = process.env.WEATHER_KEY;

app.post("/weather", (req, res) => {
    console.log("Getting data from weatherbit...")
    let url = `${weather_url}?lat=${req.body.lat}&lon=${req.body.lng}&key=${weather_key}`;
    console.log(url);
    getData(url).then(response => {
        console.log(response);
        let data = response.data[0];
        res.send(data);
    }).catch(error =>{
        console.log(error);
        res.send(JSON.stringify({'error': error}));
    })
});

//Fetch from pixbay
const pix_url = "https://pixabay.com/api/";
const pix_key = process.env.PIX_KEY;

app.post("/pix", (req, res) => {
    console.log("Getting data from pixbay...")
    let url = `${pix_url}?q=${req.body.desc}&image_type=photo&key=${pix_key}`;
    console.log(url);
    getData(url).then(response => {
        console.log(response);
        let data = response.hits[0];
        res.send(data);
    }).catch(error =>{
        console.log(error);
        res.send(JSON.stringify({'error': error}));
    })
});