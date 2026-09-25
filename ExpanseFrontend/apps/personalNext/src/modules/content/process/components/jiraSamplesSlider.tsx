"use client"
import React, { useRef, useState } from "react"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/effect-fade"
import "swiper/css/navigation"
import "swiper/css/pagination"

// import required modules
import { EffectFade, Navigation, Pagination } from "swiper/modules"
import { border, Box } from "@mui/system"

export const JiraSamplesSlider = () => {
  return (
    <Box sx={{ border: "3px solid red", flexGrow: 1 }}>
      <p> test </p>
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="https://storage.googleapis.com/expanse-public-assets/process/SprintBoardExample.webp" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://storage.googleapis.com/expanse-public-assets/process/ProductBacklogExample1.webp" />
        </SwiperSlide>
      </Swiper>
    </Box>
  )
}
