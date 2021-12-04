const { nextISSTimesForMyLocation } = require('./iss_promised');
const { printNextPasses } = require('./index')

nextISSTimesForMyLocation()
  .then((flyovers) => {
    printNextPasses(flyovers);
  })
  .catch((error) => {
    console.log("It didn't work", error.message);
  })
  