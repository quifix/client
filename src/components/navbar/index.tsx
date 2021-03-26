import { Link, useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useAuthAxios } from '../../hooks';

export const Navbar = () => {
  const history = useHistory();
  const { loginWithRedirect, logout } = useAuth0();
  const { authAxios: axios } = useAuthAxios();
  const handleLogout = async () => {
    await axios.post('/api/logout');
    logout();
    history.push('/');
  };
  return (
    <header className="container px-6 xl:px-0 py-9 md:max-w-5xl md:mx-auto md:py-0 md:my-16">
      <nav>
        <div className="flex items-center justify-between">
          <Link to="/">
            <h1>Quifix</h1>
          </Link>

          <ul>
            <li>
              <button onClick={loginWithRedirect}>Login</button>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
