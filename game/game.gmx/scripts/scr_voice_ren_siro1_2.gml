///Reaction words Scene2

opp_words[? "s2_p1"] = ds_queue_create(); //非接触時 ~ 接触時
player_words[? "s2_p1"] = ds_queue_create(); //非接触時 ~ 接触時
ds_queue_enqueue(opp_words[? "s2_p1"],"まだいたのか……#もう一度して欲しいようだな？","どうした…#我慢できないのだろう？","ならば……#少し激しくしてやろう！",10);
ds_queue_enqueue(player_words[? "s2_p1"],40,"…………#お、お願いします…………",10);

opp_words[? "s2_p2"] = ds_queue_create(); //進行中1
player_words[? "s2_p2"] = ds_queue_create(); //進行中1
ds_queue_enqueue(opp_words[? "s2_p2"],"[spr]ren_bind_siro,0",0.1,"ふふ……#お前も我慢できないんだろう？","もっと善がらせてやろう","まだまだ可愛がってやるぞ？","どろどろに蕩けそうか？");
ds_queue_enqueue(player_words[? "s2_p2"],60,"おかしく……なっ……ちゃう///","うぅ…… もっ……もっと///","っ…… おっ…大きい……っ///","とけちゃう……っ");

select_mes[? "s2_0"] = "注がれる";
select_mes[? "s2_1"] = "抵抗する";

opp_words[? "s2_p3"] = ds_queue_create();
player_words[? "s2_p3"] = ds_queue_create();
player_words[? "s2_p3_0"] = ds_queue_create(); //選択肢 0/1 YES/NO
player_words[? "s2_p3_1"] = ds_queue_create(); //選択肢 0/1 YES/NO
ds_queue_enqueue(opp_words[? "s2_p3"],"ほらほら、また中に出してしまうぞ？");
ds_queue_enqueue(player_words[? "s2_p3"],400,"…………"); //Time out
ds_queue_enqueue(player_words[? "s2_p3_0"],10,"欲しい……です…………",50);
ds_queue_enqueue(player_words[? "s2_p3_1"],10,"や、やっぱり、やだぁ……",50);


opp_words[? "s2_p4_0"] = ds_queue_create(); //進行中2_YES
player_words[? "s2_p4_0"] = ds_queue_create(); //進行中2_YES
ds_queue_enqueue(opp_words[? "s2_p4_0"],"[spr]ren_bind_siro,1","よしよし#素直な良い子だ……",400,"さあ、ゆくぞ#たっぷり味わうといい",0.2);
ds_queue_enqueue(player_words[? "s2_p4_0"],30,"あっ……#あっ…………","すご……い……っ",0.15,"や…………っ");
opp_words[? "s2_p5_0"] = ds_queue_create(); //フィニッシュ_YES
player_words[? "s2_p5_0"] = ds_queue_create(); //フィニッシュ_YES
ds_queue_enqueue(opp_words[? "s2_p5_0"],"[spr]ren_bind_siro,2",0.15,0.1,0.05,0.15,0.1,0.05,"ぐるぅう……!!!");
ds_queue_enqueue(player_words[? "s2_p5_0"],"っぅ……熱い……","や……もう…………っ","いっぱい…………");

opp_words[? "s2_p4_1"] = ds_queue_create(); //進行中2_NO
player_words[? "s2_p4_1"] = ds_queue_create(); //進行中2_NO
ds_queue_enqueue(opp_words[? "s2_p4_1"],"[spr]ren_bind_siro,1","逃すわけがなかろう？");
ds_queue_enqueue(player_words[? "s2_p4_1"],30,"やあぁ……抜いてっ……",0.2,"あっ　あっ　あっ",0.23,"も、もうっ…………っ",0.26);
opp_words[? "s2_p5_1"] = ds_queue_create(); //フィニッシュ_NO
player_words[? "s2_p5_1"] = ds_queue_create(); //フィニッシュ_NO
ds_queue_enqueue(opp_words[? "s2_p5_1"],"[spr]ren_bind_siro,2",0.15,0.1,0.05,0.15,0.2,0.25,0.1,0.06,0.04,"ぐるぅう……!!!");
ds_queue_enqueue(player_words[? "s2_p5_1"],"っぅ……熱い……","や……もう…………っ","いっぱい…………");

opp_words[? "s2_p6_0"] = ds_queue_create(); //事後
player_words[? "s2_p6_0"] = ds_queue_create(); //事後
ds_queue_enqueue(opp_words[? "s2_p6_0"],"[spr]ren_stand,0",0.1,"ふう、好かったぞ","また来ても良いぞ",50);
ds_queue_enqueue(player_words[? "s2_p6_0"],"[spr]siro_down,0","お腹……の中…… 熱い……っ……");

opp_words[? "s2_p6_1"] = ds_queue_create(); //事後
player_words[? "s2_p6_1"] = ds_queue_create(); //事後
ds_queue_enqueue(opp_words[? "s2_p6_1"],"[spr]ren_stand,0",0.1,"ふう、好かったぞ","また来ても良いぞ",50);
ds_queue_enqueue(player_words[? "s2_p6_1"],"[spr]siro_down,0","やぁ…………#お腹…………熱いよぅ…………");



