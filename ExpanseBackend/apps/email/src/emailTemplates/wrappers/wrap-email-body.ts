import { getStandardEmailHeader } from './standard-header';
export const wrapEmailBody = (emailBody, browserTabTitle) => {
  return `
    ${getStandardEmailHeader({ browserTabTitle })}
    ${emailBody}
    </body>
    </html>
  `;
};
