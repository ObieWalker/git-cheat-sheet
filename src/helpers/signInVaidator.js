import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const formIsValid = (data) => {
  const errors = {};

  if (!validator.isEmpty(data.email)) {
    if (!validator.isEmail(data.email)) {
      errors.email = 'The email is invalid';
    }
  } else { errors.email = 'Your email is required'; }

  if (validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }

  return { errors, isValid: isEmpty(errors) };
};

export default formIsValid;
