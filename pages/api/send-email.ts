import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, message } = req.body

    // Create a transporter using SMTP
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    try {
      // Send mail with defined transport object
      await transporter.sendMail({
        from: `"darsvisualizer.com" <${process.env.EMAIL_USER}>`,
        to: "kyan.cox@gmail.com", 
        subject: `DARS Visualizer Feedback from ${email}`,
        text: `\nEmail: ${email}\nMessage: ${message}`,
        html: `<p><strong>Email:</strong> ${email}</p>
               <p><strong>Message:</strong> ${message}</p>`,
      })

      res.status(200).json({ message: 'Email sent successfully' })
    } catch (error) {
      console.error('Error sending email:', error)
      res.status(500).json({ message: 'Error sending email' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}