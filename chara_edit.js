var url = require('url'),
http = require('http'),
express = require("express"),
ejs = require("ejs"),
bodyParser = require('body-parser'),
fs = require('fs-extra'),
merge = require('merge'),
multer = require( 'multer' );
 

var express = require('express');
var app = express();
port = 52999;
app.use(express.static(__dirname + "/game/public/edit/"));
app.use('/admin',express.static(__dirname + "/game/public/admin/"));
app.use(bodyParser.urlencoded({extended: true}));


function getGamename(req){
	var host = req.hostname;
	switch(host){
		case "127.0.0.1": var gamename = "oricha"; break;
		case "localhost": var gamename = "uropoke"; break;
		case "oricha.ouroporos.net": var gamename = "oricha"; break;
		case "lJJHigginsl.github.io": var gamename = "uropoke"; break;
	}
	return gamename;
}
function getCharaData(req){
	var gamename = getGamename(req);

	var propFilePath = './chara_data/chara_prop_'+gamename+'.json';
	var propData = fs.readFileSync(propFilePath);
	propData = JSON.parse(propData);

	var imgFilePath = './chara_data/chara_set_'+gamename+'.json';
	var imgDirPath = 'http://'+req.hostname+'/img/'+gamename+'/chara/';
	var imgLocalPath = './game/public/img/'+gamename+'/chara/';
	var imgData = fs.readFileSync(imgFilePath);
	imgData = JSON.parse(imgData);

	var interactFilePath = './chara_data/chara_interaction_'+gamename+'.json';
	var interactData = fs.readFileSync(interactFilePath);
	interactData = JSON.parse(interactData);

	return {
		propData:propData,
		propFilePath:propFilePath,
		imgDirPath:imgDirPath,
		imgData:imgData,
		imgLocalPath:imgLocalPath,
		imgFilePath:imgFilePath,
		interactData:interactData,
		interactFilePath:interactFilePath
	};
}



function removeImage(req,fileData){
  	var charaname = req.body.charaname;
  	var motion = req.body.motion;
	for(var filename in fileData.imgData[charaname][motion]){
		fs.unlinkSync(fileData.imgLocalPath+filename);
	}
	delete fileData.imgData[charaname][motion];
}

var returnHTML = function(req,res,login){
	var username = req.body['username'];
	var password = req.body['password'];
	var gamename = getGamename(req);


	var group_type = login["group"];

	var mylistData = get_list_data(req,res,"mylist",login);
	var mylistHTML = make_list_HTML(req,res,mylistData,login);

	var apprlistHTML = "";
	if(group_type == "global_mod"){
		var apprlistData = get_list_data(req,res,"approval",login);
		apprlistHTML += make_list_HTML(req,res,apprlistData,login);
	}

	var interactlistData = get_list_data(req,res,"interaction_approval",login);
	var interactlistHTML = make_list_HTML(req,res,interactlistData,login);
	
	var charaNameList = get_chara_list(req,res,login);

	var charaEditEJS = fs.readFileSync('./ejs/chara_edit.ejs', 'utf8');	
    var charaEditHTML = ejs.render(charaEditEJS, {
		user: username,
		pass: password,
		group_type: group_type,
		mylistHTML: mylistHTML,
		apprlistHTML: apprlistHTML,
		interactlistHTML: interactlistHTML,
		charaNameList: charaNameList
    });
    res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(charaEditHTML);
    res.end();

}

function login_auth(req,res,callback){
	var username = req.body['username'];
	var password = req.body['password'];
	var GETreq = http.get('http://ouroporos.xsrv.jp/urocos_archive/php/phpBB3/chara_edit_auth.php?username='+username+'&password='+password, function(GETres) {
	  // output response body
	  GETres.setEncoding('utf8');
	  GETres.on('data', function(result) {
		var login = result.replace("callback(","");
		login = JSON.parse(login.slice(0,login.length-1));
		if(login['flag'] == "CORRECT"){
			if(login['group'] == "global_mod"){
				login['limit'] = 99;
			} else{
				login['limit'] = 3;
			}
			callback(req,res,login);			
		} else{
			console.log(username+" login err");
			res.send('Login failed');
		}
	  });
	});	
}

