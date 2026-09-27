import { getStandardEmailFooter } from '../wrappers/standard-footer';
import { wrapEmailBody } from '../wrappers/wrap-email-body';
export const getPasswordResetEmail = ({
  resetPasscode,
  fullName,
  userEmailAddress,
  browserTabTitle,
}) => {
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
                      Password reset request.
                    </h1>
                </td>
              </tr>
                    <tr>
                      <td color="#010101">
                        <p>Hello ${fullName},</p>
                        <p>A request to reset your Expanse account password or unlock your account has been initiated.</p>
                        <p>
                          If you did not make this change, please contact us at ${process.env.SUPPORT_EMAIL} and visit <a href="${process.env.WEBSITE_URL}">${process.env.WEBSITE_URL}</a> to verify your account information is accurate and up-to-date. To continue with this request, enter the code below on the verification page:
                        </p>
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-top: 15px">
                          <tbody>
                            <tr>
                              <td align="left">
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-top: 15px">
                                  <tbody>
                                    <tr>
                                    <td style="width: 33%;"></td>
                                      <td style="background-color: #7709F0;
                                      padding: 8px; color: white;
                                      width: 160px; text-align: center;
                                      border-radius: 8px;">
                                        <b>${resetPasscode}<b>
                                      </td>
                                      <td style="width: 33%"></td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
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
