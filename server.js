    const express = require('express')
    const app = express()
    const path = require('path');
    const nodemailer = require('nodemailer');
    const dotenv = require('dotenv');
    const bodyParser = require('body-parser');

    dotenv.config()
    let initialPath = path.join(__dirname, "public");  

    app.use(express.static(initialPath));   
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
app.use(bodyParser.raw());

    app.get('/', (req, res) => {
        res.sendFile(path.join(initialPath, "index.html"));
    })


    app.post('/mail', (req, res )=> {       
        const { firstname, lastname, email, msg } = req.body;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            },
            secure: true,
          
        })
       
        const mailOptions = {
            from: 'sender email',
            to: email,
            subject: 'Postfolio',
            text: `First name: ${firstname}, \nLast name: ${lastname}, \nEmail: ${email}, \nMessage: ${msg}`
        }

        transporter.sendMail(mailOptions, (err, result) => {
            if (err){
                console.log(err);
                res.json('opps! it seems like some error occured plz. try again.')
            } else{
                res.json('thanks for e-mailing me. I will reply to you within 2 working days');
               
            }
        })
    })

    app.listen(3000, () => {
        console.log('listening.....');
    })