import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme/theme';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Timeline from './pages/Timeline';
import People from './pages/People';
import Locations from './pages/Locations';
import Items from './pages/Items';
import Organizations from './pages/Organizations';
import Theories from './pages/Theories';
import Communications from './pages/Communications';
import Connections from './pages/Connections';
import ConnectionGraph from './pages/ConnectionGraph';
import Symbols from './pages/Symbols';
import Background from './pages/Background';
import FurtherInvestigations from './pages/FurtherInvestigations';
import TransitPros from './pages/TransitPros';
import SecurityConcerns from './pages/SecurityConcerns';
import Status from './pages/Status';
import Requests from './pages/Requests';
import Interpretations from './pages/Interpretations';
import UncategorizedEvents from './pages/UncategorizedEvents';
// Detail pages
import EventDetail from './pages/EventDetail';
import PersonDetail from './pages/PersonDetail';
import LocationDetail from './pages/LocationDetail';
import ItemDetail from './pages/ItemDetail';
import OrganizationDetail from './pages/OrganizationDetail';
import TheoryDetail from './pages/TheoryDetail';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="timeline" element={<Timeline />} />
            <Route path="events/:id" element={<EventDetail />} />
            <Route path="people" element={<People />} />
            <Route path="people/:id" element={<PersonDetail />} />
            <Route path="locations" element={<Locations />} />
            <Route path="locations/:id" element={<LocationDetail />} />
            <Route path="items" element={<Items />} />
            <Route path="items/:id" element={<ItemDetail />} />
            <Route path="organizations" element={<Organizations />} />
            <Route path="organizations/:id" element={<OrganizationDetail />} />
            <Route path="theories" element={<Theories />} />
            <Route path="theories/:id" element={<TheoryDetail />} />
            <Route path="communications" element={<Communications />} />
            <Route path="connections" element={<Connections />} />
            <Route path="graph" element={<ConnectionGraph />} />
            <Route path="symbols" element={<Symbols />} />
            <Route path="background" element={<Background />} />
            <Route path="investigations" element={<FurtherInvestigations />} />
            <Route path="transitpros" element={<TransitPros />} />
            <Route path="security" element={<SecurityConcerns />} />
            <Route path="status" element={<Status />} />
            <Route path="requests" element={<Requests />} />
            <Route path="interpretations" element={<Interpretations />} />
            <Route path="uncategorized" element={<UncategorizedEvents />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
