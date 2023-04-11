import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import './Navigation.css';
// import CreateSpot from '../SpotsPages/CreateSpot';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector((state) => state.session.user);

    let sessionLinks;
    if (sessionUser) {
      sessionLinks = (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      );
    } else {
      sessionLinks = (
        <li>
          <OpenModalButton
            buttonText="Log In"
            modalComponent={<LoginFormModal />}
          />
           <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
            />
        </li>
      );
    }

    return (
    <nav>
      <ul>
        <li>
          <NavLink exact to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink exact to='/spots'>
            Create a New Spot
          </NavLink>
        </li>
        {isLoaded && sessionLinks}
      </ul>
    </nav>
    );
  }

export default Navigation;
