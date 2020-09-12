const port = 8888;

const postData = async (url="", data={}) => {
    let response = await fetch(url, {
        method: 'POST',
        //credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    try{
        let result = await response.json();
        console.log(result);
        return result;
    }catch(error){
        console.log("Error:", error)
    }
}

const fetchPostCode = async (city="") => {
    let data = {'city': city}
    let geoData = await postData(`http://localhost:${port}/geonames`, data);
    return geoData;
}

const fetchWeather = async (lng="", lat="") => {
    let data = {
        'lat': lat,
        'lng': lng
    }
    let weatherData = await postData(`http://localhost:${port}/weather`, data);
    return weatherData;
}

const fetchPics = async (desc="") => {
    let data = {
        'desc': desc
    }
    let picSrc = await postData(`http://localhost:${port}/pix`, data);
    return picSrc
}

const getTripLength = (departDate="", returnDate="") => {
    let lengthInSecs = Math.abs(returnDate - departDate);
    let lengthInDays = Math.ceil( lengthInSecs / (1000 * 60 * 60 * 24));
    return lengthInDays;
}

const getDaysAway = (departDate="") => {
    let today = new Date();
    let secsAway = today - departDate;
    let daysAway = Math.ceil( secsAway / (1000 * 60 * 60 * 24));
    let daysAwayText = ""
    if(daysAway>0){
        daysAwayText = 'was '+Math.abs(daysAway)+' days ago.'
    } else {
        daysAwayText = 'is '+Math.abs(daysAway)+' days away.'
    }
    return daysAwayText;
}

export { fetchPostCode, fetchWeather , fetchPics, getTripLength, getDaysAway }