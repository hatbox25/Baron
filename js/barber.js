$(document).ready(function (e) {
    $('#edit').addClass('hide');
    $('#chg').addClass('hide');
    
    getProfile() ;
    
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
        $('#edit').removeClass('hide');
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
    
});

function getProfile(){
    var id = sessionStorage.getItem('userId');
    $.ajax({
        type:'POST',
        url:'./php/barber-profil.php',
        data:{
            "get":1,
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
                    $('#utama').empty();
                    $('#utama').append('<img class="img" src="upload/'+field.barber_img+'"><h3>'+field.username+'</h3><div class="detil"><table class="tog"><tr><td class="l">Not Available</td><td><label class="switch"><input type="checkbox" id="aktif"><div class="slider round"></div></label></td><td class="r">Available</td></tr></table><br/><table><tr><td class="q">Address : </td><td colspan="3">'+field.barber_addr+'</td></tr><tr><td class="q">Phone : </td><td colspan="3">'+field.barber_phone+'</td></tr><tr><td class="q">About : </td><td colspan="3">'+field.barber_about+'</td></tr></table></div><br/><input type="button" value="Edit Detail" id="btn_update" class="button"><input type="button" value="Hair Style" class="button">');
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