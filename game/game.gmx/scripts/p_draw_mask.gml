if(surface_exists(global.main_surface_mask)){
    surface_set_target(global.main_surface_mask);
    draw_sprite(s_mask,0,x,y);
    surface_reset_target();
}
