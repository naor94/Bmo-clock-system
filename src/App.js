import { useState } from 'react';
import { Route,  Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Time from './components/Clock/Time';
import Login from './components/login/login';

function App() {
  const [user, setLoginUser]= useState({})
  return (
    
          <Router> 
               <div className="app">      

            <Switch>
          <Route exact path="/">
           {  
            <Login setLoginUser={setLoginUser}/>
           }
          </Route>
          <Route exact path="/clock">
         <Time userEmail={user.email}/>
         </Route>
          </Switch> 
             </div>

        </Router>
  );
}

export default App;
