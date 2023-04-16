import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

const demoUser = {
  credential: "DemoUser",
  password: "password",
};

const LoginFormModal = () => {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.message) {
          setErrors(data.message);
        }
      });
  };

  const demoLoginHandler = () => {
    setCredential(demoUser.credential);
    setPassword(demoUser.password);
  };

  return (
    <div className="modal">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {Object.values(errors).length > 0 && (
          <p className="error">{errors}</p>
        )}
        <button type="submit" disabled={Object.values(errors).length > 0}>
          Log In
        </button>
        <button type="button" onClick={demoLoginHandler}>
          Demo User
        </button>
      </form>
    </div>
  );
};

export default LoginFormModal;
