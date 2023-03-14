import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'

class Home extends Component {
  logoutFunction = () => {
    console.log('logout')
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  Navbar = () => (
    <div className="css-bg-Home-component">
      <div className="css-navbar-component">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
        />
        <button
          type="button"
          onClick={this.logoutFunction}
          className="css-logout-button-itself"
        >
          Logout
        </button>
      </div>

      <div className="css-digital-card-container">
        <h1>Your Flexibility, Our Excellence</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
        />
      </div>
    </div>
  )

  render() {
    return <>{this.Navbar()}</>
  }
}

export default Home
