import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import './NavBar.css';
import { logout } from '../../store/session';

function NavBar () {
  const loggedIn = useSelector(state => !!state.session.user);
  const currentUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  
  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout());
  }

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-nav">
          <h1>Welcome {currentUser.username}</h1>
          <Link to={`/`}>Home</Link>
          <br></br>
          <Link to={`/profile/${currentUser._id}`}>Profile</Link>
          <br></br>
          <Link to={'/play'}>Game</Link>
          <br></br>
          <button onClick={logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className="links-auth">
          <Link to={'/signup'}>Signup</Link>
          <Link to={'/login'}>Login</Link>
        </div>
      );
    }
  }

  return (
    <>
      { getLinks() }
    </>
  );
}

export default NavBar;