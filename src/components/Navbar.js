import React, { useState, useEffect } from 'react';
import { Search, Bell, User, Menu, X } from 'lucide-react';
import './Navbar.css';

function Navbar({ onSearch }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'TV Shows', href: '#' },
    { name: 'Movies', href: '#' },
    { name: 'New & Popular', href: '#' },
    { name: 'My List', href: '#' }
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-left">
          {/* Logo */}
          <a href="#" className="logo">
            NETFLIX
          </a>

          {/* Desktop Navigation */}
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className="navbar-right">
          {/* Search */}
          <div className="search-container">
            {searchOpen && (
              <input
                type="text"
                placeholder="Titles, people, genres"
                value={searchValue}
                onChange={handleSearchChange}
                className="search-input"
                autoFocus
              />
            )}
            <button 
              className="icon-btn"
              onClick={() => {
                setSearchOpen(!searchOpen);
                if (searchOpen) {
                  setSearchValue('');
                  onSearch('');
                }
              }}
            >
              <Search size={20} />
            </button>
          </div>

          {/* Notifications */}
          <button className="icon-btn notifications">
            <Bell size={20} />
            <span className="notification-dot"></span>
          </button>

          {/* User Profile */}
          <div className="user-profile">
            <div className="avatar">
              <User size={18} />
            </div>
            <span className="dropdown-arrow">▼</span>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href}>
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
