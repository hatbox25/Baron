$(document).ready(function(){
    $('#summary').addClass('main');
    $('#processing').addClass('container');
    $('#tunggu').addClass('hide');
    
    showBarber();
    
    var img_barber = "";
    var img_style  = "";
    
    var sel_barber = "";
    var sel_b_id   = "";
    
    var sel_style  = "";
    var sel_s_id   = "";
    
    var sel_addres = "";
    var sel_phone  = "";
    var sel_date   = "";
    var sel_time   = "";
    
    var now = new Date();
    
    $("#src_barber").keyup(function(){
        showList('src_barber','ul_barber','sp_barber',null);
    });
    
    $("#toStyle").click(function(){
        if(!sel_barber){
            alert("You must select barber !");
        }else{
            $("#s_barber").addClass("hide");
            $("#s_style").removeClass("hide");
            showStyle(sel_b_id);
            
            //POPUP STYLE & SELECT STYLE
            $z = 0;
            $('.pilih').click(function(){
                if($z%2 == 0){
                    $s_name = $(this).find('.sp_style').html(); //ambil nama style
                    $s_img = $(this).find('img').attr('src'); //ambil src img style
                    $s_price = $(this).find('.price').html() ; //ambil price style
                    $s_id = $(this).find('.hiden').html();//ambil id style

                    
                    
                    $('#pop').empty();
                    $('#pop').append('<img src="'+$s_img+'"><span class="toggle"><strong>X</strong></span><br/><h3 id="pop_st_name">'+$s_name+'</h3><span id="pop_st_price">'+$s_price+'</span><br/><br/><div class="row" id="baris"><div class="col" id="hapus">CANCEL</div><div class="col" id="edit">SELECT</div></div>');

                    $('#pop').toggle( "slow", function() {
                    // Animation complete.
                    });

                    $('.toggle').click(function(){
                        $('#pop').toggle( "slow", function() {
                                // Animation complete.
                        });
                    });
                    $('#edit').click(function(){
                        $('#pop').toggle( "slow", function() {
                                // Animation complete.
                        });
                        sel_s_id    = $s_id;
                        img_style   = $s_img;
                        sel_style   = $s_name;
                        showHasil('#st_hasil','.pil_style:checked','Style Selected : ');
                    });

                    $('#hapus').click(function(){
                        $('#pop').toggle( "slow", function() {
                                // Animation complete.
                        });
                    });
                }
                $z++;
            });
        }
    });  

    $("#src_style").keyup(function(){
        showList('src_style','ul_style','sp_style','price');
    });
    
    $("#toBarber").click(function(){
        $("#s_barber").removeClass("hide");
        $("#s_style").addClass("hide");
    });
    
    $("#toForm").click(function(){        
        if(!sel_style){
            alert("You must select style !");
        }else{
            $("#s_style").addClass("hide");
            $("#s_isian").removeClass("hide");
        }
    });
    
    $("#sudah").click(function(){
        if($("#address").val().length > 0 && $("#phone").val().length > 0){
            sel_addres = $("#address").val();
            sel_phone  = $("#phone").val();
            
            var today = new Date();
            sel_date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            sel_time = today.getHours() + ":" + today.getMinutes();
            
            $("#isi").addClass("hide");
            $("#summary").removeClass("hide");
            
            $('.barber').html('<div class="disp"><h4>Barber</h4><img src="'+img_barber+'"><br/><span>'+sel_barber+'</span></div>');
            $('.style').html('<div class="disp"><h4>Style</h4><img src="'+img_style+'"><br/><span>'+sel_style+'</span></div>');
            var o_name = sessionStorage.getItem('userName');
            $('.sum_text').html('<tr><td class="ts">Name</td><td>:</td><td class="td">'+o_name+'</td></tr><tr><td class="ts">Address</td><td>:</td><td class="td">'+sel_addres+'</td></tr><tr><td class="ts">Phone</td><td>:</td><td class="td">'+sel_phone+'</td></tr><tr><td class="ts">Order date</td><td>:</td><td class="td">'+sel_date+'</td></tr><tr><td class="ts">Order time</td><td>:</td><td class="td">'+sel_time+'</td></tr>');
            
        }else{
            alert("Address and Phone Number is required !");
        }
    });
    
    $("#proses").click(function(){
        $("#pesan").addClass("hide");
        $("#processing").removeClass("hide");
        
        $('#timer').append(05 + ":" + 00);
        startTimer();
    });
    
    $('#batal').click(function(){
        alert("bisa");
    });
    
    /*SELECTING BARBER & POPUP*/
    var $y=0;
    $('.pilihan').click(function(){
        if($y%2 == 0){
            $b_id = $(this).find('.hiden').html();
            $b_img = $(this).find('img').attr('src');
            $b_name = $(this).find('.sp_barber').html();
            $b_about = $(this).find('p').html();
            
            
            
            $('#pop').empty();
            $('#pop').append('<img src="'+$b_img+'"><span class="toggle"><strong>X</strong></span><br/><h3 id="pop_st_name">'+$b_name+'</h3><span id="pop_st_price">'+$b_about+'</span><br/><br/><div class="row" id="baris"><div class="col" id="hapus">CANCEL</div><div class="col" id="edit">SELECT</div></div>');
            
            $('#pop').toggle( "slow", function() {
            // Animation complete.
            });
            
            $('.toggle').click(function(){
                $('#pop').toggle( "slow", function() {
                        // Animation complete.
                });
            });
            $('#edit').click(function(){
                $('#pop').toggle( "slow", function() {
                        // Animation complete.
                });
                sel_barber  = $b_name;
                img_barber  = $b_img;
                sel_b_id    = $b_id;
                
                showHasil('#b_hasil','.pil_barber:checked','Barber Selected : ');
            });
            
            $('#hapus').click(function(){
                $('#pop').toggle( "slow", function() {
                        // Animation complete.
                });
            });
        }
        $y++;
    });
    
    
});

