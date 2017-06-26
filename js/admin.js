$(document).ready(function(){
    $('#src_tbl').keyup(function(){
        showList();
    });
    
    $('#addBarber').click(function(){
        document.location = 'register_barber.html'; 
    });
    
    $('#detailTrans').click(function(){
        document.location = 'transaction.html'; 
    });
    
    getTrans();
});


function showList(){
    var input, filter, ul, li, a, b,c,d,e,f,i;
    input = document.getElementById('src_tbl');
    filter = input.value.toUpperCase();
    ul = document.getElementById('full');
    li = ul.getElementsByClassName('tr');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByClassName('t')[0];
        b = li[i].getElementsByClassName('u')[0];
        c = li[i].getElementsByClassName('br')[0];
        g = li[i].getElementsByClassName('ts')[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1 || b.innerHTML.toUpperCase().indexOf(filter) > -1 || c.innerHTML.toUpperCase().indexOf(filter) > -1 || g.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function getTrans(){
    $.ajax({
        type:'POST',
        url:'./php/get-trans.php',
        data:{
            "get":1
        },
        async:false,
        cache:false,
        success:function(a){
            if(a == 0){
                
            }
            else{
                var result = $.parseJSON(a);
                $('#full').empty();
                var x=1;
                $.each(result,function(i,field){
                    $('#full').append('<tr class="tr"><td>'+ x++ +'</td><td class="t">'+field.id_order+'</td><td class="u">'+field.user+'</td><td class="br">'+field.barber+'</td><td class="df">'+field.rating+'</td><td class="ts">'+field.ord_price+'</td></tr>');
                });
            }
        }
    });
}