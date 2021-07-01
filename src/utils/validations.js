const EMAIL_REG = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const PASS_MIN_LENGTH = 8;
const MIN_AGE = 13;
const MAX_AGE = 90;

const NAME_MIN_LENGTH = 3;
const NAME_MAX_LENGTH = 20;

const TITLE_MIN_LENGTH = 3;
const TITLE_MAX_LENGTH = 200;

const BODY_MIN_LENGTH = 10;
const BODY_MAX_LENGTH = 4000;

const ABOUT_MAX_LENGTH = 1000;
const SUBJECT_MIN_LENGTH = 3;
const SUBJECT_MAX_LENGTH = 200;

const DESCRIPTION_MIN_LENGTH = 10;
const DESCRIPTION_MAX_LENGTH = 4000;

const errMsgs = {
  required: "This field is required.",
  invalidEmail: "Please Enter a valid email.",
  passwordMinLength: "Password must be at least 8 chars.",
  invalidDOB: `Age must be between ${MIN_AGE} and ${MAX_AGE} years old.`,
  passwordsMatch: "Passwords don't match.",
  nameMaxLength: `Name must not exceed ${NAME_MAX_LENGTH} chars.`,
  nameMinLength: `Name must be at least ${NAME_MIN_LENGTH} chars.`,
  titleMaxLength: `Title must not exceed ${TITLE_MAX_LENGTH} chars.`,
  titleMinLength: `Title must be at least ${TITLE_MIN_LENGTH} chars.`,
  bodyMaxLength: `body must not exceed ${BODY_MAX_LENGTH} chars.`,
  bodyMinLength: `body must be at least ${BODY_MIN_LENGTH} chars.`,
  aboutMaxLength: `body must not exceed ${ABOUT_MAX_LENGTH} chars.`,

  subjectMaxLength: `body must not exceed ${SUBJECT_MAX_LENGTH} chars.`,
  subjectMinLength: `body must be at least ${SUBJECT_MIN_LENGTH} chars.`,
  descriptionMaxLength: `body must not exceed ${DESCRIPTION_MAX_LENGTH} chars.`,
  descriptionMinLength: `body must be at least ${DESCRIPTION_MIN_LENGTH} chars.`,
};

const required = (field) => {
  const errorArr = [];

  if (!field) errorArr.push(errMsgs.required);

  return errorArr;
};

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
};

const password = (password) => {
  const errorArr = required(password);

  if (errorArr.length) return errorArr;

  // validate length
  if (password.length < PASS_MIN_LENGTH)
    errorArr.push(errMsgs.passwordMinLength);

  return errorArr;
};

const passwordsMatch = (password, cpassword) => {
  const errorArr = required(cpassword);

  if (errorArr.length) return errorArr;

  // validate length
  if (password !== cpassword) errorArr.push(errMsgs.passwordsMatch);

  return errorArr;
};

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

const title = (title) => {
  const errorArr = required(title);

  if (errorArr.length) return errorArr;

  if (title.length > TITLE_MAX_LENGTH) errorArr.push(errMsgs.titleMaxLength);
  else if (title.length < TITLE_MIN_LENGTH)
    errorArr.push(errMsgs.titleMinLength);

  return errorArr;
};

const body = (body) => {
  const errorArr = required(body);

  if (errorArr.length) return errorArr;

  if (body.length > BODY_MAX_LENGTH) errorArr.push(errMsgs.bodyMaxLength);
  else if (body.length < BODY_MIN_LENGTH) errorArr.push(errMsgs.bodyMinLength);

  return errorArr;
};

const aboutSection = (text) => {
  const errorArr = [];
  if (text.length > ABOUT_MAX_LENGTH) errorArr.push(errMsgs.AboutMaxLength)

  return errorArr;
}
const subject = (subject) => {
  const errorArr = required(subject);

  if (errorArr.length) return errorArr;

  if (subject.length > SUBJECT_MAX_LENGTH)
    errorArr.push(errMsgs.subjectMaxLength);
  else if (subject.length < SUBJECT_MIN_LENGTH)
    errorArr.push(errMsgs.subjectMinLength);

  return errorArr;
};

const description = (description) => {
  const errorArr = required(description);

  if (errorArr.length) return errorArr;

  if (description.length > DESCRIPTION_MAX_LENGTH)
    errorArr.push(errMsgs.descriptionMaxLength);
  else if (description.length < DESCRIPTION_MIN_LENGTH)
    errorArr.push(errMsgs.descriptionMinLength);

  return errorArr;
};

const validate = {
  email,
  password,
  dateOfBirth,
  passwordsMatch,
  name,
  required,
  title,
  body,
  aboutSection,
  subject,
  description,
};

export default validate;
