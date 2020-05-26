const express = require('express');

//routes here

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send(`server running for BW project!`);
  });

  //endpiont base urls


  module.exports = server; 