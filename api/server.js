const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
//routes here
const authenticate = require('../auth/middleware');
const authRouter = require('../users/auth_router');
const recipeRouter = require('../recipes/recipes_router');

const server = express();


server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
    res.send(`server running for BW project!`);
  });

  //endpiont base urls
  server.use('/api/auth', authRouter);
  server.use('/api/recipes', authenticate, recipeRouter);

  module.exports = server;  