app.post('/user_auth',function(req,res){
	login_auth(req,res,returnHTML);
});


//----- Check the existence of character ----- //
app.post('/chara_exist_chk',function(req,res){
	var charaname = req.body['charaname'];
	var gamename = getGamename(req);
	var filepath = './chara_data/chara_prop_'+gamename+'.json';
	var charaData = fs.readFileSync(filepath);
	charaData = JSON.parse(charaData);
	var flag = 0;
	for(var name in charaData){
		if(name.toUpperCase() == charaname.toUpperCase()){
			flag = 1;
			break;
		}
	}
	if(flag == 1){
		res.send("exist");
	} else{
		res.send("no exist");
	}
	
});


//----- Entry Character ----//
//file upload 
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
		var gamename = getGamename(req);
        cb(null, './game/public/img/'+gamename+'/chara/')
    }
});
var upload = multer({ storage: storage });

var chara_entry = function(req,res,login){
  	var gamename = getGamename(req);
  	var username = req.body.username;

  //add character data into the data file(privacy/password)
	var filepath1 = './chara_data/chara_prop_'+gamename+'.json';
	var charaData = fs.readFileSync(filepath1);
	charaData = JSON.parse(charaData);
	var entry_num = 0;
	for(var charaname in charaData){
		if(charaData[charaname]['owner'] == username){
			entry_num += 1;
		}
	}
	if(entry_num >= login['limit']){
		res.send('Entry limit');
		return false;
	}

  	var username = req.body.username;
  	var charaname = req.body.charaname;
  	var motiontype = req.body.motiontype;

  	

  	var frame_num = req.body.frame_num;
  	var privacy = req.body.privacy;
  	var imgHeight = req.body.imgHeight;
  	var imgWidth = req.body.imgWidth;
  	if(imgHeight > 128){
  		res.send('Over Height');
  		return false;
  	}
  	if(imgWidth > 6400){
  		res.send('Over Width');
  		return false;
  	}
  	if(login['group'] == "global_mod"){
  		var approval = 0;//approved
  	} else{
  		var approval = 2; //wait for approval
  	}

  //add image file to library
	var filename = charaname+"_"+motiontype;
	filename = filename.replace(/[\'\"\.']/,"")+".png";
  //make image file
  	fs.rename(req.files[0].destination+req.files[0].filename,req.files[0].destination+filename);  

  //Set data to library
	var filepath2 = './chara_data/chara_set_'+gamename+'.json';
	var tmp = {};
	tmp[charaname] = {};
	tmp[charaname][motiontype] = {};
	tmp[charaname][motiontype][filename] = [parseInt(frame_num)];

	var file2 = fs.readFileSync(filepath2);
	file2 = JSON.parse(file2);
	var imgData = merge.recursive(true, file2,tmp);
	imgDataStr = JSON.stringify(imgData);
	fs.writeFileSync(filepath2, imgDataStr);



	//Prevent from double entry
	var entry_flag = -1;
	for(var name in charaData){
		if(name == charaname){
			entry_flag = 0;
		}
	}			
	if(entry_flag == -1){
	    charaData[charaname] = {privacy:privacy,owner:username,approval:approval};
	    charaDataStr = JSON.stringify(charaData);
	    fs.writeFileSync(filepath1, charaDataStr);

	    res.send(JSON.stringify(charaData[charaname]));
	} else{
		res.send("");
	}

}


app.post( '/chara_add', upload.array('select_files'),
  function( req, res ){  	
  	login_auth(req,res,chara_entry);
});

