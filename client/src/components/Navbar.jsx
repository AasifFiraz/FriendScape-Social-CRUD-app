import React, { useContext, useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/auth"

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  // dynamically set the 'active' link by looking at the current URL
  const pathName = window.location.pathname;
  const path = pathName === '/' ? 'home' : pathName.substring(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = user ? (
    (
      <Menu pointing secondary size="massive" color="teal">
        <Menu.Item name={user.username} active={activeItem === 'home'} onClick={handleItemClick} as={Link} to="/" />
        <Menu.Menu position="right">
          <Menu.Item name="logout" active={activeItem === 'logout'} onClick={logout} as={Link} to="/" />
        </Menu.Menu>
      </Menu>
    )
  ) : (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item name="home" active={activeItem === 'home'} onClick={handleItemClick} as={Link} to="/" />
      <Menu.Menu position="right">
        <Menu.Item name="login" active={activeItem === 'login'} onClick={handleItemClick} as={Link} to="/login" />
        <Menu.Item
          name="register"
          active={activeItem === 'register'}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
      </Menu.Menu>
    </Menu>
  )

  return menuBar;
};

export default Navbar;
