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

    var nameregex = /^[a-zA-Z ]+$/;

    $.validator.addMethod("validname", function( value, element ) {
        return this.optional( element ) || nameregex.test( value );
    });

    var eregex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    $.validator.addMethod("validemail", function( value, element ) {
        return this.optional( element ) || eregex.test( value );
    });

    $("#feedback-form").validate({
        rules:{
            name: {
                required: true,
                validname: true,
                minlength: 4
                },
            email : {
                required : true,
                validemail: true,
            },
            contact: {
                required: true
            },
            message: {
                required: true,
                minlength: 6,
                maxlength: 250
            }
        },
        messages:{
            name: {
                required: "Name is required",
                validname: "Name must contain only alphabets and space",
                minlength: "your name is too short"
            },
            email : {
                required : "Email is required",
                validemail : "Please enter valid email address",
            },
            contact:{
                required: "Contact is required"
            },
            message:{
                required: "Message is required",
                minlength: "Message at least have 6 characters"
            }
        },
        errorPlacement : function(error, element) {
            $(element).closest('.form-group').find('.help-block').html(error.html());
        },
        highlight : function(element) {
            $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).closest('.form-group').removeClass('has-error');
            $(element).closest('.form-group').find('.help-block').html('');
        },
        submitHandler: submitForm
    });
});

function submitForm(){
    $.ajax({
        type:'POST',
        url:'https://bar0n.000webhostapp.com/php/email.php',
        data:$('#feedback-form').serialize(),
        success:function(a){
            $('#btn-email').html('&nbsp; Sending...').prop('disabled', true);
            $('input[type=text],input[type=email]').prop('disabled', true);
            if(a == 0){
                $("#feedback-form").trigger('reset');
                alert('An unknown error occoured, Please try again Later...');
            }else{
               var result = $.parseJSON(a);
               if(result.status === 'success'){
                   $('#errorDiv').slideDown('fast', function(){
                       console.log(result.message);
                       $('#errorDiv').append('<div class="alert alert-info">'+result.message+'</div>');
                       $("#feedback-form").trigger('reset');
                       $('input[type=text],input[type=email]').prop('disabled', false);
                       $('#btn-email').html('&nbsp; Send').prop('disabled', false);
                   }).delay(4000).slideUp('fast');
                }else{
                   $('#errorDiv').slideDown('fast', function(){
                       $('#errorDiv').append('<div class="alert alert-danger">'+result.message+'</div>');
                       $('input[type=text],input[type=email]').prop('disabled', false);
                       $('#btn-email').html('&nbsp; Send').prop('disabled', false);
                   }).delay(4000).slideUp('fast');
                }
            }
        }
    });
}
