// Tu contraseña de aplicación para el dispositivo
// ifbndwwyaohlszcm
// Instrucciones de uso
// Ve a la configuración de tu cuenta de Google en la aplicación o
//  el dispositivo que quieres configurar. Ingresa la contraseña de 16
//  caracteres que aparece arriba para reemplazar la anterior.
// Al igual que la contraseña normal, esta contraseña de la aplicación
//  otorga acceso completo a tu cuenta de Google. Como no es necesario
//   que la recuerdes, no la escribas ni la compartas con nadie.
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "ccrewdb@gmail.com",
    pass: "ifbndwwyaohlszcm"
  }
})

// async..await is not allowed in global scope, must use a wrapper
const main = async (
  mail: string,
  firstName: string,
  id: string,
  title: string,
  transactionAmount: string,
  status: string
) => {
  try {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Crew Inspiring Support 👨‍💻 " <ccrewdb@gmail.com>',
      to: `${mail}`,
      subject: `The Biggest crowdfunding`,
      text: `Hi ${firstName}`,
      html: `
    <html>
      <body>
        <p>Hi ${firstName},</p>
        <p>Thank you for your support on the project "${title}"! We have received your transaction of ${transactionAmount}. The current status of your payment is "${status}".</p>
        <p>Here is your payment ID: ${id}. Please keep it for future reference. You can use this ID to search for more details about your payment.</p>
        <p>If you have any questions or need further assistance, feel free to reach out to us.</p>
        <p>Best regards,</p>
        <p>Crew Team</p>
      </body>
    </html>
    `
    })

    console.log("Message sent: %s", info.messageId)
  } catch (error) {
    console.log(error)
  }
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}

// main().catch(console.error)

export default main
