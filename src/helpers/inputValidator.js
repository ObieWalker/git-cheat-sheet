import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const AddCategoryValidator = (data) => {
  const categoryTitle = data.categoryTitle.trim(),
    errors = {};

  if (!validator.isEmpty(categoryTitle)) {
    if (!validator.isLength(categoryTitle, { min: 3, max: undefined })) {
      errors.categoryTitle = 'Please enter a valid category title.';
    }
  }
  else {
    errors.categoryTitle = 'The Category title cannot be empty.';
  }
  return { errors, isValid: isEmpty(errors) };
};

export const editCategoryValidator = (data) => {
  const categoryTitle = data.categoryTitle.trim(),
    errors = {};

    if (!validator.isEmpty(categoryTitle)) {
      if (!validator.isLength(categoryTitle, { min: 3, max: undefined })) {
        errors.categoryTitle = 'Please enter a valid category title.';
      }
    }
    else {
      errors.categoryTitle = 'There must be valid change to the category title.';
    }
    return { errors, isValid: isEmpty(errors) };
};

export const addCheatValidator = (data) => {
  const description = data.description.trim(),
    command = data.command.trim(),
  errors = {};

    if (!validator.isEmpty(description)) {
      if (validator.isLength(description, { min: 3, max: undefined })) {
        if (description.search(/[^A-Za-z\s]/) !== -1) {
          errors.description = 'The description should be in words only';
        } 
      } else {
        errors.description =
        'The description should be more than 3 letters.';
      }
    }
    else {
      errors.description = 'There must be a description.';
    }

    if (!validator.isEmpty(command)) {
      if (!validator.isLength(command, { min: 3, max: undefined})) {
        errors.command =
          'That does not seem like valid command.';
      }
    }
    else {
      errors.command = 'Command cannot be empty.';
    }
  
    return { errors, isValid: isEmpty(errors) };
};


export default AddCategoryValidator;
