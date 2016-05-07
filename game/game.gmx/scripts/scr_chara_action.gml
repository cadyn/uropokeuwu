
//bind,action motions
if(string_letters(room_get_name(room)) == "room"){
      
    if(chara_data[? "status"] == "atk_bind"){
        //when chasing for binding      
        if(image_xscale == 1 ){ move_x = 4; }
        if(image_xscale == -1 ){ move_x = -4; }
        x += move_x;
    }
      
}
