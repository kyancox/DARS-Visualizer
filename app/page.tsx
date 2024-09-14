"use client"
import FormComponent from "@/components/FormComponent";
import Button from 'react-bootstrap/Button';
import Image from "next/image";
import ProgressBar from "@/components/ProgressBar";
import { useData } from "@/providers/DataContext";
import { useEffect, useState } from "react";
import Tabs from "@/components/Tabs";
import DonutChart from "@/components/DonutChart";

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
      <div className='xl:w-2/3 w-10/12 mx-auto'>
        {data && (
          <div>
            <p className='text-center text-xl font-bold'>{name} DARS Report</p>
            <p className='text-center text-xl font-bold'>{data.requested_school}</p>
            <p className='text-center text-xl font-bold'>{data.requested_major}</p>
            {data.majors.length > 0 && (
              <div className="flex flex-row items-center justify-center">
                <p className='text-center text-xl font-bold'>Declared majors:&nbsp;
                  {data.majors.map((major, index) => (
                    <span key={index} className="text-xl font-bold">
                      {index > 0 ? ', ' : ''}{major}
                    </span>
                  ))}
                </p>
              </div>
            )}
            {data.certificates.length > 0 && (
              <div className="flex flex-row items-center justify-center">
                <p className='text-center text-xl font-bold'>Declared certificates:&nbsp;
                  {data.certificates.map((certificate, index) => (
                    <span key={index} className="text-xl font-bold">
                      {index > 0 ? ', ' : ''}{certificate}
                    </span>
                  ))}
                </p>
              </div>
            )}
            <p className='text-center text-xl font-bold'>Prepared on: {data.preparation_date}</p>
          </div>
        )}
        <DonutChart />
        <ProgressBar />
      </div>
      <div className="xl:w-3/4 md:w-11/12 mx-auto">
        <Tabs />
      </div>
      <>
        {/* <Button variant="primary">Primary</Button>{' '}
        <Button variant="secondary">Secondary</Button>{' '}
        <Button variant="success">Success</Button>{' '}
        <Button variant="warning">Warning</Button>{' '}
        <Button variant="danger">Danger</Button>{' '}
        <Button variant="info">Info</Button>{' '}
        <Button variant="light">Light</Button>{' '}
        <Button variant="dark">Dark</Button>
        <Button variant="link">Link</Button> */}
      </>

    </div>
  );
}
