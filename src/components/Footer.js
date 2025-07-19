import React from "react";
import "./styles/HomePage.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Stay Nest</h4>
            <p>Vaš partner za nezaboravan mediteranski odmor</p>
          </div>
          <div className="footer-section">
            <h4>Kontakt</h4>
            <p>info@staynest.com</p>
            <p>+381 11 123 456</p>
          </div>
          <div className="footer-section">
            <h4>Pratite nas</h4>
            <div className="social-links">
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
              <a href="#">Twitter</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Stay Nest. Sva prava zadržana.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