//----- Get character list -----//
function get_chara_list(req,res,login){
	var gamename = getGamename(req);
	var filepath = './chara_data/chara_prop_'+gamename+'.json';
	var charaData = fs.readFileSync(filepath);
	charaData = JSON.parse(charaData);

	var filepath2 = './chara_data/chara_set_'+gamename+'.json';
	var imgData = fs.readFileSync(filepath2);
	imgData = JSON.parse(imgData);

	var nameList = {};
	for(var charaname in charaData){
		if(charaData[charaname]['privacy'] == 2){
			//Except for Hidden
			continue;
		} 

		if(charaData[charaname]['approval'] == 0 || charaData[charaname]['approval'] == 9){
			for(var filename in imgData[charaname]['stand']){
				nameList[charaname] = imgData[charaname]['stand'][filename][0];
			}
		}
	}
	return nameList;
}

//----- Get character list for owner -----//
function get_list_data(req,res,listType,login){
	var gamename = getGamename(req);
	var username = req.body.username;
	var filepath1 = './chara_data/chara_prop_'+gamename+'.json';
	var charaData = fs.readFileSync(filepath1);
	charaData = JSON.parse(charaData);
	var listData = {};

	var filepath2 = './chara_data/chara_set_'+gamename+'.json';
	var imgdirpath = './game/public/img/'+gamename+'/chara/';
	var imgData = fs.readFileSync(filepath2);
	imgData = JSON.parse(imgData);

	if(listType == "mylist" || listType == "approval"){
		for(var charaname in charaData){
			if(listType == "mylist"){
				if(charaData[charaname]['owner'] != username || charaData[charaname]['approval'] == "9"){ //Skip Default
					continue;
				}
			}
			if(listType == "approval"){
				if(charaData[charaname]['approval'] != "2" ){ //Skip except for waiting for approval
					continue;
				}

			}

			listData[charaname] = charaData[charaname];
			for(var motiontype in imgData[charaname]){
				var tmp = {};
				for(var filename in imgData[charaname][motiontype]){
					tmp[filename] = imgData[charaname][motiontype][filename][0];
				}
				listData[charaname][motiontype] = tmp;
			}
			
		}
	}


	if(listType == "interaction_approval"){
		var filepath3 = './chara_data/chara_interaction_'+gamename+'.json';
		var interactData = fs.readFileSync(filepath3);
		interactData = JSON.parse(interactData);
		for(var charaname in interactData){
			for(var opp_name in interactData[charaname]['opponent']){
				var owner = charaData[opp_name]['owner'];
				if(owner == username && interactData[charaname]['opponent'][opp_name] == "2"){
					listData[charaname] = charaData[charaname];
					listData[charaname]['approval'] = interactData[charaname]['opponent'][opp_name];
					listData[charaname]['opp_chara'] = opp_name;
					motiontype = "bind_"+opp_name;
					
					var tmp = {};
					for(var filename in imgData[charaname][motiontype]){
						tmp[filename] = imgData[charaname][motiontype][filename][0];
					}
					

					listData[charaname][motiontype] = tmp;
					
				} else{
					continue;
				}
			}			
		}
	}

	listData['listType'] = listType;
	listData = JSON.stringify(listData);
	return listData;

}



