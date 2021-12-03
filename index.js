const { nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned IP:', ip);
// });

// fetchCoordsByIP("142.116.125.167", (error, data) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return
//   }

//   console.log("It worked! Returned coordinates", data);
// });

// fetchISSFlyOverTimes({ latitude: 43.7154, longitude: -79.3896 }, (error, flyOvers) => {
//   if (error) {
//     console.log("It didnt work!", error);
//     return
//   }

//   console.log("It worked! Returned flyover times", flyOvers)
// });

const printNextPasses = (flyOvers) => {
  for (const flyOver of flyOvers) {
    const nextTime = new Date(0);
    nextTime.setUTCSeconds(flyOver.riseTime);
    const howLong = flyOver.duration;
    console.log(`Next ISS flyover at ${nextTime} for ${howLong}`)
  };
};

nextISSTimesForMyLocation((error, flyOvers) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  console.log(flyOvers);
  printNextPasses(flyOvers);
});

