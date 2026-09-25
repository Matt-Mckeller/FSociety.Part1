import HomeTile from "@4eye/web/Tiles/home/HomeTile";
import { metadataFor } from "@4eye/web/lib/metadataFor";

export const metadata = metadataFor("home");

export default function HomePage() {
  return <HomeTile />;
}