function make_list_HTML(req,res,listData,login){
	var gamename = getGamename(req);
	listData = JSON.parse(listData);
    var sel_privacy = '<select name="privacy"><option value="0">Private</option><option value="1">Public</option><option value="2">Hidden</option></select>';
    var opt_privacy = ["Private","Public","Hidden"];
    var opt_approval = ["Approved","Disapproved","Waiting for approval"];

	var charaInteractionPath = './chara_data/chara_interaction_'+gamename+'.json';
	var interactData = fs.readFileSync(charaInteractionPath);
	interactData = JSON.parse(interactData);

	var imgdirpath = './game/public/img/'+gamename+'/chara/';
	var charaSetPath = './chara_data/chara_set_'+gamename+'.json';
	var imgData = fs.readFileSync(charaSetPath);
	imgData = JSON.parse(imgData);


	var imgDirPath = req.protocol+'://'+req.hostname+'/img/';             
    var listType = listData['listType'];
	delete listData['listType'];
	
	
	var tr = '';
	var listnum = 0;
	
  for(var charaname in listData){
	  	listnum += 1;
	    var owner = listData[charaname]['owner'];
	    var approval = listData[charaname]['approval'];
	    var privacy = listData[charaname]['privacy'];
	    delete listData[charaname]['owner'];
	    delete listData[charaname]['privacy'];
	    delete listData[charaname]['approval'];

	      tr += '<tr id="'+listType+'_'+charaname+'" class="chara_list_tr" data-charaname="'+charaname+'" data-owner="'+owner+'" valign="top">';

	    if(listType == "mylist"){
	      tr += '<td class="list_charaname">'+charaname+'<br /><button class="delete_button" data-name="character">delete</button></td>';
	      tr += '<td class="list_owner">'+owner+'</td>';
	      tr += '<td class="list_privacy">';
	      var sel_privacy = '<select name="privacy">';
	      for(var i = 0; i < 3; i++){
	      	sel_privacy += '<option name="'+opt_privacy[i]+'" value="'+i+'"';
	      	if( i == privacy){
	      		sel_privacy += " selected";
	      	}
	      	sel_privacy +='>'+opt_privacy[i]+'</option>';
	      }
	      sel_privacy += "</select>";
	      tr += sel_privacy + '</td>';
	      tr += '<td class="list_approval">'+opt_approval[approval]+'</td>';
	      
	    }
	    if(listType == "approval" || listType == "interaction_approval"){
	      if(listType == "approval"){
  	        tr += '<td class="list_charaname">'+charaname+'</td>';  
		    tr += '<td class="list_owner">'+owner+'</td>';
   	        tr += '<td class="list_privacy">'+opt_privacy[privacy]+'</td>';
		      tr += '<td class="list_approval">';
		      var sel_approval = '<select name="'+listType+'">';
		      for(var i = 0; i < 3; i++){
		      	sel_approval += '<option name="'+opt_approval[i]+'" value="'+i+'"';
		      	if( i == approval){
		      		sel_approval += " selected";
		       	}
			   	sel_approval +='>'+opt_approval[i]+'</option>';
		      }
		      sel_approval += "</select>";
		      tr += sel_approval + '</td>';
	      }
	      if(listType == "interaction_approval"){
	      	var filename = Object.keys(imgData[charaname]['stand'])[0];
			var imgfilepath = imgDirPath+gamename+'/chara/'+filename;
			var frame = imgData[charaname]['stand'][filename];
	    	tr += '<td class="list_charaname"><p class="p_charaname">'+charaname+'</p>';

		    tr += '<div class="aniframe" data-width="" data-height="" data-frame="'+frame+'" style="background-image:url('+imgfilepath+')"></div></td>';
	        tr += '<td class="list_owner">'+owner+'</td>';

	  	    var opp_chara = listData[charaname]['opp_chara'];
		    delete listData[charaname]['opp_chara'];
	      	filename = Object.keys(imgData[opp_chara]['stand'])[0];
			imgfilepath = imgDirPath+gamename+'/chara/'+filename;
			frame = imgData[opp_chara]['stand'][filename];

	    	tr += '<td class="list_oppchara"><p class="p_charaname">'+opp_chara+'</p>';
		    tr += '<div class="aniframe" data-width="" data-height="" data-frame="'+frame+'" style="background-image:url('+imgfilepath+')"></div></td>';

	      }

    }


    for(var motiontype in listData[charaname]){
      var num = 0;
      tr += '<td valign="top" class="list_'+motiontype+'">';
      
      if(listType == "mylist" && motiontype.match(/^bind_/g)){
      	var opp_name = motiontype.replace("bind_","");
      	var bind_appr = interactData[charaname]['opponent'][opp_name];
      	tr += '<p class="motion_name">'+motiontype+' <button class="delete_button" data-name="interact" data-oppchara="'+opp_name+'">delete</button></p>';
      	tr += '';
      	tr += '<p class="approve_stat">'+opt_approval[bind_appr]+'</p>';

      } else{
      	tr += '<p class="motion_name">'+motiontype+'</p>';
      }
	    if(listType == "interaction_approval"){
	    	  approval = 2;
		      var sel_approval = '<select name="'+listType+'" class="list_approval">';
		      for(var i = 0; i < 3; i++){
		      	sel_approval += '<option name="'+opt_approval[i]+'" value="'+i+'"';
		      	if( i == approval){
		      		sel_approval += " selected";
		       	}
			   	sel_approval +='>'+opt_approval[i]+'</option>';
		      }
		      tr += sel_approval+'</select>';
	    }
      tr += '<div class="row">';
      for(var filename in listData[charaname][motiontype]){
      	tr += '<div class="cell">';
		var imgfilepath = imgDirPath+gamename+'/chara/'+filename;
		var frame = listData[charaname][motiontype][filename];
        tr += '<div class="edit_cont" data-motion="'+motiontype+'" data-num="'+num+'">';

        tr += '<div class="aniframe" data-id="'+charaname+'_'+motiontype+'_'+num+'" data-width="" data-height="" data-frame="'+frame+'" style="background-image:url('+imgfilepath+')"></div>';
        num += 1;
        tr += '</div>';
        tr += '<p class="frame_info">'+frame+' frames</p>';
        tr += '</div>';
      }
      tr += '</div></td>';
    }
    tr += '</tr>';
             
  }
  var header = "";
  if(listType == "mylist"){
	  header = '<p><h2><b>Entried characters [ <span class="entried_num">'+listnum+'</span>/<span class="user_entry_limit">'+login['limit']+'</span> ]</b></h2></p></p>';  	
	  var td = '<td>CharaName</td><td>Owner</td><td>Privacy</td><td>Status</td>';
  }
  if(listType == "approval"){
  	header = '';
  	var td = '<td>CharaName</td><td>Owner</td><td>Privacy</td><td>Status</td>';
  }
  if(listType == "interaction_approval"){
  	header = '<p><b>*The list of motions which waits for your approval*</b></p>';
  	var td = '<td>CharaName</td><td>Owner</td><td>Opponent</td>';
  }

  tr = header+'<button class="update_button">update</button><span class="update_mes" style="margin:0px 5px;"></span><table id="'+listType+'_table" border="1" cellspacing="0" cellpadding="5" style="margin:20px;border:1px solid #000"><tr style="background-color:#ccc">'+td+'</tr>'+tr+'</table>';

  return tr;
}

