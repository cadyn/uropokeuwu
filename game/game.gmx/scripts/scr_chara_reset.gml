visible = true;
ins_name.visible = true;
image_speed = 0.2;
solid = true;
chara_data[? "hp"] = 100;
chara_data[? "status"] = "stand";
chara_data[? "visible"] = 1;
chara_data[? "movement"] = -1;
chara_data[? "opponent"] = "";
chara_data[? "opp_name"] = "";
chara_data[? "img_level"] = 0;

global.key_config[? "up"] = "jump";
global.key_config[? "down"] = "";
global.key_config[? "left"] = "move";
global.key_config[? "right"] = "move";
global.key_config[? "up_col"] = c_white;
global.key_config[? "down_col"] = c_white;
global.key_config[? "left_col"] = c_white;
global.key_config[? "right_col"] = c_white;

if(ws_status(global.socket) == ws_status_connected){
    chara_data[? "type"] = "update";
    ws_send_message(global.socket,json_encode(chara_data));
    ds_map_delete(chara_data,"type");
}
