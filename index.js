const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const server = express();

const authRouter = require('./routers/authRouter.js');

const sessionConfig = {
  name: 'banana',
  secret: 'this is a good secret hope it does not get hacked',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 5,
    secure: false,
    httpOnly: true,
  },
  store: new KnexSessionStore({
    knex: require('./data/dbConfig.js'),
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 30,
  }),
};

const port = process.env.PORT || 4000;

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use('/api', authRouter);

server.listen(port, () => console.log(`\nServer at ${port}\n`))