function __chat_input__(mes){
	$(".chat").show();
	$(".chat_field").focus();
	/*
      $.ajax({
        url: '/roomcnt',
        type: 'get',
        success: function(msg){
          alert(msg);
        }
      });
    */
}

function __chat_output__(mes){
	$(".chat").hide();
	//$(".chat_field").focus();
	/*
      $.ajax({
        url: '/roomcnt',
        type: 'get',
        success: function(msg){
          alert(msg);
        }
      });
    */
}

function disp(){

	// 入力ダイアログを表示 ＋ 入力内容を user に代入
	user = window.prompt("ユーザー名を入力してください", "");

	if(user != ""){
		return user;
	}
	if(user == ""){
		alert("Input your name");
		disp();
	}

}
