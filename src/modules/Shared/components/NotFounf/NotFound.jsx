import React from 'react'
import nodata from '../../../../assets/images/Group 48101676.png'
import logo from '../../../../assets/images/4 3.png';
import {  useNavigate } from 'react-router-dom';



export default function NotFound() {
  let navigate = useNavigate();

  return (<>    <img className='logo' src={logo}></img>

     <div className='text-nodata'>
       <h2>Oops.</h2>
        <h3 className='text-success'>Page  not found </h3>
        <br/>
        <h3>. . .</h3>
        <p className='my-4'>This Page doesn’t exist or was removed!<br/>
        We suggest you  back to home.</p>
        <button onClick={()=>navigate("/dashboard/home")} className='btn btn-success w-25'><i className='mx-2 my-4 fa fa-arrow-left'></i> Back to Home </button>
    </div> 

    <div>
          <img className={'nodata'} src={nodata}></img>

    </div>



  
  </>
  )
}
