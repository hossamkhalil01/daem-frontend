const EMAIL_REG = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const PASS_MIN_LENGTH = 8;
const MIN_AGE = 13;
const MAX_AGE = 90;

const NAME_MIN_LENGTH = 3;
const NAME_MAX_LENGTH = 20;

const errMsgs = {
  required: "This field is required.",
  invalidEmail: "Please Enter a valid email.",
  passwordMinLength: "Password must be at least 8 chars.",
  invalidDOB: `Age must be bewteen ${MIN_AGE} and ${MAX_AGE} years old.`,
  passwordsMatch: "Passwords don't match.",
  nameMaxLength: `Name must not exceed ${NAME_MAX_LENGTH} chars.`,
  nameMinLength: `Name must be at least ${NAME_MIN_LENGTH} chars.`,
}


const required = (field) => {

  const errorArr = [];

  if (!field) errorArr.push(errMsgs.required)

  return errorArr;
}

const email = (email) => {

  const errorArr = required(email);

  if (errorArr.length) return errorArr;

  if (!email.match(EMAIL_REG)) errorArr.push(errMsgs.invalidEmail);

  return errorArr;
};

const name = (name) => {

  const errorArr = required(name);

  if (errorArr.length) return errorArr;

  if (name.length > NAME_MAX_LENGTH) errorArr.push(errMsgs.nameMaxLength);

  else if (name.length < NAME_MIN_LENGTH) errorArr.push(errMsgs.nameMinLength);

  return errorArr;
}

const password = (password) => {

  const errorArr = required(password);

  if (errorArr.length) return errorArr;

  // validate length
  if (password.length < PASS_MIN_LENGTH) errorArr.push(errMsgs.passwordMinLength);

  return errorArr
};


const passwordsMatch = (password, cpassword) => {

  const errorArr = required(cpassword);

  if (errorArr.length) return errorArr;

  // validate length
  if (password !== cpassword) errorArr.push(errMsgs.passwordsMatch);

  return errorArr
}

const dateOfBirth = (dob) => {

  const errorArr = required(dob);

  if (errorArr.length) return errorArr;
  // calc age
  const date = new Date(dob);
  const now = new Date(Date.now());
  const age = now.getFullYear() - date.getFullYear();

  if (age < MIN_AGE) errorArr.push(errMsgs.invalidDOB);

  return errorArr;
};

const validate = {
  email,
  password,
  dateOfBirth,
  passwordsMatch,
  name,
  required
}

export default validate;

