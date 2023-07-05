import nodemailer from "nodemailer"
import path from "path"

// Busco la direccion exacta del archivo
const imagePath = path.resolve(__dirname, "crew.png")

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "ccrewdb@gmail.com",
    pass: "cxhjzthsferhkgtx"
  }
})

// async..await is not allowed in global scope, must use a wrapper
const main = async (email: string) => {
  try {
    // Send mail with defined transport object

    await transporter.sendMail({
      from: '"Crew Inspiring Support 👨‍💻 " <ccrewdb@gmail.com>',
      to: email,
      subject: "The Biggest crowdfunding",
      text: `Hi Dear`,
      html: `
      <html>
      <head>
        <style>
          body {
            background-color: #f5f5f5;
            text-align: center;
            padding: 20px;
            font-family: Arial, sans-serif;
          }
    
          h1 {
            color: #333;
            font-size: 24px;
            margin-bottom: 10px;
          }
    
          p {
            font-size: 18px;
            margin-bottom: 20px;
          }
    
          .image-container {
            margin-top: 40px;
          }
        </style>
      </head>
      <body>
        <h1>Hello!</h1>
        <p>Thank you for joining our crowdfunding platform.</p>
    
        <div class="image-container">
          <img src="cid:crewImage" alt="Welcome Image" style="width: 300px;">
        </div>
    
        <p>Stay tuned for exciting projects and opportunities!</p>
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
