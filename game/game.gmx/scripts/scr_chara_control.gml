///basic movement
if(visible == 1){

    if( chara_data[? "movement"] == vk_left){
        x -= real(chara_data[? "move_x"]);
        image_xscale = -real(string_replace(string(image_xscale),"-",""));
        if(rand_flag == 1){
            chara_data[? "status"] = "walk";
        }
        if(rand_flag == 0){
            chara_data[? "status"] = "fly";
        }
    }
    if(chara_data[? "movement"] == vk_right){
        x += real(chara_data[? "move_x"]);
        image_xscale = real(string_replace(string(image_xscale),"-",""));
        if(rand_flag == 1){
            chara_data[? "status"] = "walk";
        }
        if(rand_flag == 0){
            chara_data[? "status"] = "fly";
        }
    }
    
    if(chara_data[? "movement"] == vk_up){
        vspeed = -8;
        chara_data[? "status"] = "jump";
        chara_data[? "movement"] = 0;
        calorie += 10;
    }
    
}

