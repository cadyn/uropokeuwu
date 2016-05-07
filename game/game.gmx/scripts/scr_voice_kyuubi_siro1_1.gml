///Reaction words Scene1

opp_words[? "s1_p1"] = ds_queue_create(); //非接触時 ~ 接触時
player_words[? "s1_p1"] = ds_queue_create(); //非接触時 ~ 接触時
ds_queue_enqueue(opp_words[? "s1_p1"],100,"ふふ、活きの良い雄が来おったの♪",100,"[spr]kyuubi_stand_call,0","搾り取られたいのじゃろ？#早う来るのじゃ","これが儂の名器じゃぞぉ……？","骨抜きにしてやるかの、覚悟じゃぞ♪",10);
ds_queue_enqueue(player_words[? "s1_p1"],40,"……（お、大きな狐さん……）",10);

opp_words[? "s1_p2"] = ds_queue_create(); //進行中1
player_words[? "s1_p2"] = ds_queue_create(); //進行中1
ds_queue_enqueue(opp_words[? "s1_p2"],"[spr]kyuubi_bind_siro,0",0.1,"ほっほ…もう抜けんじゃろ♪","ふふ…主はいつ屈服するかのぅ？","儂の中は主のを歓迎しておるようじゃの♪","儂の中が暖かくて今にも出しそうな顔をしておるぞぉ？");
ds_queue_enqueue(player_words[? "s1_p2"],60,"何これっ…良すぎ……てっ……","あっ……うぅ……で、出ちゃう///","や、やだっ……動かないでっ///","暖かい///");

select_mes[? "s1_0"] = "もがく";
select_mes[? "s1_1"] = "諦める";

opp_words[? "s1_p3"] = ds_queue_create();
player_words[? "s1_p3"] = ds_queue_create();
player_words[? "s1_p3_0"] = ds_queue_create(); //選択肢 0/1 YES/NO
player_words[? "s1_p3_1"] = ds_queue_create(); //選択肢 0/1 YES/NO
ds_queue_enqueue(opp_words[? "s1_p3"],"主のは儂の中で出したいようじゃぞ？#いいのかえ？");
ds_queue_enqueue(player_words[? "s1_p3"],400,"…………"); //Time out
ds_queue_enqueue(player_words[? "s1_p3_0"],10,"や、やっぱりだめ…っ　こんなの……っ",50);
ds_queue_enqueue(player_words[? "s1_p3_1"],10,"うぅ…………　もう…………",50);


opp_words[? "s1_p4_0"] = ds_queue_create(); //進行中2_YES
player_words[? "s1_p4_0"] = ds_queue_create(); //進行中2_YES
ds_queue_enqueue(opp_words[? "s1_p4_0"],"[spr]kyuubi_bind_siro,1","逃がさぬ♪　干涸びるまで搾取じゃ♪",400,"ではそろそろ子種を頂くとしようかの？",0.2);
ds_queue_enqueue(player_words[? "s1_p4_0"],30,"凄く……っ……絡みついて……くる……っ///","すご……い……っ","や…………っ");
opp_words[? "s1_p5_0"] = ds_queue_create(); //フィニッシュ_YES
player_words[? "s1_p5_0"] = ds_queue_create(); //フィニッシュ_YES
ds_queue_enqueue(opp_words[? "s1_p5_0"],"[spr]kyuubi_bind_siro,2",0.15,0.15,0.20,0.20,0.25,0.25,"んふふふ♪#出ておる、出ておる♪");
ds_queue_enqueue(opp_words[? "s1_p5_0"],"[spr]kyuubi_bind_siro,1",0.25,0.25,0.25,0.25,0.25,"もっとじゃ、もっと出すのじゃ♪",10,"[spr]kyuubi_bind_siro,2",0.3,0.3,0.3,0.1,0);
ds_queue_enqueue(player_words[? "s1_p5_0"],"～～～～～～～～！！",200,"やっ　らぁ……… もう出な…………っ",50,"あっ　あっ　あ……っ……");

opp_words[? "s1_p4_1"] = ds_queue_create(); //進行中2_NO
player_words[? "s1_p4_1"] = ds_queue_create(); //進行中2_NO
ds_queue_enqueue(opp_words[? "s1_p4_1"],"[spr]kyuubi_bind_siro,1","つまらぬのう、もうばててしまったのかえ？",0.15,"せめて一搾りくらいさせるのじゃ",0.2);
ds_queue_enqueue(player_words[? "s1_p4_1"],30,"あう……#あ……っ","やめ……　てえ……っ","壊れちゃっ…………");
opp_words[? "s1_p5_1"] = ds_queue_create(); //フィニッシュ_NO
player_words[? "s1_p5_1"] = ds_queue_create(); //フィニッシュ_NO
ds_queue_enqueue(opp_words[? "s1_p5_1"],"[spr]kyuubi_bind_siro,2",0.2,0.15,0.1,"♪♪♪",0.05,"[spr]kyuubi_bind_siro,3",0);
ds_queue_enqueue(opp_words[? "s1_p5_1"],100,"温いじゃろう？#呑み込まれていく気分はどうじゃ？",50,"[player]えっ　やっ　そんな…………！！",150,"[player]んむぅ…………っ",50,"ふふふ　ほれ、どんどん入ってしまうぞ？",100);
ds_queue_enqueue(opp_words[? "s1_p5_1"],"[spr]kyuubi_bind_siro,4",0.05);
ds_queue_enqueue(opp_words[? "s1_p5_1"],"このまま儂の仔にしてしまうかえ……","[spr]kyuubi_bind_siro,5",0.02,0,"っふぅっ………♥");
ds_queue_enqueue(player_words[? "s1_p5_1"],"あぁ……#やぁ……っ");

opp_words[? "s1_p6_0"] = ds_queue_create(); //事後
player_words[? "s1_p6_0"] = ds_queue_create(); //事後
ds_queue_enqueue(opp_words[? "s1_p6_0"],"[spr]kyuubi_stand,0","すっかり儂の名器にご満悦じゃったな♪",0.1,50);
ds_queue_enqueue(player_words[? "s1_p6_0"],"[spr]siro_down,0","はぁっ………#はぁっ………………",0.05);

//NOの場合、アンバ転生ルート
opp_words[? "s1_p6_1"] = ds_queue_create(); //事後
player_words[? "s1_p6_1"] = ds_queue_create(); //事後
ds_queue_enqueue(opp_words[? "s1_p6_1"],"[spr]kyuubi_stand,0",0.1,"んふふ　気分はどうじゃ？","これからお主は一生わしのものじゃぞ？",50);
ds_queue_enqueue(player_words[? "s1_p6_1"],"[spr]siro_down,1","はぁっ………♥#はぁっ………………♥♥",0.2,"…………くぅん♥");


