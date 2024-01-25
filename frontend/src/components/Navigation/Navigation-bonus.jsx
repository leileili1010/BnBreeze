import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton-bonus';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='navbar'>

        <NavLink to="/">Home</NavLink>

        {sessionUser && <NavLink to='/spots/new'>Create a New Spot</NavLink>}
        
        {isLoaded && (
          <ProfileButton user={sessionUser} />
        )}

    </div>
  );
}

export default Navigation;
