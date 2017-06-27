$('document').ready(function(){
    if(localStorage.getItem('userId'))
        document.location='home.html';
    
    var eregex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    $.validator.addMethod("validemail", function( value, element ) {
         return this.optional( element ) || eregex.test( value );
     });

    $("#login-form").validate({
      rules:
      {
            email : {
            required : true,
            validemail: true
            },
            password: {
                required: true,
                minlength: 6,
                maxlength: 15
            },
       },
       messages:
       {
            email:{
                required : "Email is required",
                validemail : "Please enter valid email address"
                },
            password:{
                required: "Password is required",
                minlength: "Password at least have 6 characters"
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
       url:'https://bar0n.000webhostapp.com/php/login.php',
       data:$('#login-form').serialize(),
       async:false,
       cache:false,
       success:function(a){
           if(a == 0){
               $("#login-form").trigger('reset');
               alert('An unknown error occoured, Please try again Later...');
           }else{
               var result = $.parseJSON(a);
               $.each(result,function(i,field){
                   if(field.akses === 'user'){
                       localStorage.setItem('userId',field.id_user);
                       localStorage.setItem('role',field.akses);
                       localStorage.setItem('userName',field.username);
                       document.location.replace('home.html');
                   }else if(field.akses === 'barber'){
                       localStorage.setItem('userId',field.id_user);
                       localStorage.setItem('role',field.akses);
                       localStorage.setItem('userName',field.username);
                       document.location.replace('home.html');
                   }else{
                       localStorage.setItem('userId',field.id_user);
                       localStorage.setItem('role',field.akses);
                       localStorage.setItem('userName',field.username);
                       document.location.replace('home.html');
                   }
               });
           }
       }
   });
}
