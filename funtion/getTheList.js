const BdbData = require("../models/bdb");
let moment = require('moment-timezone');

async function getName() {
  let currentDay = moment().tz("Asia/Kolkata").format('L').split("/"), tempArray = []
  try {
    const bData = await BdbData.find().sort({ "month": -1, "baseTime": -1 });
    bData.forEach(element => {
      if (element.month === currentDay[0] && element.baseTime.trim() > currentDay[1]) {
        let tempPayload = {
          name: element.name,
          baseTime: element.baseTime,
        }
        tempArray.push(tempPayload)
      }
    })
    return tempArray;
  } catch (err) {
    return err
  }

}

async function getTodayName() {
  let currentDay = moment().tz("Asia/Kolkata").format('L').split("/"), tempArray = []
  try {
    const bData = await BdbData.find().sort({ "month": -1, "baseTime": -1 });
    bData.forEach(element => {
      if (element.month === currentDay[0] && element.baseTime.trim() === currentDay[1]) {
        let tempPayload = {
          name: element.name,
        }
        tempArray.push(tempPayload)
      }
    })
    return tempArray;
  } catch (err) {
    return err
  }

}

module.exports = { getName, getTodayName };