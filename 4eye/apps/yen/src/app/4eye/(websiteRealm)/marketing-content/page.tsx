import { redirect } from "next/navigation";

// `marketing-content` was folded into `/learn`. Keep this route as a
// permanent redirect so external links keep resolving.
export default function MarketingContentRedirect() {
  redirect("/4eye/learn");
}
