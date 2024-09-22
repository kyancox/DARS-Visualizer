"use client"
import FormComponent from "@/components/FormComponent";
import ProgressBar from "@/components/ProgressBar";
import { useData } from "@/providers/DataContext";
import { useEffect, useState } from "react";
import Tabs from "@/components/Tabs";
import DonutChart from "@/components/DonutChart";
import BarChart from "@/components/BarChart";
import Divider from "@/components/Divider";
import ContactForm from "@/components/ContactForm";
import Link from "next/link";

export default function Home() {
  const { data } = useData()
  const [name, setName] = useState<string>('')

  useEffect(() => {
    if (data && data.student_name) {
      const [lastName, firstName] = data.student_name.split(',');
      setName(`${firstName.trim()} ${lastName.trim()}`);
    }
  }, [data])

  return (
    <div className="overflow-x-hidden">
      <div className="xl:w-1/2 w-10/12 mx-auto">
        {!data && (
          <div>
            <p className="text-center text-lg font-semibold mt-4">DARS Visualizer allows UW-Madison students to view their DARS reports in a more organized manner, including charts and graphs to make your reports easier to understand.</p>
            <p className="text-sm font-medium text-center">Note: Certficate DARS reports are currently not allowed.</p>
            <p className="font-bold my-3">Example graphs:</p>
            <div>
              <div className='border mb-6' />
              <div className="flex xl:flex-row flex-col items-center justify-center xl:space-y-0 space-y-4">
                <DonutChart />
                <BarChart />
              </div>
              <div className="my-4">
                <ProgressBar />
              </div>
              <Divider />
            </div>
            <div className="text-center mb-6 space-y-1">
              <p className="text-center font-semibold">Download your DARS report as a PDF from <Link href='https://enroll.wisc.edu/dars' target='_blank' className="text-red-500 hover:underline">enroll.wisc.edu/dars</Link> to get started.</p>
              {/* <p className="font-medium text-center">Then, upload your PDF file below and click 'Extract Data' to view your report.</p> */}
              <Link className="font-medium hover:underline cursor-pointer text-red-500" href='/tutorial'>Not sure how to download your DARS report?</Link>
            </div>
          </div>
        )}
        <FormComponent />
      </div>
      <div className='xl:w-2/3 w-10/12 mx-auto'>
      </div>
      {data && (
        <>
          <div className='xl:w-2/3 w-10/12 mx-auto'>
            <div className="my-4">
              <p className='text-center text-2xl font-bold'>{name} DARS Report</p>
              <p className='text-center text-xl'>{data.requested_school}</p>
              <p className='text-center text-xl'>{data.requested_major}</p>
              {data.majors.length > 0 && (
                <div className="flex flex-row items-center justify-center">
                  <p className='text-center text-lg'>Declared majors:&nbsp;
                    {data.majors.map((major, index) => (
                      <span key={index} className="font-semibold">
                        {index > 0 ? ', ' : ''}{major}
                      </span>
                    ))}
                  </p>
                </div>
              )}
              {data.certificates.length > 0 && (
                <div className="flex flex-row items-center justify-center">
                  <p className='text-center text-lg'>Declared certificates:&nbsp;
                    {data.certificates.map((certificate, index) => (
                      <span key={index} className="font-semibold">
                        {index > 0 ? ', ' : ''}{certificate}
                      </span>
                    ))}
                  </p>
                </div>
              )}
              <p className='text-center text-base'>Prepared on: <span className="font-medium">{data.preparation_date}</span></p>
            </div>
            <Divider />
            <div className="flex xl:flex-row flex-col items-center justify-center xl:space-y-0 space-y-4">
              <DonutChart />
              <BarChart />
            </div>
            <Divider />
            <div className="my-4">
              <ProgressBar />
            </div>
          </div>
          <div className="xl:w-3/4 md:w-11/12 mx-auto">
            <Tabs />
           <div className="my-4 flex flex-col items-center">
             <div className="mx-6 space-y-1">
               <p className="lg:text-2xl text-lg text-center font-medium">Do you have issues, questions, or suggestions?</p>
               <p className="lg:text-lg text-center ">Please share your thoughts, concerns, or problems below!</p>
             </div>
             <ContactForm />
           </div>
          </div>
        </>
      )}

      {/* <div className="xl:w-3/4 md:w-11/12 mx-auto my-4 flex flex-col items-center">
        <div className="mx-6 space-y-1">
          <p className="lg:text-2xl text-lg text-center font-medium">Do you have issues, questions, or suggestions?</p>
          <p className="lg:text-lg text-center ">Please share your thoughts, concerns, or problems below!</p>
        </div>
        <ContactForm />
      </div> */}

    </div>
  );
}
