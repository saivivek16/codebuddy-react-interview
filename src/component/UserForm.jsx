import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import Form1 from './steps/Form1';
import Form2 from './steps/Form2';
import Form3 from './steps/Form3';

const UserForm = () => {
  // Steps
  const [activeStep, setActiveStep] = useState(0);

  // State variables
  const [multiFormValues, setMultiFormValues] = useState({
    emailId: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    countryCode: '',
    phoneNumber: '',
    acceptTermsAndCondition: false,
  });

  const [errors, setErrors] = useState({
    emailId: { required: false, message: '' },
    password: { required: false, message: '' },
    firstName: { required: false, message: '' },
    lastName: { required: false, message: '' },
    address: { required: false, message: '' },
    countryCode: { required: false, message: '' },
    phoneNumber: { required: false, message: '' },
    acceptTermsAndCondition: { required: false, message: '' },
  });

  const navigate = useNavigate();

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails')) || multiFormValues;
    setMultiFormValues(userDetails);
  }, []);

  useEffect(() => {
    setErrors({
      emailId: { required: false, message: '' },
      password: { required: false, message: '' },
      firstName: { required: false, message: '' },
      lastName: { required: false, message: '' },
      address: { required: false, message: '' },
      countryCode: { required: false, message: '' },
      phoneNumber: { required: false, message: '' },
      acceptTermsAndCondition: { required: false, message: '' },
    });
  }, [activeStep, multiFormValues]);

  // Navigates to the Previous page
  const handleBack = () => {
    setActiveStep(previousStep => previousStep - 1);
  };

  // save it to localstorage
  const handleSave = () => {
    localStorage.setItem('userDetails', JSON.stringify(multiFormValues));
    if (activeStep === 2) {
      const {
        countryCode,
        phoneNumber,
        acceptTermsAndCondition,
        firstName,
        lastName,
        emailId,
        password,
        address,
      } = multiFormValues;

      // countrycode validation
      if (!countryCode) {
        setErrors(prev => ({
          ...prev,
          countryCode: {
            ...errors.countryCode,
            required: true,
          },
        }));
      }

      // phone number validation
      if (!(phoneNumber.length === 10)) {
        setErrors(prev => ({
          ...prev,
          phoneNumber: {
            ...errors.phoneNumber,
            message: 'Mobile Number must be 10 digits',
          },
        }));
      }

      if (!phoneNumber) {
        setErrors(prev => ({
          ...prev,
          phoneNumber: {
            ...errors.phoneNumber,
            required: true,
          },
        }));
      }

      // accepttermsandcondition validation
      if (acceptTermsAndCondition === false) {
        setErrors(prev => ({
          ...prev,
          acceptTermsAndCondition: {
            ...errors.acceptTermsAndCondition,
            message: 'Please accept Terms and Conditions',
          },
        }));
      }

      if (!acceptTermsAndCondition) {
        setErrors(prev => ({
          ...prev,
          acceptTermsAndCondition: {
            ...errors.acceptTermsAndCondition,
            required: true,
          },
        }));
      }

      if (countryCode && phoneNumber.length === 10 && acceptTermsAndCondition) {
        fetch('https://codebuddy.review/submit', {
          // Adding method type
          method: 'POST',
          // Adding body or contents to send
          body: JSON.stringify({
            emailId,
            password,
            firstName,
            lastName,
            address,
            countryCode,
            phoneNumber,
          }),
          // headers: {
          //   'Content-type': 'application/json; charset=UTF-8',
          // },
        })
          .then(res => res.json())
          .then(data => {
            if (data.message === 'Success') {
              navigate('/posts');
            }
          })
          .catch(err => console.log(err));
      }
    }
  };

  const saveAndNextStep = () => {
    handleSave();
    setActiveStep(prev => prev + 1);
  };

  // Navigates to the next page
  const handleNext = () => {
    const { emailId, password, firstName, address } = multiFormValues;
    if (activeStep === 0) {
      const emailRegrex = /(.+)@(.+){2,}.(.+){2,}/;
      const passwordRegrex = /(?=(.*\d){2})(?=(.*[a-z]){2})(?=(.*[A-Z]){2})(?=(.*[!@#$%]){2})/;

      // email validation
      if (emailId && !emailRegrex.test(emailId)) {
        setErrors(prev => ({
          ...prev,
          emailId: { ...errors.emailId, message: 'please check emailId' },
        }));
      }

      if (!emailId) {
        setErrors(prev => ({
          ...prev,
          emailId: { ...errors.emailId, required: true },
        }));
      }

      // password validation
      if (password && !passwordRegrex.test(password)) {
        setErrors(prev => ({
          ...prev,
          password: {
            ...errors.password,
            message:
              'Must contain minimum 2 capital letters, 2 small letter, 2 numbers and 2 special characters',
          },
        }));
      }

      if (!password) {
        setErrors(prev => ({
          ...prev,
          password: {
            ...errors.password,
            required: true,
          },
        }));
      }

      if (emailId && emailRegrex.test(emailId) && password && passwordRegrex.test(password)) {
        saveAndNextStep();
      }
    }

    if (activeStep === 1) {
      // firstname Validation
      if (firstName.length < 2) {
        setErrors(prev => ({
          ...prev,
          firstName: { ...errors.firstName, message: 'Minimum of 2 character and maximum 50' },
        }));
      }

      if (!firstName) {
        setErrors(prev => ({
          ...prev,
          firstName: { ...errors.firstName, required: true },
        }));
      }

      // address validation
      if (address.length < 10) {
        setErrors(prev => ({
          ...prev,
          address: { ...errors.address, message: 'Minimum length 10' },
        }));
      }

      if (!address) {
        setErrors(prev => ({
          ...prev,
          address: { ...errors.address, required: true },
        }));
      }

      if (firstName && firstName.length >= 2 && address.length >= 10) {
        saveAndNextStep();
      }
    }
  };

  // Handle form value state on change
  const handleChange = event => {
    if (event.target.name === 'acceptTermsAndCondition')
      setMultiFormValues({
        ...multiFormValues,
        acceptTermsAndCondition: !multiFormValues.acceptTermsAndCondition,
      });
    else if (event.target.name === 'firstName' || event.target.name === 'lastName') {
      setMultiFormValues({
        ...multiFormValues,
        [event.target.name]: event.target.value.replace(/[^a-z]/gi, ''),
      });
    } else {
      setMultiFormValues({
        ...multiFormValues,
        [event.target.name]: event.target.value,
      });
    }
  };

  // blurr errors
  const handleBlurError = key => {
    if (!multiFormValues[key]) {
      setErrors(prev => ({
        ...prev,
        [key]: { ...errors[key], required: true },
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        [key]: { ...errors[key], required: false },
      }));
    }
  };

  return (
    <>
      <h1 className="text-center">Multi Step Form</h1>
      <div className="container">
        <Form>
          {activeStep === 0 && (
            <Form1
              handleChange={handleChange}
              values={multiFormValues}
              errors={errors}
              handleBlurError={handleBlurError}
            />
          )}
          {activeStep === 1 && (
            <Form2
              handleChange={handleChange}
              values={multiFormValues}
              handleBlurError={handleBlurError}
              errors={errors}
            />
          )}
          {activeStep === 2 && (
            <Form3
              handleChange={handleChange}
              values={multiFormValues}
              handleBlurError={handleBlurError}
              errors={errors}
            />
          )}
          <Button onClick={handleBack} className="mx-2" disabled={activeStep === 0}>
            Back
          </Button>
          <Button className="mx-2" onClick={handleSave}>
            Save
          </Button>
          <Button onClick={handleNext} disabled={activeStep === 2}>
            Save and Next
          </Button>
        </Form>
      </div>
    </>
  );
};

export default UserForm;
