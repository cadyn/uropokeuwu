var redis = require("redis");
var opts = require("opts");
var redis_conf = require("./redis_conf.js");
var ws = require("ws");


opts.parse([
    {
        'short':       'p',
        'long':        'port',
        'description': 'WebSocket Port',
        'value':       true,
        'required':    true
    }
]);

var rediscli = redis.createClient(redis_conf.setting);
rediscli.setMaxListeners(0);

//init rooms
var rooms = ["selectroom","room1","room2","room3","room4","room5","room6","room7","room8"];
var userdata_base = {
            'image_xscale':1,
            'visible':1,
            'express':-1,
            'hp':100,
            'img_level':0,
            'status':"stand",
            'movement':0,
            'opponent':"",
            'opp_name':""
          };
var port = opts.get('port');

if(parseInt(port) >= 50000) var dbname = "uropokeon_";
if(parseInt(port) >= 51000) var dbname = "oricha_";
if(parseInt(port) >= 52000) var dbname = "test_";
//websocket setting 
var WebSocketServer = ws.Server
var wss = new WebSocketServer({port:port})
wss.setMaxListeners(0);

console.log("websocket server created")
switch(port[4]){
  case '0': var server_name = "selectroom"; break;
  default: var server_name = "room"+ parseInt(port[4]); break;
}

rediscli.del(dbname+server_name); //init room data

var publisher = redis.createClient(redis_conf.setting);
publisher.setMaxListeners(0);
var subscriber = redis.createClient(redis_conf.setting);
subscriber.setMaxListeners(0);

subscriber.subscribe(dbname+server_name);

