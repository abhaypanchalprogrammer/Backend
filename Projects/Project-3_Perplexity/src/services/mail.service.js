import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_USER,
    pass: process.env.GOOGLE_PASSWORD,
  },
});
console.log({
  user: process.env.GOOGLE_USER,
  pass: process.env.GOOGLE_PASSWORD,
});
transport
  .verify()
  .then(() => {
    console.log("Ready to send emails");
  })
  .catch((err) => {
    console.error("Error verifying email transport:", err);
  });

export const sendEmail = async ({ to, subject, html, text }) => {
  const mailOptions = {
    from: process.env.GOOGLE_USER,
    to,
    subject,
    html,
    text,
  };
  const details = await transport.sendMail(mailOptions);
  console.log("email sent :", details);
};
