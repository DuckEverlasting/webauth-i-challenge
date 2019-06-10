const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

const authRouter = require('./routers/authRouter.js');

const port = process.env.PORT || 4000;

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api', authRouter);

server.listen(port, () => console.log(`\nServer at ${port}\n`))