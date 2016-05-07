*This package was made by ouroporos ( http://ouroporos.xsrv.jp/urocos_archive/index.html )
*Feel free to scratch them


[composition]

[Game system side] 
index.js -- Node.js server for building the stable main server
server.js -- chat server for the game *not included here*

[character data files]
chara_prop_(gamename).json -- character privacy/owner/approval info file
chara_set_(gamename).json  -- character image info file  {charaname:{motion:{filename:[animation_frame_num]}}}
chara_interaction_(gamename).json -- interaction data file between characters 

[character entry system]
chara_edit.js -- main system file for character entry
chara_edit.ejs-|
admin_edit.ejs--- template files for character entry

chara_edit_auth -- connect to sql server of the forum (auth system)
*this PHP file is running on the other server*


[Image]

			[game servers side]      |     [character entry server side]    |   [outer server] 
Uropoke
	|--- server.js ----index.js ------------ chara_edit.js ----------//--------- chara_edit_auth.php [unabled]
Oricha                    |(only read)           | (can read/write)    [login auth]
			              ------------------------
			                         |
			               (character data files)
			                         |-- chara_properties
			                         |-- chara_images
			                         |-- chara_interactions