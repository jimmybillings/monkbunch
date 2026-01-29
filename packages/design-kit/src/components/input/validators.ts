/**
 * Validation utility functions for input components
 *
 * @packageDocumentation
 */

/**
 * Validator function type - returns true if valid, false if invalid
 */
export type ValidatorFn = (value: string) => boolean;

/**
 * Common validation functions
 */
export const validators = {
  /**
   * Validates that a value is not empty (after trimming whitespace)
   */
  required: (value: string): boolean => {
    return value.trim().length > 0;
  },

  /**
   * Validates email format using a comprehensive regex pattern
   * Pattern matches: username@domain.tld
   */
  email: (value: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
  },

  /**
   * Creates a validator that checks minimum length
   * @param min - Minimum number of characters
   */
  minLength: (min: number): ValidatorFn => {
    return (value: string): boolean => value.length >= min;
  },

  /**
   * Creates a validator that checks maximum length
   * @param max - Maximum number of characters
   */
  maxLength: (max: number): ValidatorFn => {
    return (value: string): boolean => value.length <= max;
  },

  /**
   * Creates a validator that checks against a custom regex pattern
   * @param regex - Regular expression to test against
   */
  pattern: (regex: RegExp): ValidatorFn => {
    return (value: string): boolean => regex.test(value);
  },

  /**
   * Validates US phone number format: (XXX) XXX-XXXX
   */
  phone: (value: string): boolean => {
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    return phoneRegex.test(value);
  },

  /**
   * Validates URL format
   */
  url: (value: string): boolean => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Validates that value is a number
   */
  number: (value: string): boolean => {
    return !isNaN(Number(value)) && value.trim() !== '';
  },

  /**
   * Creates a validator that checks minimum numeric value
   * @param min - Minimum numeric value
   */
  min: (min: number): ValidatorFn => {
    return (value: string): boolean => {
      const num = Number(value);
      return !isNaN(num) && num >= min;
    };
  },

  /**
   * Creates a validator that checks maximum numeric value
   * @param max - Maximum numeric value
   */
  max: (max: number): ValidatorFn => {
    return (value: string): boolean => {
      const num = Number(value);
      return !isNaN(num) && num <= max;
    };
  },

  /**
   * Validates US Social Security Number format: XXX-XX-XXXX
   */
  ssn: (value: string): boolean => {
    if (typeof value !== 'string') return false;

    const cleanSSN = value.replace(/[^0-9]/g, '');

    if (cleanSSN.length !== 9) return false;

    const areaNumber = parseInt(cleanSSN.substring(0, 3), 10);
    if (areaNumber === 0) return false;

    const groupNumber = parseInt(cleanSSN.substring(3, 5), 10);
    if (groupNumber === 0) return false;

    const serialNumber = parseInt(cleanSSN.substring(5, 9), 10);
    if (serialNumber === 0) return false;

    return true;
  },

  /**
   * Validates date is in the future (format: MM/DD/YYYY)
   */
  futureDate: (value: string): boolean => {
    const dateFormat = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;

    if (!dateFormat.test(value)) return false;

    const [month, day, year] = value.split('/').map(Number);
    const date = new Date(year, month - 1, day);

    if (isNaN(date.getTime())) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return date >= today;
  },
};
