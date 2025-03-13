const nodemailer = require('nodemailer');

// Configuración del servicio de correo
const transporter = nodemailer.createTransport({
    service: 'gmail', // Puedes usar otro proveedor (Outlook, SMTP, etc.)
    auth: {
        user: 'cocinayaapp@gmail.com', // Reemplázalo con tu correo
        pass: 'kvmf hzyr pzfc ofek'       // Usa una contraseña segura o una clave de aplicación
    }
});

// Función para enviar el correo
const sendResetEmail = (email, token) => {
    const resetLink = `http://localhost:3000/reset-password?token=${token}`;

    const mailOptions = {
        from: 'tuemail@gmail.com',
        to: email,
        subject: 'Código para restablecer tu contraseña',
        text: `Hola, tu código de recuperación es:${token}`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error('Error enviando el correo:', err);
        } else {
            console.log('Correo enviado:', info.response);
        }
    });
};

module.exports = sendResetEmail;
