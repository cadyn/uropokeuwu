var http = require("http");
var express = require("express");
var vhost = require("vhost");
var bodyParser = require('body-parser');
var multer = require( 'multer' );
var fs = require( 'fs-extra' );
var merge = require('merge');
const port = process.env.PORT || 3000;
app.listen(port, err => {
    if(err) throw err;
    console.log("%c Server running", "color: green");
});
var rooms = ["selectroom","room1","room2","room3","room4","room5","room6","room7","room8"];
//http setting
var app = express();

app
	.use(vhost('127.0.0.1',express.static(__dirname + "/game/test/")))
	.use(vhost('localhost',express.static(__dirname + "/game/public/")))
	.use(vhost('lJJHigginsl.github.io',express.static(__dirname + "/game/public/")))
	.use(vhost('oricha.ouroporos.net',express.static(__dirname + "/game/public/")))
app.use(bodyParser.urlencoded({extended: true}));



var redis = require("redis");
var redis_conf = require("./redis_conf.js");
var rediscli = redis.createClient(redis_conf.setting);
rediscli.setMaxListeners(0);
var publisher = redis.createClient(redis_conf.setting);
publisher.setMaxListeners(0);


app.post('/systemmes',function(req,res){
	var host = req.hostname;
	if(host == "127.0.0.1"){
	if (req.body.mes) {
		var dbname = req.body.db;
		var message = req.body.mes;
		var send_data = {};
		send_data["type"] = "sys_message";
		send_data["message"] = message;
		rooms.forEach(function each(room){
			publisher.publish(dbname+"_"+room,JSON.stringify(send_data));
		})
		
	// postデータはreq.body.xxxで受け取る

	}		
	}

});

app.get('/roomcnt',function(req,res){
	var host = req.hostname;
	switch(host){
		case "127.0.0.1": var dbname = "oricha"; break;
		case "localhost": var dbname = "uropokeon"; break;
		case "oricha.ouroporos.net": var dbname = "oricha"; break;
		case "lJJHigginsl.github.io": var dbname = "uropokeon"; break;
	}

	rediscli.scard(dbname+'_selectroom',function(err,sr_num){
		rediscli.scard(dbname+'_room1',function(err,r1_num){
		rediscli.scard(dbname+'_room2',function(err,r2_num){
		rediscli.scard(dbname+'_room3',function(err,r3_num){
		rediscli.scard(dbname+'_room4',function(err,r4_num){
		rediscli.scard(dbname+'_room5',function(err,r5_num){
		rediscli.scard(dbname+'_room6',function(err,r6_num){
		rediscli.scard(dbname+'_room7',function(err,r7_num){
		rediscli.scard(dbname+'_room8',function(err,r8_num){
			var roomdata = {};
			roomdata[dbname] = {"LOBBY":sr_num,"ROOM1":r1_num,"ROOM2":r2_num,"ROOM3":r3_num,"ROOM4":r4_num,"ROOM5":r5_num,"ROOM6":r6_num,"ROOM7":r7_num,"ROOM8":r8_num};
			res.send(JSON.stringify(roomdata));
		});		
		});		
		});		
		});		
		});		
		});		
		});		
		});		
	});	
});




app.post('/chara_img_get',function(req,res){

	var postData = req.body;
	var charaname = req.body['charaname'];
	var host = req.hostname;
	switch(host){
		case "127.0.0.1": var gamename = "oricha"; break;
		case "localhost": var gamename = "uropoke"; break;
		case "oricha.ouroporos.net": var gamename = "oricha"; break;
		case "lJJHigginsl.github.io": var gamename = "uropoke"; break;
	}
	var filepath = './chara_data/chara_set_'+gamename+'.json';
	var imgData = fs.readFileSync(filepath);
	imgData = JSON.parse(imgData);
	
	for(var charaname in postData){
		var charadata = imgData[charaname];
		charadata['charaname'] = charaname;
		charadata = JSON.stringify(charadata);
		res.send(charadata);
	}
	
});

/*
app.post('/chara_data_get_all',function(req,res){
	var host = req.hostname;
	switch(host){
		case "127.0.0.1": var gamename = "oricha"; break;
		case "localhost": var gamename = "uropoke"; break;
		case "oricha.ouroporos.net": var gamename = "oricha"; break;
		case "lJJHigginsl.github.io": var gamename = "uropoke"; break;
	}
	var filepath = __dirname+'/chara_data/chara_set_'+gamename+'.json';
	var imgData = fs.readFileSync(filepath);
	imgData = JSON.parse(imgData);

	var filepath2 = __dirname+'/chara_data/chara_prop_'+gamename+'.json';
	var propData = fs.readFileSync(filepath2);
	propData = JSON.parse(propData);

	var filepath3 = __dirname+'/chara_data/chara_interaction_'+gamename+'.json';
	var interactData = fs.readFileSync(filepath3);
	interactData = JSON.parse(interactData);

	var sendData = {imgData:imgData,propData:propData,interactData:interactData};
	res.send(sendData);
	
	
});*/

var server = http.createServer(app);
server.listen(port);
console.log("http server listening on %d", port)
