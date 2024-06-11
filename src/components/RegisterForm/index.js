import { Component } from 'react'
import bcrypt from 'bcryptjs'
import './index.css'

class RegisterForm extends Component{
    
    state = {username: '', password: '', showSubmitSuccess: false, showSubmitError: false, resultMsg: ''}

    onChangeUsername = event => this.setState({username: event.target.value})

    onChangePassword = event => this.setState({password: event.target.value})

    onSubmitFailure = msg => {
        this.setState({showSubmitError: true, resultMsg: msg})
      }

    onSubmitSuccess = msg => {
        this.setState({resultMsg: msg, showSubmitSuccess: true})
    }  

    onCreateAccount = () => {
        const {history} = this.props
        history.replace('/login')
    }

    onSubmitForm = async (event) => {
        event.preventDefault();
      
        let userDetails = JSON.parse(localStorage.getItem('userDetails'));
        if (!userDetails) {
          userDetails = [];
        }
      
        const existingUser = userDetails.find((user) => user.username === this.state.username);
      
        if (existingUser) {
          this.onSubmitFailure('User Already exists');
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(this.state.password, salt);
            const newUser = {
              username: this.state.username,
              password: hashedPassword,
            }
            userDetails.push(newUser);
            localStorage.setItem('userDetails', JSON.stringify(userDetails));
            this.setState({ username: '', password: '', showSubmitError: false, });
        
            this.onSubmitSuccess('User registered successfully!');
        }
      };

    render() {
        const {password, username, showSubmitError,showSubmitSuccess, resultMsg} = this.state
        return(
            <div className="login-form-container">
            {!showSubmitSuccess && 
              <form className="form-content-container" onSubmit={this.onSubmitForm}>
                <div className="input-container">
                  <label htmlFor="Username" className="label">
                    Username
                  </label>
                  <input
                    onChange={this.onChangeUsername}
                    id="Username"
                    type="text"
                    className="login-input"
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
                    className="login-input"
                  />
                </div> 
                <button type="submit" className="register-btn">
                  Register
                </button>
                {showSubmitError && <p className="error-message">{resultMsg}</p>}
            </form>
            }
            {showSubmitSuccess && <p className="success-message">{resultMsg}</p>}
            {showSubmitSuccess && <button onClick={this.onCreateAccount} className='user-create-btn'>Goto Login Page</button>}
      </div>
        )
    }
}

export default RegisterForm