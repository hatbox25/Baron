$(document).ready(function(){
    /* FOOTER SETTING */
    $('#user').addClass('hide');
    $('#barber').addClass('hide');
    $('#admin').addClass('hide');

    var role = sessionStorage.getItem('role');
    if(role == 'user'){
        $('#user').removeClass('hide');
        getUserTransaction('#user_trans');
    }else if(role == 'barber'){
        $('#barber').removeClass('hide');
        getBarberTransaction('#barber_trans');
    }else{
        $('#admin').removeClass('hide');
        getAdminTransaction('#admin_trans') ;
    }
    /* END FOOTER SETTING */

    function getUserTransaction(role){
        var id = sessionStorage.getItem('userId');
        $.ajax({
            type:'POST',
            url:'https://bar0n.000webhostapp.com/php/user-trans.php',
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
                    $.each(result,function(i,row){
                        $('#user_trans').empty();
                        $('#user_trans').append('<tr><td>'+row.dt_order+'</td><td>'+row.barber+'</td><td>'+row.sty_name+'</td><td>'+row.ord_status+'</td><td>'+row.rating+'</td><td>'+row.ord_price+'</td></tr>');
                    });
                }
            }
        });
    }

    function getBarberTransaction(role){
        var id = sessionStorage.getItem('userId');
        $.ajax({
            type:'POST',
            url:'https://bar0n.000webhostapp.com/php/barber-trans.php',
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
                    $.each(result,function(i,row){
                        $('#barber_trans').empty();
                        $('#barber_trans').append('<tr><td>'+row.dt_order+'</td><td>'+row.user+'</td><td>'+row.sty_name+'</td><td>'+row.ord_status+'</td><td>'+row.rating+'</td><td>'+row.ord_price+'</td></tr>');
                    });
                }
            }
        });
    }

    function getAdminTransaction(role){
        var id = sessionStorage.getItem('userId');
        $.ajax({
            type:'POST',
            url:'https://bar0n.000webhostapp.com/php/admin-trans.php',
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
                    $.each(result,function(i,row){
                        $('#admin_trans').empty();
                        $('#admin_trans').append('<tr><td>'+row.dt_order+'</td><td>'+row.barber+'</td><td>'+row.user+'</td><td>'+row.ord_status+'</td><td>'+row.rating+'</td><td>'+row.ord_price+'</td></tr>');
                    });
                }
            }
        });
    }
});
