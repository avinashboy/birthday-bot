const express = require('express');
const router = express.Router();
const BdbData = require("../models/bdb");
const { encrypt, decrypt } = require("./function")
const authToken = require("./token")
const validator = require('validator')
const hpp = require('hpp')

const app = express()

app.use(express.urlencoded({
  extended: true,
  limit: "1kb"
}))
app.use(hpp());

router.post('/', authToken, async (req, res) => {
  const bdbData = new BdbData({
    name: cleanInput(req.body.name),
    baseTime: cleanInput(req.body.baseTime),
    descriptionHead: cleanInput(req.body.descriptionHead),
    mainHead: req.body.mainHead,
    month: cleanInput(req.body.month),
    titleHead: cleanInput(req.body.titleHead)
  })

  try {
    const saveData = await bdbData.save();
    res.status(201).send(saveData._id)
  } catch (err) {
    res.json({
      message: err
    });
  }

})

router.get('/', authToken, async (req, res) => {
  let tempArray = []
  try {
    const bData = await BdbData.find().sort({ "month": -1, "baseTime": -1 });
    bData.forEach((element) => {
      let payLoad = {
        name: element.name,
        mainHead: element.mainHead,
        date: element.date,
        _id: element._id
      }
      tempArray.push(payLoad)
    })
    res.json(tempArray);
  } catch (err) {
    res.json({
      message: err
    })
  }

})

router.delete('/:postId', authToken, async (req, res) => {
  try {
    const removePost = await BdbData.deleteOne({
      _id: cleanInput(req.params.postId)
    });
    res.json(removePost);
  } catch (err) {
    res.json({
      err
    })
  }
})

function cleanInput(message) {
  return validator.escape(message)
}

module.exports = router;