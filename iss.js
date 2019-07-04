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
    if (!error) {
      //body is returned as {"ip":"66.207.199.230"}
      //after parse and selecting key, returns 66.207.199.230
      const ipString = (JSON.parse(body)).ip;
      callback(null, ipString);
    } else {
      //if there is an error (invalid domain, user is offline, etc)
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      //200 is a success response code
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

  });
};

module.exports = {fetchMyIp};