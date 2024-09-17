"use client"

import { useState } from 'react';
import { useData } from '@/providers/DataContext';
import Form from 'react-bootstrap/Form';
import AlertDismissible from './Alert';

interface ExtractedData {
  student_name: string | null;
  preparation_date: string | null;
  requested_school: string | null;
  requested_major: string | null;
  majors: string[];
  certificates: string[];
  credits: {
    status: string;
    earned_credits: number;
    in_progress_credits: number;
    needed_credits: number;
  };
  in_progress_courses: Array<{
    semester: string;
    course_code: string;
    credits: number;
    status: string;
    course_name: string;
  }>;
  all_courses: Array<{
    course_code: string;
    credits: number;
    status: string;
    course_name: string;
  }>;
  completed_requirements: Array<{
    category: string;
    earned: string | null;
    details: string[];
  }>;
  unfulfilled_requirements: Array<{
    category: string;
    needs: string | null;
    earned: string | null;
    details: string[];
  }>;
}

function FormFile() {
  const [file, setFile] = useState<File | null>(null);
  const { data, setData } = useData()
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState<string | null>('')

  if (data) {
    return <button type="submit" onClick={() => setData(null)} className="btn btn-primary w-full mt-4 bg-red-700">Submit Another Report</button>
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/extract-data/', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setShowAlert(true);
        setError(data.detail)
        return;
      }

      setShowAlert(false)
      setData(data);
      console.log(data)
      // Handle the response data as needed
    } catch (error) {
      console.error('Error uploading file:', error);
      setError(error instanceof Error ? error.message : String(error));
      setShowAlert(true);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setData(null)
    }
  };
  return (
    <div className='mb-6'>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label className='text-center mx-auto font-semibold'>Upload PDF file</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} accept=".pdf" />
        </Form.Group>
        <button type="submit" disabled={!file} className="btn btn-primary w-full border-red-700 bg-red-700">Extract Data</button>
      </Form>
      {showAlert && (
        <div className='mt-2'>
          <AlertDismissible
            variant='danger'
            title='Unable to parse PDF.'
            body={error || 'Please ensure your PDF file is a DARS report.'}
            onClose={() => setShowAlert(false)}
          />
        </div>
      )}
    </div>
  );
}

export default FormFile;