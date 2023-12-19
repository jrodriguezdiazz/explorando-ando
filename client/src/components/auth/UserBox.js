import React, {Fragment, useState} from 'react';
import {Button, Navbar} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import useAuthStore, {userStore} from '../../stores/authStore';
import {isAuthenticated} from '../../utils/jwtUtil';

const UserBox = () => {
  const history = useHistory();
  const [isAuth, setIsAuth] = useState(isAuthenticated());
  const logout = useAuthStore((state) => state.logout);
  const user = userStore((state) => state.user);


  const handleLogOut = (e) => {
    e.preventDefault();
    logout();
    setIsAuth(false);
  };

  const handleLogin = () => {
    history.push('/iniciar-sesion');
  };

  const handleRegister = () => {
    history.push('/registrarse');
  };

  return (
    <Navbar.Collapse className="justify-content-end">
      {isAuth ? (
        <Fragment>
          <Navbar.Collapse className="justify-content-end">
            <Button variant="outline-primary" onClick={handleLogOut}>
              Cerrar Sesión
            </Button>
            <Navbar.Text>
              Signed in as: <a href="login">{user.email || 'user'}</a>
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
