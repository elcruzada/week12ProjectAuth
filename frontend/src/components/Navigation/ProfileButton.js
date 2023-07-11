import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem'
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import SignupFormModal from "../SignupFormModal/SignupFormModal";
import "./ProfileButton.css"
import './Navigation.css'

const ProfileButton = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu()
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

//   console.log('showMenu', showMenu)

  return (
    <>


    {/* <button > */}
    <div
      className='button-container-nav'
      onClick={openMenu}
    >

      <i className="fa-solid fa-bars"
      ></i>
      <i className="fas fa-user-circle"
      />
    </div>
      {/* <i className="fa-duotone fa-bars"/> */}
    {/* </button> */}

    <div className='profile-container'>

    <ul className={ulClassName} ref={ulRef}>
      {user ? (
        <>
          <li>Hello {user.firstName}</li>
          {/* <li>{user.username}</li> */}
          {/* <li>{user.firstName} {user.lastName}</li> */}
          <li>{user.email}</li>
          <hr />
          <li>
            <Link to='/spots/current'>Manage Spots</Link>
          </li>
          <li>
            <Link to='/bookings/current'>Manage Bookings</Link>
          </li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </>
      ) : (
        <>
        <OpenModalMenuItem
          itemText="Log In"
          onItemClick={closeMenu}
          modalComponent={<LoginFormModal />}
          />
        <OpenModalMenuItem
          itemText="Sign Up"
          onItemClick={closeMenu}
          modalComponent={<SignupFormModal />}
          />
      </>
      )}
    </ul>
      </div>
  </>
  );
}

export default ProfileButton;
