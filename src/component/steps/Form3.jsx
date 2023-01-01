import Form from 'react-bootstrap/Form';

const Form3 = ({
  handleChange,
  values: { countryCode, phoneNumber, acceptTermsAndCondition },
  handleBlurError,
  errors,
}) => {
  const handleKeyDown = e => {
    const invalidChars = ['-', '+', 'e'];
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
        <Form.Label>Select Country Code</Form.Label>
        <Form.Select
          aria-label="Default select example"
          name="countryCode"
          onChange={handleChange}
          value={countryCode}
          placeholder="select country code.."
          onBlur={() => handleBlurError('countryCode')}
        >
          <option value="">None</option>
          <option value="+91">india(+91)</option>
          <option value="+1">america(+1)</option>
        </Form.Select>
        {errors.countryCode.required && <Form.Text className="text-danger"> required</Form.Text>}
        {errors.countryCode.message && (
          <Form.Text className="text-danger"> {errors.countryCode.message}</Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter Phone Number..."
          onChange={handleChange}
          name="phoneNumber"
          value={phoneNumber}
          onKeyDown={handleKeyDown}
          onBlur={() => handleBlurError('phoneNumber')}
        />
        {errors.phoneNumber.required && <Form.Text className="text-danger"> required</Form.Text>}
        {errors.phoneNumber.message && (
          <Form.Text className="text-danger"> {errors.phoneNumber.message}</Form.Text>
        )}
      </Form.Group>
      <div key="default-checkbox" className="mb-3" onChange={handleChange}>
        <Form.Check
          type="checkbox"
          id="default-checkbox"
          label="Agree Terms and Conditions"
          name="acceptTermsAndCondition"
          checked={acceptTermsAndCondition}
          onBlur={() => handleBlurError('acceptTermsAndCondition')}
        />
        {errors.acceptTermsAndCondition.required && (
          <Form.Text className="text-danger"> required</Form.Text>
        )}
        {errors.acceptTermsAndCondition.message && (
          <Form.Text className="text-danger"> {errors.acceptTermsAndCondition.message}</Form.Text>
        )}
      </div>
    </Form>
  );
};

export default Form3;
