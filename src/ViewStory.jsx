import React, { useEffect, useState } from 'react'
import { useParams,Link,useNavigate } from 'react-router-dom'
import { HiArrowRight , HiArrowLeft} from "react-icons/hi2";  

function ViewStory() {
    const {id,tot} =useParams();
    const[story,setStory]=useState(null);
    useEffect(()=>{
        fetch(`http://localhost:3000/stories/${id}`).
        then((data)=>data.json()).
        then((data)=>{
            const sortedPost = [...data.post].sort((a,b)=>new Date(b.created_at)- new Date(a.created_at));
            setStory({...data,post: sortedPost});
        });
    },[id]);
    const navigate=useNavigate();
    console.log(story)
    useEffect(() => {
    if (Number(id) > Number(tot) || Number(id) <= 0) {
        navigate('/');
    }}, [id, tot, navigate]);
  return (
    <div>
        {story ? 
        <div>
            {story.post.map((i)=>(
                <div key={i.id} className='h-screen bg-black flex items-center justify-center'>
                    <div></div>
                    <Link to={`http://localhost:5173/story/${Number(id)-1}/${tot}`} 
                    className="  flex items-center gap-2 text-blue-600 ">
                        <HiArrowLeft  />
                    </Link>
                    <img  className='h-180 ' src={i.story_img} alt='Load'/>
                    <Link to={`http://localhost:5173/story/${Number(id)+1}/${tot}`} 
                     className=" arrow flex items-center gap-2 text-blue-600 ">'
                        <HiArrowRight  />
                    </Link>
                    

                    
                </div>
            ))}
             </div> : 
            <div>
            Loading
           </div>}
    </div>
  )
}

export default ViewStory