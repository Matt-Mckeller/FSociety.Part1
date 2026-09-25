import React from "react"
import { Box, Typography, Link, List, ListItem } from "@mui/material"
import { EXPANSE_TERMS_OF_SERVICE_SECTIONS } from "../terms-of-service-sections.enum"

export function ProhibitedActivitiesSection({
  id,
  title,
}: {
  id: string
  title: string
}) {
  return (
    <Box>
      <Typography variant="h4" component="h2" mb={2} id={id}>
        {title}
      </Typography>
      <Typography mb={2}>
        You may not access or use the Site for any purpose other than that for
        which we make the Site available. The Site may not be used in connection
        with any commercial endeavors except those that are specifically
        endorsed or approved by us.
      </Typography>
      <Typography variant="body1" mb={2}>
        As a user of the Site, you agree not to:
      </Typography>
      <ul>
        <li>
          <Typography component="p" variant="body1" lineHeight={1}>
          Systematically retrieve data or other content from the Site to create
          or compile, directly or indirectly, a collection, compilation,
          database, or directory without written permission from us.
          </Typography>
        </li>
        <li>
          <Typography component="p" variant="body1" lineHeight={1}>
          Trick, defraud, or mislead us and other users, especially in any
          attempt to learn sensitive account information such as user passwords.
          </Typography>
        </li>
        <li>
          <Typography component="p" variant="body1" lineHeight={1}>
          Circumvent, disable, or otherwise interfere with security-related
          features of the Site, including features that prevent or restrict the
          use or copying of any Content or enforce limitations on the use of the
          Site and/or the Content contained therein.
          </Typography>
        </li>
        <li>
          <Typography component="p" variant="body1" lineHeight={1}>
          Disparage, tarnish, or otherwise harm, in our opinion, us and/or the
          Site.
          </Typography>
        </li>
        <li>
          <Typography component="p" variant="body1" lineHeight={1}>
          Use any information obtained from the Site in order to harass, abuse,
          or harm another person.
          </Typography>
        </li>
        <li>
          <Typography component="p" variant="body1" lineHeight={1}>
          Make improper use of our support services or submit false reports of
          abuse or misconduct.
          </Typography>
        </li>
        <li>
          <Typography component="p" variant="body1" lineHeight={1}>
          Use the Site in a manner inconsistent with any applicable laws or
          regulations.
          </Typography>
        </li>
        <li>
          <Typography component="p" variant="body1" lineHeight={1}>
          Engage in unauthorized framing of or linking to the Site.
          </Typography>
        </li>
        <li>
          <Typography component="p" variant="body1" lineHeight={1}>
          Upload or transmit (or attempt to upload or to transmit) viruses,
          Trojan horses, or other material, including excessive use of capital
          letters and spamming (continuous posting of repetitive text), that
          interferes with any party’s uninterrupted use and enjoyment of the
          Site or modifies, impairs, disrupts, alters, or interferes with the
          use, features, functions, operation, or maintenance of the Site.
          </Typography>
        </li>
        <li>
          <Typography component="p" variant="body1" lineHeight={1}>
          Engage in any automated use of the system, such as using scripts to
          send comments or messages, or using any data mining, robots, or
          similar data gathering and extraction tools.
          </Typography>
        </li>
        <li>
          <Typography component="p" variant="body1" lineHeight={1}>
          Delete the copyright or other proprietary rights notice from any
          Content.
          </Typography>
        </li>
        <li>
          <Typography component="p" variant="body1" lineHeight={1}>
          Attempt to impersonate another user or person or use the username of
          another user.
          </Typography>
        </li>
        <li>
          <Typography component="p" variant="body1" lineHeight={1}>
          Upload or transmit (or attempt to upload or to transmit) any material
          that acts as a passive or active information collection or
          transmission mechanism, including without limitation, clear graphics
          interchange formats (“gifs”), 1×1 pixels, web bugs, cookies, or other
          similar devices (sometimes referred to as “spyware” or “passive
          collection mechanisms” or “pcms”).
          </Typography>
        </li>
        <li>
          <Typography component="p" variant="body1" lineHeight={1}>
          Interfere with, disrupt, or create an undue burden on the Site or the
          networks or services connected to the Site.
          </Typography>
        </li>
        <li>
          <Typography component="p" variant="body1" lineHeight={1}>
          Harass, annoy, intimidate, or threaten any of our employees or agents
          engaged in providing any portion of the Site to you.
          </Typography>
        </li>
        <li>
          <Typography component="p" variant="body1" lineHeight={1}>
          Attempt to bypass any measures of the Site designed to prevent or
          restrict access to the Site, or any portion of the Site.
          </Typography>
        </li>
        <li>
          <Typography component="p" variant="body1" lineHeight={1}>
          Copy or adapt the Site’s software, programming, or design, including
          but not limited to HTML, images and graphics, JavaScript, or other
          code.
          </Typography>
        </li>
        <li>
          <Typography component="p" variant="body1" lineHeight={1}>
          Except as permitted by applicable law, decipher, decompile,
          disassemble, or reverse engineer any of the software comprising or in
          any way making up a part of the Site.
          </Typography>
        </li>
        <li>
          <Typography component="p" variant="body1" lineHeight={1}>
          Except as may be the result of standard search engine or Internet
          browser usage, use, launch, develop, or distribute any automated
          system, including without limitation, any spider, robot, cheat
          utility, scraper, or offline reader that accesses the Site, or using
          or launching any unauthorized script or other software.
          </Typography>
        </li>
        <li>
          <Typography component="p" variant="body1" lineHeight={1}>
          Make any unauthorized use of the Site, including collecting usernames
          and/or email addresses of users by electronic or other means for the
          purpose of sending unsolicited email, or creating user accounts by
          automated means or under false pretenses.
          </Typography>
        </li>
        <li>
          <Typography component="p" variant="body1" lineHeight={1}>
          Use the Site as part of any effort to compete with us or otherwise use
          the Site and/or the Content for any revenue-generating endeavor or
          commercial enterprise.
          </Typography>
        </li>
        <li>
          <Typography component="p" variant="body1" lineHeight={1}>
          Use the Site to advertise or offer to sell goods and services.
          </Typography>
        </li>
        <li>
          <Typography component="p" variant="body1" lineHeight={1}>
          Sell or otherwise transfer your profile.
          </Typography>
        </li>
      </ul>
    </Box>
  )
}
