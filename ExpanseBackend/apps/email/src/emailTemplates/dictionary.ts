import { formatPhoneNumber } from '@libs/utils/phone';

export const Dictionary = {
  en: {
    closingSignature: {
      bestRegards: 'Best Regards',
    },
    matthewsName: 'Matthew Mckeller',
    contactPhoneNumber: () =>
      formatPhoneNumber(process.env.COMPANY_PHONE_NUMBER) || '',
  },
};
