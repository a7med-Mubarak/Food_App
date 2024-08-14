import React, { useEffect, useState } from 'react'
import Header from '../../../Shared/components/Header/Header'
import headerBg from '../../../../assets/images/user.png'
import NoData from '../../../Shared/components/NoData/NoData'
import axios from 'axios';
import Girl from '../../../../assets/images/freepik--Character--inject-70.png'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteConfirm from '../../../Shared/components/DeleteConfirm/DeleteConfirm';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



export default function RecipesList() {
  let navigate = useNavigate()
  const [recipesiesList, setRecipesiesList] = useState([]);

  const [show, setShow] = useState(false);
  const [recipeId, setRecipeId] = useState(0);
  const [arrayOfpages, setArrayOfpages] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const [CategoriesList, setCategoriesList] = useState([]);
  const [nameValue , setNameValue] = useState("");
  const [tagValue , setTagValue] = useState("");
  const [catValue , setCatValue] = useState("");

  


  
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setRecipeId(id);
    setShow(true);
  }


  let deleteRecipe = async () =>{
    try{    

      const response = await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/${recipeId}`, 
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
        );

      toast.success('deleted Successfully')
      getRecipesList()
      handleClose()
    }catch (error){
      toast.success('deleted error')
      handleClose(error)

    }
  }


  

  let getCategoriesList = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Category",
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, 
      }
      );
      setCategoriesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };


  let getAllTages = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/tag/",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      );
      setTagsList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  let getRecipesList = async (pageNo,pageSize,nameInput,tagInput,catInput) =>{
    try {
      let response = await axios.get("https://upskilling-egypt.com:3006/api/v1/Recipe", {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`},
    params: {pageNumber:pageNo , pageSize:pageSize , name:nameInput , tagId:tagInput , categoryId:catInput}
    });
    setArrayOfpages(Array(response.data.totalNumberOfPages).fill().map(( _,i )=> i + 1 ))

      setRecipesiesList(response.data.data)
      
    } catch (error) {
      console.log(error);
      
    }
  }



  
  const getNameValue = (input) =>{
    setNameValue(input.target.value);
    getRecipesList(1,2,input.target.value , tagValue , catValue)
  };
  
  const getTagValue = (input) =>{
    setTagValue(input.target.value);
    getRecipesList(1,2, nameValue ,input.target.value , catValue)
  };  

  const getCatValue = (input) =>{
    setCatValue(input.target.value);
    getRecipesList(1,2,nameValue, tagValue,input.target.value)
  };






  useEffect(() => {
    getRecipesList(1,2);
    getAllTages();
    getCategoriesList();
  },[]);

  return (<>

  

  
  <Header imgUrl={headerBg} title={'Recipes Items'} description={'you can now add your items that any user can order it from the Application and you can edit'}/>


  <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body className=''>

        <DeleteConfirm deletItem={"Recipe"}></DeleteConfirm>

        </Modal.Body>
        <Modal.Footer>
      
          <Button variant="danger" onClick={deleteRecipe}>
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>

  <div className='d-flex p-3 justify-content-between'>
 <div className=" title-info">
        <h4>Recipes Table Details</h4>
        <p>You can check all details</p>
      </div>
      <button className='btn btn-success' onClick={()=>navigate("/dashboard/recipedata")}>Add New Recipes</button>
</div>

<div className='table-container p-3 container'>

  <div className="row">
    <div className="col-md-6">
    <input onChange={getNameValue} type="text" placeholder='Search By Name' className='form-control w-75 mx-auto mb-4' />


    </div>
    <div className="col-md-3">
        <select onChange={getTagValue} className="form-control">
          <option disabled> Select Tag</option>
          {tagsList.map(tag => <option key={tag.id} value={tag.id}>{tag.name}</option>)}
        </select>
    </div>
    <div className="col-md-3">
    <select onChange={getCatValue} className="form-control">
          <option disabled> Select Category</option>
          {CategoriesList.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
        </select>
    </div>
  </div>

      {recipesiesList.length > 0 ?     (    
        <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Image</th>
            <th scope="col">Price</th>
            <th scope="col">Descripation</th>
            <th scope="col">Tag</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
         

    {recipesiesList.map((recipe) => (
            <tr key={recipe.id}>
                  <th scope="row">{recipe.name} </th>
                  <td>
                    
                    {recipe.imagePath?
                    <img className='img-recipe' src={`https://upskilling-egypt.com:3006/${recipe.imagePath}`} alt="" />
                    : 
                    <img className='img-recipe' src={Girl}></img>}
                    </td>
                  <td>{recipe.price}</td>
                  <td>{recipe.description}</td>
                  <td>{recipe.tag.name}</td>

                  <td className='d-flex justify-content-end'>
                    <i className=" pointer fa fa-edit text-warning mx-3" aria-hidden="true"></i>
                    <i onClick={()=>handleShow(recipe.id)} className="pointer fa-hand-pointer fa fa-trash text-danger" aria-hidden="true"></i>
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
      <li key={pageNo} className="page-item" onClick={()=>getRecipesList(pageNo,3)}> <a className="page-link" href="#">{pageNo}</a>
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
