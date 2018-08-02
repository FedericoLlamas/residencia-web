<?php

// Modify the path in the require statement below to refer to the 
// location of your Composer autoload.php file.
require '/usr/local/lib/vendor/autoload.php';

// Check for empty fields
if(empty($_POST['name'])  		||
   empty($_POST['email']) 		||
   empty($_POST['message'])	||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
	echo "No arguments Provided!";
	return false;
   }
	
$name = $_POST['name'];
$email_address = $_POST['email'];
$message = $_POST['message'];

// Instantiate a new PHPMailer 
$mail = new PHPMailer;

// Tell PHPMailer to use SMTP
$mail->isSMTP();

// Replace sender@example.com with your "From" address. 
// This address must be verified with Amazon SES.
$mail->setFrom('fede.llamas@gmail.com', 'Federico Llamas');

// Replace recipient@example.com with a "To" address. If your account 
// is still in the sandbox, this address must be verified.
// Also note that you can include several addAddress() lines to send
// email to multiple recipients.
$mail->addAddress('ggrraaccccii@gmail.com, fede.llamas@gmail.com', 'Test email');

// Replace smtp_username with your Amazon SES SMTP user name.
$mail->Username = 'AKIAIWROK4H74GUAOGHA';

// Replace smtp_password with your Amazon SES SMTP password.
$mail->Password = 'AhGLmmenaMUBBcJsinW/hFw8bkPe1bUUB2CZiZOCy000';
    
// Specify a configuration set. If you do not want to use a configuration
// set, comment or remove the next line.
/*$mail->addCustomHeader('X-SES-CONFIGURATION-SET', 'ConfigSet');*/
 
// If you're using Amazon SES in a region other than US West (Oregon), 
// replace email-smtp.us-west-2.amazonaws.com with the Amazon SES SMTP  
// endpoint in the appropriate region.
$mail->Host = 'email-smtp.us-east-1.amazonaws.com';

// The subject line of the email
$mail->Subject = 'Residencia Carolina del Norte (WEB)';

// The HTML-formatted body of the email
/*$mail->Body = '<h1>Comentario desde la web</h1>
    <p>Nombre: '$name'</p>
    <p>Email: '$email_address'</p>
    <p>Mensaje: '$message'</p>';*/
$mail->Body = "You have received a new message from your website contact form.\n\n"."Here are the details:\n\nName: $name\n\nEmail: $email_address\n\nMessage:\n$message";

// Tells PHPMailer to use SMTP authentication
$mail->SMTPAuth = true;

// Enable TLS encryption over port 587
$mail->SMTPSecure = 'tls';
$mail->Port = 587;

// Tells PHPMailer to send HTML-formatted email
$mail->isHTML(true);

// The alternative email body; this is only displayed when a recipient
// opens the email in a non-HTML email client. The \r\n represents a 
// line break.
$mail->AltBody = "Email Test\r\nThis email was sent through the 
    Amazon SES SMTP interface using the PHPMailer class.";

if(!$mail->send()) {
    echo "Email not sent. " , $mail->ErrorInfo , PHP_EOL;
} else {
    echo "Email sent!" , PHP_EOL;
}
?>
