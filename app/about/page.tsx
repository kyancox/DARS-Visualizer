"use client"

import Divider from '@/components/Divider'
import Link from 'next/link';
import React, { useState } from 'react';

const About = () => {

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, message }),
      });

      if (response.ok) {
        alert('Message sent successfully!');
        setEmail('');
        setMessage('');
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };
  return (
    <div className="xl:w-1/2 w-10/12 mx-auto">

      <div className='mt-5' >
        <p className='font-bold text-center text-2xl my-1'>About</p>
        <p className='text-center xl:w-3/4 mx-auto font-medium md:text-lg'>DARS Visualizer provides a user-friendly interface for UW-Madison students to view their DARS reports. UW-Madison&apos;s DARS report includes an abundance of data that isn&apos;t displayed on the DARS interface, like courses taken, grades in those courses, and total credits earned at UW-Madison. DARS Visualizer makes use of that data by displaying it in an easy to read interface, utilizing charts and graphs to make your reports easier to understand. Get started by uploading your DARS report to DARS Visualizer.</p>
        <Divider />
      </div>
      <div className='flex flex-col items-center justify-center'>
        <p className='font-bold text-center text-2xl mb-1'>DARS Visualizer Tutorial</p>
        <Link className="font-medium hover:underline cursor-pointer text-red-500 text-center" href='/tutorial'>Click this link to read about how to download your DARS report.</Link>
      </div>
      <Divider />



      <div className="my-4 flex flex-col items-center">
        <div className="mx-6 space-y-1">
          <p className="xl:text-2xl text-xl text-center font-medium mb-1">Do you have issues, questions, or suggestions?</p>
          <p className="xl:text-lg text-base text-center ">Please share your thoughts, concerns, or problems below!</p>
        </div>

        {/* ContactForm component but with custom width styling :+1: */}
        <form onSubmit={handleSubmit} className="space-y-4 w-full my-2">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-foreground">Email</label>
            <input
              type="email"
              id="email"
              placeholder='Your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-4 block w-full rounded-md border-2 hover:border-blue-400 shadow transition duration-50"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-foreground">Message</label>
            <textarea
              id="message"
              value={message}
              placeholder='Your message'
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
              className="mt-1 p-4 block w-full min-h-36 rounded-md border-2 hover:border-blue-400 shadow transition duration-50"
            ></textarea>
          </div>
          <button
            type="submit"
            className={`font-semibold inline-flex items-center px-4 py-2 border-2 text-gray-400 hover:border-blue-400 text-sm rounded-md shadow-sm text-background bg-foreground hover:opacity-80 transition duration-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            Send Message
          </button>
        </form>

      </div>
    </div>
  )
}

export default About