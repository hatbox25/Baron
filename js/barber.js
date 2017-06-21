$(document).ready(function (e) {
    if(sessionStorage.length == 0){
        //memeriksa jika session tidak ada maka akan kembali ke paga login.html
        document.location = "login.html";   
    }
    
    $('#adapesan').addClass('hide');
    $('#edit').addClass('hide');
    $('#cukur').addClass('hide');
    $('#chg').addClass('hide');
    $('#end').addClass('hide');
    
    getProfile('#utama') ;
    
    var to = cekAvb();
    
    var x=0;
    
    //fungsi toggle availability
    $('.switch').on('click',function(){
        x++;
        if(x%2 != 0){
            var id = sessionStorage.getItem('userId');
            $.ajax({
                type:'POST',
                url:'./php/barber-stat.php',
                data:{
                    "toggle":1,
                    "id":id,
                    "to":to
                },
                async:false,
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
            url: "./php/barber-upload.php", // Url to which the request is send
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
    
    //START CUKUR
    $('#begin').click(function(){
        $('#end').prop('disabled',false);
        $('#end').removeClass('hide');
        $(this).addClass('hide');
        
        /*UPDATE TIME START*/
    });
    
    $('#btn_style').click(function(){
        document.location="style.html";
    });
    
    $('#logout').click(function(){
        alert("You are successfully logout")
        sessionStorage.clear();
        document.location = 'login.html';
    });
});

function updateProfile(x,y,z){
    var id = sessionStorage.getItem('userId');
    $.ajax({
        type:'POST',
        url:'./php/barber-update.php',
        data:{
            "up":1,
            "id":id,
            "address":x,
            "phone":y,
            "about":z
        },
        async:false,
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
        url:'./php/barber-profil.php',
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
                        $(x).append('<img class="img" src="upload/'+field.barber_img+'"><h3>'+field.username+'</h3><div class="detil"><table class="tog"><tr><td class="l">Not Available</td><td><label class="switch"><input type="checkbox" id="aktif"><div class="slider round"></div></label></td><td class="r">Available</td></tr></table><br/><table><tr><td class="q">Address : </td><td colspan="3">'+field.barber_addr+'</td></tr><tr><td class="q">Phone : </td><td colspan="3">'+field.barber_phone+'</td></tr><tr><td class="q">About : </td><td colspan="3">'+field.barber_about+'</td></tr></table></div><br/><input type="button" value="Edit Detail" id="btn_update" class="button"><input type="button" value="Hair Style" id="btn_style" class="button"><br/><br/><img src="img/logout.png" id="logout" width="40%">');
                        sessionStorage.setItem('barberID',field.id_barber);
                    }else{
                        $('#prof_pict').empty();
                        $('#prof_pict').append('<img src="upload/'+field.barber_img+'">');
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
        url:'./php/barber-stat.php',
        data:{
            "cek":1,
            "id":id
        },
        async:false,
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