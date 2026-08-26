import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_USER,
    pass: process.env.GOOGLE_PASSWORD,
  },
});
console.log(transport.options);

const verifyTransport = async () => {
  try {
    await transport.verify();
    console.log("✅ Ready to send emails");
  } catch (err) {
    console.error("❌ Error verifying email transport:");
    console.error(err);
  }
};

verifyTransport();

export const sendEmail = async ({ to, subject, html, text = "" }) => {
  try {
    const mailOptions = {
      from: process.env.GOOGLE_USER,
      to,
      subject,
      html,
      text,
    };

    const details = await transport.sendMail(mailOptions);

    console.log("✅ Email sent:", details);

    return `Email sent successfully to ${to}`;
  } catch (err) {
    console.error("❌ Error sending email:");
    console.error(err);

    throw err;
  }
};
