const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const transport = require("nodemailer-sendgrid-transport");
const bodyParser = require("body-parser");

require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

app
  .use(express.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(cors())
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .get("/", (req, res) => {
    return res.status(200).send({
      message: "Mail Service is Listening on this Server!",
    });
  })
  .post("/send", (req, res, next) => {
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
        return res.status(500).send({ responce: "error", err });
      }
      return res.status(200).send({ responce: "success", info });
    });
  })
  .listen(port, () => console.log("Listening on port!"));