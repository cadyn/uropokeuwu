
//Calorie
    if(chara_data[? "status"] == "walk"){
        calorie += 5; //歩きモーション終わったらカロリー消費
    }
    //if(chara_data[? "status"] == "jump"){
        //calorie += 10;
        //in scr_chara_control
    //}
    
    
//Eat
    if(chara_data[? "status"] == "eat"){
        chara_data[? "status"] = "stand";
        fat_rate += 1;
        
        if(fat_rate == 4){
            var cd = chara_data[? "condition"];
            if(string_letters(cd) == "fat"){
                var fat_level = string_digits(cd);
            } else{
                var fat_level = 0;
            }
            if(ds_map_exists(global.chara_img,global.player_chara_name+"_stand_fat"+string(fat_level+1))){
                chara_data[? "condition"] = "fat"+string(fat_level+1);
                fat_rate = 0;
                calorie = 10;
                if(image_speed > 0.05){
                    image_speed -= 0.05;
                }
            }
        }
        
    }    
