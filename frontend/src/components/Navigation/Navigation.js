// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
// import OpenModalButton from '../OpenModalButton/OpenModalButton';
// import LoginFormModal from '../LoginFormModal/LoginFormModal';
// import SignupFormModal from '../SignupFormModal/SignupFormModal';
// import Logo from '../UI/Logo/Logo';

// import './Navigation.css';

// function Navigation({ isLoaded }) {
//   const sessionUser = useSelector((state) => state.session.user);

//   let sessionLinks;
//   let createSpotLink;
//   if (sessionUser) {
//     sessionLinks = (
//       <>
//         <li>
//           <ProfileButton user={sessionUser} />
//         </li>
//       </>
//     );
//     createSpotLink = (
//       <li className="create-spot-link">
//         <NavLink exact to='/spots/new'>
//           Create a New Spot
//         </NavLink>
//       </li>
//     );
//   } else {
//     sessionLinks = (
//       <li className='session-links-item'>
//         <OpenModalButton
//           buttonText="Log In"
//           className='modal-button'
//           modalComponent={<LoginFormModal />}
//         />
//         <OpenModalButton
//           buttonText="Sign Up"
//           className='modal-button'
//           modalComponent={<SignupFormModal />}
//         />
//       </li>
//     );
//   }

//   return (
//     <nav className="navbar">
//       <ul className="nav-items">
//         <li className="logo-item">
//           <NavLink exact to="/" className="logo-link">
//             <Logo className="logo" />
//           </NavLink>
//         </li>
//         <li className="session-links-item">
//           <ul>
//             {sessionLinks}
//           </ul>
//         </li>
//         {createSpotLink && (
//           <li className="create-spot-link-desktop">
//             {createSpotLink}
//           </li>
//         )}
//       </ul>
//     </nav>
//   );
// }

// export default Navigation;
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import Logo from '../UI/Logo/Logo';

import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  let createSpotLink;
  if (sessionUser) {
    sessionLinks = (
      <div className='profile'>
        <li className="create-spot-link">
          <NavLink exact to='/spots/new'>
            Create a New Spot
          </NavLink>
        </li>
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      </div>
    );
  } else {
    sessionLinks = (
      <li className='session-links-item'>
        <OpenModalButton
          buttonText="Log In"
          className='modal-button'
          modalComponent={<LoginFormModal />}
        />
        <OpenModalButton
          buttonText="Sign Up"
          className='modal-button'
          modalComponent={<SignupFormModal />}
        />
      </li>
    );
  }

  return (
    <div className="navbar-wrapper">
      <nav className="navbar">
        <ul className="nav-items">
          <li className="logo-item">
            <NavLink exact to="/" className="logo-link">
              <Logo className="logo" />
            </NavLink>
          </li>
          {isLoaded && (
            <li className="session-links-item">
              <ul>
                {createSpotLink}
                {sessionLinks}
              </ul>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
