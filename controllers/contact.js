var nodemailer = require("nodemailer");

// TODO: fix this shit, it's terrible.
var mandrillLogin;
var mandrillPassword;
if(environment === 'development'){
  var secrets = require('./config/secrets');
  mandrillLogin = mandrillLogin;
  mandrillPassword= mandrillPassword;
} else {
  mandrillLogin = process.env.MANDRILL_LOGIN;
  mandrillPassword = process.env.MANDRILL_PASSWORD;
}

var smtpTransport = nodemailer.createTransport('SMTP', {
  service: 'Mandrill',
  auth: {
       user: mandrillLogin,
       pass: mandrillPassword
  }
});

/**
 * GET /contact
 * Contact form page.
 */
exports.getContact = function(req, res) {
  res.render('contact', {
    title: 'Contact'
  });
};

/**
 * POST /contact
 * Send a contact form via Nodemailer.
 * @param email
 * @param name
 * @param message
 */
exports.postContact = function(req, res) {
  req.assert('name', 'Name cannot be blank').notEmpty();
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('message', 'Message cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/contact');
  }

  var from = req.body.email;
  var name = req.body.name;
  var body = req.body.message;
  var to = 'andrew.ruestow@gmail.com';
  var subject = 'Contact Form | quantifyToday';

  var mailOptions = {
    to: to,
    from: from,
    subject: subject,
    text: body
  };

  smtpTransport.sendMail(mailOptions, function(err) {
    if (err) {
      req.flash('errors', { msg: err.message });
      return res.redirect('/contact');
    }
    req.flash('success', { msg: 'Email has been sent successfully!' });
    res.redirect('/contact');
  });
};
