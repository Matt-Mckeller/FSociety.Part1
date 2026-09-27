import { getStandardEmailFooter } from '../wrappers/standard-footer';
import { wrapEmailBody } from '../wrappers/wrap-email-body';
export const getPasswordUpdateSuccessEmail = ({
  fullName,
  browserTabTitle,
}) => {
  // do not send yet
  const title = 'Password update successful.';
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
                      ${title}
                    </h1>
                  </td>
              </tr>
              <tr color="#010101">
                <td>
                  <p>Hello ${fullName},</p>
                  <p>Your Expanse Account password has been updated successfully. </p>
                  <p>
                    If you did not make this change, please contact us at ${process.env.SUPPORT_EMAIL} and visit <a href="${process.env.WEBSITE_URL}">${process.env.WEBSITE_URL}</a> to verify your account information is accurate and up-to-date.
                  </p>
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
