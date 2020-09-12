import { fetchPostCode, fetchWeather, fetchPics, getDaysAway, getTripLength } from "./fetchAPIs.js"
const getTripInfo = async (event) => {
    event.preventDefault();

    // data from user
    let fromDate = document.getElementById("start-date").value;
    let toDate = document.getElementById("end-date").value;
    let toCity = document.getElementById("toCity").value;
    let fromCity = document.getElementById("fromCity").value;

    if((fromDate=="" || toDate=="" || toCity=="" || fromCity=="")){

        document.getElementById("no_trip").classList.remove("hidden");
        document.getElementById("planner_box").classList.add("hidden");
    }else{

        document.getElementById("no_trip").classList.add("hidden");
        document.getElementById("planner_box").classList.remove("hidden");
        // retrieve data from geonames
        let geoData = await fetchPostCode(toCity);
        let lat = geoData.lat;
        let lng = geoData.lng;

        //retrieve data from weatherbit
        let weatherData = await fetchWeather(lng, lat);
        let highTemp = weatherData.high_temp;
        let lowTemp = weatherData.low_temp;
        let weatherDesctiption = weatherData.weather.description;

        //retrieve data from pixbay
        let pixData = await fetchPics(toCity);
        let pixURL = pixData.webformatURL;

        //get how many days away
        let departDate = new Date(fromDate);
        let returnDate = new Date(toDate);
        let daysAway = getDaysAway(departDate);

        //get trip length
        let tripLength = getTripLength(departDate, returnDate);


        //update UI
        document.getElementById("city_img").src = pixURL;
        document.getElementById("from_info").innerHTML = fromCity;
        document.getElementById("to_info").innerHTML = toCity;
        document.getElementById("to_trip").innerHTML = toCity;
        document.getElementById("depart_info").innerHTML = fromDate;
        document.getElementById("return_info").innerHTML = toDate;
        document.getElementById("days_away").innerHTML = daysAway;
        document.getElementById("trip_length").innerHTML = tripLength;
        document.getElementById("weather_description").innerHTML = weatherDesctiption; 
        document.getElementById("high_temp").innerHTML = highTemp;
        document.getElementById("low_temp").innerHTML = lowTemp; 
    }
}

export { getTripInfo };