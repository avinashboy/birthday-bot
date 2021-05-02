const express = require('express'),
  mongoose = require('mongoose'),
  dotenv = require('dotenv'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  helmet = require("helmet"),
  toobusy = require('toobusy-js'),
  nodeSchedule = require('node-schedule')

const port = process.env.PORT || 3333
dotenv.config()
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(helmet())
app.use(express.urlencoded({
  extended: true,
  limit: "1kb"
}))
app.use(function (req, res, next) {
  if (toobusy()) return res.status(503).send("Server Too Busy");
  next();
});

const brithCounter = require("./routes/brithCounter")
const auth = require("./routes/auth")
const forIndex = require("./routes/forIndex")
const callMe = require("./funtion/callMe")
const { getName, getTodayName } = require("./funtion/getTheList")
const sendMail = require("./funtion/mail")

app.use("/brithCounter", brithCounter)
app.use("/login", auth)
app.use("/forIndex", forIndex)

nodeSchedule.scheduleJob('0 0 1 * *', () => {
  let str = ""
  getName().then(info => {
    if (info.length === 0) return str = "No brithday for this month", sendMail(str)
    info.forEach(Element => {
      str += `<li>${Element.name} day is ${Element.baseTime}</li>\n`
    })
    let template = `
    <p>This birthday list</p>
    <ul>${str}</ul>
    `
    return sendMail(template)
  })
})

nodeSchedule.scheduleJob('0 0 * * *', () => {
  let str = ""
  getTodayName().then(info => {
    if (info.length === 0) return
    info.forEach(Element => {
      str += `<li>${Element.name} day is ${Element.baseTime}</li>\n`
    })
    let template = `
    <p>Today birthday list and wishes them...ps</p>
    <ul>${str}</ul>
    `
    return sendMail(template)
  })
})

nodeSchedule.scheduleJob('*/10 * * * *', () => {
  return callMe()
})

app.get('/', (req, res) => {
  res.send('homes page');
})

mongoose.connect(
  process.env.DB_CONNECT, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}, () => console.log('connect to the db'));

app.listen(port, () => console.log('server in running'))