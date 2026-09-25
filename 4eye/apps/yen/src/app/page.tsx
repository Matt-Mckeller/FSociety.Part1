import { SiteHeader } from "@/components/SiteHeader";
import { AppGrid } from "@/components/AppGrid";
import { HomeFindNav } from "@/components/HomeFindNav";
import { ProfilePreview } from "@/components/ProfilePreview";
import { SeriesHighlights } from "@/components/SeriesHighlights";
import { VisionGoalsBand } from "@/components/VisionGoalsBand";
import { PrimaryPathStrip } from "@/components/PrimaryPathStrip";
import "./home.css";

/*
  No MUI import in this file on purpose. It is a server component, and pulling
  anything from the `@mui/material` barrel here drags the whole library into the
  route's first load — it cost 765 kB before the wrapper Box was removed.
  `CssBaseline` already paints the themed page background.
*/
export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <div className="home-layout">
        <HomeFindNav />
        {/*
          Walkthroughs sit above the profile band deliberately. "Start here" was
          the fourth section on the page, under an introduction to the author —
          which asks a stranger to care who you are before telling them what
          this is. Orient first, then introduce.
        */}
        <div className="home-main">
          <PrimaryPathStrip />
          <SeriesHighlights />
          <ProfilePreview />
          <VisionGoalsBand />
          <AppGrid />
        </div>
      </div>
    </>
  );
}
