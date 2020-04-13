const express = require('express');
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let smtp_login = process.env.SMTP_LOGIN || '---';
let smtp_password = process.env.SMTP_PASSWORD || '---';

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: smtp_login, // generated ethereal user
        pass: smtp_password // generated ethereal password
    }
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/sendMessage', async function (req, res) {

    let {name, email, message} = req.body;

    let info = await transporter.sendMail({
        from: 'My Portfolio', // sender address
        to: "vsheludkov@gmail.com", // list of receivers
        subject: "Message from Portfolio", // Subject line
        html: `<b>message from portfolio</b>
                <div>name: ${name}</div>
                <div>email: ${email}</div>
                <div>message: ${message}</div>`  // html body
    });
    res.send('ok');
    console.log("Message sent: %s", info.messageId);
});

let port = process.env.PORT || 3010;

app.listen(port, function () {
    console.log('Example app listening on port 3010!');
});
