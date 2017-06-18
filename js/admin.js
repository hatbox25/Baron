$(document).ready(function(){
    $('#src_tbl').keyup(function(){
        showList();
    });
    
    $('#addBarber').click(function(){
        document.location = 'register_barber.html'; 
    });
    
    $('#detailTrans').click(function(){
        document.location = 'register_barber.html'; 
    });
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