wss.on("connection", function(ws){
  try {
    var wskey = ws.upgradeReq.headers['sec-websocket-key'];
    var myid = wskey.slice(0,10);
    console.log(myid+" connected to ["+server_name+"]");

    function disconnection(status){
      var wskey = ws.upgradeReq.headers['sec-websocket-key'];
      var myid = wskey.slice(0,10);
      rediscli.exists(myid,function(err,reply){
        if(reply === 1){
          //delete user data if it exists in the database
          rediscli.hgetall(myid,function(err,user_data){
            user_data['type'] = "update";
            user_data['status'] = "left";
            user_data['sender'] = wskey;

            publisher.publish(dbname+server_name,JSON.stringify(user_data));

            console.log(myid+" : "+status);
            rediscli.del(myid);
            console.log("[user data deleted] "+user_data['user_name']+" left from "+dbname+server_name);
            rediscli.srem(dbname+server_name,myid);
            
            
            

            //if still connection has been opened, close it.
            if(ws.readyState == 1 && status != "back_title"){
              console.log("Websocket closed")
              ws.close();
            }
          });        
        } else{
          //if still connection has been opened, close it.
          if(ws.readyState == 1 && status != "back_title"){
            console.log("Websocket closed")
            ws.close();         
          } 
        }
      });
    }

    subscriber.on('message',function(channel, message){
      var data_json = JSON.parse(message);    
      var wskey = ws.upgradeReq.headers['sec-websocket-key'];

      //after get data via channel, return data to the client
      if(wskey != data_json['sender']){
        delete data_json['sender'];
        console.log(data_json);
        if(ws.readyState == 1){
          ws.send(JSON.stringify(data_json));
        }
      }
      
    });

  //send room members data when connected
    rediscli.llen(dbname+server_name+"_chatlog",function(err,chatloglen){
      rediscli.lrange(dbname+server_name+"_chatlog",0,chatloglen,function(err,chatlog){
        rediscli.scard(dbname+server_name,function(err,member_num){
          var i = 0;
          var send_data = {};
          send_data['init'] = "init";
          send_data['player_id'] = myid;
          send_data['chatlog'] = chatlog;

          if(member_num > 0){
            rediscli.smembers(dbname+server_name,function(err,members){
              members.forEach(function each(member){
                rediscli.hgetall(member,function(err,user_data){
                  send_data[member] = user_data;
                  i++;
                  if(i == member_num){
                    //when retrieved all member data in the room, send data
                    if(ws.readyState == 1){
                      ws.send(JSON.stringify(send_data));
                    }
                  }
                });
              });    
            });
          } else{
            if(ws.readyState == 1){
              ws.send(JSON.stringify(send_data));
            }        
          }
        });
      });
    });

    ws.on('message',function(data){
      var wskey = ws.upgradeReq.headers['sec-websocket-key'];
      var myid = wskey.slice(0,10);
      //broadcast data to clients via channel
      
      data_json = JSON.parse(data);
      
      if(data_json['type'] == "chat_sent"){
        console.log('Chat_sent');
        publisher.publish(dbname+server_name,JSON.stringify(data_json));
      }

    //Redis connection function
      //set data function
      if(data_json['type'] == "set"){
        var key = data_json['key'];
        var val = data_json['val'];
        rediscli.set(key,val,function(err){
          var send_data = {
            'type':"redis_set",
            'key':key,
            'val':val,
            'sender':wskey
          }
        });
      }
      if(data_json['type'] == "hmset"){
        var key = data_json['key'];
        var val = JSON.parse(data_json['val']);
        rediscli.hmset(key,val,function(err){
          var send_data = {
            'type':"redis_hmset",
            'key':key,
            'val':val,
            'sender':wskey
          }
        });
      }
      if(data_json['type'] == "sadd"){
        var data_name = data_json['name'];
        var key = data_json['key'];
        rediscli.sadd(data_name,key,function(err){
          var send_data = {
            'type':"redis_sadd",
            'name':data_name,
            'key':key,
            'sender':wskey
          }
        });
      }

      //get data function
      if(data_json['type'] == "get"){
        var key = data_json['key'];
        rediscli.get(key,function(err,val){
          var send_data = {
            'type':"redis_get",
            'key':key,
            'val':val
          }
          if(ws.readyState == 1){
            ws.send(JSON.stringify(send_data));
          }
        });
      }
      if(data_json['type'] == "hgetall"){
        var key = data_json['key'];
        rediscli.hgetall(key,function(err,val){
          var send_data = {
            'type':"redis_hgetall",
            'key':key,
            'val':val
          }
          if(ws.readyState == 1){
            ws.send(JSON.stringify(send_data));
          }
        });
      }
      if(data_json['type'] == "smembers"){
        var data_name = data_json['name'];
        rediscli.smembers(data_name,function(err,val){
          var send_data = {
            'type':"redis_smembers",
            'name':data_name,
            'val':val
          }
          if(ws.readyState == 1){
            ws.send(JSON.stringify(send_data));
          }
        });
      }

      //delete data function
      if(data_json['type'] == "del"){
        var key = data_json['key'];
        rediscli.del(key,function(err){
          var send_data = {
            'type':"redis_del",
            'key':key,
            'sender':wskey
          }
          publisher.publish(dbname+server_name,JSON.stringify(send_data));
        });
      }
      if(data_json['type'] == "srem"){
        var data_name = data_json['name'];
        var key = data_json['key'];
        rediscli.srem(data_name,key,function(err){
          var send_data = {
            'type':"redis_srem",
            'name':data_name,
            'key' :key,
            'sender':wskey
          }
          publisher.publish(dbname+server_name,JSON.stringify(send_data));
        });
      }
    //END Redis connection function


    //after entered room, return room status
      if(data_json['type'] == "room_entry"){
        var room_name = data_json["room_name"];
        rediscli.hmset(myid,data_json,function(err){
          rediscli.hmset(myid,userdata_base,function(err){
            rediscli.hmset(myid,{
            'player_id': myid,
            'room_name':server_name,
            'status':"stand",
            'x':30,
            'y':200
            },function(err,data){
              rediscli.expire(myid,60*60*24); //delete user data after being idle for 1 day
              rediscli.sadd(dbname+server_name,myid);
                rediscli.hgetall(myid,function(err,user_data){  
                  //notify player join to other members
                  user_data['joined'] = "joined";
                  user_data['sender'] = wskey;
                  publisher.publish(dbname+server_name,JSON.stringify(user_data));
                      
                });  
            });          
          });
        });
      }

      if(data_json['type'] == "room_data"){
        var room_name = data_json['room_name'];
        rediscli.scard(dbname+room_name,function(err,member_num){
          var i = 0;
          var send_data = {};

          send_data['room_name'] = room_name;
          send_data['type'] = "room_data";
          send_data['member_num'] = member_num;
          if(member_num > 0){
            rediscli.smembers(dbname+room_name,function(err,members){
              members.forEach(function each(member){
                i++;
                rediscli.hgetall(member,function(err,user_data){
                  send_data[member] = user_data;
                  if(i == member_num){
                    if(ws.readyState == 1){
                      ws.send(JSON.stringify(send_data));
                    }
                  }
                });                  
              });

            });
          } else{
            if(ws.readyState == 1){
              ws.send(JSON.stringify(send_data));
            }              
          }
        });
      }

      if(data_json['type'] == "update"){
        var room_name = data_json['room_name'];
      //broadcast update data to other users
        data_json['sender'] = wskey;
        publisher.publish(dbname+server_name,JSON.stringify(data_json));   

        delete data_json['type'];

      //update database
        var user_id = data_json['player_id'];
        rediscli.hmset(user_id,data_json);
        rediscli.expire(user_id,60*60*24)

        if(data_json['chat_status'] == "chatting"){
          //inform new entry to other player in the same room       
          rediscli.hget(myid,"room_name",function(err, room_name){
            rediscli.lpush(dbname+room_name+"_chatlog",data_json['user_name']+": "+data_json['chatmes'],function(err){
              rediscli.llen(dbname+room_name+"_chatlog",function(err,chatlog_length){
                if(chatlog_length > 10){
                  rediscli.rpop(dbname+room_name+"_chatlog",function(err){
                    rediscli.hdel(user_id,"chat_mes");
                  });
                }
              });
            });
            rediscli.expire(dbname+room_name+"_chatlog",60*60*24);
          });
        }
      }

      if(data_json['type'] == "back_title"){
        console.log("Back to title");
        disconnection(data_json['type']);
      }

      if(data_json['type'] == "left_room"){
        console.log("Left room");
        disconnection(data_json['type']);
      }

    }); //end ws.on('message',function(data){


    ws.on('close',function(code,reason){
      console.log("Closed Websocket connection");
      disconnection("close");
    });

    ws.on('error', function() {
      console.log('Closed [error closed]');
      disconnection("error");
    });

  } catch (e) {
    console.log("websocket connection error")
  }
}); //end wss.on("connection", function(ws){
