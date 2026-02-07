import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios";


function Suggestion({theme,changeTheme}) {
  const[profile,setProfile]=useState(null);
  const[suggestion,setSuggestion]=useState([]);
  const[following,setFollowing]=useState(new Set());
  

  useEffect(()=>{
    fetch("http://localhost:3000/profile").
    then((data)=>data.json()).
    then((data)=>setProfile(data)).
    catch((err)=>console.log(err));

    fetch("http://localhost:3000/suggestions").
    then((data)=>data.json()).
    then((data)=>setSuggestion(data)).
    catch((err)=>console.log(err));

    fetch('http://localhost:3000/followers').
    then((d)=>d.json()).
    then((d)=>{
        const followedId= new Set(d.map(i=> i.id));
        setFollowing(followedId);
    });
    },[])
  // function Shoot(userid){
  //   if(followers.has(userid)){
  //     setFollowers(prev=>{
  //       const newSet= new Set(prev);
  //      newSet.delete(userid);
  //      return newSet;

  //     });

  //   }
  //   else{
  //     setFollowers(prev=>([...[prev],userid]));
  //     alert("Followed");

  //   }
    
  // }
  
  const handleFollow= async(id,name)=>{
    try{
        await axios.post('http://localhost:3000/followers',{'id': id, 'name': name})
        setFollowing(prev => new Set([...prev,id]));
        then(alert('Followed'));
    }
    catch(err){
        console.log(err);
    }

  }

  return(
    <div className="bg-inherit text-inherit max-w-md mx-auto rounded-xl shadow-md">
        <div className='p-4 border-b'>
        {profile ?
            (
            <div>{profile.map((i)=>(
                <React.Fragment key={i.id}>
                    <div className='flex items-center justify-between mb-3'>
                        <img className='className="w-12 h-12 rounded-full border-2 border-pink-500"' 
                        src={i.profile_pic} alt='Load...' />
                        <div className="flex flex-col">
                            <span className="font-semibold text-black truncate">{i.name}</span>
                            <span className="text-gray-500 text-sm">Your Profile</span>
                        </div>
                          <button className="text-blue-500 font-semibold hover:text-blue-700 transition-colors cursor-pointer">
                            Switch</button>
                         
                    </div>
                </React.Fragment> 
            ))}</div>
            ):(
                <div>Loading..</div>
            )} 

       </div>
       <div className='flex justify-between items-center m-4'>
        <p className='px-4 py-2'>Suggested for You</p>
        <h1 className='px-4 py-2 '>See All</h1>
       </div>
       <div className='m-4'>
               {suggestion.length > 0 ?
               (
               <div>{suggestion.map((i)=>(
                   <React.Fragment key={i.id}>
                       <div className='flex my-2 p-2 gap-2 items-center'>
                           <img className='dp rounded-full w-12 h-12  ' src={i.profile_pic} alt='Load...' />
                           <span className="font-small flex-1 text-sm min-w-0 truncate">{i.name}</span>
                           <button onClick={()=>{handleFollow(i.id,i.name)}} disabled={following.has(i.id)}
                           className={`py-1.5 px-4 rounded text-sm whitespace-nowrap shrink-0 transition-all cursor-pointer
                            ${ following.has(i.id) ?
                                'bg-gray-400 cursor-not-allowed text-white' 
                                : 'bg-blue-500 hover:bg-blue-700 text-white' 
                            }`}>
                            
                                {following.has(i.id) ? "Following": "Follow"} 
                            </button>
                       </div>
                   </React.Fragment> 
                  ))}</div>
                   ):(
                   <div>Loading..</div>
               )}
    
           </div>
         
             
    </div>
  )}
export default Suggestion