//----- Edit Character -----//
var chara_data_edit = function(req,res,login){	
	var gamename = getGamename(req);
	var editData = req.body['data'];
	var listType = req.body['listType'];

	if(listType == "interaction_approval"){
		var charaInteractionPath = './chara_data/chara_interaction_'+gamename+'.json';
		var interactData = fs.readFileSync(charaInteractionPath);
		interactData = JSON.parse(interactData);
		for(var charaname in editData){ 
			for(var opp_chara in editData[charaname]){
				var approval = editData[charaname][opp_chara];
				interactData[charaname]['opponent'][opp_chara] = approval;			
			}		
		}
		
		var interactDataStr = JSON.stringify(interactData);
		fs.writeFileSync(charaInteractionPath, interactDataStr);	
	}
	if(listType == "mylist" || listType == "approval"){
		var charaSetPath = './chara_data/chara_set_'+gamename+'.json';
		var imgdirpath = './game/public/img/'+gamename+'/chara/';
		var imgData = fs.readFileSync(charaSetPath);
		imgData = JSON.parse(imgData);

		var charaPropPath = './chara_data/chara_prop_'+gamename+'.json';
		var charaData = fs.readFileSync(charaPropPath);
		charaData = JSON.parse(charaData);	
		for(var charaname in editData){	
			if(listType == "mylist"){
				charaData[charaname]['privacy'] = editData[charaname]['privacy'];
				delete editData[charaname]['privacy'];
			}
			if(listType == "approval"){
				charaData[charaname]['approval'] = editData[charaname]['approval'];
				delete editData[charaname]['approval'];
			}

		}
		var charaDataStr = JSON.stringify(charaData);
		fs.writeFileSync(charaPropPath, charaDataStr);

		var imgDataStr = JSON.stringify(imgData);
		fs.writeFileSync(charaSetPath, imgDataStr);	
	}
	res.send('updated');
}
app.post('/chara_edit', function (req, res) {
	login_auth(req,res,chara_data_edit);
});


