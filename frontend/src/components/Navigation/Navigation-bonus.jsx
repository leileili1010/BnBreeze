import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton-bonus';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div id="navbar" className='flex'>
        <NavLink to="/"><h2>BnBreeze</h2></NavLink>

        <div className='newspot-profile-container flex'>
          { sessionUser && 
            <div id="create-spot" className='flex' >
              <NavLink to='/spots/new'>Create a New Spot</NavLink>
            </div>
          }
          
          {isLoaded && (
            <ProfileButton user={sessionUser} />
          )}
        </div>

    </div>
  );
}

export default Navigation;
