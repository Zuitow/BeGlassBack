const nodemailer = require('nodemailer');
const path = require('path');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Certifique-se de que está usando TLS
  auth: {
    user: 'beglass20@gmail.com',
    pass: 'pkpr invm cagl hejc',
  }
});

async function main() {
  const mailOptions = {
    from: {
      name: 'BeGlass',
      address: 'beglass20@gmail.com' // Ajuste este campo se estiver usando variáveis de ambiente
    },
    to: ['guilhermesantiagodebrito@gmail.com'],
    subject: "Cadastro BeGlass",
    text: "Muito obrigado por realizar um cadastro na nossa página.",
    html: `
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
`,
  attachments: [
    {
      filename: 'Logo.png', // Nome do arquivo que aparecerá no e-mail
      path: path.join(__dirname, './Logo.png'), // Caminho para a imagem local
      cid: 'logo' // Este é o Content-ID, que será referenciado no HTML
    }
  ]
};

  const sendMail = async (transporter, mailOptions) => {
    try {
      await transporter.sendMail(mailOptions);
      console.log("Email enviado!");
    } catch (error) {
      console.log(error);
    }
  };

  await sendMail(transporter, mailOptions); // Chamada para enviar o email
}

main().catch(console.error);
