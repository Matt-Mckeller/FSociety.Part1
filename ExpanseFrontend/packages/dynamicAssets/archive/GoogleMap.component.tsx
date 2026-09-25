import { Box } from "@mui/material"
import React, { ReactElement, useMemo } from "react"

export function Map(): ReactElement {
  // Try a circular map with a bouncing location marker in the middle ( . )

  const ref = React.useRef<HTMLDivElement>(null)
  const [map, setMap] = React.useState<google.maps.Map>()
  const [marker, setMarker] = React.useState<google.maps.Marker>()

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const RaytownMo: google.maps.LatLngLiteral = {
        lat: 39.0086,
        lng: -94.4636,
      }

      if (ref.current && !map) {
        const containerWidth = ref.current.offsetWidth

        // Create the map because one does not yet exist
        setMap(
          new google.maps.Map(document.getElementById("map") as HTMLElement, {
            center: RaytownMo,
            zoom: containerWidth >= 500 ? 10 : 7,
          }),
        )
      }
    }
    if (ref.current && map) {
      // Map has already been created
      const WhiteMapMarkerWithBigLogo =
        "/assets/icons/map/WhiteMapMarkerWithBigLogo.svg"
      // const PurpleMarker = "/assets/icons/map/PurpleMapMarker.svg"
      // const WhiteMarkerWithLogo = "/assets/icons/map/WhiteMapMarkerWithLogo.svg"
      // const PurpleMapMarkerWithLogo = "/assets/icons/map/PurpleMapMarkerWithLogo.svg"
      // const PurpleMapMarkerWithBigLogo = "/assets/icons/map/PurpleMapMarkerWithBigLogo.svg"
      // const DarkMapMarkerWithLogo = "/assets/icons/map/DarkMapMarkerWithLogo.svg"
      const animation = google.maps.Animation.BOUNCE
      // const animation = google.maps.Animation.DROP;
      const icon: google.maps.Icon = {
        url: WhiteMapMarkerWithBigLogo,
        scaledSize: new google.maps.Size(50, 50),
      }

      setMarker(
        new google.maps.Marker({
          position: RaytownMo,
          map,
          icon,
          animation,
        }),
      )
    }
  }, [ref, map])

  return (
    <Box
      style={{
        display: "flex",
        flexGrow: 1,
        borderRadius: "50px",
        maxWidth: "500px",
      }}
      ref={ref}
      id="map"
    />
  )
}
