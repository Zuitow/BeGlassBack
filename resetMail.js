const nodemailer = require("nodemailer");



// Configuração do transportador
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Certifique-se de que está usando TLS
    auth: {
      user: "beglass20@gmail.com",
      pass: "pkpr invm cagl hejc",
    },
  });

  
const sendRecoveryEmail = async (email, resetCode) => {
  const mailOptions = {
    from: {
      name: "BeGlass",
      address: "beglass20@gmail.com",
    },
    to: email, // E-mail do usuário
    subject: "Recuperação de Senha - BeGlass",
    html: `
    <body>
      <div style="font-family: Arial, sans-serif; color: #333; text-align: center; padding: 20px; background-color: #f7f7f7; border-radius: 10px;">
        <h1 style="color: #4CAF50;">Recuperação de Senha</h1>
        <p style="font-size: 16px; color: #555;">
          Você solicitou a recuperação da sua senha. Use o código abaixo para redefini-la:
        </p>
        <h2 style="color: #333;">${resetCode}</h2>
        <p style="font-size: 14px; color: #777;">
          Este código é válido por 10 minutos.
        </p>
        <p style="font-size: 12px; color: #999;">
          Atenciosamente,<br/>Equipe BeGlass
        </p>
      </div>
    </body>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("E-mail de recuperação enviado!");
  } catch (error) {
    console.log("Erro ao enviar o e-mail de recuperação:", error);
  }
};

module.exports = sendRecoveryEmail;