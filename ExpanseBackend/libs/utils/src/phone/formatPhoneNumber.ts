import { parsePhoneNumberFromString } from 'libphonenumber-js';

export const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return phoneNumber;
  const phone = parsePhoneNumberFromString(phoneNumber, 'US');
  if (phone) {
    return phone.formatNational();
  }
  return phoneNumber;
};
