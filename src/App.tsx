import './App.css';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { UserProvider } from './contexts/UserContext';
import Chats from './pages/Chats'
import Login from './pages/Login'

function App() {
  return (
    <div className="App">
      <Router>
        <UserProvider>
          <Switch>
            <Route path='/' component={Chats} exact />
            <Route path='/login' component={Login} />
          </Switch>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
