import React from 'react'
import { useInvoiceContext } from '../context/invoice_context';

const NavBar = () => {

const { isDark, toggleTheme } = useInvoiceContext()!;

    return (
      <nav className="nav">
        <div className="purple-container">
          <img src="/assets/logo.svg" alt="logo" />
        </div>
        <div className="right-container">
          <div className="switch-container" onClick={toggleTheme}>
            {isDark ? (
              <img src="/assets/icon-sun.svg" alt="theme"></img>
            ) : (
              <img src="/assets/icon-moon.svg" alt="theme"></img>
            )}
          </div>
          <div className="avatar-container">
            <div className="avatar">
              <img src="/assets/image-avatar.jpg" alt="logo" />
            </div>
          </div>
        </div>
      </nav>
    );
}

export default NavBar
