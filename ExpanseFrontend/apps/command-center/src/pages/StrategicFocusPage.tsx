/**
 * Strategic Focus Page
 * Main page that loads data and renders the Strategic Focus view
 */
import { StrategicFocusView } from '../components/StrategicFocus'
import type { StrategicFocus, GlobalSWOT, Campaign } from '../types'

// Import data
import strategicFocusData from '../data/strategicFocus.json'
import globalSwotData from '../data/globalSwot.json'
import campaignsData from '../data/campaigns.json'

export function StrategicFocusPage() {
  // Cast the imported data to the correct types
  const focuses = (strategicFocusData as { focuses: StrategicFocus[] }).focuses
  const globalSwot = (globalSwotData as { globalSwot: GlobalSWOT }).globalSwot
  const campaigns = (campaignsData as { campaigns: Campaign[] }).campaigns

  return (
    <StrategicFocusView
      focuses={focuses}
      campaigns={campaigns}
      globalSwot={globalSwot}
    />
  )
}
