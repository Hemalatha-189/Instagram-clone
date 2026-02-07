import React, { useEffect } from 'react'
import { useState } from 'react';
import CreatePost from './CreatePost';

import {
  FiHome,
  FiSearch,
  FiCompass,
  FiFilm,
  FiMessageCircle,
  FiHeart,
  FiPlusSquare,
  FiUser,
  FiMenu
} from "react-icons/fi";

import { BsThreads } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
function Sidebar({setOpenCreate}) {
  const navigate=useNavigate();
  return (

    <>
    <div className='flex flex-col justify-between h-screen w-62.5 px-4 py-6  border-r border-gray-300 '>
      <div>
        <img className='mb-8 w-36 cursor-pointer'  src='\assets\insta_word.png' alt='Instagram'  />
        <div className='item'><FiHome/>Home</div>
        <div className='item'><FiSearch/>Search</div>
        <div className='item'><FiCompass/>Explore</div>
        <div className='item'><FiFilm/>Reels</div>
        <div className='item'><FiMessageCircle/>Messages</div>
        <div className='item'><FiHeart/>Notifications</div>
        <div className='item'><FiPlusSquare  onClick={()=>setOpenCreate(true)}/>Create</div> 
        <div className='item' onClick={()=>{navigate('/Profile')}}><FiUser/>Profile</div>
      </div> 
      <div className='bottom pt-4  border-gray-300'>
       <div className='item'><BsThreads/>Thread</div>
       <div className='item'><FiMenu/>More</div>

      </div>
      </div>
   
    </>
    
  )
}

export default Sidebar