///Reaction words Scene2

opp_words[? "s2_p1"] = ds_queue_create(); //非接触時 ~ 接触時
player_words[? "s2_p1"] = ds_queue_create(); //非接触時 ~ 接触時
ds_queue_enqueue(opp_words[? "s2_p1"],"主も儂の中に入れなければ我慢できなくなったかえ？",50,"[spr]kyuubi_stand_call,0","またここに主は種付けしたそうじゃな♪","よしよし、たっぷり搾り取ってくれようぞ♪",10);
ds_queue_enqueue(player_words[? "s2_p1"],40,"……（もじもじ）",10);

opp_words[? "s2_p2"] = ds_queue_create(); //進行中1
player_words[? "s2_p2"] = ds_queue_create(); //進行中1
ds_queue_enqueue(opp_words[? "s2_p2"],"[spr]kyuubi_bind_siro,0",0.1,"儂のは全てを飲み干すぞ？","主のせいで中がすっかりとろとろじゃぞ？","ほれほれ、とても柔らかいじゃろう……","主の子種なぞ丸呑みじゃ♪");
ds_queue_enqueue(player_words[? "s2_p2"],60,"あっ……あったかい…………///","きもちいいよぉ…………","腰から下が……とけちゃいそう…………","ふにゃぁ…………///");

select_mes[? "s2_0"] = "搾られる";
select_mes[? "s2_1"] = "諦める";

opp_words[? "s2_p3"] = ds_queue_create();
player_words[? "s2_p3"] = ds_queue_create();
player_words[? "s2_p3_0"] = ds_queue_create(); //選択肢 0/1 YES/NO
player_words[? "s2_p3_1"] = ds_queue_create(); //選択肢 0/1 YES/NO
ds_queue_enqueue(opp_words[? "s2_p3"],"ふふ、元気良く脈動しておるの#また節操もなく出してしまうのかの？");
ds_queue_enqueue(player_words[? "s2_p3"],400,"…………"); //Time out
ds_queue_enqueue(player_words[? "s2_p3_0"],10,"お願い……します……っ#出させてぇ…………///",50);
ds_queue_enqueue(player_words[? "s2_p3_1"],10,"うぅ…………　もう…………",50);


opp_words[? "s2_p4_0"] = ds_queue_create(); //進行中2_YES
player_words[? "s2_p4_0"] = ds_queue_create(); //進行中2_YES
ds_queue_enqueue(opp_words[? "s2_p4_0"],"[spr]kyuubi_bind_siro,0","しようのない子じゃのう♪","望み通り出させてやろう♪","ほれほれ、出して良いぞ？良いぞ？",0.2);
ds_queue_enqueue(player_words[? "s2_p4_0"],30,"ぐにぐに……しぼられ……てっ…………","すご……い……っ","あっ……出ちゃ…………っ");
opp_words[? "s2_p5_0"] = ds_queue_create(); //フィニッシュ_YES
player_words[? "s2_p5_0"] = ds_queue_create(); //フィニッシュ_YES
ds_queue_enqueue(opp_words[? "s2_p5_0"],"[spr]kyuubi_bind_siro,0","主の子種なぞ丸呑みじゃ♪","[spr]kyuubi_bind_siro,2","[player]ああぁっ♥♥♥",0.15,0.15);
ds_queue_enqueue(opp_words[? "s2_p5_0"],"[spr]kyuubi_bind_siro,1",100,"[spr]kyuubi_bind_siro,2","[player]とまら…………#とまらないよぅ…………っ♥",0.20,0.20);
ds_queue_enqueue(opp_words[? "s2_p5_0"],"[spr]kyuubi_bind_siro,1",70,"[spr]kyuubi_bind_siro,2","[player]んっ……あは…………っ♥",0.10,0.10,0);
ds_queue_enqueue(player_words[? "s2_p5_0"],10,"あっ　あっ　♥");

opp_words[? "s2_p4_1"] = ds_queue_create(); //進行中2_NO
player_words[? "s2_p4_1"] = ds_queue_create(); //進行中2_NO
ds_queue_enqueue(opp_words[? "s2_p4_1"],"[spr]kyuubi_bind_siro,1","つまらぬのう、もうばててしまったのかえ？",0.15,"せめて一搾りくらいさせるのじゃ",0.2);
ds_queue_enqueue(player_words[? "s2_p4_1"],30,"あう……#あ……っ","やめ……　てえ……っ","壊れちゃっ…………");
opp_words[? "s2_p5_1"] = ds_queue_create(); //フィニッシュ_NO
player_words[? "s2_p5_1"] = ds_queue_create(); //フィニッシュ_NO
ds_queue_enqueue(opp_words[? "s2_p5_1"],"[spr]kyuubi_bind_siro,2",0.2,0.15,0.1,"♪♪♪",0.05,"[spr]kyuubi_bind_siro,3",0);
ds_queue_enqueue(opp_words[? "s2_p5_1"],50,"温いじゃろう？#呑み込まれていく気分はどうじゃ？",50,"[player]えっ　やっ　そんな…………！！",150,"[player]んむぅ…………っ",50,"ふふふ　ほれ、どんどん入ってしまうぞ？");
ds_queue_enqueue(opp_words[? "s2_p5_1"],"[spr]kyuubi_bind_siro,4",0.05);
ds_queue_enqueue(opp_words[? "s2_p5_1"],"ほれほれ、とても柔らかいじゃろう……","たっぷり儂の中を味わうが良い♪","気持ち良過ぎて出たくないかえ♪","このまま儂の仔にしてしまうかえ……","ふむ？中で温いものを感じたのう#もっと出しもいいのじゃぞ♪","[spr]kyuubi_bind_siro,5",0.02,"っふぅっ………♥");
ds_queue_enqueue(player_words[? "s2_p5_1"],"あぁ……#やぁ……っ");

opp_words[? "s2_p6_0"] = ds_queue_create(); //事後
player_words[? "s2_p6_0"] = ds_queue_create(); //事後
ds_queue_enqueue(opp_words[? "s2_p6_0"],"[spr]kyuubi_stand,0",0.1,"まだまだ儂は満足しておらぬぞ♪",50);
ds_queue_enqueue(player_words[? "s2_p6_0"],"[spr]siro_down,0","はぁっ………♥#はぁっ………………♥♥",0.05);

//NOの場合、アンバ転生ルート
opp_words[? "s2_p6_1"] = ds_queue_create(); //事後
player_words[? "s2_p6_1"] = ds_queue_create(); //事後
ds_queue_enqueue(opp_words[? "s2_p6_1"],"[spr]kyuubi_stand,0",0.1,"んふふ　気分はどうじゃ？","これからお主は一生わしのものじゃぞ？",50,"[scene]3","[phase]2");
ds_queue_enqueue(player_words[? "s2_p6_1"],"[spr]siro_down_rv,0","はぁっ………♥#はぁっ………………♥♥",0.05,"…………くぅん♥");



