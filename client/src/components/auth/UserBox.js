import React, {Fragment, useState} from 'react';
import {Button, Nav, Navbar, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';
import useAuthStore, {userStore} from '../../stores/authStore';
import {isAuthenticated} from '../../utils/jwtUtil';

const UserBox = () => {
  const [isAuth, setIsAuth] = useState(isAuthenticated());
  const logout = useAuthStore((state) => state.logout);
  const user = userStore((state) => state.user);
  const history = useHistory();

  const handleLogOut = (e) => {
    e.preventDefault();
    logout();
    setIsAuth(false);
  };

  const handleLogin = () => {
    history.push('/login');
  };

  const handleRegister = () => {
    history.push('/signup');
  };

  return (
    <Navbar.Collapse className="justify-content-end">
      {isAuth ? (
        <Fragment>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="login">{user.userName || 'user'}</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Fragment>
      ) : (
        <Fragment>
          <Button variant="outline-primary" onClick={handleLogin}>
            Iniciar Sesión
          </Button>
          <Button variant="primary" onClick={handleRegister}>
            Regístrate
          </Button>
        </Fragment>
      )}
    </Navbar.Collapse>
  );
};

export default UserBox;
