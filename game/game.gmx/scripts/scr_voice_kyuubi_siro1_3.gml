///Reaction words Scene3


opp_words[? "s3_p1"] = ds_queue_create(); //非接触時 ~ 接触時
player_words[? "s3_p1"] = ds_queue_create(); //非接触時 ~ 接触時
ds_queue_enqueue(opp_words[? "s3_p1"],"[spr]kyuubi_bind_siro,6",0.1);
ds_queue_enqueue(player_words[? "s3_p1"],40,"んぅ………");


opp_words[? "s3_p2"] = ds_queue_create(); //進行中1
player_words[? "s3_p2"] = ds_queue_create(); //進行中1
ds_queue_enqueue(opp_words[? "s3_p2"],"[spr]kyuubi_bind_siro,6",0.1,"儂のは全てを飲み干すぞ？","主のせいで中がすっかりとろとろじゃぞ？","ほれほれ、とても柔らかいじゃろう……","主の子種なぞ丸呑みじゃ♪");
ds_queue_enqueue(player_words[? "s3_p2"],60,"あっ……あったかい…………///","きもちいいよぉ…………","腰から下が……とけちゃいそう…………","ふにゃぁ…………///");

/*
　「んふふ……ずっと儂のを味わえるのじゃぞ♪」
「3日ぐらいは搾り続けるぞぉ？」
「儂が満足するまで出し続けるのじゃよ♪」
「もっととろとろになるのじゃ♪」
「主の出した精でぬるぬるじゃろぅ？」
「儂の中ならいくらでも出せるじゃろう？」
「儂のを味わったらもう儂なしでは生きていけぬぞぉ♪」
「そうじゃ♪　そうやって儂の中に出し続けるのじゃ♪」
*/
