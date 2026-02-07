import React, { useEffect, useState ,useRef } from 'react'
// import { useNavigate } from 'react-router-dom';
import { HiArrowLeft, HiArrowRight , HiPlus } from "react-icons/hi2";

function Story() {
    let tot=0;
  const[stories,setStories]=useState([]);
  const[openStory, setOpenStory]=useState(null);
  const[current,setCurrent]=useState(0);

  const[storyImage,setStoryImage]=useState("");
  const[addInput,setAddInput]=useState(false);
  const[profile,setProfile] =useState("");
  const fileRef = useRef(null);
 

  useEffect(()=>{
    fetch(`http://localhost:3000/stories`).
    then((data)=>data.json()).
    then((data)=>{
        const sorted = data.sort((a, b) => b.created_at - a.created_at)
        .map((i)=>({
            ...i , post: [...i.post].sort((p1, p2) => p2.created_at - p1.created_at)

        }));
        setStories(sorted);

    });
   },[]);
  
    // const navigate= useNavigate();

    const closeStory =()=>{
        setOpenStory(null);
        setCurrent(0);
        
    }

    const nextPost = ()=>{
        const s= stories[openStory];
        if (current < s.post.length -1){
            setCurrent((prev)=>prev+1);
        }
        else if(openStory < stories.length -1 ){
            setOpenStory((prev)=> prev+1);
            setCurrent(0);
        }
        else{
            closeStory();

    }
    };


    const prevPost =()=>{
        if(current > 0){
            setCurrent((prev)=> prev -1);

        }
        else if(openStory > 0){
            const p=stories[openStory -1];
            setOpenStory((prev)=>prev-1);
            setCurrent(p.post.length -1);
        }
        else{
            closeStory();
        }
        

    };
    const handleImageupload = (e)=>{
      const file= e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = ()=>{
        setStoryImage(reader.result);
      }


    }
    const handleStory = async ()=>{ 
        if (!storyImage) {
          alert('Upload the file first');
          return;
        }
  
    
    
    const new_story= {
        id : Date.now().toString(),
        name : 'You',
        profile_pic: profile || storyImage,
        created_at : Date.now(),
        post: [
            {
                id: Date.now(),
                story_img : storyImage ,
                created_at: Date.now()
            }
        ]


    };
    try{
      const res = await fetch("http://localhost:3000/stories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(new_story),
      });
      const data = await res.json();
      setStories((prev)=> [data, ...prev]);
      setStoryImage("");
      setAddInput(false);
      fileRef.current.value="";

    }catch(err){
      console.log(err);
    }
    
  
  
};
    return (
        <div className="h-25 flex">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                <div onClick={()=>setAddInput(true)} className="cursor-pointer text-center">
                    <div className="w-16 h-16 rounded-full p-0.5 bg-gray-200 flex items-center justify-center">
                        <HiPlus size={25} /></div>
                    <span className='truncate text-xs'>Your Story</span>
                    {
                      addInput && (
                        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                              onClick={() => setAddInput(false)}>
                              <div onClick={(e)=>e.stopPropagation()} className="bg-white rounded-lg shadow-lg p-4 w-80">
                                {/* <input  type='text' value={profile} placeholder='Enter the profile URL' 
                                onChange={(e)=> setProfile(e.target.value)} className="mt-1 text-xs px-2 py-1 border rounded" /> */}
                                <input  type='file'  accept='image/*' ref={fileRef}
                                onChange= {handleImageupload}
                                 className="mt-1 text-xs px-2 py-1 border rounded"/>
                                
                                 <button onClick={handleStory}
                                 className="text-xs bg-blue-500 text-white px-2 py-1 rounded">
                                 Post</button>
                            </div>

                        </div>
                      )
                    }
                    

                </div>

            </div>
      
      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {stories.map((story, index) => (
          <div
            key={story.id}
            onClick={() => {
              setOpenStory(index);
              setCurrent(0);
            }}
            className="cursor-pointer text-center"
          >
            <img
              src={story.profile_pic}
              className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500"
              alt="profile"
            />
            <span className="text-xs max-w-16 truncate">{story.name}</span>
          </div>
        ))}
      </div>

      
      {openStory !== null && (
        <div
          className="fixed inset-0  flex items-center justify-center bg-black/70  backdrop-blur-md z-40"
          onClick={closeStory}
        >
          <div
            className="relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              className=" absolute left-1  center text-white "
              onClick={prevPost}
            >
              <HiArrowLeft size={30} className='cursor-pointer' />
            </button>

            <img
              src={stories[openStory].post[current].story_img}
              className="h-130 w-75 rounded-xl object-cover "
              alt="story"
            />

            <button
              className=" absolute right-1 center  text-white"
              onClick={nextPost}
            >
              <HiArrowRight size={30} className='cursor-pointer center' />
            </button>

            <button
              className="absolute -top-6 right-0 text-white text-xl"
              onClick={closeStory}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>



    );
    
  
    
}

  


export default Story
