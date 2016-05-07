//Default
global.key_config[? "up"] = "jump";
global.key_config[? "down"] = "";
global.key_config[? "left"] = "move";
global.key_config[? "right"] = "move";
global.key_config[? "shift"] = "Chat";
global.key_config[? "B"] = "Bind";
global.key_config[? "backspace"] = "";
global.key_config[? "escape"] = "Exit";
global.key_config[? "enter"] = "Action";

global.key_config[? "up_col"] = c_white;
global.key_config[? "down_col"] = c_white;
global.key_config[? "left_col"] = c_white;
global.key_config[? "right_col"] = c_white;
global.key_config[? "shift_col"] = c_white;
global.key_config[? "B_col"] = c_white;
global.key_config[? "backspace_col"] = c_white;
global.key_config[? "escape_col"] = c_white;
global.key_config[? "enter_col"] = c_gray;

var st = chara_data[? "status"];
if(chara_data[? "player_id"] == global.player_id){
    switch(string_letters(string_copy(st,1,string_pos("_",st)-1))){
        case "atk":
            global.key_config[? "left_col"] = c_gray; global.key_config[? "right_col"] = c_gray; global.key_config[? "up_col"] = c_gray; global.key_config[? "down_col"] = c_gray;
        break;
        case "bind":
            global.key_config[? "up"] = "speed up";
            global.key_config[? "down"] = "speed down";
            global.key_config[? "left"] = "prev scene";
            global.key_config[? "right"] = "next scene";
            global.key_config[? "backspace"] = "Quit binding";
            if(cur_level == ds_list_size(global.chara_img[? img_key])-1){
                global.key_config[? "left_col"] = c_gray;
                global.key_config[? "right_col"] = c_gray;
            }
        break;
        case "binded":
            global.key_config[? "up_col"] = c_gray; global.key_config[? "down_col"] = c_gray; global.key_config[? "left_col"] = c_gray; global.key_config[? "right_col"] = c_gray;
        break;

    }
}
