const axios = require("axios")
let moment = require('moment-timezone');

async function makeGetRequest() {
  await axios.get(`https://jsonserver8421.herokuapp.com/`).then(res => console.log(`${res.data} time is : ${moment().tz("Asia/Kolkata").format('lll')}`)).catch(err => console.log(err));
}

module.exports = makeGetRequest