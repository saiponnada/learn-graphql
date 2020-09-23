import React from 'react';
import { ApolloProvider } from 'react-apollo';
import * as Api from './Api';
import Details from './Details';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [token, setToken] = React.useState('');

  React.useEffect(() => {
    let token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  function handleChange(event) {
    event.preventDefault();
    setToken(event.target.value);
  }

  function handleAuth(event) {
    event.preventDefault();
    localStorage.setItem('token', token);
    window.location.reload();
  }

  function handleLogout(event) {
    event.preventDefault();
    localStorage.removeItem('token');
    window.location.reload();
  }
  return (
    <div className='App'>
      <h1> Github API</h1>
      {!isAuthenticated ? (
        <React.Fragment>
          <label>
            Enter Github api token here{'  '}
            <input type='password' value={token} onChange={handleChange} />
          </label>
          {'  '}
          <input type='button' value='Authenticate' onClick={handleAuth} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div>
            You are authenticated. Click logout to exit. <br />
            <input type='button' value='Logout' onClick={handleLogout} />
          </div>
          <ApolloProvider client={Api.client}>
            <Details />
          </ApolloProvider>
        </React.Fragment>
      )}
    </div>
  );
}

export default App;