function showHasil(x,y,z){
    $(x).empty();
    var selected = $(y);
    $(x).append(z+selected.val());
    
}

function showList(x,y,z,op){
    var input, filter, ul, li, a, b, i;
    input = document.getElementById(x);
    filter = input.value.toUpperCase();
    ul = document.getElementById(y);
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        if(op == null){
            a = li[i].getElementsByClassName(z)[0];
            if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            } 
        }else{
            a = li[i].getElementsByClassName(z)[0];
            b = li[i].getElementsByClassName(op)[0];
            if (a.innerHTML.toUpperCase().indexOf(filter) > -1 || b.innerHTML.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            } 
        }
        
    }
}

function startTimer() {
  var presentTime = document.getElementById('timer').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond((timeArray[1] - 1));
  if(s==59){m=m-1}
  //if(m<0){alert('timer completed')}
  
  document.getElementById('timer').innerHTML =
    m + ":" + s;
    if(m == 0 && s == 0){
        $('#batal').prop('disabled',false);
    }else{
        setTimeout(startTimer, 1000);      
    }
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  return sec;
}

function showBarber(){
    $.ajax({
        type:'POST',
        url:'./php/get-barber.php',
        data:{
            "get":1
        },
        async:false,
        success:function(a){
            if(a == 0){
                $('#ul_barber').empty();
                $('#ul_barber').append('<span>There\'s no barber available </span>')
            }
            else{
                var result = $.parseJSON(a);
                $('#ul_barber').empty();
                $.each(result,function(i,field){
                    $('#ul_barber').append('<label class="pilihan"><li><input type="radio" name="fb" value="'+field.username+'" class="pil_barber"><img src="upload/'+field.barber_img+'" width="20%"><span class="sp_barber">'+field.username+'</span><span class="hiden">'+field.id_barber+'</span><p class="hiden">'+field.barber_about+'</p></li></label>');
                });
            }
        }
    });
}

function showStyle(id_barber){
    $.ajax({
        type:'POST',
        url:'./php/style-barber.php',
        data:{
            "get":1,
            "id":id_barber
        },
        async:false,
        success:function(a){
            if(a == 0){
                $('#ul_style').empty();
                $('#ul_style').append('<span>There\'s no style available </span>')
            }
            else{
                var result = $.parseJSON(a);
                $('#ul_style').empty();
                $.each(result,function(i,field){
                    $('#ul_style').append('<label class="pilih"><li><input type="radio" name="fs" value="'+field.sty_name+'" class="pil_style"/><img src="upload/style/'+id_barber+'/'+field.sty_img+'" width="20%"><span class="sp_style">'+field.sty_name+'</span><span class="price">Rp '+ field.sty_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")+'</span><span class="hiden">'+field.id_style+'</span></li></label>');
                    
                    /* onclick="showHasil(\'#st_hasil\',\'.pil_style:checked\',\'Style Selected : \')"*/
                });
            }
        }
    });
}