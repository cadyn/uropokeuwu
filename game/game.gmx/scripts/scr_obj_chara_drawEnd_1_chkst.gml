chara_name = chara_data[? "chara_name"];
st = chara_data[? "status"];
cond = chara_data[? "condition"];
cur_level = real(chara_data[? "img_level"]);
img_key = "";
if(string_letters(st) == "bind" || string_letters(st) == "binded" ){

    opp_name = chara_data[? "opp_name"];
    img_key = chara_name+"_"+st+"_"+opp_name;

} else{
    if(ds_map_exists(global.chara_img,chara_name+"_"+st+"_"+cond)){
        img_key = chara_name+"_"+st+"_"+cond;
    } else if(ds_map_exists(global.chara_img,chara_name+"_"+st)){
        img_key = chara_name+"_"+st;
    } else if(ds_map_exists(global.chara_img,st)){
        img_key = st;
    }
}
