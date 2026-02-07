import React, { useEffect, useState } from "react";
import { FiHeart, FiMessageCircle, FiSend, FiCalendar } from "react-icons/fi";
import { FaHeart, FaCheckCircle } from "react-icons/fa";
import axios from "axios";

function Posts() {
  const [posts, setPosts] = useState([]);
  const currentUser = "Arun_kumar";

  useEffect(() => {
    fetch("http://localhost:3000/data")
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  const handleLikes = async (postId) => {
    let updatedUserId;
    let updatedPosts;

    setPosts(prev =>
      prev.map(user => {
        if (!user.post) return user;

        updatedPosts = user.post.map(post => {
          if (post.id !== postId) return post;

          const likedBy = post.likedBy || [];
          const isLiked = likedBy.includes(currentUser);

          return {
            ...post,likes: isLiked ? Math.max(0, post.likes - 1): post.likes + 1,
            likedBy: isLiked ? likedBy.filter(u => u !== currentUser) : [...likedBy, currentUser]
          };
        });

        updatedUserId = user.id;
        return { ...user, post: updatedPosts };
      })
    );

    await axios.patch(`http://localhost:3000/data/${updatedUserId}`, {
      post: updatedPosts
    });
  };

  return (
    <div className="flex justify-center">
      <div className="w-[470px]">

        {posts.map(user => {
          
          const validPosts = (user.post || []).filter(p =>p.image_url && p.created_at &&typeof p.likes === "number")
            .map(p => ({
              ...p,
              created_at: new Date(p.created_at).getTime() 
            }))
            .sort((a, b) => b.created_at - a.created_at);

          return (
            <React.Fragment key={user.id}>
              {validPosts.map(post => (
                <div key={post.id} className="mb-6 border rounded">

                  <div className="flex items-center gap-3 px-4 py-3">
                    <img
                      src={user.profile_pic}
                      className="w-10 h-10 rounded-full"
                      alt=""
                    />
                    <div className="flex items-center gap-1 font-semibold">
                      {user.name}
                      {user.is_verified && (
                        <FaCheckCircle className="text-blue-500 text-xs" />
                      )}
                    </div>
                  </div>

           
                  <img
                    src={post.image_url}
                    className="w-full max-h-[450px] object-cover"
                    alt=""
                  />

                  
                  <div className="flex items-center gap-3 px-4 py-2">
                    {post.likedBy.includes(currentUser) ? (
                      <FaHeart
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleLikes(post.id)}
                      />
                    ) : (
                      <FiHeart
                        className="cursor-pointer"
                        onClick={() => handleLikes(post.id)}
                      />
                    )}
                    <span className="text-sm">{post.likes}</span>
                    <FiSend />
                    <FiMessageCircle />
                  </div>

               
                  <div className="px-4 text-sm font-semibold">
                    {post.caption}
                  </div>

                  
                  <div className="flex items-center gap-1 text-[11px] px-4 py-2">
                    <FiCalendar />
                    {new Date(post.created_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric"
                    })}
                  </div>

                </div>
              ))}
            </React.Fragment>
          );
        })}

      </div>
    </div>
  );
}

export default Posts;

