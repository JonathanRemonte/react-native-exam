export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validateLogin = (email, password) => {
  if (!email && !password) {
    return 'Please fill all fields.';
  }

  if (!isValidEmail(email)) {
    return 'Please enter a valid email address.';
  }

  if (email && !password) {
    return 'Please enter a password.';
  }

  return '';
};

export const validateResetPassword = (email) => {
  if (!email) {
    return 'Please enter your email.';
  }

  if (!isValidEmail(email)) {
    return 'Please enter a valid email address.';
  }

  return '';
};

export const validateRegister = (firstName, lastName, email, password, confirmPassword, code) => {
  if (!firstName && !lastName && !email && !password && !confirmPassword && !code) {
    return 'All fields are required. Please fill all fields.';
  }

  if (!firstName) {
    return 'Please enter your first name.';
  }

  if (!lastName) {
    return 'Please enter your last name.';
  }

  if (!email) {
    return 'Please enter your email address.';
  }

  if (!isValidEmail(email)) {
    return 'Please enter a valid email address.';
  }

  if (!password) {
    return 'Please enter a password.';
  }

  if (password.length < 6) {
    return 'Password must be at least 6 characters.';
  }

  if (!confirmPassword) {
    return 'Please confirm your password.';
  }

  if (password !== confirmPassword) {
    return 'Passwords do not match.';
  }

  if (!code){
    return 'Please enter a recruitment code.';
  }

  return '';
};