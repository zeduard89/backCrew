import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "ccrewdb@gmail.com", // mailUser
    pass: "ifbndwwyaohlszcm" // mailPass
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
    await transporter.sendMail({
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
  } catch (error) {
    console.log(error)
  }
}

export default main
