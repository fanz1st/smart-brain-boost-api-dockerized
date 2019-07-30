const express = require('express');
const app = express();
const https = require('http');
const fs = require('fs');
const path = require('path');
const io = require('socket.io')(https);
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const routes = require('./routes/router')(io);


const whitelist = ['*']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}



app.use(compression());
app.use(morgan('combined'));
app.use(cors('*'))
app.use(bodyParser.json());

const httpsServerOptions = {
   'key': fs.readFileSync(path.join(__dirname,'./https/key.pem')),
   'cert': fs.readFileSync(path.join(__dirname,'./https/cert.pem'))
 };

app.use('',routes);

httpsServer = https.createServer(app);
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8001;
}

httpsServer.listen(port, ()=>{
	console.log('https app is running on port '+ port )
})
