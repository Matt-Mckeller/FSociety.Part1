import React from "react"
import { Box, Typography, Link } from "@mui/material"

export function CollectedInformationPrivacyPolicySection() {
  return (
    <Box>
      <Typography variant="h4" component="h2" mb={2} id="collected-information">
        1. WHAT INFORMATION DO WE COLLECT?
      </Typography>
      <Typography className="bold">
        <span>Personal information you disclose to us</span>
      </Typography>
      <Typography variant="body1" component="p">
        We collect personal information that you voluntarily provide to us when
        you register on the Website, express an interest in obtaining
        information about us or our products and Services, when you participate
        in activities on the Website or otherwise when you contact us.
      </Typography>

      <Typography variant="body1" component="p">
        The personal information that we collect depends on the context of your
        interactions with us and the Website, the choices you make and the
        products and features you use. The personal information we collect may
        include the following:
      </Typography>

      <ul>
        <li>
          <Typography variant="body1" component="p">
            <span className="bold">Personal Information Provided by You. </span>
            We collect names; phone numbers; email addresses; mailing addresses;
            job titles; usernames; passwords; contact preferences; contact or
            authentication data; billing addresses; and other similar
            information. All personal information that you provide to us must be
            true, complete and accurate, and you must notify us of any changes
            to such personal information.
          </Typography>
        </li>
        {/* <li>
          <Typography>
            <span className="bold">Payment Data. </span>
            <span>We may collect data necessary to process your payment if you make purchases, such as your payment instrument number (such as a credit card number), and the security code associated with your payment instrument. All payment data is stored by Stripe. You may find their privacy notice link(s) here: </span>
            <span><Link href="https://stripe.com/privacy">https://stripe.com/privacy</Link></span>
            <span>.</span>
          </Typography>
        </li>
        <li>
          <Typography>
            <span className="bold">Social Media Login Data.</span>
            <span>&nbsp;We may provide you with the option to register with us using your existing social media account details, like your Google, Facebook, Twitter, or other social media account. If you choose to register in this way, we will collect the information described in the section called &quot;HOW DO WE HANDLE YOUR SOCIAL LOGINS?&quot; below.</span>
          </Typography>
        </li> */}
      </ul>

      <Typography className="bold no-margin">
        Information automatically collected:
      </Typography>
      <ul>
        <li>
          <Typography variant="body1" component="p">
            <span className="bold">IP and User Agent. </span> your Internet
            Protocol (IP) address and/or browser and device characteristics — is
            collected automatically when you visit our Website. We automatically
            collect certain information when you visit, use or navigate the
            Website. This information does not reveal your specific identity
            (like your name or contact information) but may include device and
            usage information, such as your IP address, browser and device
            characteristics, operating system, language preferences, referring
            URLs, device name, country, location, information about how and when
            you use our Website and other technical information. This
            information is primarily needed to maintain the security and
            operation of our Website, and for our internal analytics and
            reporting purposes. Like many businesses, we also collect
            information through cookies and similar technologies.
          </Typography>
        </li>
        <li>
          <Typography variant="body1" component="p">
            <span className="bold">Log and Usage Data.</span>
            &nbsp;Log and usage data is service-related, diagnostic, usage and
            performance information our servers automatically collect when you
            access or use our Website and which we record in log files.
            Depending on how you interact with us, this log data may include
            your IP address, device information, browser type and settings and
            information about your activity in the Website (such as the
            date/time stamps associated with your usage, pages and files viewed,
            searches and other actions you take such as which features you use),
            device event information (such as system activity, error reports
            (sometimes called &apos;crash dumps&apos;) and hardware settings).
          </Typography>
        </li>
        <li>
          <Typography variant="body1" component="p">
            <span className="bold">Device Data.</span>
            &nbsp;We collect device data such as information about your
            computer, phone, tablet or other device you use to access the
            Website. Depending on the device used, this device data may include
            information such as your IP address (or proxy server), device and
            application identification numbers, location, browser type, hardware
            model, Internet service provider and/or mobile carrier, operating
            system and system configuration information.
          </Typography>
        </li>
        <li>
          <Typography variant="body1" component="p">
            <span className="bold">Location Data.</span>
            &nbsp;Our system utilizes Google Analytics, which may collect
            approximate location data based on IP addresses. This information
            assists us in obtaining broad geographical insights, enhancing our
            services, tailoring content, and analyzing user patterns. It's
            important to note that Google Analytics processes IP addresses in a
            way that prioritizes user privacy by anonymizing the data,
            maintaining individual user anonymity throughout this process.
          </Typography>
        </li>
      </ul>
    </Box>
  )
}
