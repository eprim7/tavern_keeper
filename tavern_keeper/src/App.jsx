import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import World from './pages/World/World';
import Account from './pages/Account/Account';
import Community from './pages/Community/Community';
import Signin from './pages/Signin/Signin';
import Register from './pages/Register/Register';
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
        <Route path='/register' element={<Register />}/>
        <Route path='/worldOverview' element={<WorldOverview />}/>
          <Route path='/worldOverview/maps' element={<Maps />}/>
          <Route path='/worldOverview/characters' element={<Characters />}/>
          <Route path='/worldOverview/organizations' element={<Organizations />}/>
          <Route path='/worldOverview/locations' element={<Locations />}/>
          <Route path='/worldOverview/timelines' element={<Timelines />}/>
          <Route path='/worldOverview/miscellaneous' element={<Miscellaneous />}/>
          <Route path='/Test/Test' element={<Test />}/>


      </Routes>
    </Router>
  );
}

export default App;
