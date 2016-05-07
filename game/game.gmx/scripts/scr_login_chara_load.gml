///Load APPROVED characters which belongs to the user

var chara_name = ds_map_find_first(chara_prop_all);

for(var i = 0; i < ds_map_size(chara_prop_all); i++){
    var approval = ds_map_find_value(chara_prop_all[? chara_name],"approval");
    var owner = ds_map_find_value(chara_prop_all[? chara_name],"owner");
    if(owner == global.username && approval == 0){ //Approved : 0 
        //Shift chara list down
        for(var i = array_length_1d(global.chara_name)-1; i >= 0; i--){
            global.chara_name[i+1] = global.chara_name[i];
        }
        //Insert the new chara into the top of the list
        global.chara_name[0] = chara_name;
    }
    chara_name = ds_map_find_next(chara_prop_all,chara_name);
}
