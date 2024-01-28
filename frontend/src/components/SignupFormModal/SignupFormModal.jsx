import { useState, useEffect, } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    if(!email || !username || username.length<4 || !firstName || !lastName || !password || password.length<6 || !confirmPassword) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [email, username, firstName, lastName, password, confirmPassword])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword: "Confirm Password field must be the same as the Password field"
      });
    }

    const data = await dispatch(
      sessionActions.signup({
        email,
        username,
        firstName,
        lastName,
        password
      })
    )

    if (data?.errors) {
      setErrors(data.errors);
    } else {
      closeModal();
    }
    
  };

  return (
    <div id="signup-container" className='login-signup-container'>
      <h1>Sign Up</h1>
      <form className="login-signup-form"  onSubmit={handleSubmit}>
      <label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder='First Name'
          />
        </label>
        {errors.firstName && <p className='validationErrors'>{errors.firstName}</p>}
        <label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder='Last Name'
          />
        </label>
        {errors.lastName && <p className='validationErrors'>{errors.lastName}</p>}
        <label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='Email'
          />
        </label>
        {errors.email && <p className='validationErrors'>{errors.email}</p>}
        <label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder='Username'
          />
        </label>
        {errors.username && <p className='validationErrors'>{errors.username}</p>}
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='Password'
          />
        </label>
        {errors.password && <p className='validationErrors'>{errors.password}</p>}
        <label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder='Confirm Password'
          />
        </label>
        {errors.confirmPassword && <p className='validationErrors'>{errors.confirmPassword}</p>}
        <button className="user-fuction-button" type="submit" disabled={disable}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
