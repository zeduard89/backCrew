import nodemailer from "nodemailer"

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

    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #4caf50;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      font-size: 16px;
    }

    .image-container {
      margin-top: 40px;
    }
  </style>
</head>
<body>
  <h1>Welcome to our Crowdfunding Platform!</h1>
  <p>Thank you for joining our platform. We're excited to have you on board.</p>

  <p>Stay tuned for exciting projects and opportunities!</p>

  <p>
    <a href="https://crew-xi.vercel.app" class="button">Explore Projects</a>
  </p>
  <div class="image-container">
    <img src="https://i.imgur.com/dR4UytW.png" alt="Image" style="width: 120px;">
  </div>
</body>
</html>
      `
    })
  } catch (error) {
    console.log(error)
  }
}
export default main
