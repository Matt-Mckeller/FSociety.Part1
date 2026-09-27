// todo: multi language dictionary, not highly valuable to me yet
export const getStandardEmailFooter = () => {
  if (!process.env.WEBSITE_URL) {
    console.error('Expanse website url environment variable was not set.');
  }
  if (!process.env.COMPANY_NAME) {
    console.error('Expanse company name environment variable was not set.');
  }
  if (!process.env.SUPPORT_EMAIL) {
    console.error('Expanse support email environment variable was not set.');
  }
  console.log('returning footer');
  return `
        <div class="footer" style="margin-top: 9px;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td style="padding: 0;">
                <a href="${process.env.WEBSITE_URL || ''}">Home</a> | <a href="${process.env.WEBSITE_URL || ''}${process.env.PRIVACY_POLICY_PATH}">Privacy Policy</a> | <a href="mailto:${process.env.SUPPORT_EMAIL || ''}">Support</a>
                </td>
            </tr>
            <tr>
                <td style="padding: 0;">
                © ${process.env.COMPANY_NAME || ''}, United States. All Rights Reserved
                </td>
            </tr> 
            </table>
        </div>
    `;
};
