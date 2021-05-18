const express = require('express'),
  mongoose = require('mongoose'),
  dotenv = require('dotenv'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  helmet = require("helmet"),
  toobusy = require('toobusy-js'),
  nodeSchedule = require('node-schedule'),
  cluster = require('cluster'),
  os = require('os')

const port = process.env.PORT || 3333, numCpu = os.cpus().length

dotenv.config()
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(helmet())
app.use(express.urlencoded({ extended: true, limit: "1kb" }))
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


app.get('/', (req, res) => {
  res.send('homes page');
})

mongoose.connect(
  process.env.DB_CONNECT, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}, () => console.log(`connect to the db`));



if (cluster.isMaster) {
  console.log(`master node id ${process.pid}`)
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
        str += `<li>${Element.name} bday</li>\n`
      })
      let template = `
      <p>Today birthday list and wishes them...ps</p>
      <ul>${str}</ul>
      `
      return sendMail(template)
    })
  })

  nodeSchedule.scheduleJob(' */10 * * * *', () => {
    return callMe()
  })


  for (let i = 0; i < numCpu; i++) {
    cluster.fork()
  }
  cluster.on('online', function (worker) {
    console.log('Worker ' + worker.process.pid + ' is online');
  });

  cluster.on('exit', function (worker, code, signal) {
    console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
    console.log('Starting a new worker');
    cluster.fork();
  });
} else {
  app.listen(port, () => console.log(`server in running`))
}
