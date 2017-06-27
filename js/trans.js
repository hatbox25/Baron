$(document).ready(function(){
    /* FOOTER SETTING */
    $('#user').addClass('hide');
    $('#barber').addClass('hide');
    $('#admin').addClass('hide');

    var role = localStorage.getItem('role');
    if(role == 'user'){
        $('#user').removeClass('hide');
        getUserTransaction();
    }else if(role == 'barber'){
        $('#barber').removeClass('hide');
        getBarberTransaction();
    }else{
        $('#admin').removeClass('hide');
        getAdminTransaction() ;
    }
    /* END FOOTER SETTING */

    
});

function getUserTransaction(){
        var id = localStorage.getItem('userId');
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
                    $('#user_trans').empty();
                    $.each(result,function(i,row){
                        $('#user_trans').append('<tr><td>'+row.dt_order+'</td><td>'+row.barber+'</td><td>'+row.sty_name+'</td><td>'+row.ord_status+'</td><td>'+row.rating+'</td><td>'+row.ord_price+'</td></tr>');
                    });
                }
            }
        });
    }

    function getBarberTransaction(){
        var id = localStorage.getItem('userId');
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
                    $('#barber_trans').empty();
                    $.each(result,function(i,row){
                        
                        $('#barber_trans').append('<tr><td>'+row.dt_order+'</td><td>'+row.user+'</td><td>'+row.sty_name+'</td><td>'+row.ord_status+'</td><td>'+row.rating+'</td><td>'+row.ord_price+'</td></tr>');
                    });
                }
            }
        });
    }

    function getAdminTransaction(){
        var id = localStorage.getItem('userId');
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
                    $('#admin_trans').empty();
                    $.each(result,function(i,row){
                        
                        $('#admin_trans').append('<tr><td>'+row.dt_order+'</td><td>'+row.barber+'</td><td>'+row.user+'</td><td>'+row.ord_status+'</td><td>'+row.rating+'</td><td>'+row.ord_price+'</td></tr>');
                    });
                }
            }
        });
    }