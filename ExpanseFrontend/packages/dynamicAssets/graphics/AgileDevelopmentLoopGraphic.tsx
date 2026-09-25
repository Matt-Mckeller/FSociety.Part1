"use client"
import React from "react"
import { useTheme } from "@mui/material/styles"

interface AgileLifecycleLoopGraphicProps {
  width?: string | number
  height?: string | number
  showShadow?: boolean
}

export const AgileLifecycleLoopGraphic: React.FC<
  AgileLifecycleLoopGraphicProps
> = ({ width = "100%", height = "100%", showShadow = true }) => {
  const theme = useTheme()

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 452 310"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Agile Development Loop Graphic">
        <g id="RouteSegments">
          <g
            id="RouteSegment6"
            filter={showShadow ? "url(#filter0_d_874_2842)" : undefined}
          >
            <path
              id="Path 2699"
              d="M436.07 266.677L407.63 289.713H257.18V243.641H407.627L436.07 266.677Z"
              fill={theme.palette.primary.main}
              stroke={theme.palette.background.default}
              strokeWidth={2}
            />
            <text
              id="Segment6Text"
              fill="white"
              xmlSpace="preserve"
              style={{ whiteSpace: "pre" }}
              fontFamily="Xpens,Roboto,sans-serif"
              fontSize="10"
              fontWeight="900"
              letterSpacing="0em"
            >
              <tspan x="357.652" y="271.514">
                Plan
              </tspan>
            </text>
          </g>
          <g
            id="RouteSegment5"
            filter={showShadow ? "url(#filter1_d_874_2842)" : undefined}
          >
            <path
              id="Path2702"
              d="M243.852 243.792V289.942C209.235 288.248 176.489 273.727 151.994 249.208C127.499 224.688 113.011 191.927 111.352 157.309H157.502C159.104 179.693 168.712 200.752 184.569 216.633C200.425 232.514 221.47 242.155 243.852 243.792Z"
              fill={theme.palette.primary.main}
              stroke={theme.palette.background.default}
              strokeWidth={2}
            />
            <text
              id="Segment5Text"
              transform="translate(169.613 239.703) rotate(-132.486)"
              fill="white"
              xmlSpace="preserve"
              style={{ whiteSpace: "pre" }}
              fontFamily="Xpens,Roboto,sans-serif"
              fontSize="10"
              fontWeight="900"
              letterSpacing="0em"
            >
              <tspan x="0" y="9.41797">
                Deploy
              </tspan>
            </text>
          </g>
          <g
            id="RouteSegment4"
            filter={showShadow ? "url(#filter2_d_874_2842)" : undefined}
          >
            <path
              id="Path 2700"
              d="M243.852 11.3496V57.5088C221.469 59.1402 200.422 68.7777 184.564 84.6577C168.706 100.538 159.098 121.598 157.498 143.983H111.352C113.009 109.364 127.497 76.6022 151.992 52.0825C176.487 27.5629 209.234 13.0418 243.852 11.3496Z"
              fill={theme.palette.primary.main}
              stroke={theme.palette.background.default}
              strokeWidth={2}
            />
            <text
              id="Segment4Text"
              transform="translate(134 105.3457) rotate(-50.7997)"
              fill="white"
              xmlSpace="preserve"
              style={{ whiteSpace: "pre" }}
              fontFamily="Xpens,Roboto,sans-serif"
              fontSize="10"
              fontWeight="900"
              letterSpacing="0em"
            >
              <tspan x="0" y="9.41797">
                Test and Review
              </tspan>
            </text>
          </g>
          <g
            id="RouteSegment3"
            filter={showShadow ? "url(#filter3_d_874_2842)" : undefined}
          >
            <path
              id="Path 2701"
              d="M389.951 143.98H343.801C342.197 121.55 332.552 100.452 316.639 84.5625C300.725 68.6731 279.613 59.0602 257.18 57.4897V11.3398C291.846 12.9665 324.661 27.4594 349.213 51.9873C373.765 76.5152 388.29 109.316 389.951 143.98Z"
              fill={theme.palette.primary.main}
              stroke={theme.palette.background.default}
              strokeWidth={2}
            />
            <text
              id="Segment3Text"
              transform="translate(329.992 57.7412) rotate(46.7103)"
              fill="white"
              xmlSpace="preserve"
              style={{ whiteSpace: "pre" }}
              fontFamily="Xpens,Roboto,sans-serif"
              fontSize="10"
              fontWeight="900"
              letterSpacing="0em"
            >
              <tspan x="0" y="9.41797">
                Build
              </tspan>
            </text>
          </g>
          <g
            id="RouteSegment2"
            filter={showShadow ? "url(#filter4_d_874_2842)" : undefined}
          >
            <path
              id="Path 2703"
              d="M389.951 157.309C388.29 191.974 373.765 224.775 349.213 249.303C324.661 273.831 291.846 288.324 257.18 289.951V243.801C279.613 242.232 300.727 232.619 316.64 216.729C332.554 200.84 342.198 179.741 343.801 157.31L389.951 157.309Z"
              fill={theme.palette.primary.main}
              stroke={theme.palette.background.default}
              strokeWidth={2}
            />
            <text
              id="Segment2Text"
              transform="translate(354.348 215.346) rotate(126.605)"
              fill="white"
              xmlSpace="preserve"
              style={{ whiteSpace: "pre" }}
              fontFamily="Xpens,Roboto,sans-serif"
              fontSize="10"
              fontWeight="900"
              letterSpacing="0em"
            >
              <tspan x="0" y="9.41797">
                Design
              </tspan>
            </text>
          </g>
          <g
            id="RouteSegment1"
            filter={showShadow ? "url(#filter5_d_874_2842)" : undefined}
          >
            <path
              id="Rectangle 90"
              d="M243.855 243.648H15V289.721H243.855V243.648Z"
              fill={theme.palette.primary.main}
              stroke={theme.palette.background.default}
              strokeWidth={2}
            />
            <text
              id="Segment1Text"
              fill="white"
              xmlSpace="preserve"
              style={{ whiteSpace: "pre" }}
              fontFamily="Xpens,Roboto,sans-serif"
              fontSize="10"
              fontWeight="900"
              letterSpacing="0em"
            >
              <tspan x="103.199" y="271.514">
                Plan
              </tspan>
            </text>
          </g>
        </g>
        <g id="Lines">
          <g id="TopCircularLine">
            <path
              id="TopLineArrow"
              d="M121.842 217.988L120.442 224.235L114.195 222.835"
              stroke={theme.palette.text.primary}
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              id="TopCircularLine_2"
              d="M119.983 223.629C107.503 201.331 100.968 176.197 101.008 150.644C101.008 130.992 104.878 111.533 112.399 93.3774C119.919 75.2217 130.942 58.7249 144.837 44.8291C158.733 30.9333 175.23 19.9109 193.386 12.3906C211.541 4.87036 231 0.999869 250.652 1C270.304 1 289.763 4.8703 307.918 12.3906C326.074 19.911 342.57 30.9338 356.466 44.8296C370.362 58.7253 381.384 75.2218 388.904 93.3774C396.425 111.533 400.295 130.993 400.295 150.644C400.295 176.471 395.495 196.511 383.973 217.715"
              stroke={theme.palette.text.primary}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="5 5"
            />
          </g>
          <g id="BottomLeftLine">
            <path
              id="BottomLeftArrow"
              d="M241.188 294.036L246.52 297.579L242.977 302.911"
              stroke={theme.palette.text.primary}
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              id="BottomLeftLine_2"
              d="M245.629 297.705C233.992 300.024 222.154 301.181 210.289 301.158H16.8516"
              stroke={theme.palette.text.primary}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="5 5"
            />
          </g>
          <g id="BottomRightLine">
            <path
              id="BottomRightArrow"
              d="M404.148 296.633L408.769 301.063L404.34 305.684"
              stroke={theme.palette.text.primary}
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              id="BottomRightLine_2"
              d="M407.832 301.158L262.289 301.018"
              stroke={theme.palette.text.primary}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="5 5"
            />
          </g>
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_874_2842"
          x="242.18"
          y="233.641"
          width="208.891"
          height="76.0723"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="5" />
          <feGaussianBlur stdDeviation="7.5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.502 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_874_2842"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_874_2842"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_874_2842"
          x="96.3516"
          y="147.309"
          width="162.5"
          height="162.633"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="5" />
          <feGaussianBlur stdDeviation="7.5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.502 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_874_2842"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_874_2842"
            result="shape"
          />
        </filter>
        <filter
          id="filter2_d_874_2842"
          x="96.3516"
          y="1.34961"
          width="162.5"
          height="162.633"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="5" />
          <feGaussianBlur stdDeviation="7.5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.502 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_874_2842"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_874_2842"
            result="shape"
          />
        </filter>
        <filter
          id="filter3_d_874_2842"
          x="242.18"
          y="1.33984"
          width="162.77"
          height="162.641"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="5" />
          <feGaussianBlur stdDeviation="7.5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.502 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_874_2842"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_874_2842"
            result="shape"
          />
        </filter>
        <filter
          id="filter4_d_874_2842"
          x="242.18"
          y="147.309"
          width="162.77"
          height="162.643"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="5" />
          <feGaussianBlur stdDeviation="7.5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.502 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_874_2842"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_874_2842"
            result="shape"
          />
        </filter>
        <filter
          id="filter5_d_874_2842"
          x="0"
          y="233.648"
          width="258.855"
          height="76.0732"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="5" />
          <feGaussianBlur stdDeviation="7.5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.502 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_874_2842"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_874_2842"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}
