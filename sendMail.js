const nodemailer = require('nodemailer');

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
    to: ['milenabasso444@gmail.com'],
    subject: "Email Teste",
    text: "Este é um email teste viu?",
    html: "<b>Hello World</b>",
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
