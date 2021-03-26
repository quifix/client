import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { Approutes, Navbar } from './components';

function App() {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN!}
      clientId={process.env.REACT_APP_CLIENT_ID!}
      redirectUri={`${window.location.origin}`}
      audience={process.env.REACT_APP_AUTH0_IDENTIFIER!}>
      <Router>
        <Navbar />
        <Switch>
          <Approutes />
        </Switch>
      </Router>
    </Auth0Provider>
  );
}

export default App;
