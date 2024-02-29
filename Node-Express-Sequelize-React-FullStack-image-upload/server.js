const express = require('express');
const cors = require('cors');
// const morgan = require("morgan");
const helmet = require("helmet");
require("dotenv").config();
var bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
var MemoryStore = session.MemoryStore;
// middleware
// app.set('trust proxy', 1)
app.use(bodyParser.json());
app.use(cors({
    origin: ['http://127.0.0.1:5173/'],
    methods: ['POST', 'GET'],
    credentials: true
}));
app.use(express.json());
// app.use(morgan("dev"));
app.use(helmet());
app.use(cookieParser());
app.use(session({
    name: 'app.sid',
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: new MemoryStore(),
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
    }
}));
app.use(express.urlencoded({ extended: true }));


// routers
const router = require('./routes/adminRoutes');
app.use('/api/admin', router);

//static Images Folder

app.use('/Images', express.static('./Images'));


//port

const PORT = process.env.PORT;
//server

app.listen(PORT, () => {
    console.log(`server is running on portss ${PORT}`);
});