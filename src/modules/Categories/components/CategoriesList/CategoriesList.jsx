import React, { useEffect, useState } from 'react'
import Header from '../../../Shared/components/Header/Header'
import headerBg from '../../../../assets/images/user.png'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Girl from '../../../../assets/images/freepik--Character--inject-70.png'
import DeleteConfirm from '../../../Shared/components/DeleteConfirm/DeleteConfirm';
import { toast } from 'react-toastify';
import NoData from '../../../Shared/components/NoData/NoData';
import { useForm } from 'react-hook-form';


export default function RecipesList() {
  let {register , handleSubmit , formState:{errors}} = useForm(); 

    const [CategoriesList, setCategoriesList] = useState([]);
    const [show, setShow] = useState(false);
    const [catId, setCatId] = useState(0);
    const [showAdd, setShowAdd] = useState(false);
    const [arrayOfpages, setArrayOfpages] = useState([]);
    const [nameValue , setNameValue] = useState("")

    const handleAddClose = () => setShowAdd(false);
    const handleAddShow = () => setShowAdd(true);


    
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
      setCatId(id);
      setShow(true);
    }

    let deleteCategory = async () =>{
      try{    

        const response = await axios.delete(
          `https://upskilling-egypt.com:3006/api/v1/Category/${catId}`, 
          {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`
              }
          }
          );

        toast.success('deleted Successfully')
        getCategoriesList()
        handleClose()
      }catch (error){
        toast.success('deleted error')
        handleClose(error)

      }
    }
  

  let getCategoriesList = async (pageNo,pageSize,nameInput) =>{
    try {
      let response = await axios.get("https://upskilling-egypt.com:3006/api/v1/Category/", {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`},
      params: {pageSize: pageSize, pageNumber: pageNo , name:nameInput},
    })
    setArrayOfpages(Array(response.data.totalNumberOfPages).fill().map(( _,i )=> i + 1 ))
      setCategoriesList(response.data.data)
      
    } catch (error) {
      console.log(error);
      
    }
  }

  let addCategory = async (data) => {
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Category",
        data,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      );
      toast.success("Category added successfully!");
      getCategoriesList(); 
      handleAddClose(); 
    } catch (error) {
      console.error(error);
      toast.error("Failed to add category. Please try again.");
    }
  };


    const getNameValue = (input) =>{
      setNameValue(input.target.value);
      getCategoriesList(1,3,input.target.value)
    }


  useEffect(() =>{
  getCategoriesList(1,3,"")
}, []);



  return (<>
  
  <Header imgUrl={headerBg} title={'Categories Items'} description={'You can now add your items that any user can order it from the Application and you can edit'}/>
     
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>

        <DeleteConfirm deletItem={"Category"}></DeleteConfirm>

        </Modal.Body>
        <Modal.Footer>
      
          <Button variant="danger" onClick={deleteCategory}>
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>



      <Modal show={showAdd} onHide={handleAddClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>

          <form onSubmit={handleSubmit(addCategory)}>
          <input
              type="string"
              className="my-5 form-control"
              placeholder="UserName"
              aria-label="UserName"
               aria-describedby="basic-addon1"
               {...register('name', {
                required: 'Category Name Is Required'})}
                    />   
                {errors.name && (
                    <p className="d-flex justify-content-start text-danger">
                    {errors.name.message}
                    </p>
                    )}
          <Button className='w-75 d-flex justify-content-center mx-auto my-3' type='submit' variant="success">
            Save
          </Button>
                </form>

        </Modal.Body>
        <Modal.Footer>
      

        </Modal.Footer>
      </Modal>









<div className='d-flex p-3 justify-content-between'>
 <div className=" title-info">
        <h4>Categories Table Details</h4>
        <p>You can check all details</p>
      </div>
      <button className='btn btn-success' onClick={handleAddShow}>Add New Category</button>


</div>
     
    <div className='table-container p-3 container'>
      <input onChange={getNameValue} type="text" placeholder='Search By Name' className='form-control w-75 mx-auto mb-4' />
      {CategoriesList.length > 0 ?     (    
        <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Data</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
         

    {CategoriesList.map((category) => (
            <tr key={category.id}>
                  <th scope="row">{category.id} </th>
                  <td>{category.name}</td>
                  <td>{category.creationDate}</td>
                  <td className='d-flex justify-content-end'>
                    <i onClick={()=>handleShow(category.id)} className="pointer fa fa-trash text-danger" aria-hidden="true"></i>

                  </td>
            </tr>
            ))}

        </tbody>
      </table> ):( <NoData/>)} 




    </div>


    <nav aria-label="Page navigation example">
  <ul className="pagination d-flex justify-content-center">
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
        <span className="sr-only">Previous</span>
      </a>
    </li>
    {arrayOfpages.map((pageNo)=>(
      <li key={pageNo} className="page-item" onClick={()=>getCategoriesList(pageNo,3)}> <a className="page-link" href="#">{pageNo}</a>
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
  )
}
