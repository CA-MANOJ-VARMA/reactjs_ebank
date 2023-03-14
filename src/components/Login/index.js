import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {userId: '', userPin: '', errorMsg: '', showSubmitError: false}

  userIdFunction = event => {
    this.setState({userId: event.target.value})
  }

  userPinFunction = event => {
    this.setState({userPin: event.target.value})
  }

  submitFormFunction = async event => {
    event.preventDefault()
    const {history} = this.props
    console.log('Hello')
    const {userId, userPin} = this.state
    const userDetails = {user_id: userId, pin: userPin}
    console.log(userDetails)
    const apiUrl = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    const jsonData = await response.json()
    if (response.ok === true) {
      console.log(jsonData)
      const jwtToken = jsonData.jwt_token
      console.log(jwtToken)
      Cookies.set('jwt_token', jwtToken, {expires: 30})

      console.log(history)
      history.replace('/')
    } else {
      const errorMsg = jsonData.error_msg
      this.setState({showSubmitError: true, errorMsg})
    }
  }

  render() {
    const {userId, userPin, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="css-login-bg-container">
        <div className="css-login-image-container">
          <div className="css-login-image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="css-login-image-itself"
            />
          </div>
          <div className="css-login-form-container">
            <form onSubmit={this.submitFormFunction}>
              <h1>Welcome Back!</h1>
              <div className="css-login-input-container">
                <label htmlFor="login">User ID</label>
                <input
                  id="login"
                  type="text"
                  placeholder="Enter User ID"
                  className="css-input-itself"
                  value={userId}
                  onChange={this.userIdFunction}
                />
              </div>
              <div className="css-login-input-container">
                <label htmlFor="password">PIN</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter PIN"
                  className="css-input-itself"
                  value={userPin}
                  onChange={this.userPinFunction}
                />
              </div>
              <button type="submit" className="css-login-button">
                Login
              </button>
              {showSubmitError ? <p>{errorMsg}</p> : ''}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
