
import './App.css'
import { Routes, Route } from 'react-router-dom';
import AccountsTable from './components/AccountsTable';
import ProfilesTable from './components/ProfilesTable';
import CampaignsTable from './components/CampaignsTable';

function App() {


  return (
    <Routes>
      <Route path="/campaigns/:profileId" element={<CampaignsTable />} />
      <Route path="/profiles/:accountId" element={<ProfilesTable />} />
      <Route path="/" element={<AccountsTable />} />
    </Routes >
  )
}

export default App
