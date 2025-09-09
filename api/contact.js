import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: email,
        to: process.env.EMAIL_USER, // your receiving email
        subject: `New Contact from ${name}`,
        text: message,
      });

      return res.status(200).json({ success: true, msg: "Message sent!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error sending message" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// import express from "express";
// import nodemailer from "nodemailer";
// import cors from "cors";

// const app = express();
// const PORT = 5000;

// // Middleware to parse JSON and allow cross-origin requests
// app.use(cors());
// app.use(express.json()); // <-- Needed for JSON body
// app.use(express.urlencoded({ extended: true })); // <-- Needed for form data

// // Route to handle form submission
// app.post("/api/contact.js", async (req, res) => {
//   try {
//     const { name, email, message } = req.body; // will now work

//     if (!name || !email || !message) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     // Example: Send email with nodemailer
//     let transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "your-email@gmail.com",
//         pass: "your-app-password",
//       },
//     });

//     await transporter.sendMail({
//       from: email,
//       to: "receiver-email@gmail.com",
//       subject: `New message from ${name}`,
//       text: message,
//     });

//     res
//       .status(200)
//       .json({ success: true, message: "Message sent successfully!" });
//   } catch (error) {
//     console.error("Error sending message:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// app.listen(PORT, () =>
//   console.log(`Server running on http://localhost:${PORT}`)
// );

// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.json()); // <-- Needed for JSON body
// app.use(express.urlencoded({ extended: true })); // <-- Needed for form data

// // Checking the request

// app.use((req, res, next) => {
//   console.log(`[${req.method}] ${req.url}`);
//   next();
// });

// app.post("/contact", async (req, res) => {
//   const { name, email, message } = req.body;

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   //   const mailOptions = {
//   //     from: email,
//   //     to: process.env.EMAIL_TO,
//   //     subject: "New Quote Request",
//   //     text: `
//   //       Name: ${name}
//   //       Email: ${email}
//   //       Event Date: ${date}
//   //       Guests: ${guests}

//   //       Message:
//   //       ${message}
//   //     `,
//   //   };

//   const mailOptions = {
//     from: email,
//     to: process.env.EMAIL_TO,
//     subject: "New Message",
//     text: `
//       Name: ${name}
//       Email: ${email}
//       Message:
//       ${message}
//     `,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ success: true, message: "Email sent" });
//   } catch (err) {
//     console.error("Error sending email:", err);
//     res.status(500).json({ success: false, message: "Failed to send email" });
//   }
// });

// app.listen(5000, () => console.log("Server running on port 5000"));
