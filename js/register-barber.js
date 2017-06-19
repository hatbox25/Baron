$('document').ready(function(){ 		 
    var key = "";
    var id = "";
    
    $('#btn_pros').addClass('hide');
    $('#btn_cari').click(function(){
        key = $('#cari').val();
        
        $.ajax({
            type:'POST',
            url:'./php/find.php',
            data:{
                "cari":1,
                "key":key
            },
            async:false,
            success:function(a){
                if(a == 0){
                    alert("Can't find the acount");
                    $('#res').empty();
                }else{
                    var result = $.parseJSON(a);
                    $.each(result,function(i,field){
                        id = field.id_user;
                        $('#btn_cari').prop('disabled',true);
                        $('#res').empty();
                        $('#res').append("<br/><h3>Detail Acount</h3><div class='hasil_cari'><span>UserName  : "+field.username+"</span></br></br><span>UserEmail : "+field.email+"</span></div><br/><span>Click button below to convert user become barber !</span><br/><br/><br/>");
                        $('#btn_pros').removeClass('hide')
                    });
                }
            }
        });
    });
    
    $('#btn_pros').click(function(){
        $('#res').empty();
        $('#btn_cari').prop('disabled',false);
        $('#btn_pros').addClass('hide');
        $('#cari').val('');
        $.ajax({
            type:'POST',
            url:'./php/register-barber.php',
            data:{
                "cari":1,
                "key":key,
                "id":id
            },
            async:false,
            success:function(a){
                var result = $.parseJSON(a);
                if(result.status === 'success'){
                    alert(result.message)
                }else{
                   alert("error");
                }
            }
        });
    });
});