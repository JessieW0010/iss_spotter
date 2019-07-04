const {fetchMyIp, fetchCoordsByIp, fetchISSFlyOverTimes, nextISSTimesForMyLocation} = require("./iss");

// Test Code:
//
// fetchMyIp((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// });
//
// fetchCoordsByIp("fakeIPaddress", (error, coord) => {
//   if (!error) {
//     console.log(coord);
//   } else {
//     console.log(`There is an error: ${error}`);
//   }
// })
//
// fetchISSFlyOverTimes({latitude: 70, longitude: 100}, (error, passTimes) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned flyover times:\n' , passTimes);
// });
//

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
});

