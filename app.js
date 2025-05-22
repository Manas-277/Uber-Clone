const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectToDb = require('./DB/db');
const userRoutes = require('./routes/user.routes')
const cookieParser = require('cookie-parser'); 

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

module.exports = app;