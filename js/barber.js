$(document).ready(function (e) {
    $('#edit').addClass('hide');
    $('#adapesan').addClass('hide');
    
    $('#tolak').addClass('hide');
    $('#cukur').addClass('hide');
    $('#chg').addClass('hide');
    $('#end').addClass('hide');
    
    if(sessionStorage.length == 0){
        //memeriksa jika session tidak ada maka akan kembali ke paga login.html
        document.location = "login.html";   
    }
    
    
    
    getProfile('#utama') ;
    
    var count = 0;
    //CEK ORDER
    var myInt = setInterval(function(){
        var c_ord = cekOrder();
        if(c_ord == 1){
            var st = getOrder();
            
            if(st == 'proses'){
                if(count == 0){
                    count++;
                    var audio = new Audio('notif.mp3');
                    audio.play();
                }
                $('#utama').addClass('hide');
                $('#adapesan').removeClass('hide');
            }else if(st == 'terima' || st == 'cukur'){
                $('#utama').addClass('hide');
                $('#adapesan').addClass('hide');
                $('#cukur').removeClass('hide');
                if(st == 'cukur'){
                    $('#end').prop('disabled',false);
                    $('#end').removeClass('hide');
                    $('#begin').addClass('hide');
                }    
            }else if(st == 'batal'){
                $('#utama').addClass('hide');
                $('#adapesan').addClass('hide');
                $('#tolak').removeClass('hide');
                if(count < 2){
                    count++;
                    var audio = new Audio('fail.mp3');
                    audio.play();
                }
            }
        }
    },1000);
    
    var to = cekAvb();
    
    var x=0;
    
    //fungsi toggle availability
    $('.switch').on('click',function(){
        x++;
        if(x%2 != 0){
            var id = sessionStorage.getItem('userId');
            $.ajax({
                type:'POST',
                url:'https://bar0n.000webhostapp.com/php/barber-stat.php',
                data:{
                    "toggle":1,
                    "id":id,
                    "to":to
                },
                async:false,
                cache:false,
                success:function(a){
                    if(a == 0){
                        alert("error");
                    }
                    else{
                        alert("Your availability has changed");
                        document.location='barber.html';
                    }
                }
            });
        }
    });

    //update profile
    $('#btn_update').click(function(){
        $('#utama').addClass('hide');
        getProfile('#edit') ;
        $('#edit').removeClass('hide');
        
    });
    
    //gajadi
    $('#cancel').click(function(){
        document.location='barber.html';
        
    });
    //triger update foto profile
    $('#ganti').click(function(){
        $('#opt').addClass('hide');
        $('#chg').removeClass('hide');
        
    });
    
    //update foto
    $("#btn").click(function(e) {
        e.preventDefault();
        var form = $('form')[0];
        var data = new FormData(form);
        var id = sessionStorage.getItem('userId');
        data.append('id',id);
        $.ajax({
            url: "https://bar0n.000webhostapp.com/php/barber-upload.php", // Url to which the request is send
            type: "POST",             // Type of request to be send, called as method
            data: data, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
            contentType: false,       // The content type used when sending data to the server.
            cache: false,             // To unable request pages to be cached
            processData:false,        // To send DOMDocument or non processed data file it is set to false
            success: function(data)   // A function to be called if request succeeds
            {
                alert(data);
                $('#chg').addClass('hide');
                $('#opt').removeClass('hide');
                document.location='barber.html';
            }
        });
    });
    
    //UPDATE DETIL
    $('#up_detil').click(function(){
        var up_addr = $('#up_addr').val();
        var up_phone = $('#up_phone').val();
        var up_about = $('#up_about').val();
        if(up_about.length > 0 && up_addr.length > 0 && up_phone.length > 0){
            if(up_phone.length > 12){
                alert("Max length for phone number is 12")
            }else{
                updateProfile(up_addr,up_phone,up_about);
                document.location='barber.html';
            }
        }else{
            alert("Address, Phone and About must be filled !")
        }
    });
    
    $('#acpt').click(function(){
        var id = sessionStorage.getItem('orderID');
        $.ajax({
            type:'POST',
            url:'https://bar0n.000webhostapp.com/php/barber-acpt.php',
            data:{
                "acpt":1,
                "id":id
            },
            async:false,
            cache:false,
            success:function(a){
                if(a == 0){
                  //  alert("error");
                }
                else{
                    alert("Order Accepted !");
                    $('#adapesan').addClass('hide');
                    $('#cukur').removeClass('hide');
                }
            }
        });
        
      
        /*TRIGER START INTERVAL*/
//        inter = setInterval(function(){
//            console.log('jalan');
//            var st = getOrder();
//            if(st == 'batal'){
//                clearInterval(inter);
//                
//            }
//        },1000);
        
    });
    
    $('#decl').click(function(){
        clearInterval(myInt);
        if(confirm("Are you sure want to decline this order ?")){
            $.ajax({
                type:'POST',
                url:'https://bar0n.000webhostapp.com/php/barber-decl.php',
                data:{
                    "acpt":1,
                    "id":sessionStorage.getItem('orderID'),
                    "idb":sessionStorage.getItem('barberID')
                },
                async:false,
                cache:false,
                success:function(a){
                    if(a == 0){
                      //  alert("error");
                    }
                    else{
                        document.location='barber.html';
                    }
                }
            });
        }
    });
    
    $('#ok').click(function(){
        $.ajax({
            type:'POST',
            url:'https://bar0n.000webhostapp.com/php/barber-ok.php',
            data:{
                "acpt":1,
                "id":sessionStorage.getItem('orderID'),
                "idb":sessionStorage.getItem('barberID')
            },
            async:false,
            cache:false,
            success:function(a){
                if(a == 0){
                  //  alert("error");
                }
                else{
                    document.location='barber.html';
                }
            }
        });
    });
    
      //START CUKUR
    $('#begin').click(function(){
        var id = sessionStorage.getItem('orderID');
        $.ajax({
            type:'POST',
            url:'https://bar0n.000webhostapp.com/php/barber-start.php',
            data:{
                "acpt":1,
                "id":id
            },
            async:false,
            cache:false,
            success:function(a){
                if(a == 0){
                  //  alert("error");
                }
                else{
                    $('#end').prop('disabled',false);
                    $('#end').removeClass('hide');
                    $('#begin').addClass('hide');
                }
            }
        });
    });
    
    //SELESAI CUKUR
    $('#end').click(function(){
            
        var today = new Date();
        var time = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours() + ':' + today.getMinutes();    
        var id = sessionStorage.getItem('orderID');
        $.ajax({
            type:'POST',
            url:'https://bar0n.000webhostapp.com/php/barber-finish.php',
            data:{
                "acpt":1,
                "id":id,
                "idb":sessionStorage.getItem('barberID'),
                "time":time
            },
            async:false,
            cache:false,
            success:function(a){
                if(a == 0){
                  //  alert("error");
                }
                else{
                    alert('Finished');
                    document.location='barber.html';
                }
            }
        });
    });
    
    $('#btn_style').click(function(){
        document.location="style.html";
    });
    
    
});

