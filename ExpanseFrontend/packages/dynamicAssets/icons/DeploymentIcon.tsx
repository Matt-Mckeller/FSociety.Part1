"use client"

import React from "react"
import { useTheme } from "@mui/system"
export const DeploymentIcon = ({ color }: { color?: string }) => {
  const theme = useTheme()
  color = color ? color : theme.palette.primary.main

  return (
    <svg
      width="40"
      height="64"
      viewBox="0 0 40 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.51562 48.8945V54.3461L19.6581 62.3652V48.3192L7.51562 40.3"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M31.8026 48.7422V54.3461L19.6602 62.3652V48.3192L31.8026 40.3"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.51613 40.2997L19.6586 48.3188L13.256 52.68L7.51562 48.8944"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.51639 48.8945L1.16016 44.7026L7.51639 40.3"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.6602 48.3031L31.8061 40.3003L38.1389 44.5003L26.0994 52.5656L19.6602 48.3031Z"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.6602 32.4916L31.8036 40.2998L38.2092 35.959L26.1126 27.9813L19.6602 32.4916"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.6633 32.4917L13.2124 28.0078L1.06641 36.0106L7.5056 40.2727L19.663 32.4911"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.4727 26.075V29.8697"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M23.388 32.7763C23.6712 32.7763 23.9009 32.5443 23.9009 32.2582C23.9009 31.972 23.6712 31.74 23.388 31.74C23.1047 31.74 22.875 31.972 22.875 32.2582C22.875 32.5443 23.1047 32.7763 23.388 32.7763Z"
        fill={color}
        stroke={color}
        strokeWidth="4"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.6262 27.0166C19.9095 27.0166 20.1392 26.7846 20.1392 26.4984C20.1392 26.2122 19.9095 25.9802 19.6262 25.9802C19.3429 25.9802 19.1133 26.2122 19.1133 26.4984C19.1133 26.7846 19.3429 27.0166 19.6262 27.0166Z"
        fill={color}
        stroke={color}
        strokeWidth="4"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.625 28.8865V36.4984"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M15.8164 26.075V29.8697"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M15.8567 32.7763C16.14 32.7763 16.3697 32.5443 16.3697 32.2582C16.3697 31.972 16.14 31.74 15.8567 31.74C15.5734 31.74 15.3438 31.972 15.3438 32.2582C15.3438 32.5443 15.5734 32.7763 15.8567 32.7763Z"
        fill={color}
        stroke={color}
        strokeWidth="4"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.2165 1.58484H15.562C14.8741 1.58484 14.3164 2.1482 14.3164 2.84313V19.6685C14.3164 20.3635 14.8741 20.9268 15.562 20.9268H24.2165C24.9044 20.9268 25.4621 20.3635 25.4621 19.6685V2.84313C25.4621 2.1482 24.9044 1.58484 24.2165 1.58484Z"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M19.8494 19.0869C20.1934 19.0869 20.4722 18.8052 20.4722 18.4578C20.4722 18.1103 20.1934 17.8286 19.8494 17.8286C19.5054 17.8286 19.2266 18.1103 19.2266 18.4578C19.2266 18.8052 19.5054 19.0869 19.8494 19.0869Z"
        fill={color}
      />
      <path
        d="M18.2539 4.13013H21.5284"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </svg>
  )
}