//-----Entry Interaction motion-----//
var interact_entry = function(req,res,login){	
	var gamename = getGamename(req);
	var username = req.body.username;
	var charaname = req.body.charaname;
	var opp_chara = req.body.opp_chara;
	var img_num = req.body.img_num;
	var frame_num = req.body.frame_num;
	var motiontype = "bind_"+opp_chara;
  //add image file to library
	var filename = charaname+"_bind_"+opp_chara+"["+img_num+"]";
	filename = filename+".png";
  //make image file
  	fs.rename(req.files[0].destination+req.files[0].filename,req.files[0].destination+filename);  


  //Set data to library
	var filepath = './chara_data/chara_set_'+gamename+'.json';
	var tmp = {};
	tmp[charaname] = {};
	tmp[charaname][motiontype] = {};
	tmp[charaname][motiontype][filename] = [parseInt(frame_num)];

	var imgfile = fs.readFileSync(filepath);
	imgfile = JSON.parse(imgfile);
	var imgData = merge.recursive(true, imgfile,tmp);
	imgDataStr = JSON.stringify(imgData);
	fs.writeFileSync(filepath, imgDataStr);


	var filepath2 = './chara_data/chara_interaction_'+gamename+'.json';
    var interactData = fs.readFileSync(filepath2);
    interactData = JSON.parse(interactData);

	//Prevent from double entry
	var entry_flag = -1;
	for(var int_charaname in interactData){
		if(int_charaname == charaname){
			entry_flag = 0;
			break;
		}
	}
	if(entry_flag == 0){
		for(var opp_name in interactData[charaname]['opponent']){
			if(opp_name == opp_chara){
				entry_flag = 1;
				break;				
			}
		}
	}	
	if(entry_flag == -1){
		interactData[charaname] = {"owner":username,"opponent":{}};
		entry_flag = 0;
	}
	if(entry_flag == 0){
		interactData[charaname]['opponent'][opp_chara] = "2";	
	    interactDataStr = JSON.stringify(interactData);
	    fs.writeFileSync(filepath2, interactDataStr);
	    res.send("updated");
	} else{
		res.send("");
	}
	



}
app.post('/interact_entry', upload.array('select_files'), function (req, res) {
	login_auth(req,res,interact_entry);
});

var interact_delete = function(req,res,login){
	var gamename = getGamename(req);
	var charaname = req.body.charaname;
	var opp_chara = req.body.opp_chara;
	var owner = req.body.owner;

	var filepath1 = './chara_data/chara_prop_'+gamename+'.json';
	var charaData = fs.readFileSync(filepath1);
	charaData = JSON.parse(charaData);

	if(charaData[charaname]['owner'] == owner){

		//Update character image data file
		var filepath2 = './chara_data/chara_set_'+gamename+'.json';
		var imgdirpath = './game/public/img/'+gamename+'/chara/';
		var imgData = fs.readFileSync(filepath2);
		imgData = JSON.parse(imgData);
		for(var filename in imgData[charaname]['bind_'+opp_chara]){
		//delete image file of this character
			fs.unlinkSync(imgdirpath+filename);			
		}
		delete imgData[charaname]['bind_'+opp_chara];
		imgData = JSON.stringify(imgData);
		fs.writeFileSync(filepath2, imgData);


		//delete interact data of this character
		var filepath3 = './chara_data/chara_interaction_'+gamename+'.json';
		var interactData = fs.readFileSync(filepath3);
		interactData = JSON.parse(interactData);
		delete interactData[charaname]['opponent'][opp_chara];
		interactData = JSON.stringify(interactData);
		fs.writeFileSync(filepath3, interactData);

		res.send('<font color="green"><b>'+opp_chara+' interaction has been deleted</b></font>');
	} else{
		res.send('<font color="red"><b>Wrong permission</b></font>');
	}

}
app.post('/interact_delete', function (req, res) {
	login_auth(req,res,interact_delete);
});


