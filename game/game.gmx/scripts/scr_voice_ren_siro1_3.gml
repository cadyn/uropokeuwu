///Reaction words Scene3

opp_words[? "s3_p1"] = ds_queue_create(); //非接触時 ~ 接触時
player_words[? "s3_p1"] = ds_queue_create(); //非接触時 ~ 接触時
ds_queue_enqueue(opp_words[? "s3_p1"],"どうした？　私に惚れてしまったか？（笑","ほら、来い……優しくしてやるぞ？","よし、いい子だ。可愛がってやる……",10);
ds_queue_enqueue(player_words[? "s3_p1"],40,"///#あ、ありがとう、ございます……♥",10);

opp_words[? "s3_p2"] = ds_queue_create(); //進行中1
player_words[? "s3_p2"] = ds_queue_create(); //進行中1
ds_queue_enqueue(opp_words[? "s3_p2"],"[spr]ren_bind_siro,0",0.1,"どうだ？　私のが気持ち良いのだろう？","可愛い声で喘いでくれるんだろう？","まだまだご褒美はやらんぞ？","良く見れば、可愛い顔をしているぞ？");
ds_queue_enqueue(player_words[? "s3_p2"],60,"あぁっ///　声がっ……出ちゃうぅ///","お、奥に来てる……っぅ///","うう……早くぅ…………っ","そ……んな事…………っ");

select_mes[? "s3_0"] = "ねだる";
select_mes[? "s3_1"] = "意地を張る";

opp_words[? "s3_p3"] = ds_queue_create();
player_words[? "s3_p3"] = ds_queue_create();
player_words[? "s3_p3_0"] = ds_queue_create(); //選択肢 0/1 YES/NO
player_words[? "s3_p3_1"] = ds_queue_create(); //選択肢 0/1 YES/NO
ds_queue_enqueue(opp_words[? "s3_p3"],"そろそろトドメが欲しそうだな？");
ds_queue_enqueue(player_words[? "s3_p3"],400,"…………"); //Time out
ds_queue_enqueue(player_words[? "s3_p3_0"],10,"早く……欲し……っ///",50);
ds_queue_enqueue(player_words[? "s3_p3_1"],10,"やだ……変に……なる///",50);


opp_words[? "s3_p4_0"] = ds_queue_create(); //進行中2_YES
player_words[? "s3_p4_0"] = ds_queue_create(); //進行中2_YES
ds_queue_enqueue(opp_words[? "s3_p4_0"],"[spr]ren_bind_siro,1","素直でよろしい","ほおら、ご褒美だ！",0.2);
ds_queue_enqueue(player_words[? "s3_p4_0"],30,"あっ……#あっ…………",0.15,"あ…………♥#はっ…………っ♥♥♥");
opp_words[? "s3_p5_0"] = ds_queue_create(); //フィニッシュ_YES
player_words[? "s3_p5_0"] = ds_queue_create(); //フィニッシュ_YES
ds_queue_enqueue(opp_words[? "s3_p5_0"],"[spr]ren_bind_siro,2",0.15,0.1,0.05,"ぐるぅう……!!!");
ds_queue_enqueue(player_words[? "s3_p5_0"],"あぁ……んっ♥♥");

opp_words[? "s3_p4_1"] = ds_queue_create(); //進行中2_NO
player_words[? "s3_p4_1"] = ds_queue_create(); //進行中2_NO
ds_queue_enqueue(opp_words[? "s3_p4_1"],"[spr]ren_bind_siro,1","言っている事と身体の反応は違うようだが？","そら、これが欲しいのだろう……!",0.2);
ds_queue_enqueue(player_words[? "s3_p4_1"],30,"あっ……#あっ…………",0.15,"欲しい…………ですっ#下さい…………っ");
opp_words[? "s3_p5_1"] = ds_queue_create(); //フィニッシュ_NO
player_words[? "s3_p5_1"] = ds_queue_create(); //フィニッシュ_NO
ds_queue_enqueue(opp_words[? "s3_p5_1"],"[spr]ren_bind_siro,2",0.15,0.1,0.05,"ぐるぅう……!!!");
ds_queue_enqueue(player_words[? "s3_p5_1"],"やぁぁ……");

opp_words[? "s3_p6_0"] = ds_queue_create(); //事後
player_words[? "s3_p6_0"] = ds_queue_create(); //事後
ds_queue_enqueue(opp_words[? "s3_p6_0"],"[spr]ren_stand,0",0.1,"ふうう、今回も好かったぞ","まだまだ続けたいのではないか？ ふふふ",50);
ds_queue_enqueue(player_words[? "s3_p6_0"],"[spr]siro_down,0","お腹……いっぱい……♥");

opp_words[? "s3_p6_1"] = ds_queue_create(); //事後
player_words[? "s3_p6_1"] = ds_queue_create(); //事後
ds_queue_enqueue(opp_words[? "s3_p6_1"],"[spr]ren_stand,0",0.1,"ふうう、今回も好かったぞ","まだまだ続けたいのではないか？ ふふふ",50);
ds_queue_enqueue(player_words[? "s3_p6_1"],"[spr]siro_down,0","注がれ……ちゃっ……た///");



