;(function($) {
  maxLimit_h = 128;
  maxLimit_w = 6400;
  $.fn.thumbnail = function(){
    //Thumbnail display
    $(document).on('change','.thumb_update',function(){
      
        var selfInput = $(this);
        var motion = $(this).parent('form').attr('data-motion');
        var frame = $(this).parent('form').find('input[name=framenum]').val();
        var file = $(this).prop('files')[0],
        fileRdr = new FileReader(),
        selfFile = $(this).parents('td').find('.list_thumb');
        selfFile.html('');
        selfImg = selfFile.find('.imgView');
        
        if(!this.files.length){
            if(0 < selfImg.size()){
                selfImg.remove();
                return;
            }
        } else {

            if(file.type.match('image.png')){
                $(this).attr({'data-filename':file.name,'data-updated':true});
                if(!(0 < selfImg.size())){
                    selfFile.html('<img alt="" class="imgView">');

                }
                var prevElm = selfFile.find('.imgView');
                fileRdr.onload = function() {
                 
                    prevElm.attr('src', fileRdr.result);
                    prevElm.wrap('<div class="aniframe" data-filename="'+file.name+'" data-frame="'+frame+'" data-totalwidth="'+prevElm.width()+'" data-width="'+prevElm.width()/frame+'" data-height="'+prevElm.height()+'" style="width:'+prevElm.width()/frame+'px;height:'+prevElm.height()+'px;background-image:url(\''+fileRdr.result+'\');">');
                    selfFile.find('.aniframe').each(function(){
                      $(this).frameAnimation({
                      setWidth: prevElm.width()/frame,
                      frameSpeed: 200,
                      maxFrame: frame,
                      loop: true
                      });
                    })
                    selfFile.css({'width':prevElm.width()/frame});
                    var err_flag = false;
                    if($('#'+motion).find('.frame_num').val() == ""){
                      err_flag = true;
                      $('#'+motion).find('.chk_frame').html('<font color="red"><b>Input the number of frames in animation.</b></font>');
                    } else{
                      $('#'+motion).find('.chk_frame').html('');
                    }
                    if(!selfInput.hasClass('bind')){
                      if(prevElm.height() > maxLimit_h){
                        err_flag = true;
                        var err_type = "over_h";
                      }
                      if(prevElm.width() > maxLimit_w){
                        err_flag = true;
                        var err_type = "over_w";
                      }
                      
                      if($('.chk_name_flag').val() == 0){
                        err_flag = true;
                        if($('.chara_name').val() == ""){
                          $('.chk_name').html('<font color="red"><b>Input the character name</b></font>');
                        }
                      }

                    }

                    if(err_flag == true){
                      switch(err_type){
                        case "over_h":
                          selfFile.html('<b>Image\'s height must be under '+maxLimit_h+'px</b>');
                        break;
                        case "over_w":
                          selfFile.html('<b>Image\'s width must be under '+maxLimit_w+'px</b>');
                        break;
                      }
                      selfFile.prev('form').find('input[type=reset]').click();
                    }
                    prevElm.remove();
                    

                }
                fileRdr.readAsDataURL(file);
            } else {
                if(0 < selfImg.size()){
                    selfImg.remove();
                    return;
                }
            }
        }

    });
  }

  $.fn.animation = function(){
    var img = new Image();
    var imgurl = $(this).css("background-image").replace('url("','');
    var aniframe = $(this);
    imgurl = imgurl.slice(0,-2);
    img.src = imgurl;
    img.onload = function(){         
      var width  = img.width;  // 幅
      var height = img.height; // 高さ

      var frame = aniframe.attr('data-frame');
      aniframe.attr({'data-totalwidth':width});
      aniframe.attr({'data-width':width/frame});
      aniframe.attr({'data-height':height});
      aniframe.css({'width':width/frame,'height':height});
      
      aniframe.frameAnimation({
        setWidth: width/frame,
        frameSpeed: 200,
        maxFrame: frame,
        loop: true
      });
    }
  }

  $.fn.interact_delete = function(){
  //Delete each interaction Data
    $(this).click(function(){             
        var charaname = $(this).parents('tr').attr('data-charaname');
        var opp_chara = $(this).attr('data-oppchara');
        var owner = username;                
        
        // 「OK」時の処理開始 ＋ 確認ダイアログの表示
        if(window.confirm('Are you sure to delete this interaction?')){
          $.ajax({
              url: '/interact_delete',
              type: 'post',
              data: {charaname:charaname,opp_chara:opp_chara,owner:owner,username:username,password:password},
              success: function(msg){
                $('.list_bind_'+opp_chara).remove();
                $('#mylist_field').find('.update_mse').html(msg);
              }
          });
        } else{
          //Canceled
        }         
    });
  }

  $.fn.chara_delete = function(){
  //Character Delete function
    $(this).click(function(){             
        //Delete character data
        var charaname = $(this).parents('tr').attr('data-charaname');
        var owner = username;
        // 「OK」時の処理開始 ＋ 確認ダイアログの表示
        if(window.confirm('Are you sure to delete this Character?')){
          $.ajax({
            url: '/chara_delete',
            type: 'post',
            data: {charaname:charaname,owner:owner,username:username,password:password},
            success: function(msg){
              $('#mylist_'+charaname).remove();
              var currentEntry = $('.entried_num').html();
              currentEntry -= 1;
              $('.entried_num').html(currentEntry);
              $('#mylist_field').find('.update_mse').html(msg);
              
            }
          });
        } else{
          //Canceled
        }                    
                   
    });
  }


  $.fn.image_upload = function(){
  //Image Upload function
    $(document).on('change','.image_upload',function(){          
        var charaname = $(this).parents('tr').attr('data-charaname');
        var owner = $(this).parents('tr').attr('data-owner');
        var motion = $(this).parent('form').attr('data-motion');
        var framenum = $(this).attr('data-frame');
        console.log(framenum);
      if($(this)[0].files[0] != null){
        var fd = new FormData($(this).parent('form')[0]);
        fd.append("username",username);
        fd.append("password",password);
        fd.append("charaname", charaname);
        fd.append("owner", owner);
        fd.append("motion", motion);

          $.ajax({
            url: '/image_upload',
            type: 'post',
            data: fd,
            async:false,
            processData: false,
            contentType: false,
            success: function(msg){
              $(this).parents('td').find('.aniframe').html(msg);
            }
          });
        }    
                    
    });
  }

  $.fn.image_delete = function(){
  //Image Delete function
    $(this).click(function(){             
        //Delete image file/remove data set from the data file 
        var charaname = $(this).parents('tr').attr('data-charaname');
        var owner = $(this).parents('tr').attr('data-owner');
        var motion = $(this).attr('data-motion');
        if(window.confirm('Are you sure to delete this Image?')){
          $.ajax({
            url: '/image_delete',
            type: 'post',
            data: {
              charaname:charaname,
              owner:owner,
              motion:motion,
              username:username,
              password:password
            },
            success: function(msg){
              $(this).parents('td').find('.aniframe').remove();
            }
          });
        } else{
          //Canceled
        }                    
                   
    });
  }

})(jQuery);