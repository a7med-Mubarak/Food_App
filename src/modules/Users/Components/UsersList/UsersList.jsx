import React, { useEffect, useState } from 'react';
import Header from '../../../Shared/components/Header/Header';
import headerBg from '../../../../assets/images/user.png';
import NoData from '../../../Shared/components/NoData/NoData';
import axios from 'axios';
import Girl from '../../../../assets/images/freepik--Character--inject-70.png';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteConfirm from '../../../Shared/components/DeleteConfirm/DeleteConfirm';
import { toast } from 'react-toastify';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';

export default function UsersList() {  
  let navigate = useNavigate();
  const [usersList, setUsersList] = useState([]);
  const [arrayOfpages, setArrayOfpages] = useState([]);
  const [nameValue, setNameValue] = useState("");
  const [countryValue, setCountryValue] = useState("");
  const [groupsRule, setGroupsRule] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setUserId(id);
    setShow(true);
  };

  let deleteUser = async () => {
    try {    
      const response = await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Users/${userId}`, 
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      );
      toast.success('Deleted Successfully');
      getUsersList(1, 2);
      handleClose();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error('Deletion error');
      handleClose();
    }
  };

  let getUsersList = async (pageNo = 1, pageSize = 2, nameInput = "", country = "", groupsRule = "", emailInput = "") => {
    try {
      let response = await axios.get("https://upskilling-egypt.com:3006/api/v1/Users/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: { 
          pageNumber: pageNo, 
          pageSize: pageSize, 
          userName: nameInput, 
          country: country, 
          groups: groupsRule,
          email: emailInput
        }
      });
      setArrayOfpages(Array(response.data.totalNumberOfPages).fill().map(( _, i) => i + 1));
      setUsersList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getNameValue = (input) => {
    setNameValue(input.target.value);
    getUsersList(1, 1, input.target.value, countryValue, groupsRule, emailValue);
  };

  const getCountryValue = (input) => {
    setCountryValue(input.target.value);
    getUsersList(1, 1, nameValue, input.target.value, groupsRule, emailValue);
  };

  const getGroupsRuleValue = (input) => {
    setGroupsRule(input.target.value);
    getUsersList(1, 1, nameValue, countryValue, input.target.value, emailValue);
  };

  const getEmailValue = (input) => {
    setEmailValue(input.target.value);
    getUsersList(1, 1, nameValue, countryValue, groupsRule, input.target.value);
  };

  useEffect(() => {
    getUsersList(1, 2);
  }, []);

  return (
    <>
<div className='gg'>
        <Header imgUrl={headerBg} title={'Users List'} description={'You can now add items that any user can order from the application and you can edit them'}></Header>

</div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton />
        <Modal.Body>
          <DeleteConfirm deleteItem={"User"} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteUser}>Delete this item</Button>
        </Modal.Footer>
      </Modal>

      <div className='d-flex mx-5 p-2 justify-content-between w-75'>
        <div className="title-info">
          <h4>Users Table Details</h4>
          <p>You can check all details</p>
        </div>
        <button className='btn btn-success' onClick={() => navigate("/register")}>Add New User</button>
      </div>

      <div className='table-container w-75 mx-5'>
        <div className="row">
          <div className="col-md-4">
            <input onChange={getNameValue} type="text" placeholder='Search By Name' className='form-control w-75 mx-auto mb-4' />
          </div>
          <div className="col-md-3">
            <input onChange={getEmailValue} type="text" placeholder='Search By Email' className='form-control w-75 mx-auto mb-4' />
          </div>
          <div className="col-md-3">
            <input onChange={getCountryValue} type="text" placeholder='Search By Country' className='form-control w-75 mx-auto mb-4' />
          </div>
          <div className="col-md-2">
            <select onChange={getGroupsRuleValue} className="form-control">
              <option disabled selected>Select Group</option>
              <option value="1">Admin</option>
              <option value="2">System User</option>
            </select>
          </div>
        </div>

        {usersList.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Image</th>
                <th scope="col">Country</th>
                <th scope="col">E-mail</th>
                <th scope="col">Phone</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((user) => (
                <tr key={user.id}>
                  <th scope="row">{user.id}</th>
                  <td>{user.userName}</td>
                  <td>
                    {user.imagePath ? 
                      <img className='img-recipe' src={`https://upskilling-egypt.com:3006/${user.imagePath}`} alt="" />
                      : <img className='img-recipe' src={Girl} alt="" />}
                  </td>
                  <td>{user.country}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td className='d-flex justify-content-end'>
                    <Dropdown>
                      <Dropdown.Toggle variant="inherit" id="dropdown-basic">
                        <i className="fa-solid fa-list"></i>  
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item className='d-flex justify-content-around' href="#/action-1">
                          <i className="pointer fa fa-edit text-warning" aria-hidden="true"></i>
                          <i onClick={() => handleShow(user.id)} className="pointer fa fa-trash text-danger" aria-hidden="true"></i>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : <NoData />}
      </div>

      <nav aria-label="Page navigation example">
        <ul className="pagination d-flex justify-content-center">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </a>
          </li>
          {arrayOfpages.map((pageNo) => (
            <li key={pageNo} className="page-item" onClick={() => getUsersList(pageNo, 3)}>
              <a className="page-link" href="#">{pageNo}</a>
            </li>
          ))}
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
