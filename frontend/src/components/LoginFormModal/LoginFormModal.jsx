import { useState, useEffect, } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    if(credential.length < 4 || password.length < 6) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [credential, password])


  const handleDemoUser = async(e) => {
    e.preventDefault();
    setErrors({});
    const data = await dispatch(sessionActions.login({credential:"sarah.d@gmail.com", password: "sdPassword"}));
    
    if (data && data.title) {
      setErrors(data);
    } else {
      setErrors({});
      closeModal();
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    setErrors({});
    const data = await dispatch(sessionActions.login({ credential, password }))
    
    if (data && data.title) {
      setErrors(data);
    } else {
      setErrors({});
      setCredential("");
      setPassword("");
      closeModal();
    }
  };

  return (
    <div className='login-signup-container'>
      <h2>Log In</h2>
      {errors.title && 
        <div className="login-error flex">
          <i className="fa-solid fa-circle-exclamation"></i>
          <p>{errors.message}</p> 
        </div>
      }
      <form className="login-signup-form" onSubmit={handleSubmit}>
        <div className='grid input-container'>
          <label>
              <input
                type="text"
                placeholder='Username or Email'
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
                id="username-input"
              />
            </label>
            <span className='divider'></span>
            <label>
              <input
                type="password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
        </div>
        <button className="user-fuction-button" type="submit" disabled={disable}>Log In</button>
      </form>
      <button id="demouser" onClick={handleDemoUser}>Demo User</button>
    </div>
  );
}

export default LoginFormModal;
