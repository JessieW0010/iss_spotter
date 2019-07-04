const {fetchMyIp, fetchCoordsByIp} = require("./iss");

// Test Code:
//
// fetchMyIp((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// });
// fetchCoordsByIp("fakeIPaddress", (error, coord) => {
//   if (!error) {
//     console.log(coord);
//   } else {
//     console.log(`There is an error: ${error}`);
//   }
// })