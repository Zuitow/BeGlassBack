const nodemailer = require("nodemailer");

const sendResetPasswordEmail = async (email, resetLink) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "beglass20@gmail.com",
            pass: "sua-senha-aqui",
        },
    });

    const mailOptions = {
        from: "beglass20@gmail.com",
        to: email,
        subject: "Redefinição de senha",
        html: `<p>Para redefinir sua senha, clique no link abaixo:</p><a href="${resetLink}">Redefinir Senha</a>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("E-mail de redefinição de senha enviado com sucesso!");
    } catch (error) {
        console.error("Erro ao enviar o e-mail:", error);
    }
};

module.exports = sendResetPasswordEmail;
