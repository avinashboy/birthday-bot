const express = require('express');
const router = express.Router();
const BdbData = require("../models/bdb");
const { v4: uuidv4 } = require('uuid');
let moment = require('moment-timezone');

router.get('/', async (req, res) => {
  let currentDay = moment().tz("Asia/Kolkata").format('L').split("/"), tempArray = []
  try {
    const bData = await BdbData.find().sort({ "month": -1, "baseTime": -1 });
    bData.forEach(element => {
      if (element.month === currentDay[0] && element.baseTime.trim() > currentDay[1]) {
        let tempPayload = {
          name: element.name,
          baseTime: element.baseTime,
          descriptionHead: element.descriptionHead,
          mainHead: element.mainHead,
          month: element.month,
          titleHead: element.titleHead,
          id: uuidv4()
        }
        tempArray.push(tempPayload)
      }
    })
    res.json(tempArray);
  } catch (err) {
    res.json({
      message: err
    })
  }

})

module.exports = router;