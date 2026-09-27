import { wrapEmailBody } from '../wrappers/wrap-email-body';
import { getStandardEmailFooter } from '../wrappers/standard-footer';
import { Dictionary as EmailDictionary } from '../dictionary';
export const getContactSuccessEmail = ({
  email,
  fullName,
  phoneNumber,
  browserTabTitle,
  Dictionary,
}) => {
  // do not send yet
  // append header
  const body = `
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="contentBody">
      <tr>
        <td>&nbsp;</td>
        <td class="container">
          <div class="content">
            <!-- START CENTERED WHITE CONTAINER -->
            <table role="presentation" class="main">
              <!-- START MAIN CONTENT AREA -->
              <tr>
                <td class="wrapper">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                  <tr style="text-align: center">
                  <td>
                    <h1>
                      ${Dictionary.en.contactSuccessEmail.emailTitle}
                    </h1>
                  </td>
                </tr>
                    <tr color="#010101">
                      <td>
                        <p>${Dictionary.en.contactSuccessEmail.greetings(fullName)}</p>
                        <p>${Dictionary.en.contactSuccessEmail.bodyText}</p>
                        <p style="margin: 0">
                          <span style="font-style: italic; font-weight: 600">${Dictionary.en.contactSuccessEmail.emailLabel}: </span>
                          ${email && email.length > 0 ? email : 'Unknown'}
                        </p>
                        <p style="margin-top: 0">
                          <span style="font-style: italic; font-weight: 600">${Dictionary.en.contactSuccessEmail.phoneLabel}: </span>
                          ${phoneNumber && phoneNumber.length ? phoneNumber : 'Unknown'}
                        </p>
                      </td>
                    </tr>
                    <tr color="#010101">
                      <td>
                        <p style="margin: 0">${EmailDictionary.en.closingSignature.bestRegards},</p>
                        <p style="margin: 0">${EmailDictionary.en.matthewsName}</p>
                        <p style="margin-top: 0">${EmailDictionary.en.contactPhoneNumber()}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

            <!-- END MAIN CONTENT AREA -->
            </table>
            <!-- END CENTERED WHITE CONTAINER -->

            <!-- START FOOTER -->
            ${getStandardEmailFooter()}
            <!-- END FOOTER -->

          </div>
        </td>
        <td>&nbsp;</td>
      </tr>
    </table>
  `;
  // append footer
  return wrapEmailBody(body, browserTabTitle);
};