var chara_list = function(req,res,login){
	var gamename = getGamename(req);
	var username = req.body.username;
	var charaname = req.body.charaname;

	var filepath1 = './chara_data/chara_prop_'+gamename+'.json';
	var charaData = fs.readFileSync(filepath1);
	charaData = JSON.parse(charaData);

	var filepath2 = './chara_data/chara_interaction_'+gamename+'.json';
	var interactData = fs.readFileSync(filepath2);
	interactData = JSON.parse(interactData);

	var entry_num = 0;

	if(interactData[charaname]['owner'] == username){
		for(var opp_name in interactData[charaname]['opponent']){
			entry_num += 1;
		}
	}

	if(entry_num >= login['limit']*3){
		res.send('Entry limit');
	} else{
		res.send('OK');		
	}
}

app.post('/chara_list', function (req, res) {
	login_auth(req,res,chara_list);
});


var image_upload = function(req,res,login){
//Upload each image
	var fileData = getCharaData(req);
  	var charaname = req.body.charaname;
  	var motion = req.body.motion;
  	var framenum = req.body.framenum;
	var filename = charaname+"_"+motion;
	filename = filename.replace(/[\'\"\.']/,"")+".png";
  //make image file
  	fs.rename(req.files[0].destination+req.files[0].filename,req.files[0].destination+filename);  
  	fileData.imgData[charaname][motion] = {};
  	fileData.imgData[charaname][motion][filename] = [framenum];
	fs.writeFileSync(fileData.imgFilePath, JSON.stringify(fileData.imgData));

	res.send(filename);
}
app.post('/image_upload', upload.array('select_files'), function (req, res){
	login_auth(req,res,image_upload);
});


var image_delete = function(req,res,login){
//Delete each image
	var path = 'http://'+req.hostname;
	var fileData = getCharaData(req);
	removeImage(req,fileData);

	fs.writeFileSync(fileData.imgFilePath,JSON.stringify(fileData.imgData));
	res.send("removed image");
}
app.post('/image_delete',function(req,res){
	login_auth(req,res,image_delete);
});


var chara_delete = function(req,res,login){
//-----Delete Character data-----//
	var gamename = getGamename(req);
	var charaname = req.body.charaname;
	var owner = req.body.owner;

	var filepath1 = './chara_data/chara_prop_'+gamename+'.json';
	var charaData = fs.readFileSync(filepath1);
	charaData = JSON.parse(charaData);
	if(charaData[charaname]['owner'] == owner || login['group'] == "global_mod"){

	    delete charaData[charaname]
	    charaData = JSON.stringify(charaData);
		fs.writeFileSync(filepath1, charaData);

		var filepath2 = './chara_data/chara_set_'+gamename+'.json';
		var imgdirpath = './game/public/img/'+gamename+'/chara/';
		var imgData = fs.readFileSync(filepath2);
		imgData = JSON.parse(imgData);
		for(var motiontype in imgData[charaname]){
			for(var filename in imgData[charaname][motiontype]){
			//delete image file of this character
				fs.unlinkSync(imgdirpath+filename);
			}
		}

		var filepath3 = './chara_data/chara_interaction_'+gamename+'.json';
		var interactData = fs.readFileSync(filepath3);
		interactData = JSON.parse(interactData);
		for(var name in interactData){
			for(var opp_name in interactData[name]['opponent']){
				if(opp_name == charaname){
					delete interactData[name]['opponent'][charaname];
					delete imgData[name]['bind_'+charaname];
				}
			}			
		}

		delete imgData[charaname];
		imgData = JSON.stringify(imgData);
		fs.writeFileSync(filepath2, imgData);

		delete interactData[charaname];
		interactData = JSON.stringify(interactData);
		fs.writeFileSync(filepath3, interactData);

		res.send('<font color="green"><b>'+charaname+' has been deleted</b></font>');

	} else{
		res.send('<font color="red"><b>Wrong permission</b></font>');
	}

}

app.post('/chara_delete',function(req,res){
	login_auth(req,res,chara_delete);
});



