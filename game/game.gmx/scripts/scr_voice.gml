if(ins_voice.alarm[0] == -1 && ins_voice.visible == false ){
    with(ins_voice){
        str = argument0;
        alarm[0] = 70;
        visible = true;
    }
 
} else if(ins_voice.alarm[0] == 0){
    with(ins_voice){
        visible = false;
    }
    chara_data[? "chatmes"] = "";
}
