import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import World from './pages/World/World';
import Account from './pages/Account/Account';
import Community from './pages/Community/Community';
import Signin from './pages/Signin/Signin';
import Register from './pages/Register/Register';
import WorldOverview from './pages/WorldOverview/WorldOverview';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path='/world' element={<World />}/>
        <Route path='/account' element={<Account />}/>
        <Route path='/community' element={<Community />}/>
        <Route path='/signin' element={<Signin />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/worldOverview' element={<WorldOverview />}/>

      </Routes>
    </Router>
  );
}

export default App;
