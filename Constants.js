const authError = {
  REGISTRATION_ERROR: 'Registration error',
  AUTHORISATION_ERROR: 'Authorisation error',
  EMAIL_BUSY: 'Email is already busy',
  NOT_AUTHORISATION: "Not authorisation",
  ACCESS_DENIED: "Access denied",
  SOME: "Some error",
  InvalidData: (fieldName) => `Invalid ${fieldName}`,
  NotEmpty: (fieldEmail) => `The ${fieldEmail} must not be empty`,
  TooSmall: (count) => `Should not be less than ${count}`,
}

module.exports = authError