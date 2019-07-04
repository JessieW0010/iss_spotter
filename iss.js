/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require("request");

const fetchMyIp = function(callback) {
  request("https://api.ipify.org?format=json", (error, response, body) => {
    
    if (error) {
      //if there is an error (invalid domain, user is offline, etc)
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      //200 is a success response code
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    //body is returned as {"ip":"66.207.199.230"}
    //after parse and selecting key, returns 66.207.199.230
    const ipString = (JSON.parse(body)).ip;
    console.log(`My IP is: ${ipString}`);
    callback(null, ipString);
    
  });
};

const fetchCoordsByIp = function(ip, callback2) {
  request(`https://ipvigilante.com/${ip}`, (error, response, body) => {

    if (error) {
      //if there is an error (invalid domain, user is offline, etc)
      return callback2(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching for coordinates if IP ${ip}.`;
      callback2(Error(msg), null);
    } 
    
    const longitude = (JSON.parse(body))["data"].longitude;
    const latitude = (JSON.parse(body))["data"].latitude;
    console.log(`coordinates is: {${longitude}, ${latitude}}`);
    callback2(error, {latitude, longitude});
    
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback3) {

  const lat = coords.latitude;
  const lon = coords.longitude;

  request(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}`, (error, response, body) => {

    if (error) {
      //if there is an error (invalid domain, user is offline, etc)
      return callback3(error, null);
    }

    if (response.statusCode !== 200) {
      callback3(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const message = (JSON.parse(body)).message;
    if (message === "failure") {
      callback3(Error("Invalid coordinates. Longitude must be number between -180.0 and 180.0. Latitude must be number between -90.0 and 90.0."), null);
    }
      
    const passes = (JSON.parse(body)).response;
    console.log(`passes is: ${passes}`);
    callback3(null, passes);

  });
};

// iss.js 

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ 
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIp((error, IP) => {
    if (error) {
      callback(error, null);
    } 
    fetchCoordsByIp(IP, (error, coordinates) => {
      if (error) {
        callback(error, null);
      }
      fetchISSFlyOverTimes(coordinates, (error, passes) => {
        if (error) {
          callback(error, null);
        }
        callback(null, passes);
      })
    })
  })
}

module.exports = {fetchMyIp, fetchCoordsByIp, fetchISSFlyOverTimes, nextISSTimesForMyLocation};