//-----Admin edit-----//
var admin_edit = function(req,res,login){
	var path = 'http://'+req.hostname;
	var username = req.body.username;
	var password = req.body.password;
	if(login['group'] == "global_mod"){

		var fileData = getCharaData(req);

		var cont = ['stand','walk','appeal'];
		var tableHTML = '<table border="1" cellspacing="0" cellpadding="0">';
		tableHTML += '<tr><td>Owner</td><td>CharaName</td><td>Stand</td><td>Walk</td><td>Appeal</td><td>Interact1</td><td>Interact2</td><td>Interact3</td><td>Interact4</td></tr>';

		for(var charaname in fileData.imgData){
			var owner = fileData.propData[charaname]['owner'];
			var num = 0;
		    tableHTML += '<tr id="mylist_'+charaname+'" class="chara_list_tr" data-charaname="'+charaname+'" data-owner="'+owner+'" valign="top">';
		    tableHTML += '<td class="list_owner">'+owner+'</td>';
		    tableHTML += '<td class="list_charaname">'+charaname+'<br /><button class="chara_delete">delete</button></td>';
		    for(var motion in fileData.imgData[charaname]){
				if(motion.match(/^bind_/)){
					for(var filename in fileData.imgData[charaname][motion]){
						var frame_num = fileData.imgData[charaname][motion][filename][0];
						tableHTML += '<td>';
						tableHTML += '<form class="upload_form" data-motion="'+motion+'" data-imgnum="0" enctype="multipart/form-data" method="post">';
						tableHTML += '<input type="file" class="thumb_update image_upload" data-filename="'+filename+'" name="select_files" accept="image/png">';
						tableHTML += '<input type="number" name="framenum" value="'+frame_num+'" step="1" min="1" max="100">';
						tableHTML += '</form>';
						tableHTML += '<button class="image_delete" data-motion="'+motion+'">delete</button>';
						tableHTML += '<div class="list_thumb">';
							tableHTML += '<div class="aniframe" data-frame="'+frame_num+'" style="background-image:url('+fileData.imgDirPath+filename+')"></div>';
							tableHTML += '</div>';
						tableHTML += '</div>';
						tableHTML += '</td>';
					}
				} else{
					if(motion != cont[num]){
						if(motion == "stand" || motion == "walk" ){
							tableHTML += '<td>';
							tableHTML += '<input type="file" class="thumb_update image_upload" name="select_files" accept="image/png">';
							tableHTML += '<div class="list_thumb"></div>';
							tableHTML += '</td>';
						}
					} else{
						for(var filename in fileData.imgData[charaname][motion]){
							var frame_num = fileData.imgData[charaname][motion][filename][0];
							tableHTML += '<td>';
							tableHTML += '<form class="upload_form" data-motion="'+motion+'" data-imgnum="0" enctype="multipart/form-data" method="post">';
							tableHTML += '<input type="file" class="thumb_update image_upload" data-filename="'+filename+'" name="select_files" accept="image/png">';
							tableHTML += '<input type="number" name="framenum" value="'+frame_num+'" step="1" min="1" max="100">';
							tableHTML += '</form>';
							tableHTML += '<button class="image_delete" data-motion="'+motion+'">delete</button>';
							tableHTML += '<div class="list_thumb">';
								tableHTML += '<div class="aniframe" data-frame="'+frame_num+'" style="background-image:url('+fileData.imgDirPath+filename+')"></div>';
								tableHTML += '</div>';
							tableHTML += '</div>';
							tableHTML += '</td>';				
						}
					}
					num += 1;
				}
			}

			
			tableHTML += '</tr>';
		}
		tableHTML += '</table>';
		var adminEditEJS = fs.readFileSync('./ejs/admin_edit.ejs', 'utf8');	
	    var adminEditHTML = ejs.render(adminEditEJS, {
			user: username,
			pass: password,
			tableHTML: tableHTML,
			path:path,
	    });

	    res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(adminEditHTML);
	    res.end();
	} else{
		res.send('Wrong permission');
	}
}
app.post('/admin/edit', function (req, res) {
	login_auth(req,res,admin_edit);
});

var server = http.createServer(app);
server.listen(port);
console.log("http server listening on %d", port)
