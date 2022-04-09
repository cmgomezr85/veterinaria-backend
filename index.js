const http = require('http');
//const url = require('url');
//const StringDecoder = require('string_decoder').StringDecoder;
//const enrutador = require("./enrutador");
const requestHandler = require("./request-handler");



const server = http.createServer(requestHandler);

server.listen(5000, ()=>{
  console.log("servidor escuchando")
});