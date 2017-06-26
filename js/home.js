$(document).ready(function(){
    $('#user').addClass('hide');
    $('#barber').addClass('hide');
    $('#admin').addClass('hide');
    
    var role = sessionStorage.getItem('role');
    var uname = sessionStorage.getItem('userName');
    
    /*SLIDE*/
    $('#showB').slideUp();
    $('#showS').slideUp();
    var l = 0,r = 0;
    $('#lb').click(function(){
        if(r%2 != 1){
            r++;
            if(l%2 == 1)
                l++;
            $('#showB').slideDown();
            $('#showS').slideUp();
            
        }else{
            r++;
            $('#showB').slideUp();
        }
    });
    
    $('#ls').click(function(){
        if(l%2 != 1){
            l++;
            if(r%2 == 1)
                r++;
            $('#showB').slideUp();
            $('#showS').slideDown();
        }else{
            l++;
            $('#showS').slideUp();
        }
    });
    
    /*END SLIDE*/
    
    if(role == 'user'){
        $('#user').removeClass('hide');
    }else if(role == 'barber'){
        $('#barber').removeClass('hide');
    }else{
        $('#admin').removeClass('hide');
    }
    
    /*END FOOTER SETTING*/
    
    showBarber();
    showStyle();
    
    $("#src_style").keyup(function(){
        showList('src_style','ul_style','sp_style');
    });
    $("#src_barber").keyup(function(){
        showList('src_barber','ul_barber','sp_barber');
    });
    
    $('.barber').click(function(){
        $b_name = $(this).find('.sp_barber').html(); //
        $b_img = $(this).find('img').attr('src'); //
        $b_skor = $(this).find('.rate').html(); //
        $b_phone = $(this).find('#ph').html();
        
        $('#pop').html('<img src="'+$b_img+'"><span class="toggle"><strong>X</strong></span><br/><h3 id="h3">'+$b_name+'</h3><span class="span" id="r1">Rating '+$b_skor+'</span><br/><br/><hr/><br/><span class="span" id="r2">'+$b_phone+'</span><br/><br/><div class="row" id="baris">OK</div>');
        
        $('#pop').toggle( "slow", function() {
                // Animation complete.
        });
        
        $('.toggle').click(function(){
           $('#pop').toggle( "slow", function() {
                // Animation complete.
           }); 
        });
        
        $('#baris').click(function(){
           $('#pop').toggle( "slow", function() {
                // Animation complete.
           }); 
        });
    });
    
    $('.style').click(function(){
        $s_name = $(this).find('.sp_style').html(); //
        $s_img = $(this).find('img').attr('src'); //
        $s_price = $(this).find('.price').html(); //
        $s_un = $(this).find('.hide').html();
        
        $('#pop').html('<img src="'+$s_img+'"><span class="toggle"><strong>X</strong></span><br/><h3 id="h3">'+$s_name+'</h3><span class="span" id="r1">By '+$s_un+'</span><br/><br/><hr/><br/><span class="span" id="r2">'+$s_price+'</span><br/><br/><div class="row" id="baris">OK</div>');
        
        $('#pop').toggle( "slow", function() {
                // Animation complete.
        });
        
        $('.toggle').click(function(){
           $('#pop').toggle( "slow", function() {
                // Animation complete.
           }); 
        });
        
        $('#baris').click(function(){
           $('#pop').toggle( "slow", function() {
                // Animation complete.
           }); 
        });
    });
})

function showBarber(){
    $.ajax({
        type:'POST',
        url:'./php/get-home-barber.php',
        data:{
            "get":1
        },
        async:false,
        cache:false,
        success:function(a){
            if(a == 0){
                $('#ul_barber').empty();
                $('#ul_barber').append('<span>There\'s no barber registered</span>');
            }
            else{
                var result = $.parseJSON(a);
                $('#ul_barber').empty();
                $.each(result,function(i,field){
                    var x = parseFloat(field.skor).toFixed(2);
                    
                    $('#ul_barber').append('<label class="barber"><li><img src="upload/'+field.barber_img+'" width="20%"><span class="sp_barber">'+field.username+'</span><span class="rate">'+x+'</span><span class="hide" id="ph">'+field.barber_phone+'</span></li></label>');
                });
            }
        }
    });
}

function showStyle(){
    $.ajax({
        type:'POST',
        url:'./php/get-home-style.php',
        data:{
            "get":1
        },
        async:false,
        cache:false,
        success:function(a){
            if(a == 0){
                $('#ul_style').empty();
                $('#ul_style').append('<span>There\'s no style registered</span>');
            }
            else{
                var result = $.parseJSON(a);
                $('#ul_style').empty();
                $.each(result,function(i,field){
                    $('#ul_style').append('<label class="style"><li><img src="upload/style/'+field.id_barber+'/'+field.sty_img+'" width="20%"><span class="sp_style">'+field.sty_name+'</span><span class="price">Rp '+ field.sty_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")+'</span></li><span class="hide">'+field.username+'</span></label>');
                });
            }
        }
    });
}

function showList(x,y,z){
    var input, filter, ul, li, a, b, i;
    input = document.getElementById(x);
    filter = input.value.toUpperCase();
    ul = document.getElementById(y);
    li = ul.getElementsByTagName('li');
    
    if(x == 'src_barber'){
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByClassName(z)[0];
            b = li[i].getElementsByClassName('price')[0];
            if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    }else{
    // Loop through all list items, and hide those who don't match the search query
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByClassName(z)[0];
            b = li[i].getElementsByClassName('price')[0];
            if (a.innerHTML.toUpperCase().indexOf(filter) > -1 || b.innerHTML.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    }

}