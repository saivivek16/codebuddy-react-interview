import Form from 'react-bootstrap/Form';

const Form2 = ({
  handleChange,
  values: { firstName, lastName, address },
  handleBlurError,
  errors,
}) => (
  <>
    <Form.Group className="mb-3" controlId="formBasicFirstName">
      <Form.Label>First Name</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter firstname..."
        name="firstName"
        onChange={handleChange}
        value={firstName}
        minLength="2"
        maxLength="50"
        required
        onBlur={() => handleBlurError('firstName')}
      />
      {errors.firstName.required && <Form.Text className="text-danger"> required</Form.Text>}
      {errors.firstName.message && (
        <Form.Text className="text-danger"> {errors.firstName.message}</Form.Text>
      )}
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicLastName">
      <Form.Label>Last Name</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter lastname..."
        name="lastName"
        onChange={handleChange}
        value={lastName}
        // onBlur={() => handleBlurError('lastName')}
      />
    </Form.Group>
    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
      <Form.Label>Address</Form.Label>
      <Form.Control
        as="textarea"
        rows={3}
        name="address"
        onChange={handleChange}
        value={address}
        placeholder="Enter Address..."
        onBlur={() => handleBlurError('address')}
      />
      {errors.address.required && <Form.Text className="text-danger"> required</Form.Text>}
      {errors.address.message && (
        <Form.Text className="text-danger"> {errors.address.message}</Form.Text>
      )}
    </Form.Group>
  </>
);

export default Form2;
