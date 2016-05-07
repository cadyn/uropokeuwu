if(ws_status(global.socket) == ws_status_connected){
    ws_redis_set(global.socket,"hmset",chara_data[? "player_id"],json_encode(chara_data));
}
