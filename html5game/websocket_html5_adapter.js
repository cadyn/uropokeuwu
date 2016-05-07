/**
Client-Side WebSocket Bindings for GameMaker Studio
Author: Dickson Law
(C) GameGeisha Interactive, 2010-2014
*/

var __ws_sockets__ = new Array();

function __ws_connect__(url) {
	return __ws_connect_ext__(url, "");
}

function __ws_connect_ext__(url, protocols) {
	var ws, id;
	
	//Try to create the WebSocket
	try {
		if (protocols == "") {
			ws = new WebSocket(url);
		}
		else {
			ws = new WebSocket(url, protocols.split('|'));
		}
	}
	catch (e) {
		return -1;
	}
	
	//Add the WebSocket
	id = __ws_sockets__.push({
		socket: ws,
		inbox: new Array()
	})-1;
	
	//Tack on events
	ws.onmessage = function(event) {
		__ws_sockets__[id].inbox.push(event.data);
	};
	
	//Return numeric handle
	return id;
}

function __ws_status__(id) {
	try {
		return __ws_sockets__[id].socket.readyState;
	}
	catch (e) {
		return -1;
	}
}

function __ws_disconnect__(id) {
	return __ws_disconnect_ext__(id, 1000, "");
}

function __ws_disconnect_ext__(id, code, reason) {
	try {
		__ws_sockets__[id].socket.close(code, reason);
	}
	catch (e) {
		return false;
	}
}

function __ws_send_message__(id, msg) {
	try {
		__ws_sockets__[id].socket.send(msg);
		return true;
	}
	catch (e) {
		return false;
	}
}

function __ws_has_message__(id) {
	try {
		return __ws_sockets__[id].inbox.length > 0;
	}
	catch (e) {
		return false;
	}
}

function __ws_get_message__(id) {
	try {
		return (__ws_sockets__[id].inbox.splice(0, 1))[0] || "";
	}
	catch (e) {
		return "";
	}
}


function __ws_redis_set__(id,type,key,val) {
	try {
		var set_data = {
			'type':type,
			'key':key,
			'val':val
		};
		__ws_sockets__[id].socket.send(JSON.stringify(set_data));
		return true;
	}
	catch (e) {
		return false;
	}
}

function __ws_redis_get__(id,type,key) {
	try {
		var get_data = {
			'type':type,
			'key':key
		};
		__ws_sockets__[id].socket.send(JSON.stringify(get_data));
		return true;
	}
	catch (e) {
		return false;
	}
}

function __ws_redis_del__(id,key) {
	try {
		var s_data = {
			'type':"del",
			'key':key
		};
		__ws_sockets__[id].socket.send(JSON.stringify(s_data));

		return true;
	}
	catch (e) {
		return false;
	}
}

function __ws_redis_sdata__(id,type,name,key) {
	try {
		var s_data = {
			'type':type,
			'name':name,
			'key':key
		};
		__ws_sockets__[id].socket.send(JSON.stringify(s_data));

		return true;
	}
	catch (e) {
		return false;
	}
}

