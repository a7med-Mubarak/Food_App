import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function RecipeData() {
  let { register, handleSubmit, formState: { errors } } = useForm();

  let navigate = useNavigate();
  const [tagsList, setTagsList] = useState([]);
  const [CategoriesList, setCategoriesList] = useState([]);

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

  const appendToFormData = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("categoriesIds", data.categoriesIds);
    formData.append("tagId", data.tagId);
    formData.append("recipeImage", data.recipeImage[0]);
    return formData;
  };

  let onAddSubmit = async (data) => {
    let recipeData = appendToFormData(data);
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Recipe",
        recipeData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      );
      navigate('/dashboard/recipesList');
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to add recipe');
      }
    }
  };

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

  useEffect(() => {
    getAllTages();
    getCategoriesList();
  }, []); 

  return (
    <>
      <div className='home-data mx-auto rounded rounded-3 px-5 py-4'>
        <div className="homeTitle">
          <h5>Fill the <span className='text-success'>Recipes</span>!</h5>
          <p>You can now fill the meals easily using the table and form,<br/> click here and fill it with the table!</p>
        </div>
        <button onClick={() => navigate("/dashboard/recipesList")} className='btn btn-success'>
          Fill Recipes <i className='fa fa-arrow-right'></i>
        </button>
      </div>

      <form className='container w-75' onSubmit={handleSubmit(onAddSubmit)}>
        <input
          type="text"
          className="form-control my-3"
          placeholder="Recipe Name"
          aria-label="name"
          aria-describedby="basic-addon1"
          {...register("name", { required: 'Name is Required' })}
        />
        {errors.name && <span className='text-danger'>{errors.name.message}</span>}

        <select className="form-control my-3" {...register("tagId", { required: 'Tag is Required' })}>
          <option disabled> Select Tag</option>
          {tagsList.map(tag => <option key={tag.id} value={tag.id}>{tag.name}</option>)}
        </select>
        {errors.tagId && <span className='text-danger'>{errors.tagId.message}</span>}

        <input
          type="number"
          className="form-control my-3"
          placeholder="Price"
          aria-label="Price"
          aria-describedby="basic-addon1"
          {...register("price", { required: 'Price is Required' })}
        />
        {errors.price && <span className='text-danger'>{errors.price.message}</span>}

        <select className="form-control my-3" {...register("categoriesIds", { required: 'Category is Required' })}>
          <option disabled> Select Category</option>
          {CategoriesList.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
        </select>
        {errors.categoriesIds && <span className='text-danger'>{errors.categoriesIds.message}</span>}

        <textarea {...register("description", { required: 'Description is Required' })} placeholder="Description" className="form-control my-3"></textarea>
        {errors.description && <span className='text-danger'>{errors.description.message}</span>}

        <input
          type="file"
          className="form-control my-3"
          placeholder="Upload Image"
          aria-label="img"
          aria-describedby="basic-addon1"
          {...register("recipeImage", { required: 'Recipe Image is Required' })}
        />
        {errors.recipeImage && <span className='text-danger'>{errors.recipeImage.message}</span>}

        <div className='d-flex justify-content-end'>
          <button type="button" className='btn btn-outline-success mx-3' onClick={() => navigate('/dashboard/recipesList')}>
            Cancel
          </button>
          <button type="submit" className='btn btn-success'>
            Save
          </button>
        </div>
      </form>
    </>
  );
}
