const request = require('request');

const fetchMyIP = (callback) => {
  request("https://api.ipify.org/?format=json", (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if(response.statusCode !== 200) {
      return callback(`Error ${response.statusCode} when fetching IP: ${body}`, null);
    }
    
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) 
    {
      return callback(error,null);
    }

    if(response.statusCode !== 200) {
      return callback(`Error ${response.statusCode} when fetching coordinates for IP: ${body}`, null);
    }

    const { latitude, longitude } = JSON.parse(body);

    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      return callback(`Error ${response.statusCode} when fetching fly over times for lat and long: ${body}`, null);
    }

    const flyOvers = JSON.parse(body).response;
    callback(null, flyOvers)
  })
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coords, (error, flyovers) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, flyovers)
      })
    })
  })
};

module.exports = { nextISSTimesForMyLocation };