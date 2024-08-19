import React, { useContext } from 'react'
import { AuthContext } from '../../../../context/AuthContext'
import Imgg from '../../../../assets/images/Screenshot 2024-08-19 222601.png'
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function NavBar() {
  let { loginData } = useContext(AuthContext)
  const navigate = useNavigate();


  const handleLogout = () => {        
    toast.success("Log Out Success");

    navigate('/login');

    localStorage.removeItem('token');
    clearLoginData();

  };


  return <>
  
  <nav className="navbar navbar-expand-lg navbar-brand bg-light">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
        <div className='icon'>
                  <img src={Imgg}></img>

        </div>
        <li className="nav-item text-black">
          {loginData?.userName}
        </li>
    <Dropdown>
      <Dropdown.Toggle className='bg-success text-dark mx-3' id="dropdown-basic">
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item >
        <h5 className='text-danger' icon={<i className='fa fa-sign-out'></i>} onClick={handleLogout}> LogOut</h5>

        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
      </ul>
    </div>
  </div>
</nav>

  </>
}