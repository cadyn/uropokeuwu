if(ws_status(global.socket) == ws_status_connected){
    chara_data[? "type"] = "update";
    ws_send_message(global.socket,json_encode(chara_data));
    ds_map_delete(chara_data,"type");
}

