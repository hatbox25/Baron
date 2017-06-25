$(document).ready(function(){
    $('#summary').addClass('main');
    $('#processing').addClass('container');
    $('#tunggu').addClass('hide');
    $('#cukur').addClass('hide');
    $('#sedang_cukur').addClass('hide');
    $('#tolak').addClass('hide');
    $('#rating').addClass('hide');
    
    var img_barber = "";
    var img_style  = "";
    
    var sel_barber = "";
    var sel_b_id   = "";
    var sel_b_phone = "";
    
    var sel_style  = "";
    var sel_s_id   = "";
    
    var sel_addres = "";
    var sel_phone  = "";
    var sel_price  = "";
    
    var sel_date   = "";
    var sel_time   = "";
    var time = "";
    
    var now = new Date();
    
    
    var stIn = setInterval(function(){
        var xx = getOrder();
        if(xx == 'nothing' || xx == 'batal'){
            clearInterval(stIn);
            
        }else{
            $("#pesan").addClass("hide");
            $("#processing").removeClass("hide");
            if(xx == 'proses'){
                $('#tunggu').removeClass('hide');
            }else if(xx == 'terima'){
                $('#cukur').removeClass('hide');
                $('#tunggu').addClass('hide');
                $('#timer').html(00 + ":" + 10);
                startTimer();
                
                $.ajax({
                    type:'POST',
                    url:'./php/order-getbarber.php',
                    data:{
                        "cek":1,
                        "id":sessionStorage.getItem('barberID')
                    },
                    async:false,
                    success:function(a){
                        if(a == 0){
                        }else{
                            var result = $.parseJSON(a);
                            $('#b_coming').empty();
                            $.each(result,function(i,field){
                                $('#b_coming').html('<img src="upload/'+field.barber_img+'" width="50%" style="border:5px solid rgba(0,0,0,0.4); border-radius:5px;"><br/><br/><span><strong>'+field.username+'</strong></span><br/><br/><span>'+field.barber_phone+'</span>');
                            });
                        }              
                    }
                });
            }else if(xx == 'ditolak'){
                $('#tolak').removeClass('hide');
            }else if(xx == 'cukur'){
                $('#cukur').addClass('hide');
                $('#sedang_cukur').removeClass('hide');
                
                $.ajax({
                    type:'POST',
                    url:'./php/order-getbarber.php',
                    data:{
                        "cek":1,
                        "id":sessionStorage.getItem('barberID')
                    },
                    async:false,
                    success:function(a){
                        if(a == 0){
                        }else{
                            var result = $.parseJSON(a);
                            $('#b_pros').empty();
                            $.each(result,function(i,field){
                                $('#b_pros').html('<img src="upload/'+field.barber_img+'" width="50%" style="border:5px solid rgba(0,0,0,0.4); border-radius:5px;"><br/><br/><span><strong>'+field.username+'</strong></span><br/><br/><span>'+field.barber_phone+'</span>');
                            });
                        }              
                    }
                });
            }else if(xx == 'selesai'){
                $("#pesan").addClass("hide");
                $('#rating').removeClass('hide');
                clearInterval(stIn);
                
                var audio = new Audio('notif.mp3');
                audio.play();
                
                var score = 0;
                //AMBIL SCORE RATING
                $('#rating_ord .stars').click(function(){
                    score = $(this).val();
                });
                
                //UPDATE RATING
                $('#btn_rate').click(function(){
                    $.ajax({
                        type:'POST',
                        url:'./php/order-setrating.php',
                        data:{
                            "set":1,
                            "id":sessionStorage.getItem('orderID'),
                            "rate":score    
                        },
                        async:false,
                        success:function(a){
                            if(a == 0){

                            }else{
                                alert("Thank you for using Baron service");
                                document.location='order.html';
                            }
                        }
                    });
                });
            }
        }
        console.log(xx);
    },1000);
    
    showBarber();
    
    
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
                        sel_price   = $s_price
                        
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
            
            time = sel_date + " " + sel_time;
            
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
        //ADD ORDER + SET AVB BARBER 0
        $.ajax({
            type:'POST',
            url:'./php/order-process.php',
            data:{
                "pro":1,
                "idu":sessionStorage.getItem('userId'),
                "idb":sel_b_id,
                "ids":sel_s_id,
                "addr":sel_addres,
                "phone":sel_phone,
                "price":sel_price,
                "time":time
            },
            async:false,
            success:function(a){
                if(a == 0){
                    
                }
                else{
                    if(a == 'Barber is currently unavailable'){
                        alert(a);
                    }else{
                        alert("Your order is being process");
                        sessionStorage.setItem('orderID',a);
                        $('#tunggu').removeClass('hide');
                    }
                }
            }
        });
        
        var count =  0;
        
        var interval = setInterval(function(){
            var x = cekOrder();
            console.log(x);
            
            if(x == 'ditolak'){
                clearInterval(interval);
                $('#tunggu').addClass('hide');
                $('#tolak').removeClass('hide');
                
                if(count < 2){
                    count++;
                    var audio = new Audio('fail.mp3');
                    audio.play();
                }
                
                setTimeout(function(){
                    document.location='order.html';
                },10000)
            }else if(x == 'terima'){
                $('#tunggu').addClass('hide');
                $('#cukur').removeClass('hide');
                $('#timer').html(00 + ":" + 10);
                startTimer();
                
                $('#b_coming').empty();
                $('#b_coming').html('<img src="'+img_barber+'" width="50%" style="border:5px solid rgba(0,0,0,0.4); border-radius:5px;"><br/><br/><span><strong>'+sel_barber+'</strong></span><br/><br/><span>'+sel_b_phone+'</span>');
            }else if(x == 'cukur'){
                $('#cukur').addClass('hide');
                $('#sedang_cukur').removeClass('hide');
                
                $('#b_pros').empty();
                $('#b_pros').html('<img src="'+img_barber+'" width="50%" style="border:5px solid rgba(0,0,0,0.4); border-radius:5px;"><br/><br/><span><strong>'+sel_barber+'</strong></span><br/><br/><span>'+sel_b_phone+'</span>');
            }else if(x == 'proses'){
                $('#tunggu').removeClass('hide');
            }else if(x == 'selesai'){            
                document.location='order.html';
            }
        },1000);
        
        $('#timer').append(05 + ":" + 00);
        startTimer();
    });
    
    $('#batal').click(function(){
        if(confirm("Are you sure want to cancel this order")){
            $.ajax({
                type:'POST',
                url:'./php/user-batal.php',
                data:{
                    "acpt":1,
                    "id":sessionStorage.getItem('orderID')
                },
                async:false,
                success:function(a){
                    document.location='order.html';
                }
            });
        }
    });
    
    /*SELECTING BARBER & POPUP*/
    var $y=0;
    $('.pilihan').click(function(){
        if($y%2 == 0){
            $b_id = $(this).find('.hiden').html();
            $b_img = $(this).find('img').attr('src');
            $b_name = $(this).find('.sp_barber').html();
            $b_about = $(this).find('p').html();
            $b_phone = $(this).find('a').html();
            
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
                sel_b_phone = $b_phone;
                
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
                $('#ul_barber').append('<span>There\'s no barber available </span>');
                alert('Click order navigation page to refresh barber list');
            }
            else{
                var result = $.parseJSON(a);
                $('#ul_barber').empty();
                $.each(result,function(i,field){
                    $('#ul_barber').append('<label class="pilihan"><li><input type="radio" name="fb" value="'+field.username+'" class="pil_barber"><img src="upload/'+field.barber_img+'" width="20%"><span class="sp_barber">'+field.username+'</span><span class="hiden">'+field.id_barber+'</span><p class="hiden">'+field.barber_about+'</p><a class="hide">'+field.barber_phone+'</a></li></label>');
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

function cekOrder(){
    var stat;
    var id = sessionStorage.getItem('orderID');
    $.ajax({
        type:'POST',
        url:'./php/user-cekorder.php',
        data:{
            "cek":1,
            "id":id
        },
        async:false,
        success:function(a){
            stat = a;
        }
    });
    return stat;
}

function getOrder(){
    var xxx = "";
    $.ajax({
        type:'POST',
        url:'./php/user-getorder.php',
        data:{
            "cek":1,
            "idu":sessionStorage.getItem('userId')
        },
        async:false,
        success:function(a){
            if(a == 0){
                xxx = "nothing";
              //  alert("error");
            }
            else{
                var result = $.parseJSON(a);
                $.each(result,function(i,field){
                    sessionStorage.setItem('orderID',field.id_order);
                    sessionStorage.setItem('barberID',field.id_barber);
                    xxx = field.ord_status;
                });
            }
        }
    });
    return xxx;
}