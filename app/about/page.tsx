import ContactForm from '@/components/ContactForm'
import React from 'react'

const About = () => {
  return (
    <div>


      <div className="my-4 flex flex-col items-center">
        <div className="mx-6 space-y-1">
          <p className="lg:text-2xl text-lg text-center font-medium">Do you have issues, questions, or suggestions?</p>
          <p className="lg:text-lg text-center ">Please share your thoughts, concerns, or problems below!</p>
        </div>
        <ContactForm />
      </div>
    </div>
  )
}

export default About