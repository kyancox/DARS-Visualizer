"use client"
import FormComponent from "@/components/FormComponent";
import Button from 'react-bootstrap/Button';
import Image from "next/image";
import ProgressBar from "@/components/ProgressBar";
import { useData } from "@/providers/DataContext";
import { useEffect, useState } from "react";
import Tabs from "@/components/Tabs";
import DonutChart from "@/components/DonutChart";
import BarChart from "@/components/BarChart";
import Divider from "@/components/Divider";

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
    <div>
      <div className="xl:w-1/2 w-10/12 mx-auto">
        <FormComponent />
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
            <div>
              <p className="text-3xl">Do you have issues, questions, or suggestions regarding the website?</p>
              <p className="text-xl">We would love to hear your thoughts, concerns or problems with anything so we can improve!</p>
            </div>
          </div>
        </>
      )}


    </div>
  );
}
