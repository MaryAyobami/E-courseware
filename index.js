const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./db')
const studentRoute = require('./routes/studentRoute')
const lecturerRoute = require('./routes/lecturerRoute')
const resourcesRoute = require('./routes/resourcesRoute')
const profileRoute = require('./routes/profileRoute')
const coursesRoute = require('./routes/coursesRoute')
const chatRoute = require('./routes/chatRoute')
const verificationRoute = require('./routes/verificationRoute')

// const {logger} = require('morgan')
// const socketio = require('socket.io')
// const http = require('http')
// const websocket = require('./utils/websocket')

dotenv.config()

connectDB()

const app = express();

// /** Create HTTP server. */
// const server = http.createServer(app);
// /** Create socket connection */
// global.io = socketio.listen(server);
// global.io.on('connection', websocket.connection)

//app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(cookieParser());
app.use('/',studentRoute)
app.use('/',resourcesRoute)
app.use('/',lecturerRoute)
app.use('/',profileRoute)
app.use('/',coursesRoute)
app.use('/',chatRoute)
app.use('/',verificationRoute)

// app.use(attachStudent)
app.use('*', (req, res) => {
    return res.status(404).json({
      success: false,
      message: 'API endpoint doesnt exist'
    })
  });

app.listen(process.env.PORT , ()=>{
    console.log(`app is listening at port ${process.env.PORT}`)
})