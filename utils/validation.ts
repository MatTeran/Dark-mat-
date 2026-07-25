const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email.trim());
}

export function isValidPassword(password: string): boolean {
  return password.length >= 8;
}

export function getPasswordError(password: string): string | null {
  if (!password) {
    return 'Password is required.';
  }
  if (!isValidPassword(password)) {
    return 'Use at least 8 characters.';
  }
  return null;
}
