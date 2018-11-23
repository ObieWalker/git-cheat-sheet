import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


const formIsValid = (data) => {
  const errors = {};

  if (!validator.isEmpty(data.email)) {
    if (!validator.isEmail(data.email)) {
      errors.email = 'Invalid email address';
    }
  } else { errors.email = 'Your email address is required'; }


  if (!validator.isEmpty(data.username)) {
    if (!validator.isLength(data.username, { min: 3, max: undefined })) {
      errors.username = 'Your username has to be more than 2 characters';
    }
  } else { errors.username = 'The username field is required'; }

  if (!validator.isEmpty(data.password)) {
    if (!validator.isLength(data.password, { min: 6, max: undefined })) {
      errors.password = 'Your password must contain 6 or more characters';
    }
  } else {
    errors.password = 'Your password is required';
  }

  return { errors, isValid: isEmpty(errors) };
};
export default formIsValid;
