import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { Redirect } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";
import { useHistory } from "react-router-dom";

const SignupFormModal = () => {
  const history = useHistory()
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    const signUpErrors = {};
    if (username.length < 4) signUpErrors.username = "Username cannot be less than 4 characters";
    if (password.length < 6) signUpErrors.password = "Password cannot be less than 6 characters";
    if (password !== confirmPassword) signUpErrors.confirmPassword = "Passwords do not match";
    setErrors(signUpErrors);

    // Check for errors in the signUpErrors object instead of the errors object
    if (Object.values(signUpErrors).length === 0) {
      dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          console.log(data.errors)
          if (data && data.errors) {
            if (Array.isArray(data.errors)){
              for (const err of data.errors) {
                if (err === 'Please provide a valid email.') signUpErrors.email = 'Please provide a valid email.';
                if (err === "Please provide a username with at least 4 characters.") {
                  signUpErrors.username ="Please provide a username with at least 4 characters.";
                }
                if (err === "Password must be 6 characters or more."){
                  signUpErrors.password = "Password must be 6 characters or more.";
                }
              }
              setErrors(signUpErrors);
            }
          } else {
            setErrors(data.errors);
          }
        });
    }
  };

  useEffect(() => {
    // console.log(errors);
    history.push('/spots')
    history.push('/')
  }, [errors]);

  return (
    <div className='modal'>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            placeholder='First Name'
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p>{errors.firstName}</p>}
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            placeholder = 'Last Name'
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            placeholder = 'Password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            placeholder='Confirm Password'
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && (
          <p>{errors.confirmPassword}</p>
        )}
        <button type="submit"
        disabled={Object.values(errors).length > 0}
        >Sign Up</button>
        {/* <ul>
        {errors.length &&

        <li className='sign-up'></li>
        }
        </ul> */}
      </form>
    </div>
  );
}

export default SignupFormModal;
