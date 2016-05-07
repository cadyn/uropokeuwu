//scr_send_data(target,status,update_st)
var target = argument0;
var updates = argument2;
if(global.player_id == target.chara_data[? "player_id"]) updates[? "movement"] = keyboard_lastkey;
if(wss.start_flag == 1 && ws_status(global.socket) == ws_status_connected ){

    updates[? "x"] = floor(x);
    updates[? "y"] = floor(y);
    updates[? "image_xscale"] = image_xscale;
    updates[? "visible"] = visible;
    var update_st_key = ds_map_find_first(updates);
    for(var i = 0; i < ds_map_size(updates); i++){
        target.chara_data[? update_st_key] = updates[? update_st_key];
        update_st_key = ds_map_find_next(updates,update_st_key)
    }
    updates[? "status"] = argument1;
    updates[? "player_id"] = target.chara_data[? "player_id"];
    updates[? "room_name"] = target.chara_data[? "room_name"];
    
    visible = target.chara_data[? "visible"];
    
    if(global.player_id == target.chara_data[? "player_id"] || reset_flag == 1){
        if(updates[? "movement"] != target.chara_data[? "pre_move"]){
            ws_send_message(global.socket, json_encode(updates));
            target.chara_data[? "pre_move"] = target.chara_data[? "movement"];
            target.chara_data[? "movement"] = -1;
        }
    }

}
