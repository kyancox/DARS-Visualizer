"use client"

import Form from 'react-bootstrap/Form';

function FormFileExample() {
  return (
    <div className='w-1/3 mx-auto'>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label className='text-center mx-auto'>Default file input example</Form.Label>
        <Form.Control type="file" />
      </Form.Group>
    </div>
  );
}

export default FormFileExample;