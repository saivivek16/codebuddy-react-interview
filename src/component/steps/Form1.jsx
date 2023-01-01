import Form from 'react-bootstrap/Form';

const Form1 = ({ handleChange, values: { emailId, password }, handleBlurError, errors }) => (
  <>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control
        type="email"
        placeholder="Enter email...."
        name="emailId"
        onChange={handleChange}
        value={emailId}
        onBlur={() => handleBlurError('emailId')}
        required
      />
      {errors.emailId.required && <Form.Text className="text-danger"> required</Form.Text>}
      {errors.emailId.message && (
        <Form.Text className="text-danger"> {errors.emailId.message}</Form.Text>
      )}
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control
        type="password"
        placeholder=" Enter password...."
        name="password"
        onChange={handleChange}
        value={password}
        onBlur={() => handleBlurError('password')}
      />
      {errors.password.required && <Form.Text className="text-danger"> required</Form.Text>}
      {errors.password.message && (
        <Form.Text className="text-danger"> {errors.password.message}</Form.Text>
      )}
    </Form.Group>
  </>
);

export default Form1;
