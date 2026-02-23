import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import './Footer.css';

function Footer() {
  const footerLinks = [
    ['Audio Description', 'Investor Relations', 'Legal Notices'],
    ['Help Center', 'Jobs', 'Cookie Preferences'],
    ['Gift Cards', 'Terms of Use', 'Corporate Information'],
    ['Media Center', 'Privacy', 'Contact Us']
  ];

  const socialLinks = [
    { icon: Facebook, label: 'Facebook' },
    { icon: Instagram, label: 'Instagram' },
    { icon: Twitter, label: 'Twitter' },
    { icon: Youtube, label: 'YouTube' }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Social Links */}
        <div className="social-links">
          {socialLinks.map((social) => (
            <a 
              key={social.label} 
              href="#" 
              aria-label={social.label}
              className="social-link"
            >
              <social.icon size={24} />
            </a>
          ))}
        </div>

        {/* Footer Links */}
        <div className="footer-links">
          {footerLinks.map((column, index) => (
            <div key={index} className="footer-column">
              {column.map((link) => (
                <a key={link} href="#" className="footer-link">
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Service Code */}
        <button className="service-code">
          Service Code
        </button>

        {/* Copyright */}
        <div className="copyright">
          <p>© 2024 Netflix Clone - Student Project</p>
          <p className="credits">
            This is a demo project for educational purposes. Data provided by{' '}
            <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
              TMDB
            </a>.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
