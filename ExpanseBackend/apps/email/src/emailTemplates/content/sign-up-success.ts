import { getStandardEmailFooter } from '../wrappers/standard-footer';
import { wrapEmailBody } from '../wrappers/wrap-email-body';
export const getSignUpSuccessEmail = ({ browserTabTitle }) => {
  // append header
  // Subject: you're in
  const body = `
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="contentBody">
   <tr>
      <td class="container" style="padding: 0">
         <div class="content">
            <!-- START CENTERED WHITE CONTAINER -->
            <table role="presentation" class="main">
               <!-- START MAIN CONTENT AREA -->
               <tr>
                  <td class="wrapper" style="padding: 0">
                     <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                           <td style="text-align: center">
                           </td>
                        </tr>
                        <tr style="text-align: center">
                           <td>
                              <h1 style="line-height: 1">
                                 Come on in!
                              </h1>
                           </td>
                        </tr>
                        <tr>
                           <td style="padding: 0">
                              <p style="margin-bottom: 0px; letter-spacing: 0.09px;">Welcome to Expanse, where everyone is greeted with open arms. We hope you find your stay here pleasurable.</p>
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
   </tr>
</table>
  `;
  return wrapEmailBody(body, browserTabTitle);
};
