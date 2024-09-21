import Alert from 'react-bootstrap/Alert';

interface AlertDismissibleProps {
  variant: string;
  title: string;
  body: string;
  onClose: () => void;
}

function AlertDismissible({ variant, title: heading, body, onClose }: AlertDismissibleProps) {

  return (
    <Alert variant={variant} onClose={onClose} dismissible>
      <Alert.Heading>{heading}</Alert.Heading>
      <p>
        {body}
      </p>
    </Alert>
  );

}

export default AlertDismissible;