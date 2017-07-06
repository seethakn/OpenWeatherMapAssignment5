const apiProxy = "https://cors-anywhere.herokuapp.com/"
const apiURL = "http://api.openweathermap.org/data/2.5/weather"
const apiKey = "546f48ff9abf785a7ea081758a757e6d"

let debug = null

function handleWeather (latitude, longitude) {
  // latitude, longitude & apikey values
  let values = {lat: latitude, lon: longitude, appid: apiKey}
  // serialize them into a query string
  let queryString = queryBuilder(values)
  // console.log("query string: " + queryString)

  // call getWeather with the query string
  getWeather(queryString)
}

function getWeather (queryString) {
  let request = new XMLHttpRequest()

  // starts talk to API - 3 params
  // request method, url, (optional) async flag (default true)
  request.open("GET", apiProxy + apiURL + queryString, true)

  // fires when the request is complete
  // update the DOM
  request.onload = function () {
    let weatherDiv = document.getElementById("weather")
    let response = JSON.parse(request.response)
    console.log(response.weather)

    // debug = response
    weatherDiv.innerHTML = " Weather today in : " + response.name + " "
                            + " Description : " + response.weather[0].description
                            + " Temperature (Kelvin): "+ response.main.temp
                            + " Minimum Temperature (Kelvin) : "+ response.main.temp_min
                            + " Maximum Temperature (Kelvin) : "+ response.main.temp_max
  }

  // fires if something goes wrong
  request.error = function (errorObject) {
    console.log("broken :(")
    console.log(errorObject)
  }

  // send the request!
  request.send()
}

function queryBuilder(queryObj){
  let holder = []
  // loop through queryObj key value pairs
  for(let key in queryObj){
    // turn each one into "key=value"
    let convert = `${encodeURIComponent(key)}=${encodeURIComponent(queryObj[key])}`
    // encodeURIComponent converts spaces and & to URI friendly values so we don't have to worry about them
    holder.push(convert)
  }
  // concatenate the pairs together, with & between
  let longString = holder.join("&")
  // prepend a ? to concatenated string, return
  return `?${longString}`
}
