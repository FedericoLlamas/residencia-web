$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var phone = $("input#phone").val();
            var email = $("input#email").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "././mail/contact_me.php",
                type: "POST",
                data: {
                    name: name,
                    email: email,
                    message: message,
                    phone: phone
                },
                cache: false,
                success: function() {
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>El email se envió satifactoriamente. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function() {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Perdón " + firstName + ", el servidor no está respondiendo. Por favor intenta más tarde!");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});


// function submitToAPI(e) {
//    e.preventDefault();
//    // var URL = "http://lzucijp208.execute-api.us-east-1.amazonaws.com/mailfwd";

//         var Namere = /[A-Za-z]{1}[A-Za-z]/;
//         if (!Namere.test($("#name").val())) {
//                      alert ("Name can not less than 2 char");
//             return;
//         }
//         var mobilere = /[0-9]{10}/;
//         if (!mobilere.test($("#phone").val())) {
//             alert ("Please enter valid mobile number");
//             return;
//         }
//         if ($("#email").val()=="") {
//             alert ("Please enter your email id");
//             return;
//         }

//         var reeamil = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
//         if (!reeamil.test($("#email").val())) {
//             alert ("Please enter valid email address");
//             return;
//         }

//    var name = $("#name").val();
//    var phone = $("#phone").val();
//    var email = $("#email").val();
//    var desc = $("#message").val();
//    var data = {
//       name : name,
//       phone : phone,
//       email : email,
//       desc : desc
//     };

//    $.ajax({
//      type: "POST",
//      url : "https://fo3f21dtzh.execute-api.us-east-1.amazonaws.com/mailfwd",
//      dataType: "json",
//      headers: {
//       "Access-Control-Allow-Headers": "Content-Type",
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Methods": "*",
//     },
//      crossDomain: "true",
//      contentType: "application/json; charset=utf-8",
//      data: JSON.stringify(data),

     
//      success: function () {
//        // clear form and show a success message
//        alert("Successfull");
//        document.getElementById("contact-form").reset();
//        location.reload();
//      },
//      error: function (error) {
//        // show an error message
//        alert("UnSuccessfull");
//      }});
//  }