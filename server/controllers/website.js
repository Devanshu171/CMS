import Website from "../models/website";

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
// homepage, getHomepage
export const createPage = async (req, res) => {
  try {
    const { page } = req.body;
    const found = await Website.findOne({ page });

    if (found) {
      // update
      const updated = await Website.findOneAndUpdate({ page }, req.body, {
        new: true,
      });
      return res.json(updated);
    } else {
      // create
      const created = await new Website(req.body).save();
      return res.json(created);
    }
  } catch (err) {
    console.log(err);
  }
};

export const getPage = async (req, res) => {
  try {
    const { page } = req.params;
    const found = await Website.findOne({ page }).populate("fullWidthImage");
    return res.json(found);
  } catch (err) {
    console.log(err);
  }
};
