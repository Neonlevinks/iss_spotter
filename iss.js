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
}

module.exports = { fetchMyIP };