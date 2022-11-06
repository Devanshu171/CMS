require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_KEY);
export const contact = async (req, res) => {
  //
  try {
    const { name, email, message } = req.body;
    const emailData = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_FROM,
      subject: "Email from conatct form",
      html: `<h1>Contact from message </h1> <p>Name-<u>${name}</u></p> <p>Email-<u>${email}</u> <p>Message</p><p>${message}</p></p>`,
    };
    // send email
    try {
      const data = await sgMail.send(emailData);
      console.log(data);
      res.json({ ok: true });
    } catch (err) {
      console.log(err);
      res.json({ ok: false });
    }
  } catch (err) {
    console.log(err);
  }
};
