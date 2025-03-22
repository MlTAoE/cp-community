const nodemailer = require('nodemailer');


exports.emailler = async (req, res) => {
    try {
        const { title } = req.body;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            secure: true,
            port: 587,
            tls: {
                rejectUnauthorized: false
            }
        });



        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.DTE_EMAIL,
            subject: `Data Update Verification for ${title}`,
            html: `
              <p>Data for ${title} has been updated in cp-vault. Please review the changes.</p>
              <p> This is an auto-generated email. </p>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);

        res.status(200).json({ message: 'Verification email sent successfully' });


    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send verification email' });
    }

};