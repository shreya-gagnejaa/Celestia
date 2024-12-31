import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
      <footer>
        <div className="footer-content">
          <div className="left">
            <h3 style={{ color: '#a0a0a0' }}>Want to be the first to know?</h3>
            <h3 style={{ color: '#a0a0a0' }}>Follow us on social:</h3><br /><br /><br />
            <ul>
              <li><a href="#" style={{ color: '#a0a0a0', textDecoration: 'none' }}>Facebook</a></li>
              <li><a href="#" style={{ color: '#a0a0a0', textDecoration: 'none' }}>Instagram</a></li>
              <li><a href="#" style={{ color: '#a0a0a0', textDecoration: 'none' }}>Pinterest</a></li>
            </ul>
          </div>
          <div className="right">
            <ul>
              <li><Link to="/" style={{ color: '#a0a0a0', textDecoration: 'none' }}>Home</Link></li>
              <li><Link to="/shop" style={{ color: '#a0a0a0', textDecoration: 'none' }}>Shop</Link></li>
              <li><Link to="/cart" style={{ color: '#a0a0a0', textDecoration: 'none' }}>Cart</Link></li>
              <li><Link to="/login" style={{ color: '#a0a0a0', textDecoration: 'none' }}>Login</Link></li>
              <li><Link to="/login" style={{ color: '#a0a0a0', textDecoration: 'none' }}>Signup</Link></li>
              <li><Link to="/login" style={{ color: '#a0a0a0', textDecoration: 'none' }}>Contact Us</Link></li>
            </ul>
            <h3 style={{ color: '#a0a0a0' }}>Renewable jewelry inspired by you</h3>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
