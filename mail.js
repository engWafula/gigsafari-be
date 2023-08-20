var API_KEY = encodeURIComponent('6e041055a3677d70ae3d5edef72014a2-27a562f9-bf1c93cc');
var DOMAIN = encodeURIComponent('https://app.mailgun.com/app/sending/domains/sandboxcd46587b5e4148cdbf5ab989ac8d59e9.mailgun.org');


var mailgun = require('mailgun-js')
	({apiKey: API_KEY, domain: DOMAIN});

sendMail = function(sender_email, receiver_email,
		email_subject, email_body){

const data = {
	"from": sender_email,
	"to": receiver_email,
	"subject": email_subject,
	"text": email_body
};

mailgun.messages().send(data, (error, body) => {
	if(error) console.log(error)
	else console.log(body);
});
}

var sender_email = 'wafulaallan5@gmail.com'
var receiver_email = 'wafulareactdev@gmail.com'
var email_subject = 'Mailgun Demo'
var email_body = 'Greetings from geeksforgeeks'

// User-defined function to send email
sendMail(sender_email, receiver_email,
			email_subject, email_body)
