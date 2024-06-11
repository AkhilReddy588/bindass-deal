import {Component} from 'react'
import { Redirect } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showSubmitError: false,}

  onChangeUsername = event => this.setState({username: event.target.value})

  onChangePassword = event => this.setState({password: event.target.value})

  

  onSubmitSuccess = token => {
    const {history} = this.props
    history.replace('/')
    Cookies.set('token', token, {expires: 60})
  }

  onSubmitFailure = () => {
    this.setState({showSubmitError: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const { username, password } = this.state;
    const userDetails = JSON.parse(localStorage.getItem('userDetails'))

    if (userDetails) {
      const user = userDetails.find(user => user.username === username)
      if (user) {
        const isValid = await bcrypt.compare(password, user.password)
        if (isValid) {
          const token = uuidv4()
          this.onSubmitSuccess(token)
        } else {
          this.onSubmitFailure()
        }
      } else {
        this.onSubmitFailure()
      }
    } else {
      this.onSubmitFailure()
    }
  }

  onCreateAccount = () => {
    const {history} = this.props
    history.push('/register')
  }

  render() {
    const {password, username, showSubmitError} = this.state
    const token = Cookies.get('token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-container">
        <form className="form-container" onSubmit={this.onSubmitForm}>
          <div className="input-container">
            <label htmlFor="Username" className="label">
              Username
            </label>
            <input
              onChange={this.onChangeUsername}
              id="Username"
              type="text"
              className="input"
              placeholder="Username"
              value={username}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              id="password"
              onChange={this.onChangePassword}
              value={password}
              placeholder="Password"
              type="Password"
              className="input"
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
          {showSubmitError && <p className="error-message">Invalid username or password</p>}

          <button onClick={this.onCreateAccount} className='create-btn'>Create Account</button>
        </form>
      </div>
    )
  }
}

export default LoginForm
