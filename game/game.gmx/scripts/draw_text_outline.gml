//Extreemly simple code to make your text have an outline
//example:
//draw_text_outline(text,x,y) And thats it!
zoom = global.zoom;

draw_set_color(text_outline_color)
draw_text_transformed(argument1+(1*zoom),argument2+(1*zoom),argument0,zoom,zoom,0)
draw_text_transformed(argument1-(1*zoom),argument2-(1*zoom),argument0,zoom,zoom,0)
draw_text_transformed(argument1,argument2+(1*zoom),argument0,zoom,zoom,0)
draw_text_transformed(argument1+(1*zoom),argument2,argument0,zoom,zoom,0)
draw_text_transformed(argument1,argument2-(1*zoom),argument0,zoom,zoom,0)
draw_text_transformed(argument1-(1*zoom),argument2,argument0,zoom,zoom,0)
draw_text_transformed(argument1-(1*zoom),argument2+(1*zoom),argument0,zoom,zoom,0)
draw_text_transformed(argument1+(1*zoom),argument2-(1*zoom),argument0,zoom,zoom,0)
draw_set_color(text_color)
draw_text_transformed(argument1,argument2,argument0,zoom,zoom,0)
