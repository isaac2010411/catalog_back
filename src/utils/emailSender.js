const path = require('path')
const nodemailer = require('nodemailer')

//the user's email is necessary for sending
const emailSender = async (templateInfo, template, subject) => {
  const output = template({ ...templateInfo })

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
      user: 'isaac2010411@gmail.com',
      pass: 'skbfowdarcmhvdxo',
    },
  })

  let mailOptions = {
    from: `"Hypnotic Grow Shop" <isaac2010411@gmail.com>`,
    to: templateInfo.email,
    subject,
    text: 'Hola de Hypnotic Grow Shop',
    html: output,
  }

  try {
    return await transporter.sendMail(mailOptions)
  } catch (error) {
    console.log(error)
    return error.message
  }
}

module.exports = {
  emailSender,
}
