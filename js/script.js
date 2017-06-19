$(document).ready(function (e) {
    $('#utama').addClass('hide');
    $('#chg').addClass('hide');
    
    $('.switch').trigger('click');
    var x=0;
    $('.switch').on('click',function(){
        x++;
        if(x%2 != 0){
            console.log(x);
        }else{
            
        }
        
    });
    
    $('#ganti').click(function(){
        $('#opt').addClass('hide');
        $('#chg').removeClass('hide');
    });
    
    $("#btn").click(function(e) {
        e.preventDefault();
        var form = $('form')[0];
        var data = new FormData(form);
        $.ajax({
            url: "./php/ajax_php_file.php", // Url to which the request is send
            type: "POST",             // Type of request to be send, called as method
            data: data, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
            contentType: false,       // The content type used when sending data to the server.
            cache: false,             // To unable request pages to be cached
            processData:false,        // To send DOMDocument or non processed data file it is set to false
            success: function(data)   // A function to be called if request succeeds
            {
                alert(data);
            }
        });
    });
    
});