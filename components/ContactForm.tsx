import { openAsBlob } from 'fs';
import React, { useState } from 'react';

const ContactForm = () => {
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
        <form onSubmit={handleSubmit} className="space-y-4 w-11/12 md:w-1/2 my-2">
            <div>
                <label htmlFor="email" className="block text-sm font-semibold text-foreground">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder='Your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 p-4 block w-full rounded-md bg-spotify text-white border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                    className="mt-1 p-4 block w-full min-h-36 rounded-md bg-spotify text-white border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                ></textarea>
            </div>
            <button
                type="submit"
                className={`inline-flex items-center px-4 py-2 border bg-spotify ${email && message ? 'text-white' : 'text-gray-400'} border-transparent text-sm font-medium rounded-md shadow-sm text-background bg-foreground hover:opacity-80 transition duration-100  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
                Send Message
            </button>
        </form>
    );
};

export default ContactForm;