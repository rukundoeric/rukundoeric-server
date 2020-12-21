const express = require("express");
const nodemailer = require("nodemailer");
const transport = require("nodemailer-sendgrid-transport");

require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.listen(port, () => console.log("Listening on port!"));

app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).send({
    message: "Mail Service is Listening on this Server!",
  });
})
app.post("/send", (req, res, next) => {

  const { email, htmlToSend } = req.body;

  const mailer = nodemailer.createTransport(
    transport({
      auth: {
        api_key: process.env.REACT_APP_SENDGRID_API_KEY,
      },
    })
  );

  const email_option = {
    to: "ericrukundo005@gmail.com",
    from: `MY PORTIFOLIO <${process.env.REACT_APP_SUPER_ADMIN_EMAIL}>`,
    subject: `Message from ${email}`,
    text: email,
    html: htmlToSend,
  };

  mailer.sendMail(email_option, function (err, info) {
    if (err) {
      return res.status(500).send({responce: 'error', err})
    }
    return res.status(200).send({ responce: "success", info });
  });
});