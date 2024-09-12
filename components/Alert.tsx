import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

interface AlertDismissibleProps {
    variant: string;
    title: string;
    body: string;
    onClose: () => any;
}

function AlertDismissible({variant, title: heading, body, onClose}: AlertDismissibleProps) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant={variant} onClose={onClose} dismissible>
        <Alert.Heading>{heading}</Alert.Heading>
        <p>
         {body}
        </p>
      </Alert>
    );
  }
  return <></>;
}

export default AlertDismissible;