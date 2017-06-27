$(document).ready(function() {
    $('#edit_page').addClass('hide');
    /*INTERFACE SLIDE*/
    $('#showREG').slideUp();
    var r = 0;
    var l = 1;
    var st_id = "";
    
    $('#reg').click(function(){
        if(r%2 != 1){
            r++;
            if(l%2 == 1)
                l++;
            $('#showREG').slideDown();
            $('#showLIST').slideUp();
            
        }else{
            r++;
            $('#showREG').slideUp();
        }
    });
    
    $('#list').click(function(){
        if(l%2 != 1){
            l++;
            if(r%2 == 1)
                r++;
            $('#showREG').slideUp();
            $('#showLIST').slideDown();
        }else{
            l++;
            $('#showLIST').slideUp();
        }
    });
    /*---------------*/
    
    refStyle();
    
    //update foto
    $("#addStyle").click(function(e) {
        var sty = $('#st_name').val();
        var prc = $('#st_price').val();
        if(sty.length > 0 && prc.length > 0){
            e.preventDefault();
            var form = $('#up_style')[0];
            var data = new FormData(form);
            var id = localStorage.getItem('barberID');

            data.append('id',id);
            data.append('sty',sty);
            data.append('prc',prc);
            $.ajax({
                url: "https://bar0n.000webhostapp.com/php/style-upload.php", // Url to which the request is send
                type: "POST",             // Type of request to be send, called as method
                data: data, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
                contentType: false,       // The content type used when sending data to the server.
                cache: false,             // To unable request pages to be cached
                processData:false,        // To send DOMDocument or non processed data file it is set to false
                success: function(data)   // A function to be called if request succeeds
                {
                    alert(data);
                    $('st_name').val();
                    $('st_price').val();
                    document.location='style.html';
                }
            });
        }else{
            alert("Style name and price must be filled !")
        }
    });
    
    $("#src_style").keyup(function(){
        showList('src_style','ul_style','sp_style');
    });
    
    /*POP UP LIST*/  
    $('.style').click(function(){
        $st_name = $(this).find('.sp_style').html(); //ambil nama style
        $st_img = $(this).find('img').attr('src'); //ambil src img style
        $st_price = $(this).find('.price').html().replace(/\D/g,'') ; //ambil price style
        $st_id = $(this).find('.hide').html();//ambil id style
        st_id = $st_id;
        
        $('#pop').empty();
        $('#pop').append('<img src="'+$st_img+'"><span class="toggle"><strong>X</strong></span><br/><h3 id="pop_st_name">'+$st_name+'</h3><span id="pop_st_price">Rp '+$st_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")+'</span><br/><br/><div class="row" id="baris"><div class="col" id="hapus">HAPUS</div><div class="col" id="edit">EDIT</div></div>');
        
        $('#pop').toggle( "slow", function() {
            // Animation complete.
        });
        
        $('#edit').click(function(){
            $('#edit_page').removeClass('hide');
            $('#utama').addClass('hide');
            
            $('.teksE').empty();
            $('.teksE').append('<span>Style Image</span><br/><input type="file" name="u_st_file" id="u_st_file" ><br/><span>Style Name</span><br/><input type="text" placeholder="Style Name" id="u_st_name" value="'+$st_name+'"><br/><span>Style Price</span><br/><input type="number" name="st_price" placeholder="Style Price on Rupiah" id="u_st_price" value="'+$st_price+'"><br/>');
//            $('.teksE').append('<span>Style Image</span><br/><input type="file" name="u_st_file" id="u_st_file"><br/><span>Style Name</span><br/><input type="text" name="u_st_name" placeholder="Style Name" id="u_st_name"><br/><span>Style Price</span><br/><input type="number" name="u_st_price" placeholder="Style Price on Rupiah" id="u_st_price"><br/>');
        });
        
        $('#hapus').click(function(){
            if(confirm("Are you sure to delete this style ?")){
                //alert($st_img);
                $.ajax({
                    type:'POST',
                    url:'https://bar0n.000webhostapp.com/php/style-delete.php',
                    data:{
                        "del":1,
                        "id":$st_id,
                        "path":$st_img
                    },
                    async:false,
                    cache:false,
                    success:function(a){
                        if(a == 0){
                            alert("Failed to delete the slected style");
                        }else{
                            document.location='style.html';
                        }
                    }
                });
            }
        });
        
        $('.toggle').click(function(){
            $('#pop').toggle( "slow", function() {
                // Animation complete.
            });
        });
    
    });
    
    $('#batal').click(function(){
        document.location='style.html';
    });
    
    $('#update').click(function(e){
        var sty = $('#u_st_name').val();
        var prc = $('#u_st_price').val();
        if(sty.length > 0 && prc.length > 0){
            e.preventDefault();
            var form = $('#e_up_style')[0];
            var data = new FormData(form);

            var id = localStorage.getItem('barberID');    
            data.append('id',id);
            data.append('ids',st_id);
            data.append('sty',sty);
            data.append('prc',prc);
            $.ajax({
                url: "https://bar0n.000webhostapp.com/php/style-update.php", // Url to which the request is send
                type: "POST",             // Type of request to be send, called as method
                data: data, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
                contentType: false,       // The content type used when sending data to the server.
                cache: false,             // To unable request pages to be cached
                processData:false,        // To send DOMDocument or non processed data file it is set to false
                success: function(data)   // A function to be called if request succeeds
                {
                    alert(data);
                    $('#u_st_name').val();
                    $('#u_st_price').val();
                    document.location='style.html';
                }
            });
        }else{
            alert("Style name and price must be filled !")
        }
    });
    
});

function refStyle(){
    var id = localStorage.getItem('barberID');
    $.ajax({
        type:'POST',
        url:'https://bar0n.000webhostapp.com/php/style-barber.php',
        data:{
            "get":1,
            "id":id
        },
        async:false,
        cache:false,
        success:function(a){
            if(a == 0){
                $('#ul_style').empty();
                $('#ul_style').append("<span>You don't have any registered style</span>");
            }
            else{
                var result = $.parseJSON(a);
                $('#ul_style').empty();
                $.each(result,function(i,field){
                    $('#ul_style').append('<label class="style"><li><img src="https://bar0n.000webhostapp.com/upload/style/'+id+'/'+field.sty_img+'" width="20%"><span class="sp_style">'+field.sty_name+'</span><span class="price">Rp '+ field.sty_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")+'</span></li><span class="hide">'+field.id_style+'</span></label>');
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