function updateProfile(x,y,z){
    var id = sessionStorage.getItem('userId');
    $.ajax({
        type:'POST',
        url:'https://bar0n.000webhostapp.com/php/barber-update.php',
        data:{
            "up":1,
            "id":id,
            "address":x,
            "phone":y,
            "about":z
        },
        async:false,
        cache:false,
        success:function(a){
            if(a == 0){
             //   alert("error");
            }else{
                alert("Profile updated successfully")
            }
        }
    });
}

function getProfile(x){
    var id = sessionStorage.getItem('userId');
    $.ajax({
        type:'POST',
        url:'https://bar0n.000webhostapp.com/php/barber-profil.php',
        data:{
            "get":1,
            "id":id
        },
        async:false,
        cache:false,
        success:function(a){
            if(a == 0){
              //  alert("error");
            }
            else{
                var result = $.parseJSON(a);
                $.each(result,function(i,field){
                    if(x == "#utama"){
                        $(x).empty();
                        $(x).append('<img class="img" src="https://bar0n.000webhostapp.com/upload/'+field.barber_img+'"><h3>'+field.username+'</h3><div class="detil"><table class="tog"><tr><td class="l">Not Available</td><td><label class="switch"><input type="checkbox" id="aktif"><div class="slider round"></div></label></td><td class="r">Available</td></tr></table><br/><table><tr><td class="q">Address : </td><td colspan="3">'+field.barber_addr+'</td></tr><tr><td class="q">Phone : </td><td colspan="3">'+field.barber_phone+'</td></tr><tr><td class="q">About : </td><td colspan="3">'+field.barber_about+'</td></tr></table></div><br/><input type="button" value="Edit Detail" id="btn_update" class="button"><input type="button" value="Hair Style" id="btn_style" class="button"><br/><br/>');
                        sessionStorage.setItem('barberID',field.id_barber);
                    }else{
                        $('#prof_pict').empty();
                        $('#prof_pict').append('<img src="https://bar0n.000webhostapp.com/upload/'+field.barber_img+'">');
                        $('#detilUP').empty();
                        $('#detilUP').append('<span>Address :</span><input type="text" id="up_addr" value="'+field.barber_addr+'"><span>Phone :</span><input type="number" id="up_phone" value="'+field.barber_phone+'"><span>About :</span><input type="text" id="up_about" value="'+field.barber_about+'">');
                    }
                });
            }
        }
    });
}

function cekAvb(){
    var id = sessionStorage.getItem('userId');
    var j = 0;
    $.ajax({
        type:'POST',
        url:'https://bar0n.000webhostapp.com/php/barber-stat.php',
        data:{
            "cek":1,
            "id":id
        },
        async:false,
        cache:false,
        success:function(a){
            if(a == 0){
                alert("error");
            }
            else{
                var result = $.parseJSON(a);
                $.each(result,function(i,field){
                    if(field.barber_stat == 1){
                        $('.switch').trigger('click');
                        j = 1;
                    }else{
                        j = 0;
                    }    
                });
                }
        }
    });
    return j;
}

function cekOrder(){
    var stat;
    var id = sessionStorage.getItem('barberID');
    $.ajax({
        type:'POST',
        url:'https://bar0n.000webhostapp.com/php/barber-cekorder.php',
        data:{
            "cek":1,
            "id":id
        },
        async:false,
        cache:false,
        success:function(a){
            stat = a;
        }
    });
    return stat;
}

function getOrder(){
    var id = sessionStorage.getItem('barberID');
    var stat = "";
    $.ajax({
        type:'POST',
        url:'https://bar0n.000webhostapp.com/php/barber-getorder.php',
        data:{
            "cek":1,
            "id":id
        },
        async:false,
        cache:false,
        success:function(a){
            if(a == 0){
              //  alert("error");
            }
            else{
                var result = $.parseJSON(a);
                $.each(result,function(i,field){
                    $('.detil').empty();
                    $('.detil').html('<tr><td class="q">Name : </td><td colspan="3">'+field.username+'</td></tr><tr><td class="q">Address : </td><td colspan="3">'+field.ord_address+'</td></tr><tr><td class="q">Phone : </td><td colspan="3">'+field.ord_phone+'</td></tr><tr><td class="q">Style : </td><td colspan="3">'+field.sty_name+'</td></tr>');
                    sessionStorage.setItem('orderID',field.id_order);
                    stat = field.ord_status;
                });
            }
        }
    });
    return stat;
}