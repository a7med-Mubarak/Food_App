import React, { useState, useContext } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import toggle from '../../../../assets/images/222.png';
import { AuthContext } from '../../../../context/AuthContext';
import { toast } from 'react-toastify';

export default function SideBar() {
  const navigate = useNavigate();
  const { clearLoginData } = useContext(AuthContext);
  const [isCollapse, setIsCollapse] = useState(false);

  const toggleCollapse = () => {
    setIsCollapse(!isCollapse);
  };

  const handleLogout = () => {        
    toast.success("Log Out Success");

    navigate('/login');

    localStorage.removeItem('token');
    clearLoginData();

  };

  return (
    <Sidebar collapsed={isCollapse}>
      <Menu>
        <MenuItem onClick={toggleCollapse} icon={<img className='toggle' src={toggle} alt="toggle" />} />
        <MenuItem className='mt-5 my-2' icon={<i className='fa fa-home'></i>} component={<Link to="home" />}> Home</MenuItem>
        <MenuItem className='my-2' icon={<i className='fa fa-users'></i>} component={<Link to="usersList" />}> Users</MenuItem>
        <MenuItem className='my-2' icon={<i className='fa fa-pizza-slice'></i>} component={<Link to="recipesList" />}> Recipes</MenuItem>
        <MenuItem className='my-2' icon={<i className="fa-solid fa-braille"></i>} component={<Link to="categoriesList" />}> Category</MenuItem>
        <MenuItem className='my-2' icon={<i className='fa fa-sign-out'></i>} onClick={handleLogout}> LogOut</MenuItem>
      </Menu>
    </Sidebar>
  );
}
