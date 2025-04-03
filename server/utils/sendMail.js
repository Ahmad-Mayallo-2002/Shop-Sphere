const { createTransport } = require("nodemailer");
const { generate } = require("randomstring");

const transport = createTransport({
  service: "gmail",
  auth: {
    user: "ahmadmayallo02@gmail.com",
    pass: "iobinnboagwejqks",
  },
});

const sendMail = async (email) => {
  const OTP = generate({ length: 6, charset: "numeric" });
  const mailOptions = {
    from: "ahmadmayallo02@gmail.com",
    to: email,
    Subject: "Hello",
    text: `There is Your OTP Number To Confirm Your Account and Change Password Don't Share It With Anyone ${OTP}`,
  };
  transport.sendMail(mailOptions, (err) =>
    err ? console.log(err) : log("OTP Sent Successfully")
  );
  return OTP;
};

module.exports = { sendMail };
