import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Layout from './components/Layout';
import OverviewPage from './pages/OverviewPage';
import FlowsPage from './pages/FlowsPage';
import ArchitecturePage from './pages/ArchitecturePage';
import CompliancePage from './pages/CompliancePage';
import ComponentsPage from './pages/ComponentsPage';

export default function App() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Layout>
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/flows" element={<FlowsPage />} />
          <Route path="/architecture" element={<ArchitecturePage />} />
          <Route path="/compliance" element={<CompliancePage />} />
          <Route path="/components" element={<ComponentsPage />} />
        </Routes>
      </Layout>
    </Box>
  );
}
