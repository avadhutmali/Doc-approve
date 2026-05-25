export const validators = {
  isEmail: email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),

  isUsername: username => /^[a-zA-Z0-9_]{3,20}$/.test(username),

  isPassword: password => Boolean(password && password.length >= 6),

  isNotEmpty: value => Boolean(value && value.trim().length > 0)
}

export const validateLoginForm = (username, password) => {
  const errors = {}

  if (!validators.isNotEmpty(username)) {
    errors.username = 'Username is required'
  }

  if (!validators.isNotEmpty(password)) {
    errors.password = 'Password is required'
  }

  return errors
}

export const validateRegisterForm = (username, password, confirmPassword) => {
  const errors = {}

  if (!validators.isUsername(username)) {
    errors.username = 'Username must be 3-20 characters (letters, numbers, underscore)'
  }

  if (!validators.isPassword(password)) {
    errors.password = 'Password must be at least 6 characters'
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }

  return errors
}

export const validateDocumentForm = (title, description, fileUrl) => {
  const errors = {}

  if (!validators.isNotEmpty(title)) {
    errors.title = 'Title is required'
  }

  if (!validators.isNotEmpty(description)) {
    errors.description = 'Description is required'
  }

  if (!validators.isNotEmpty(fileUrl)) {
    errors.fileUrl = 'File URL is required'
  }

  return errors
}

