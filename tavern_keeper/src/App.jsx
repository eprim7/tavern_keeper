import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import World from './pages/World/World';
import Account from './pages/Account/Account';
import Community from './pages/Community/Community';
import Signin from './pages/Signin/Signin';
import WorldOverview from './pages/WorldOverview/WorldOverview';
import Maps from './subpages/Maps/Maps';
import Characters from './subpages/Characters/Characters';
import Organizations from './subpages/Organizations/Organization';
import Locations from './subpages/Locations/Locations';
import Timelines from './subpages/Timelines/Timelines';
import Miscellaneous from './subpages/Miscellaneous/Miscellaneous';
import PageNotFound from './pages/404/404';
import Test from './pages/Test/Test';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" index element={<Home />}/>
        <Route path="*" element={<PageNotFound />} />
        <Route path='/world' element={<World />}/>
        <Route path='/account' element={<Account />}/>
        <Route path='/community' element={<Community />}/>
        <Route path='/signin' element={<Signin />}/>
        <Route path='/worldOverview/:id' element={<WorldOverview />}/>
        <Route path='/Test' element={<Test />}/>   

          <Route path='/worldOverview/maps/:id' element={<Maps />}/>
          <Route path='/worldOverview/characters/:id' element={<Characters />}/>
          <Route path='/worldOverview/organizations/:id' element={<Organizations />}/>
          <Route path='/worldOverview/locations/:id' element={<Locations />}/>
          <Route path='/worldOverview/timelines/:id' element={<Timelines />}/>
          <Route path='/worldOverview/miscellaneous/:id' element={<Miscellaneous />}/>
        </Routes>
      </Router> 
)
}

export default App;
