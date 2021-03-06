import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './header.css';
import { useDetectOutsideClick } from './useDetectOutsideClick';

import logo from '../../assets/hirect-logo.png';

const Header = () => { 
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    useEffect(() => {
        const showButton = () => {
            if (window.innerWidth <= 960) {
              setClick(false);
            } else {
              setClick(true);
            }
          };

        showButton();
        window.addEventListener('resize', showButton);
        return () => window.removeEventListener('resize', showButton);
    }, []);
    
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = () => setIsActive(!isActive);

    useEffect(() => {
        const pageClickEvent = (e) => {
            if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
                setIsActive(!isActive);
              }
          };
        
          if (isActive) {
            window.addEventListener('click', pageClickEvent);
          }
        
          return () => {
            window.removeEventListener('click', pageClickEvent);
          }
    }, [isActive]);

    return (
        <>
            <div className='navbar'>
                <div className='navbar-container container'>
                    <Link to='/' className='navbar-brand' onClick={closeMobileMenu}>
                        <img src={logo} alt="logo" className='logo1'/>
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        {click ? <FaTimes /> : <FaBars />}
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>Home</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/jobseeker' className='nav-links' onClick={closeMobileMenu}>Job Seekers</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/contact' className='nav-links' onClick={closeMobileMenu}>Contact Us</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/download' className='nav-links' onClick={closeMobileMenu}>Download</Link>
                        </li>
                    </ul>
                    
                </div>
                <div className='drop'>
                    <div className="menu-container">
                        <button onClick={onClick} className="menu-trigger">
                            <span>Blogs</span>
                        </button>
                        <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
                            <ul>
                                <li><Link to='/blogrec' className='nav-links' onClick={closeMobileMenu}>Recruiters</Link></li>
                                <li style={{cursor: 'pointer'}}><Link to='/blogjob' className='nav-links' onClick={closeMobileMenu}>Job Seekers</Link></li>
                            </ul>
                        </nav>
                    </div>
                        {/*<NavDropdown title="Blog">
                            <NavDropdown.Item><Link to='/blogrec' className='nav-links' onClick={closeMobileMenu}>Recruiters</Link></NavDropdown.Item>
                            <NavDropdown.Item><Link to='/blogjob' className='nav-links' onClick={closeMobileMenu}>Job Seekers</Link></NavDropdown.Item>
    </NavDropdown> */}
                    </div>
            </div>
        </>
    );
}
 
export default Header;