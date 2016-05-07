///Reaction words Scene1

opp_words[? "s1_p1"] = ds_queue_create(); //非接触時 ~ 接触時
player_words[? "s1_p1"] = ds_queue_create(); //非接触時 ~ 接触時
ds_queue_enqueue(opp_words[? "s1_p1"],"おやおや#どこからか迷い込んだようだな","もっと近くへ来たら#良いことをしてあげよう",
"怖がる必要はない#さあ、おいで","さっさとこっちへ来い！","では始めようか……",10);
ds_queue_enqueue(player_words[? "s1_p1"],40,"あ、あの……何を……",10);

opp_words[? "s1_p2"] = ds_queue_create(); //進行中1
player_words[? "s1_p2"] = ds_queue_create(); //進行中1
ds_queue_enqueue(opp_words[? "s1_p2"],"[spr]ren_bind_siro,0",0.1,"もっと喘いでもいいのだぞ？","どうした？#気持ち良いのだろう？");
ds_queue_enqueue(player_words[? "s1_p2"],60,"あっ……やだ……","なに……これ…ッ…","んっ……あっ///");

select_mes[? "s1_0"] = "従う";
select_mes[? "s1_1"] = "抵抗する";

opp_words[? "s1_p3"] = ds_queue_create();
player_words[? "s1_p3"] = ds_queue_create();
player_words[? "s1_p3_0"] = ds_queue_create(); //選択肢 0/1 YES/NO
player_words[? "s1_p3_1"] = ds_queue_create(); //選択肢 0/1 YES/NO
ds_queue_enqueue(opp_words[? "s1_p3"],"このまま中に出してしまおうか……！");
ds_queue_enqueue(player_words[? "s1_p3"],400,"…………"); //Time out
ds_queue_enqueue(player_words[? "s1_p3_0"],10,"…………#くだ……さい……",50);
ds_queue_enqueue(player_words[? "s1_p3_1"],10,"い、いやだ……#はなして……っ",50);


opp_words[? "s1_p4_0"] = ds_queue_create(); //進行中2_YES
player_words[? "s1_p4_0"] = ds_queue_create(); //進行中2_YES
ds_queue_enqueue(opp_words[? "s1_p4_0"],"[spr]ren_bind_siro,1","よしよし#素直な良い子だ……",400,"さあ、ゆくぞ#たっぷり味わうといい",0.2);
ds_queue_enqueue(player_words[? "s1_p4_0"],30,"あっ……#あっ…………","すご……い……っ",0.15,"や…………っ");
opp_words[? "s1_p5_0"] = ds_queue_create(); //フィニッシュ_YES
player_words[? "s1_p5_0"] = ds_queue_create(); //フィニッシュ_YES
ds_queue_enqueue(opp_words[? "s1_p5_0"],"[spr]ren_bind_siro,2",0.15,0.1,0.05,"ぐるぅう……!!!");
ds_queue_enqueue(player_words[? "s1_p5_0"],"～～～～っ");

opp_words[? "s1_p4_1"] = ds_queue_create(); //進行中2_NO
player_words[? "s1_p4_1"] = ds_queue_create(); //進行中2_NO
ds_queue_enqueue(opp_words[? "s1_p4_1"],"[spr]ren_bind_siro,1","ダメだ、逃しはしない……","嫌がってる癖に艶やかな声だな？","これが欲しいのだろう？#くれてやろう！",0.2);
ds_queue_enqueue(player_words[? "s1_p4_1"],30,"そん、な……#やぁ……っ","おねがっ…………#はなし…………っ",0.15,"壊れちゃっ…………");
opp_words[? "s1_p5_1"] = ds_queue_create(); //フィニッシュ_NO
player_words[? "s1_p5_1"] = ds_queue_create(); //フィニッシュ_NO
ds_queue_enqueue(opp_words[? "s1_p5_1"],"[spr]ren_bind_siro,2",0.15,0.1,0.05,"ぐるぅう……!!!");
ds_queue_enqueue(player_words[? "s1_p5_1"],"あ……っ！やっ　やらぁっ…………！！");

opp_words[? "s1_p6_0"] = ds_queue_create(); //事後
player_words[? "s1_p6_0"] = ds_queue_create(); //事後
ds_queue_enqueue(opp_words[? "s1_p6_0"],"[spr]ren_stand,0",0.1,"ふふ、実に好かったぞ","私のを味わいたければ#また来るがいい",50);
ds_queue_enqueue(player_words[? "s1_p6_0"],"[spr]siro_down,0","はぁっ………#はぁっ………………");

opp_words[? "s1_p6_1"] = ds_queue_create(); //事後
player_words[? "s1_p6_1"] = ds_queue_create(); //事後
ds_queue_enqueue(opp_words[? "s1_p6_1"],"[spr]ren_stand,0",0.1,"ふふ、実に好かったぞ","私のを味わいたければ#また来るがいい",50);
ds_queue_enqueue(player_words[? "s1_p6_1"],"[spr]siro_down,0","…………#うぅ…………");



