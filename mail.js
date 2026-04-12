import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (option) => {
   const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "task manager",
      link: "https://taskmanager.com",
    },
   })

   const EmailTextual = mailGenerator.generatePlaintext(Options.mailgenContent)

   const emailTexual = mailGenerator.generate(Options.mailgenContent)


  const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_SMTP_HOST,
      port: process.env.MAILTRAP_SMTP_PORT,
      auth: {
        user: process.env.MAILTRAP_SMTP_USER,
        pass: process.env.MAILTRAP_SMTP_PASS
      }
   })

   const mail = {
    from: "mail.taskmanager@example.com",
    to: option.email,
    subject: options.subject,
    text: EmailTextual,
    html: emailhtml
   }

   try {
     await transporter.sendMail(mail)
   } catch (error){
    console.error("Email service failed silently. Make sure that you have provided your MAILTRAP credentials in the .env file")
      console.error("Error sending email:", error)
   }
}


const emailVerificationMailgenContent = (username,verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to our application! Please verify your email address by clicking the button below:",
      action: {
        instructions: "Click the button to verify your email:",
        button: {
          color: "#22BC66",
          text: "Verify Email",
          link: verificationUrl
        },
      },
      outro: "If you did not create an account with us, please ignore this email."
    },
  };
};

const forgotMailgenContent = (username, passwordresetUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to our application! Please verify your email address by clicking the button below:",
      action: {
        instructions: "Click the button to verify your email:",
        button: {
          color: "#22BC66",
          text: "Reset Password",
          link: passwordresetUrl
        },
      },
      outro: "If you did not create an account with us, please ignore this email."
    },
  };
};

export { emailVerificationMailgenContent, forgotMailgenContent,
          sendEmail,
 };
