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
const main = async (
  name: string,
  lastName: string,
  email: string,
  country: string
) => {
  try {
    // Send mail with defined transport object
    await transporter.sendMail({
      from: '"Crew Inspiring Support 👨‍💻 " <ccrewdb@gmail.com>',
      to: email,
      subject: "The Biggest crowdfunding",
      text: `Hi ${name}`,
      html: `
        <html>
          <body style="background-color: #f5f5f5; text-align: center; padding: 20px;">
            <h1 style="color: #333;">Hello ${name} ${lastName}</h1>
            <p style="font-size: 18px;">Thank you for joining our crowdfunding platform.</p>
            <p style="font-size: 16px;">Your country: ${country}</p>
            <div style="margin-top: 40px;">
            <img src="cid:crewImage" alt="Welcome Image" style="width: 300px;">
            </div>
            <p style="font-size: 14px; color: #777;">Stay tuned for exciting projects and opportunities!</p>
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
  } catch (error) {
    console.log(error)
  }
}

export default main
