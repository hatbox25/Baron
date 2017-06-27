$(document).ready(function(){
    /* FOOTER SETTING */
    $('#user').addClass('hide');
    $('#barber').addClass('hide');
    $('#admin').addClass('hide');

    var role = sessionStorage.getItem('role');
    if(role == 'user'){
        $('#user').removeClass('hide');
    }else if(role == 'barber'){
        $('#barber').removeClass('hide');
    }else{
        $('#admin').removeClass('hide');
    }
    /* END FOOTER SETTING */
});
