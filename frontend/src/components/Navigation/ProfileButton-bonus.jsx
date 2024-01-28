import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { NavLink, useNavigate} from 'react-router-dom';
import './ProfileButton.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    navigate('/');
  };

  const alert = () => {
    window.alert("Feature coming soon...")
  }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div id='profile-dropdown-container'>
      <button id="user-profile-button" onClick={toggleMenu}>
        <i  className="fa-solid fa-bars"></i>
        <i id="profile" className="fas fa-user-circle" />
      </button>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <div className='user-dropdown'>
            <div id="user-greeting">Hello, {user.firstName}!</div>
            <div>{user.username}</div>
            <div>{user.email}</div>
            
            <span className="divider"></span>
            
            <div className='link'><NavLink to='/spots/current' onClick={closeMenu}>Manage Spots</NavLink></div>
            <div className='link'><NavLink onClick={alert}>Manage Review</NavLink></div>
            
            <span className="divider"></span>
            
            <div className='link'>
              <NavLink onClick={logout}>Log Out</NavLink>
            </div>
          </div>
        ) : (
          <div className='user-dropdown'>
            <div className="link login">
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </div>
            <div className="link signup">
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileButton;
