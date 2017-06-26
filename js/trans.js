$(document).ready(function(){
    $('#user').addClass('hide');
    $('#barber').addClass('hide');
    $('#admin').addClass('hide');
    
    var role = sessionStorage.getItem('role');
    
    alert(role);
    
    if(role == 'user'){
        $('#user').removeClass('hide');
    }else if(role == 'barber'){
        $('#barber').removeClass('hide');
    }else{
        $('#admin').removeClass('hide');
    }
});