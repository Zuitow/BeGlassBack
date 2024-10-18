const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: 'beglass20@gmail.com',
    pass: 'pkpr invm cagl hejc', // Lembre-se de armazenar isso em variáveis de ambiente
  }
});

async function sendResetPasswordEmail(email, resetLink) {
  const mailOptions = {
    from: {
      name: 'BeGlass',
      address: 'beglass20@gmail.com'
    },
    to: email, // Destinatário
    subject: "Redefinição de senha",
    text: `Você solicitou a redefinição de sua senha. Clique no link para redefinir: ${resetLink}`,
    html: `<p>Você solicitou a redefinição de sua senha.</p><p><a href="${resetLink}">Clique aqui para redefinir sua senha</a></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("E-mail de redefinição de senha enviado!");
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
  }
}

module.exports = sendResetPasswordEmail;