$('document').ready(function(){ 		 

    var nameregex = /^[a-zA-Z ]+$/;

    $.validator.addMethod("validname", function( value, element ) {
        return this.optional( element ) || nameregex.test( value );
    }); 

    var eregex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    $.validator.addMethod("validemail", function( value, element ) {
        return this.optional( element ) || eregex.test( value );
    });

    $("#register-form").validate({
        rules:{
            name: {
                required: true,
                validname: true,
                minlength: 4
                },
            email : {
                required : true,
                validemail: true,
                remote: {
                    url: "./php/check-email.php",
                    type: 'POST',
                    data: {
                        email: function() {
                            return $( "#email" ).val();
                            }
                    }
                }
            },
            password: {
                required: true,
                minlength: 6,
                maxlength: 15
            },
            cpassword: {
                required: true,
                equalTo: '#password'
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
                remote : "Email already exists"
            },
            password:{
                required: "Password is required",
                minlength: "Password at least have 6 characters"
            },
            cpassword:{
                required: "Retype your password",
                equalTo: "Password did not match !"
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
        submitHandler: submitFor
    }); 
});

function submitFor(){
    $.ajax({
        type:'POST',
        url:'./php/register.php',
        data:$('#register-form').serialize(),
        async:false,
        success:function(a){
            $('#btn-signup').html('&nbsp; signing up...').prop('disabled', true);
            $('input[type=text],input[type=email],input[type=password]').prop('disabled', true);
            if(a == 0){
                $("#register-form").trigger('reset');
                alert('An unknown error occoured, Please try again Later...');
            }else{
               var result = $.parseJSON(a);
               if(result.status === 'success'){
                   $('#errorDiv').slideDown('fast', function(){
                       $('#errorDiv').append('<div class="alert alert-info">'+result.message+'</div>');
                       $("#register-form").trigger('reset');
                       $('input[type=text],input[type=email],input[type=password]').prop('disabled', false);
                       $('#btn-signup').html('<span class="glyphicon glyphicon-log-in"></span> &nbsp; Sign Me Up').prop('disabled', false);
                   }).delay(2000).slideUp('fast');
                }else{
                   $('#errorDiv').slideDown('fast', function(){
                       $('#errorDiv').append('<div class="alert alert-danger">'+result.message+'</div>');
                       $("#register-form").trigger('reset');
                       $('input[type=text],input[type=email],input[type=password]').prop('disabled', false);
                       $('#btn-signup').html('<span class="glyphicon glyphicon-log-in"></span> &nbsp; Sign Me Up').prop('disabled', false);
                   }).delay(2000).slideUp('fast');
                }
            }
        }
    });
}