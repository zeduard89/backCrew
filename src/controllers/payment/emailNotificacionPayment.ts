import nodemailer from "nodemailer"
import path from "path"

// Busco la direccion exacta del archivo
const imagePath = path.resolve(__dirname, "crew.png")

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "ccrewdb@gmail.com",
    pass: "ifbndwwyaohlszcm"
  }
})

// async..await is not allowed in global scope, must use a wrapper
export const mainUser = async (
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
      <head>
        <style>
          body {
            background-color: #f5f5f5;
            text-align: center;
            padding: 20px;
            font-family: Arial, sans-serif;
            color: #333;
          }
          h1 {
            font-size: 24px;
            margin-bottom: 10px;
          }
          p {
            font-size: 18px;
            margin-bottom: 15px;
          }
          img {
            width: 300px;
            margin-top: 40px;
          }
          .footer {
            font-size: 14px;
            color: #777;
            margin-top: 40px;
          }
        </style>
      </head>
      <body>
        <h1>Hello ${firstName},</h1>
        <p>Thank you for your support on the project "${title}"!</p>
        <p>We have received your transaction of ${transactionAmount}.</p>
        <p>The current status of your payment is "${status}".</p>
        <p>Here is your payment ID: ${id}. Please keep it for future reference.</p>
        <p>You can use this ID to search for more details about your payment.</p>
        <p>If you have any questions or need further assistance, feel free to reach out to us.</p>
        <div>
          <img src="cid:crewImage" alt="Welcome Image">
        </div>
        <p class="footer">Best regards,<br>Crew Team</p>
      </body>
    </html>
    `,
      attachments: [
        {
          filename: "crew.png",
          path: imagePath,
          cid: "crewImage" // This ID is referenced in the HTML <img> tag
        }
      ]
    })

    console.log("Message sent: %s", info.messageId)
  } catch (error) {
    console.log(error)
  }
}

export const mainProject = async (
  mail: string,
  firstName: string,
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
      <head>
        <style>
          body {
            background-color: #f5f5f5;
            text-align: center;
            padding: 20px;
            font-family: Arial, sans-serif;
            color: #333;
          }
          h1 {
            font-size: 24px;
            margin-bottom: 10px;
          }
          p {
            font-size: 18px;
            margin-bottom: 15px;
          }
          img {
            width: 300px;
            margin-top: 40px;
          }
          .footer {
            font-size: 14px;
            color: #777;
            margin-top: 40px;
          }
        </style>
      </head>
      <body>
        <h1>Hello ${firstName},</h1>
        <p>We are glad to inform you that "${title}" has received a new deposit!</p>
        <p>${title} has received an amount of ${transactionAmount}. The current status is "${status}".</p>
        <p>If you have any questions or need further assistance, feel free to reach out to us.</p>
        <div>
          <img src="cid:crewImage" alt="Welcome Image">
        </div>
        <p class="footer">Best regards,<br>Crew Team</p>
      </body>
    </html>
    `,
      attachments: [
        {
          filename: "crew.png",
          path: imagePath,
          cid: "crewImage" // This ID is referenced in the HTML <img> tag
        }
      ]
    })

    console.log("Message sent: %s", info.messageId)
  } catch (error) {
    console.log(error)
  }
}
