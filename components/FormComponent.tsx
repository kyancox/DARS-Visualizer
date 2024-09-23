"use client"

import { useState } from 'react';
import { useData } from '@/providers/DataContext';
import Form from 'react-bootstrap/Form';
import { sendGAEvent } from '@next/third-parties/google';
import AlertDismissible from './Alert';

function FormFile() {
  const [file, setFile] = useState<File | null>(null);
  const { data, setData } = useData()
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState<string | null>('')
  const [loading, setLoading] = useState(false)

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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const aws = 'https://api.darsvisualizer.com/extract-data/'
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const localhost = 'http://localhost:8000/extract-data'

    sendGAEvent('event', 'extract_data')

    try {
      const response = await fetch(aws, {
        method: 'POST',
        body: formData,
      });
      setLoading(true)

      const data = await response.json();

      if (!response.ok) {
        setLoading(false)
        setShowAlert(true);
        setError(data.detail)
        return;
      }

      setShowAlert(false)
      setLoading(false)
      setData(data);
      setFile(null)
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
    <div className='md:mb-4 mb-6'>
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
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label className='text-center mx-auto font-semibold'>Upload PDF file</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} accept=".pdf" />
        </Form.Group>
        {loading && (
          <div className="d-flex align-items-center mb-4">
            <strong>Loading...</strong>
            <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
          </div>
        )
        }
        <button type="submit" disabled={!file} className="btn btn-primary w-full border-red-700 bg-red-700">Extract Data</button>
      </Form>
    </div>
  );
}

export default FormFile;