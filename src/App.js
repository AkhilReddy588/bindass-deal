import {BrowserRouter, Switch, Route} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import ProtectedRoute from './components/ProtectedRoute'
import LandingPage from './components/LandingPage'

import './App.css'


const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/register" component={RegisterForm} />
      <ProtectedRoute exact path='/bindass-deal' component={LandingPage} />
    </Switch>
  </BrowserRouter>
)

export default App
