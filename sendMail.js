const nodemailer = require("nodemailer");
const path = require("path");

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

// Função para enviar o e-mail de boas-vindas
const sendWelcomeEmail = async (email) => {
  const mailOptions = {
    from: {
      name: "BeGlass",
      address: "beglass20@gmail.com",
    },
    to: [email], // Envia para o email do usuário que se cadastrou
    subject: "Cadastro BeGlass",
    text: "Muito obrigado por realizar um cadastro na nossa página.",
    html: `
    <body>
      <div style="font-family: Arial, sans-serif; color: #333; text-align: center; padding: 20px; background-color: #f7f7f7; border-radius: 10px;">
        <h1 style="color: #4CAF50;">Bem-vindo à BeGlass!</h1>
        <p style="font-size: 16px; color: #555;">
          Muito obrigado por realizar um cadastro na nossa página. Estamos felizes em tê-lo conosco!
        </p>
        <img src="cid:logo" alt="Imagem de boas-vindas" style="width: 200px; height: auto; border-radius: 10px; margin: 20px 0;" />
        <p style="font-size: 14px; color: #777;">
          Se precisar de mais informações, sinta-se à vontade para nos contatar.
        </p>
        <p style="font-size: 12px; color: #999;">
          Atenciosamente,<br/>Equipe BeGlass
        </p>
      </div>
      
      </body>
    `,
    attachments: [
      {
        filename: "Logo.png",
        path: path.join(__dirname, "./Logo.png"),
        cid: "logo",
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email enviado!");
  } catch (error) {
    console.log("Erro ao enviar o email:", error);
  }
};

module.exports = sendWelcomeEmail;
