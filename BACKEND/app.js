const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser'); 
const dotenv = require('dotenv');

const connectToDb = require('./DB/db');
const userRoutes = require('./routes/user.routes')
const captainRoutes = require('./routes/captian.routes')

dotenv.config();
connectToDb();

const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.use('/users', userRoutes)
app.use('/captains', captainRoutes)

module.exports = app;