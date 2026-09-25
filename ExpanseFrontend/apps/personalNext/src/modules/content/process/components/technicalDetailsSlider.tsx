"use client"
import React, { useRef, useState } from "react"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/effect-fade"
import "swiper/css/navigation"
import "swiper/css/pagination"

// import "./swiperStyles.css"

// import required modules
import { EffectFade, Navigation, Pagination } from "swiper/modules"
import { border, Box } from "@mui/system"
import { Typography } from "@mui/material"

export const TechnicalDetailsSlider = () => {
  return (
    <Swiper
      spaceBetween={30}
      effect={"fade"}
      navigation={true}
      pagination={{
        clickable: true,
      }}
      modules={[EffectFade, Navigation, Pagination]}
      className="mySwiper"
      style={{
        width: "100%",
        height: "100%",
        maxWidth: "500px",
        objectFit: "contain",
      }}

      // width="100%"
    >
      <SwiperSlide
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <img
          width="100%"
          src="https://storage.googleapis.com/expanse-public-assets/process/GraphQLSample.webp"
        />
        <Typography variant="body1" fontStyle="italic">
          This is an image
        </Typography>
      </SwiperSlide>
      <SwiperSlide
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <img
          width="100%"
          src="https://storage.googleapis.com/expanse-public-assets/process/TechnicalDocumentationSample.webp"
        />
        <Typography variant="body1" fontStyle="italic">
          This is an image
        </Typography>
      </SwiperSlide>
    </Swiper>
  )
}
