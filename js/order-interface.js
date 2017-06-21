$(document).ready(function(){
    $('#summary').addClass('main');
    $('#processing').addClass('container');
    $('#tunggu').addClass('hide');
    
    
    var sel_barber = "";
    var sel_style  = "";
    var sel_addres = "";
    var sel_phone  = "";
    var sel_t_ord  = "";
    
    var now = new Date();
    
    $("#src_barber").keyup(function(){
        showList('src_barber','ul_barber','sp_barber',null);
    });
    
    $("#toStyle").click(function(){
        var x = $(".pil_barber:checked");
        sel_barber = x.val();
        
        if(!sel_barber){
            alert("You must select barber !");
        }else{
            $("#s_barber").addClass("hide");
            $("#s_style").removeClass("hide");
        }
    });  

    $("#src_style").keyup(function(){
        showList('src_style','ul_style','sp_style','price');
    });
    
    $("#toBarber").click(function(){
        $("#s_barber").removeClass("hide");
        $("#s_style").addClass("hide");
    });
    
    $("#toForm").click(function(){
        var x = $(".pil_style:checked");
        sel_style = x.val();
        
        if(!sel_style){
            alert("You must select style !");
        }else{
            $("#s_style").addClass("hide");
            $("#s_isian").removeClass("hide");
        }
    });
    
    $("#sudah").click(function(){
        if($("#address").val().length > 0 && $("#phone").val().length > 0){
            sel_addres = $("#address").val();
            sel_phone  = $("#phone").val();
            
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            
            sel_t_ord = date +' '+ time;
            
            $("#isi").addClass("hide");
            $("#summary").removeClass("hide");
        }else{
            alert("Address and Phone Number is required !");
        }
    });
    
    $("#proses").click(function(){
        alert("barber : " + sel_barber + "\n" +
             "style : " + sel_style + "\n" +
             "address : " + sel_addres + "\n" +
             "phone : " + sel_phone + "\n" +
             "dateTime : " + sel_t_ord + "\n");
        $("#pesan").addClass("hide");
        $("#processing").removeClass("hide");
        
        $('#timer').append(05 + ":" + 00);
        startTimer();
    });
    
    $('#batal').click(function(){
        alert("bisa");
    });
    
});

function showHasil(x,y,z){
    $(x).empty();
    var selected = $(y);
    $(x).append(z+selected.val());
}

function showList(x,y,z,op){
    var input, filter, ul, li, a, b, i;
    input = document.getElementById(x);
    filter = input.value.toUpperCase();
    ul = document.getElementById(y);
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        if(op == null){
            a = li[i].getElementsByClassName(z)[0];
            if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            } 
        }else{
            a = li[i].getElementsByClassName(z)[0];
            b = li[i].getElementsByClassName(op)[0];
            if (a.innerHTML.toUpperCase().indexOf(filter) > -1 || b.innerHTML.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            } 
        }
        
    }
}

function startTimer() {
  var presentTime = document.getElementById('timer').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond((timeArray[1] - 1));
  if(s==59){m=m-1}
  //if(m<0){alert('timer completed')}
  
  document.getElementById('timer').innerHTML =
    m + ":" + s;
    if(m == 0 && s == 0){
        $('#batal').prop('disabled',false);
    }else{
        setTimeout(startTimer, 1000);      
    }
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  return sec;
}